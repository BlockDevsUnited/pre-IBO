let signer;

let numUbounties
let ubounties;
let creatorList
let hunterList
let bCList
let bountyBalances

let tokenAddress = "0x0fca8Fdb0FB115A33BAadEc6e7A141FFC1bC7d5a"//"0xD021315678991ee801655C75101986200f0a011D"////;
let tokenABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "sender",
				"type": "address"
			},
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "addedValue",
				"type": "uint256"
			}
		],
		"name": "increaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "spender",
				"type": "address"
			},
			{
				"name": "subtractedValue",
				"type": "uint256"
			}
		],
		"name": "decreaseAllowance",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "recipient",
				"type": "address"
			},
			{
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "owner",
				"type": "address"
			},
			{
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	}
]
let tokenContract;

//uBountyCreator
let uBCAddress = "0xab3A3f3Df683513De7d060a045A01a13b811F422"//"0x1b111DB39178adC3Facf848f524dE18E0Ae427dE"
let uBCABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "numBC",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "freeBC",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmissionString",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "creatorList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint8",
				"name": "numLeft",
				"type": "uint8"
			},
			{
				"internalType": "bytes32",
				"name": "infoHash",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "hunter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "createUbounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			}
		],
		"name": "bountyAmount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			}
		],
		"name": "reclaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmitter",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "arbitrators",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "ubounties",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "numLeft",
				"type": "uint8"
			},
			{
				"internalType": "uint8",
				"name": "numSubmissions",
				"type": "uint8"
			},
			{
				"internalType": "uint32",
				"name": "hunterIndex",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "creatorIndex",
				"type": "uint32"
			},
			{
				"internalType": "uint32",
				"name": "bountyChestIndex",
				"type": "uint32"
			},
			{
				"internalType": "uint48",
				"name": "deadline",
				"type": "uint48"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "bytes32",
				"name": "infoHash",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "hunter",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "createSingleBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_fee",
				"type": "uint256"
			}
		],
		"name": "setFee",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numHunters",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "submissionString",
				"type": "string"
			}
		],
		"name": "submitString",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bCList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "description",
				"type": "string"
			},
			{
				"internalType": "uint8",
				"name": "numLeft",
				"type": "uint8"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "createMultiBounty",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "bytes32",
				"name": "submissionHash",
				"type": "bytes32"
			}
		],
		"name": "submitHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "creators",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "getSubmissionHash",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numUbounties",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "arbitratorList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ubountyIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "reward",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "hunterList",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "hunters",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numArbitrators",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "fee",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "devcash",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "createBountyChest",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numCreators",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			}
		],
		"name": "created",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "submitted",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "submissionIndex",
				"type": "uint256"
			}
		],
		"name": "rewarded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "uBountyIndex",
				"type": "uint256"
			}
		],
		"name": "reclaimed",
		"type": "event"
	}
]
let uBCContract
let overrides;

let bcABI = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}] //Bounty Chest ABI

let tokenName;
let tokenSymbol;
let tokenDecimals;

let orderbookABI = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "n",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "d",
				"type": "uint256"
			}
		],
		"name": "addOrderLevel",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "traders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orderLevels",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "numOrderLevels",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ol",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_maxLoops",
				"type": "uint256"
			}
		],
		"name": "setMaxLoops",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "traderIndex",
				"type": "uint256"
			}
		],
		"name": "getTrader",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "traderList",
		"outputs": [
			{
				"internalType": "address payable",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "ol",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountTokens",
				"type": "uint256"
			}
		],
		"name": "sell",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "trader",
				"type": "address"
			}
		],
		"name": "getTraderIndex",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
let orderbookAddress = "0xb46fB379705414036E4212AA88554f53dAeA6F05"//"0x363F60A48D0eAFFa565AD8F6E4AB9c5Ac56C6CbC"//""//
let orderbookContract

let OLABI = [
	{
		"constant": true,
		"inputs": [],
		"name": "ob",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "orderLength",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rT",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "weiBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "n",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "rW",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "maxLoops",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "o",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "totalTokensOnSale",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "d",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "tokenBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "buy",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "orders",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "traderIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "sellerIndex",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "amountTokens",
				"type": "uint256"
			}
		],
		"name": "sell",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "returnExtraTokens",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_maxLoops",
				"type": "uint256"
			}
		],
		"name": "setMaxLoops",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "token",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_n",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_d",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "_token",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"payable": true,
		"stateMutability": "payable",
		"type": "fallback"
	}
] //orderLevel ABI
let orderLevels

async function initializeAdmin(web3){
	await initialize(web3)
	await populateOLTable()
}

async function initializeDEX(web3){
	await initialize(web3)
	await getBalance()
	await getApprovedDEX()
	await populateOLTable()
	await populateBuySellSelects()
}

async function initializeCreator(web3){
	console.log("initializeCreator")
	await initialize(web3)
	await getBalance()
	await getApproved()

		populateCreatorSelect();
		updateCreatorManager();
	}

async function initializeHunter() {
	console.log("initializeHunter")
	await initialize(web3)
	await getBalance()
	await getApproved()

		updateHunterManager();
	}

async function initialize(web3){
	ethereum.enable()

	provider = new ethers.providers.Web3Provider(web3.currentProvider);

	utils = ethers.utils;

	let accounts = await provider.listAccounts()

	signer = provider.getSigner(accounts[0]);

	tokenContract = new ethers.Contract(tokenAddress,tokenABI,signer)

	tokenName = await tokenContract.name()
	tokenSymbol = await tokenContract.symbol()
	tokenDecimals = await tokenContract.decimals()

	uBCContract = new ethers.Contract(uBCAddress,uBCABI,signer)

	orderbookContract = new ethers.Contract(orderbookAddress,orderbookABI,signer)

	overrides = {}

	await getBountyData()

	await getDEXData()
}

async function setWebsite() {
  let website = document.getElementById("websiteInput").value;
  await contract.setWebsite(website);
}

async function getBalance(){
  let balance = await tokenContract.balanceOf(signer._address)
	balance = ethers.utils.formatUnits(balance,tokenDecimals)
	balance = ethers.utils.commify(balance)
  document.getElementById("balanceLabel").innerHTML = "Balance: " + balance + " " + tokenSymbol
}

async function getApproved(){
	let approved = await tokenContract.allowance(signer._address, uBCAddress)
	approved = ethers.utils.formatUnits(approved,tokenDecimals)
	approved = ethers.utils.commify(approved)
	console.log(signer._address)
	console.log(uBCAddress)
	console.log(approved)
	document.getElementById("approvedLabel").innerHTML = "Approved: " + approved + " " + tokenSymbol

}

async function getBountyData() {
	ubounties = new Array()
	let numUBounties = await uBCContract.numUbounties()
	for(let o=0;o<numUBounties;o++){

		let ubounty = await uBCContract.ubounties(o)
		let submissions = new Array()

		for(let n=0;n<ubounty.numSubmissions;n++){
			submission = new Object()
			submission.submissionString = await uBCContract.getSubmissionString(o,n)
			submission.submissionHash = await uBCContract.getSubmissionHash(o,n)
			let submitterIndex = await uBCContract.getSubmitter(o,n)
			submission.submitter = await uBCContract.hunterList(submitterIndex)
			submissions.push(submission)
	}

	ubounty.submissions = submissions
	ubounty.hunter = await uBCContract.hunterList(ubounty.hunterIndex)
	// ubounty.submissionStrings = submissionStrings
	// ubounty.submissionHashes = submissionHashes

	if(o==0){
		ubounties.push(ubounty)
	}
	ubounties.push(ubounty)

}

	creatorList = new Array()
	let numCreators = await uBCContract.numCreators()
	for(let p=0;p<numCreators;p++){
		let creator = await uBCContract.creatorList(p)
		creatorList.push(creator)
	}

	hunterList = new Array()
	let numHunters = await uBCContract.numHunters()
	for(let q=0;q<numHunters;q++){
		let hunter = await uBCContract.hunterList(q)
		hunterList.push(hunter)
	}

	bCList = new Array()
	bountyBalances = new Array()
	let numBC = await uBCContract.numBC()
	for(let r=0;r<numBC;r++){
		let bc = await uBCContract.bCList(r)
		let tokenBalance = await tokenContract.balanceOf(bc)
		tokenBalance = utils.formatUnits(tokenBalance,tokenDecimals)
		tokenBalance = utils.commify(tokenBalance)
		tokenBalance += " DEV"

		let balanceLink = document.createElement("a")
		balanceLink.innerText = tokenBalance
		balanceLink.href = "https://ropsten.etherscan.io/address/" + bc

		bountyBalances.push(balanceLink)
		bCList.push(bc)
	}



}

async function getDEXData(){
	console.log("getDEXData")
	orderLevels = new Array()
	let numOrderLevels = await orderbookContract.numOrderLevels()
	for(let o=0;o<numOrderLevels;o++){
		let OL = new Object()
		OL.address = await orderbookContract.orderLevels(o)
		OL.contract = new ethers.Contract(OL.address,OLABI,signer)
		let n = await OL.contract.n()
		let d = await OL.contract.d()
		let weiPerEth = utils.bigNumberify("1000000000000000000")
		let ten = utils.bigNumberify(10)
		let price = (n.mul(ten.pow(tokenDecimals))).div(d)
		price = utils.formatUnits(price,18)
		OL.price = price
		orderLevels.push(OL)
		let tokenBalance = await OL.contract.tokenBalance()

		let weiBalance = await OL.contract.weiBalance()

		OL.tokenBalance = ethers.utils.formatUnits(tokenBalance,tokenDecimals)
		OL.ethBalance = ethers.utils.formatUnits(weiBalance,18)
	}
}

async function approve() {
  let amount = document.getElementById("approveAmount").value;
  amount = ethers.utils.parseUnits(amount, tokenDecimals)
  await tokenContract.approve(uBCAddress,amount)
}

async function contribute() {
  let amount = document.getElementById("contributeAmount").value
  console.log(amount)
  amount = ethers.utils.parseUnits(amount,tokenDecimals);
  let bountyId = document.getElementById("BountySelect").value;
  let bountyAddress = await uBCContract.singleBounties(bountyId)
  await tokenContract.transfer(bountyAddress,amount,overrides)
}
