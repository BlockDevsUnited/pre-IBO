async function create() {
  let hunter = document.getElementById("bountyHunter").value
  let name = document.getElementById("bountyName").value
  let description = document.getElementById("bountyDescription").value
  let amount = document.getElementById("bountyAmount").value
  amount = ethers.utils.parseUnits(amount,tokenDecimals)
  let e = document.getElementById("timeframeSelect");
var timeFrame = e.options[e.selectedIndex].value;
  let time = document.getElementById("timeIntervalInput").value*timeFrame;
  console.log(hunter,name,description,time,amount)

  await uBCContract.createSingleBounty(name,description,hunter,amount,overrides)
}

function updateCreatorManager(){
  console.log("updateCreatorManager")
  var bountyId = document.getElementById("BountySelect").value
  if (bountyId==""){return}

  let creatorLink = document.createElement("a")
  let creatorLabel = document.getElementById("creatorLabel")
  creatorLabel.innerHTML = "Creator: "
  let creatorAddress = creatorList[ubounties[bountyId].creatorIndex]
  creatorLink.innerText = creatorAddress
  creatorLink.href = "https://ropsten.etherscan.io/address/" + creatorAddress
  creatorLabel.appendChild(creatorLink)


  let hunterLink = document.createElement("a")
  let hunterLabel = document.getElementById("hunterLabel")
  hunterLabel.innerHTML = "Hunter: "
  let hunterAddress = hunterList[ubounties[bountyId].hunterIndex]
  hunterLink.innerText = hunterAddress
  hunterLink.href = "https://ropsten.etherscan.io/address/" + hunterAddress
  hunterLabel.appendChild(hunterLink)

document.getElementById("amountLabel").innerHTML = "Amount: "

  document.getElementById("nameLabel").innerHTML = "Name: " + ubounties[bountyId].name
  document.getElementById("descriptionLabel").innerHTML = "Description: " + ubounties[bountyId].description
  document.getElementById("amountLabel").appendChild(bountyBalances[bountyId])
  document.getElementById("submissionLabel").innerHTML = "Submission: " + ubounties[bountyId].submissions[ubounties[bountyId].numSubmissions-1][1]
  document.getElementById("deadlineLabel").innerHTML = "Deadline: none"
}

function updateHunterManager() {
  console.log("updateHunterManager")

  for (let j = 1; j<ubounties.length;j++){
    if(hunterList[ubounties[j].hunterIndex]==signer._address&&ubounties[j].numLeft>0){
      console.log(j)


    let HunterTable = document.getElementById("HunterTable")
    HunterTable.innerHTML = ""

      let row=document.createElement("tr");
      cell1 = document.createElement("td");
      cell2 = document.createElement("td");
      cell3 = document.createElement("td");
      cell4 = document.createElement("td");
      cell5 = document.createElement("td");
      cell6 = document.createElement("td");
      cell7 = document.createElement("td");
      cell8 = document.createElement("td");

      let creator = creatorList[ubounties[j].creatorIndex]
      let name = ubounties[j].name
      let description = ubounties[j].description
      let amount = bountyBalances[j]
      let submission = ubounties[j].submissions[ubounties[j].numSubmissions-1][1]
      let deadline = "none"

      let submissionInput = document.createElement("input")
      submissionInput.placeholder = "submission..."

      let submitButton = document.createElement("input")
      submitButton.type="button"
      submitButton.value = "submit"
      submitButton.onclick = function () {
                submitString(j-1,submissionInput.value)
            };

           textnode1=document.createTextNode(creator);
           textnode2=document.createTextNode(name);
           textnode3=document.createTextNode(description);
           textnode5=document.createTextNode(submission);
           textnode6=document.createTextNode(deadline);

           cell1.appendChild(textnode1);
           cell2.appendChild(textnode2);
           cell3.appendChild(textnode3);
           cell4.appendChild(amount);
           cell5.appendChild(textnode5);
           cell6.appendChild(textnode6);
           cell7.appendChild(submissionInput);
           cell8.appendChild(submitButton);


           row.appendChild(cell1);
           row.appendChild(cell2);
           row.appendChild(cell3);
           row.appendChild(cell4);
           row.appendChild(cell5);
           row.appendChild(cell6);
           row.appendChild(cell7);
           row.appendChild(cell8);


           HunterTable.appendChild(row);
    }
  }
}

function populateCreatorSelect(){
  console.log("populateCreatorSelect")
  for (let j = 1; j<ubounties.length;j++){
    if(creatorList[ubounties[j].creatorIndex]==signer._address && ubounties[j].hunterIndex!=0 && ubounties[j].numLeft!=0){
      var opt = document.createElement("option");
      console.log(j)
     opt.value= j;
     opt.innerHTML = j; // whatever property it has

     // then append it to the select element
     document.getElementById("BountySelect").appendChild(opt);
   }
 }
}



async function contribute() {
  console.log("contribute")
  let amount = document.getElementById("contributeAmount").value
  console.log(amount)
  amount = ethers.utils.parseUnits(amount,tokenDecimals);
  let bountyId = document.getElementById("BountySelect").value;
  let bountyAddress = await uBCContract.singleBounties(bountyId)
  console.log("contribute",amount)

  await tokenContract.transfer(bountyAddress,amount,overrides)
}

async function submit() {
  let submission = document.getElementById("submission").value
  let bountyId = document.getElementById("BountySelect").value;
  let bountyAddress = await uBCContract.singleBounties(bountyId)
  let bountyContract = new ethers.Contract(bountyAddress,sABI,signer)
  console.log("submit",submission)

  await bountyContract.submit(submission,overrides)
}


async function reward(){
  let bountyId = document.getElementById("BountySelect").value-1;
  let submissionId=(ubounties[bountyId].numSubmissions)-1
  let overrides = {
    gasLimit:400000
  }
  console.log(bountyId,submissionId)
  await uBCContract.reward(bountyId,submissionId,overrides)
}

async function submitString(ubountyIndex,submissionString){
  await uBCContract.submitString(ubountyIndex,submissionString)
}
