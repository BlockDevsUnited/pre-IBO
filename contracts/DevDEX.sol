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
  function decimals() public view returns (uint);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract orderLevel {
    //          n/d wei = 1 token
    uint public n; //numerator
    uint public d; //denominator
    uint public rT; //token remainder (out of n)
    uint public rW; //wei remainder (out of d)

    address public token;
    address public ob; //orderbook address

    uint public totalTokensOnSale;
    address public admin;

    struct order{
        uint traderIndex;
        uint amount;
    }

    order[] public orders;
    uint public o; //orderIndex

    //address token, uint price,uint priceDenominator
    constructor(uint _n, uint _d, address _token) public {
        n = _n;
        d = _d;
        token = _token;
        ob = msg.sender;
        admin = tx.origin;
        maxLoops = 100;
    }

    function () external payable{
        uint traderIndex = orderbook(ob).getTraderIndex(msg.sender);
        _buy(traderIndex,msg.value);
    }

    function buy () public payable{
        uint traderIndex = orderbook(ob).getTraderIndex(msg.sender);
        _buy(traderIndex,msg.value);
    }

    function _buy(uint buyerIndex, uint amountWei) internal {
        address payable buyer = orderbook(ob).getTrader(buyerIndex);

        uint amountTokens = amountWei*d + rT;
        rT = amountTokens%n;
        amountTokens = amountTokens/n;

        if(totalTokensOnSale*n<d){
            amountTokens-=totalTokensOnSale;
            transferTokens(buyer,totalTokensOnSale);
            totalTokensOnSale = 0;
            pushOrder(buyerIndex,amountTokens);
        } else if(amountTokens>0) {
            address payable trader;
            uint loops;
            uint WeiSold;
            while(o!=orders.length && loops<maxLoops && amountWei>=WeiSold+orders[o].amount){
                WeiSold += orders[o].amount;
                trader = orderbook(ob).getTrader(orders[o].traderIndex);
                trader.transfer(orders[o].amount);
                o++;
                loops++;
            }
            amountWei-= WeiSold;
            if(o==orders.length){
                amountTokens -= totalTokensOnSale;
                transferTokens(buyer,totalTokensOnSale);
                totalTokensOnSale=0;
                pushOrder(buyerIndex,amountTokens);
                delete orders;
                o=0;
            } else if (loops==maxLoops){
                uint originalAmountTokens = amountTokens*n + rT;

                amountTokens = originalAmountTokens-amountWei*d;
                rT = amountTokens%n;
                amountTokens = amountTokens/n;

                transferTokens(buyer,amountTokens);
                totalTokensOnSale-=amountTokens;
                buyer.transfer(amountWei);

            } else{
                transferTokens(buyer,amountTokens);
                totalTokensOnSale-=amountTokens;
                trader = orderbook(ob).getTrader(orders[o].traderIndex);
                trader.transfer(amountWei);
                orders[o].amount-=amountWei;
            }
        }
    }

    function sell(uint sellerIndex, uint amountTokens) public {
        require(msg.sender==ob || msg.sender==address(this),"not called by orderbook contract");

        address payable seller = orderbook(ob).getTrader(sellerIndex);

        uint amountWei = amountTokens*n + rW;
        rW = amountWei%d;
        amountWei = amountWei/d;

        uint weiBalance = weiBalance();

        if (weiBalance*d<n){
            seller.transfer(weiBalance);
            amountWei-=weiBalance;
            pushOrder(sellerIndex,amountWei);
            totalTokensOnSale+=amountTokens;
        } else if (amountWei>0){
            address payable trader;
            uint loops;
            uint TokensSold;
            while(o != orders.length  && amountTokens>=TokensSold+orders[o].amount && loops<maxLoops){
                TokensSold += orders[o].amount;
                trader = orderbook(ob).getTrader(orders[o].traderIndex);
                transferTokens(trader,orders[o].amount);
                o++;
                loops++;
            }
            amountTokens -= TokensSold;
            if (orders.length==o){
                seller.transfer(weiBalance);
                amountWei-= weiBalance;
                delete orders;
                o=0;
                totalTokensOnSale += amountTokens;
                pushOrder(sellerIndex,amountWei);
            } else if (loops==maxLoops){
                uint originalAmountWei = amountWei*d + rW;

                amountWei = originalAmountWei-amountTokens*n;
                rW = amountWei%d;
                amountWei = amountWei/d;

                seller.transfer(amountWei);
                transferTokens(seller,amountTokens);

            } else {
                seller.transfer(amountWei);
                trader = orderbook(ob).getTrader(orders[o].traderIndex);
                transferTokens(trader,amountTokens);
                orders[o].amount -= (amountTokens);
            }
        }
    }

    function pushOrder(uint sellerIndex, uint amount) internal{
        if(amount>0){
            orders.push(order(sellerIndex,amount));
        }
    }

    function transferTokens(address recipient,uint amountTokens) internal{
        if(amountTokens>0){
            ERC20(token).transfer(recipient,amountTokens);
        }
    }

    function orderLength() public view returns (uint){
        return orders.length;
    }

    function tokenBalance() public view returns (uint){
        return ERC20(token).balanceOf(address(this));
    }

    function weiBalance() public view returns (uint){
        return address(this).balance;
    }

    function returnExtraTokens() public {
        ERC20(token).transfer(admin,tokenBalance()-totalTokensOnSale);
    }

    uint public maxLoops;
    function setMaxLoops(uint _maxLoops) public {
        require(msg.sender==ob);
        maxLoops= _maxLoops;
    }


}

contract orderbook{
    address public admin;
    mapping(uint=>address payable) public orderLevels;
    uint public numOrderLevels;

    address public token = 0xd0479a5174A474B0d0F7709DbFCD210fe2B39143;

    constructor() public {
        admin = msg.sender;
        traderList.push(address(0));
    }

    mapping (address=>uint) public traders;
    address payable[] public traderList;

    function getTrader(uint traderIndex) public view returns (address payable){
        return traderList[traderIndex];
    }

    function getTraderIndex(address payable trader) public returns(uint){
        if(traders[trader]==0){
            traders[trader] = traderList.length;
            traderList.push(trader);
        }
        return traders[trader];
    }

    function sell(uint ol,uint amountTokens) public {
        ERC20(token).transferFrom(msg.sender,orderLevels[ol],amountTokens);
        uint traderIndex = getTraderIndex(msg.sender);
        orderLevel(orderLevels[ol]).sell(traderIndex,amountTokens);
    }

    function addOrderLevel(uint n, uint d) public {
        require(admin==msg.sender);
        orderLevel oL = new orderLevel(n,d,token);
        orderLevels[numOrderLevels] = address(oL);
        numOrderLevels++;
    }

    function setMaxLoops(uint ol, uint _maxLoops) public{
        require(admin==msg.sender);
        orderLevel(orderLevels[ol]).setMaxLoops(_maxLoops);
    }
}
