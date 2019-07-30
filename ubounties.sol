pragma solidity ^0.5.0;

contract ERC20Basic {
  function totalSupply() public view returns (uint256);
  function balanceOf(address who) public view returns (uint256);
  function transfer(address to, uint256 value) public returns (bool);
  event Transfer(address indexed from, address indexed to, uint256 value);
}

contract ERC20 is ERC20Basic {
  function allowance(address owner, address spender) public view returns (uint256);
  function transferFrom(address from, address to, uint256 value) public returns (bool);
  function approve(address spender, uint256 value) public returns (bool);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}


contract uBountyCreator{
    
    address token = 0x0fca8Fdb0FB115A33BAadEc6e7A141FFC1bC7d5a;
    address public owner; 
    address[] public singleBounties;
    address[] public multiBounties;

    function tokenAddress() public view returns (address){
        return token;
    }
    
    constructor() public {
        owner = msg.sender;
    }

    enum BountyTypes {
        Single,Multi
    }
    
    event Create(address BountyContract, BountyTypes Type);
    
    function createSingleBounty(address hunter, string memory name, string memory description,uint time, uint amount) public returns(address){
        require(msg.sender==owner);
        SingleBounty B = new SingleBounty(token,hunter,name,description,time); 
        ERC20(token).transferFrom(msg.sender,address(B),amount);
        singleBounties.push(address(B));
        
        emit Create(address(B),BountyTypes.Single);
    }
    
    function createMultiBounty(string memory name, string memory description,uint time, uint amount, uint numBounties) public{
        require(msg.sender==owner);
        MultiBounty M = new MultiBounty(token,name,description,time,numBounties);
        ERC20(token).transferFrom(msg.sender,address(M),amount*numBounties);
        multiBounties.push(address(M));
        
        emit Create(address(M),BountyTypes.Multi);

    }
    
 
    
    function numSingleBounties() public view returns(uint) {
        return singleBounties.length;
    }
    
     function numMultiBounties() public view returns(uint) {
        return multiBounties.length;
    } 
    
    mapping(address =>bool) ms;

}

contract SingleBounty{
    address public creator;
    address public hunter;

    address token;
    
    string public name;
    string public description;
    uint public deadline;
    
    string public submission;
    
    bool public active; 
    
    event Reward(address Hunter, uint amount);
    event Reclaim(uint amount);
    
    constructor(address _token, address _hunter, string memory _name, string memory _description, uint time) public {
        hunter = _hunter;
        creator = tx.origin;
        token = _token;
        
        
       name = _name;
       description = _description;
       if(time==0){
        deadline = 2**256-1;
       } else {
           deadline = now+time;
       }
        
        active = true;
    }
    
    function submit(string memory _submission) public {
        require(msg.sender==hunter);
        require(now<=deadline);
        submission = _submission;
    }
    
    function reward() public {
        require(msg.sender==creator);
        uint amount = bountyAmount();
        emit Reward(hunter,amount);
        ERC20(token).transfer(hunter,amount);
        active = false;
    }
    
    function bountyAmount() public view returns(uint){
        return(ERC20(token).balanceOf(address(this)));
    }
    
    function reclaim() public {
        require(msg.sender==creator);
        require(now>deadline);
        ERC20(token).transfer(creator,ERC20(token).balanceOf(address(this)));
        active = false;
    }
    
}

contract MultiBounty{
    address public token;
    address public creator;

    struct Submission {
        address hunter;
        string submission;
        bool active;
    }

    Submission[] public submissions;

    string public name;
    string public description;
    uint public deadline;

    uint public remaining;
    
    event Reward(address Hunter, uint amount);
    event Reclaim(uint amount);

    constructor(address _token, string memory _name, string memory _description,  uint time, uint _numBounties) public {
        token = _token;
        creator = tx.origin;
        name = _name;
        description = _description;
        remaining = _numBounties;

        //0 time means no deadline.
        if(time==0){
            deadline = 2**256-1;
        } else {
            deadline = now + time*1 seconds;
        }
    }


    function submit(string memory _submission) public {
        require(now<=deadline);
        Submission memory s = Submission(msg.sender,_submission,true);
        submissions.push(s);
    }

    function reward(uint sID) public {
        require(msg.sender==creator);
        require(submissions[sID].active);
        
        uint amount = bountyAmount();
        address hunter = submissions[sID].hunter;
        emit Reward(hunter,amount);
        ERC20(token).transfer(hunter,amount);

        remaining--;
        submissions[sID].active = false;
        
    }

     function reclaim () public {
        require(msg.sender==creator);
        require(now>deadline);
        uint amount = ERC20(token).balanceOf(address(this));
        emit Reclaim(amount);
        ERC20(token).transfer(creator,amount);
    }

    function bountyAmount() public view returns(uint){
        return(ERC20(token).balanceOf(address(this)))/remaining;
    }

    function numSubmissions() public view returns(uint){
        return submissions.length;
    }

    function active() public view returns(bool){
        // return(remaining>0&&now<=deadline); //correct 

        return(remaining>0||now<=deadline);
    }
}

