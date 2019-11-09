pragma solidity ^0.5.11;

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

contract ERC20Approve {
 function approve(address spender, uint256 value) public returns (bool);
}

contract bountyChest{
    constructor () public {
        ERC20Approve(0xD021315678991ee801655C75101986200f0a011D).approve(msg.sender,2**256-1);
    }
}

contract ubountyCreator{

    event created(uint uBountyIndex);
    event submitted(uint uBountyIndex, uint submissionIndex);
    event rewarded(uint uBountyIndex, uint submissionIndex);
    event reclaimed(uint uBountyIndex);

    address public devcash = 0xD021315678991ee801655C75101986200f0a011D;
    address public admin;
    uint fee = 10000000;

    struct submission{
        uint32 submitterIndex;
        string submissionString;
        bytes32 submissionHash;
    }

    struct ubounty{
        uint8 numLeft;
        uint8 numSubmissions;
        uint32 hunterIndex;
        uint32 creatorIndex;
        uint32 bountyChestIndex;
        uint48 deadline;
        string name;
        string description;
        bytes32 infoHash;
        mapping(uint => submission) submissions;
    }

    function getSubmissionString(uint ubountyIndex, uint submissionIndex) public view returns(string memory) {
        return ubounties[ubountyIndex].submissions[submissionIndex].submissionString;
    }

    function getSubmissionHash(uint ubountyIndex, uint submissionIndex) public view returns(bytes32) {
        return ubounties[ubountyIndex].submissions[submissionIndex].submissionHash;
    }

    mapping(address=>uint32) bountyChests;
    address[] public bCList; //list of bounty chest addresses
    uint[] public freeBC; // list of unused bounty chests
    function numBC() public view returns(uint){
        return bCList.length;
    }

    mapping(address => uint32) public creators;
    address[] public creatorList;
    function numCreators() public view returns(uint){
        return creatorList.length;
    }


    mapping(address => uint32) public hunters;
    address[] public hunterList;
    function numHunters() public view returns(uint){
        return hunterList.length;
    }

    mapping(address => uint32) public arbitrators;
    address[] public arbitratorList;
    function numArbitrators() public view returns(uint){
        return arbitratorList.length;
    }

    mapping(uint => ubounty) public ubounties;
    uint public numUbounties;

    constructor() public {
        admin = msg.sender;
        hunterList.push(address(0));
        creatorList.push(address(0));
        arbitratorList.push(address(0));
        bCList.push(address(0));
    }

    function createUbounty(
        uint8 numLeft,
        bytes32 infoHash,
        address hunter,
        uint amount) public {

            if (creators[msg.sender]==0){
                creators[msg.sender] = uint32(creatorList.length);
                creatorList.push(msg.sender);
            }

            if (hunters[hunter]==0){
                hunters[hunter] = uint32(hunterList.length);
                hunterList.push(hunter);
            }

            address bCAddress;
            if (freeBC.length>0){
                bCAddress = bCList[freeBC[freeBC.length-1]];
                freeBC.length--;
            } else{
                bountyChest C = new bountyChest();
                bCAddress = address(C);
                bountyChests[bCAddress] = uint32(bCList.length);
                bCList.push(bCAddress);
            }

            ubounties[numUbounties].creatorIndex = creators[msg.sender];
            ubounties[numUbounties].hunterIndex = hunters[hunter];
            ubounties[numUbounties].numLeft = numLeft;
            ubounties[numUbounties].infoHash = infoHash;
            ubounties[numUbounties].bountyChestIndex = bountyChests[bCAddress];
            ubounties[numUbounties].deadline = 2**48-1;

            ERC20(devcash).transferFrom(msg.sender,bCAddress,amount);
            ERC20(devcash).transferFrom(msg.sender,admin,fee);
            emit created(numUbounties++);
        }

    function createSingleBounty(
        string memory name,
        string memory description,
        address hunter,
        uint amount
        ) public{

            if (creators[msg.sender]==0){
                creators[msg.sender] = uint32(creatorList.length);
                creatorList.push(msg.sender);
            }

            if(hunters[hunter]==0){
                hunters[hunter] = uint32(hunterList.length);
                hunterList.push(hunter);
            }

            address bCAddress;
            if (freeBC.length>0){
                bCAddress = bCList[freeBC[freeBC.length-1]];
                freeBC.length--;
            } else{
                bountyChest C = new bountyChest();
                bCAddress = address(C);
                bountyChests[bCAddress] = uint32(bCList.length);
                bCList.push(bCAddress);
            }

            ubounties[numUbounties].creatorIndex = creators[msg.sender];
            ubounties[numUbounties].hunterIndex = hunters[hunter];
            ubounties[numUbounties].numLeft = 1;
            ubounties[numUbounties].name = name;
            ubounties[numUbounties].description = description;
            ubounties[numUbounties].bountyChestIndex = bountyChests[bCAddress];
            ubounties[numUbounties].deadline = 2**48-1;

            ERC20(devcash).transferFrom(msg.sender,bCAddress,amount);
            ERC20(devcash).transferFrom(msg.sender,admin,fee);
            emit created(numUbounties++);
    }

    function createMultiBounty(
        string memory name,
        string memory description,
        uint8 numLeft,
        uint amount
        ) public{

            if (creators[msg.sender]==0){
                creators[msg.sender] = uint32(creatorList.length);
                creatorList.push(msg.sender);
            }

            address bCAddress;
            if (freeBC.length>0){
                bCAddress = bCList[freeBC[freeBC.length-1]];
                freeBC.length--;
            } else{
                bountyChest C = new bountyChest();
                bCAddress = address(C);
                bountyChests[bCAddress] = uint32(bCList.length);
                bCList.push(bCAddress);
            }

            ubounties[numUbounties].creatorIndex = creators[msg.sender];
            ubounties[numUbounties].numLeft = numLeft;
            ubounties[numUbounties].name = name;
            ubounties[numUbounties].description = description;
            ubounties[numUbounties].bountyChestIndex = bountyChests[bCAddress];
            ubounties[numUbounties].deadline = 2**48-1;

            ERC20(devcash).transferFrom(msg.sender,bCAddress,amount);
            ERC20(devcash).transferFrom(msg.sender,admin,fee);
            emit created(numUbounties++);
    }

    function submitString(uint ubountyIndex, string memory submissionString) public {
        require(ubounties[ubountyIndex].hunterIndex==0 || msg.sender==hunterList[ubounties[ubountyIndex].hunterIndex],"You are not the bounty hunter");
        require(now<=ubounties[ubountyIndex].deadline,"The bounty deadline has passed");

         if(hunters[msg.sender]==0){
                hunters[msg.sender] = uint32(hunterList.length);
                hunterList.push(msg.sender);
            }

        ubounties[ubountyIndex].submissions[ubounties[ubountyIndex].numSubmissions].submissionString = submissionString;
        ubounties[ubountyIndex].submissions[ubounties[ubountyIndex].numSubmissions].submitterIndex = hunters[msg.sender];

        emit submitted(ubountyIndex,ubounties[ubountyIndex].numSubmissions++);
    }

    function submitHash(uint ubountyIndex, bytes32 submissionHash) public {
        require(ubounties[ubountyIndex].hunterIndex==0 || msg.sender==hunterList[ubounties[ubountyIndex].hunterIndex],"You are not the bounty hunter");
        require(now<=ubounties[ubountyIndex].deadline,"The bounty deadline has passed");

          if(hunters[msg.sender]==0){
                hunters[msg.sender] = uint32(hunterList.length);
                hunterList.push(msg.sender);
            }

        ubounties[ubountyIndex].submissions[ubounties[ubountyIndex].numSubmissions].submissionHash = submissionHash;
        ubounties[ubountyIndex].submissions[ubounties[ubountyIndex].numSubmissions].submitterIndex = hunters[msg.sender];

        emit submitted(ubountyIndex,ubounties[ubountyIndex].numSubmissions++);
    }

    function reward(uint ubountyIndex, uint submissionIndex) public {
        require(creators[msg.sender]==ubounties[ubountyIndex].creatorIndex,"You are not the bounty creator");
        require(ubounties[ubountyIndex].bountyChestIndex!=0,"This bounty is inactive");

        uint rewardAmount = bountyAmount(ubountyIndex)/ubounties[ubountyIndex].numLeft--;
        ERC20(devcash).transferFrom(bCList[ubounties[ubountyIndex].bountyChestIndex],hunterList[ubounties[ubountyIndex].submissions[submissionIndex].submitterIndex],rewardAmount);

        if(ubounties[ubountyIndex].numLeft==0){
            freeBC.push(ubounties[ubountyIndex].bountyChestIndex);
            ubounties[ubountyIndex].bountyChestIndex=0;
            ubounties[ubountyIndex].deadline=0;
        }

        emit rewarded(ubountyIndex,submissionIndex);
    }

    function bountyAmount(uint ubountyIndex) public view returns(uint){
        return(ERC20(devcash).balanceOf(bCList[ubounties[ubountyIndex].bountyChestIndex]));
    }

    function reclaim(uint ubountyIndex) public {
        require(creators[msg.sender]==ubounties[ubountyIndex].creatorIndex);
        require(now>ubounties[ubountyIndex].deadline||ubounties[ubountyIndex].deadline==2**48-1,"The bounty deadline has not yet elapsed");
        require(ubounties[ubountyIndex].bountyChestIndex!=0,"This bounty is inactive");

        ERC20(devcash).transferFrom(bCList[ubounties[ubountyIndex].bountyChestIndex],msg.sender,bountyAmount(ubountyIndex));

        freeBC.push(ubounties[ubountyIndex].bountyChestIndex);
        ubounties[ubountyIndex].bountyChestIndex=0;
        ubounties[ubountyIndex].deadline=0;

        emit reclaimed(ubountyIndex);
    }

    function createBountyChest() public {
        bountyChest C = new bountyChest();
        address bCAddress = address(C);
        bountyChests[bCAddress] = uint32(bCList.length);
        freeBC.push(bCList.length);
        bCList.push(bCAddress);
    }

    function setFee(uint _fee) public {
        require(admin==msg.sender);
        fee = _fee;
    }
}
