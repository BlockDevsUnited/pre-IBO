async function addOrderLevel(){
  console.log(ethers)
  let n = document.getElementById("n").value
  let d = document.getElementById("d").value


  await orderbookContract.addOrderLevel(n,d)
}
