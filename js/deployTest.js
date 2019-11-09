const ethers = require('ethers')
let abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "reward",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reclaim",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
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
				"internalType": "string",
				"name": "_submission",
				"type": "string"
			}
		],
		"name": "submit",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]
let bytecode = "6080604052348015600f57600080fd5b50604080517fdaea85c5000000000000000000000000000000000000000000000000000000008152336004820152905173B23d84a0A9f370A15f64097a081E80Cf3e38bd359163daea85c5916024808301926000929190829003018186803b158015607957600080fd5b505af4158015608c573d6000803e3d6000fd5b50505050603e80609d6000396000f3fe6080604052600080fdfea265627a7a7231582044be8773174ac7a8dbd9932091f5562566ee966a82e5c1e766218c7da3273ffa64736f6c634300050b0032"

let privateKey = "0x3701D708B2133F8F3913B9B6A578697AE02C0FC3EAAAC33A1CDCD8374BFC5C9B"
let provider = ethers.getDefaultProvider('rinkeby')
let wallet = new ethers.Wallet(privateKey, provider);

deploy()

async function deploy() {
  let factory = new ethers.ContractFactory(abi, bytecode, wallet);

    // Notice we pass in "Hello World" as the parameter to the constructor
    let contract = await factory.deploy();

    // The address the Contract WILL have once mined
    // See: https://ropsten.etherscan.io/address/0x2bd9aaa2953f988153c8629926d22a6a5f69b14e
    console.log(contract.address);
    // "0x2bD9aAa2953F988153c8629926D22A6a5F69b14E"

    // The transaction that was sent to the network to deploy the Contract
    // See: https://ropsten.etherscan.io/tx/0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51
    console.log(contract.deployTransaction.hash);
    // "0x159b76843662a15bd67e482dcfbee55e8e44efad26c5a614245e12a00d4b1a51"

    // The contract is NOT deployed yet; we must wait until it is mined
    await contract.deployed()
}
