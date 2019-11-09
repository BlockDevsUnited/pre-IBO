
async function populateOLTable(){
  let OLTable = document.getElementById("OLTable")
  OLTable.innerHTML = ""
  for(o=0;o<orderLevels.length;o++){

    let row=document.createElement("tr");
    cell1 = document.createElement("td");
    cell2 = document.createElement("td");
    cell3 = document.createElement("td");
    cell4 = document.createElement("td");
    let price = orderLevels[o].price + " ETH"
    let buys = orderLevels[o].ethBalance + " ETH"
    let sells = orderLevels[o].tokenBalance + " " + tokenSymbol
    let address = orderLevels[o].address

    let addressLink = document.createElement("a")
    addressLink.innerText = orderLevels[o].address
    addressLink.href = "https://ropsten.etherscan.io/address/" + orderLevels[o].address
         textnode1=document.createTextNode(price);
         textnode2=document.createTextNode(buys);
         cell1.appendChild(textnode1);
         cell2.appendChild(textnode2);
         textnode3=document.createTextNode(sells);
         cell3.appendChild(textnode3);
         cell4.appendChild(addressLink);
         row.appendChild(cell1);
         row.appendChild(cell2);
         row.appendChild(cell3);
         row.appendChild(cell4);
         OLTable.appendChild(row);
  }
}

async function populateBuySellSelects(){
  console.log("populateBuySellSelect")
  for (let j = 0; j<orderLevels.length;j++){
    var opt = document.createElement("option");
     opt.value= j;
     opt.innerHTML = orderLevels[j].price;
     document.getElementById("buyLevels").appendChild(opt);
   }

 for (let j = 0; j<orderLevels.length;j++){
   var opt = document.createElement("option");
    opt.value= j;
    opt.innerHTML = orderLevels[j].price;
    document.getElementById("sellLevels").appendChild(opt);
  }
}

async function buy() {
  let amount = document.getElementById("buyAmount").value
  let e = document.getElementById("buyLevels");
  var OL = e.options[e.selectedIndex].value;
  console.log(amount)
  console.log(ethers.utils.parseEther(amount.toString()))
  let overrides = {
    value:ethers.utils.parseEther(amount)
  }
  await orderLevels[OL].contract.buy(overrides)
}

async function sell() {
  let amount = document.getElementById("sellAmount").value
  let e = document.getElementById("sellLevels");
  var OL = e.options[e.selectedIndex].value;
  await orderbookContract.sell(OL,ethers.utils.parseUnits(amount,tokenDecimals))
}

async function approveDEX() {
  let amount = document.getElementById("approveAmount").value;
  amount = ethers.utils.parseUnits(amount, tokenDecimals)
  await tokenContract.approve(orderbookAddress,amount)
}

async function getApprovedDEX(){
	let approved = await tokenContract.allowance(signer._address, orderbookAddress)
	approved = ethers.utils.formatUnits(approved,tokenDecimals)
	approved = ethers.utils.commify(approved)
	document.getElementById("approvedLabel").innerHTML = "Approved: " + approved + " " + tokenSymbol

}
