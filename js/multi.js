
async function create() {
  console.log("Create")
  let name = document.getElementById("bountyName").value
  let description = document.getElementById("bountyDescription").value
  let numBounties = document.getElementById("bountyNum").value
  let amount = document.getElementById("bountyAmount").value
  amount = ethers.utils.parseUnits(amount,tokenDecimals)
  let e = document.getElementById("timeframeSelect");
var timeFrame = e.options[e.selectedIndex].value;
  let time = document.getElementById("timeIntervalInput").value*timeFrame;
  console.log(name,description,numBounties,time,amount)

  await uBCContract.createMultiBounty(name,description,numBounties,amount)
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

  document.getElementById("amountLabel").innerHTML = "Amount: "

  document.getElementById("nameLabel").innerHTML = "Name: " + ubounties[bountyId].name
  document.getElementById("descriptionLabel").innerHTML = "Description: " + ubounties[bountyId].description
  document.getElementById("amountLabel").appendChild(bountyBalances[bountyId])
  document.getElementById("remaining").innerHTML = "Remaining: " + ubounties[bountyId].numLeft

  //document.getElementById("submissionLabel").innerHTML = "Submission: " + ubounties[bountyId].submissionStrings[ubounties[bountyId].numSubmissions-1]
  document.getElementById("deadlineLabel").innerHTML = "Deadline: none"

  populateSubmissionsSelect(bountyId);
  updateSubmissionManager(bountyId)




}

function updateSubmissionManager(){
  console.log("updateSubmissionManager")
  var bountyId = document.getElementById("BountySelect").value
  console.log(multiBounties[bountyId].sumbissions.length)
  if(multiBounties[bountyId].sumbissions.length==0){return}
  var submissionId = document.getElementById("submissionSelect").value
  document.getElementById("hunterLabel").innerHTML = "Hunter: " + multiBounties[bountyId].sumbissions[submissionId].hunter
  document.getElementById("submissionLabel").innerHTML = "Submission: " + multiBounties[bountyId].sumbissions[submissionId].submission

}

function updateHunterManager() {
  console.log("updateHunterManager")

  var bountyId = document.getElementById("BountySelect").value
  if (bountyId==""){return}

  document.getElementById("creatorLabel").innerHTML = "Creator: " + multiBounties[bountyId].creator
  document.getElementById("nameLabel").innerHTML = "Name: " + multiBounties[bountyId].name
  document.getElementById("descriptionLabel").innerHTML = "Description: " + multiBounties[bountyId].description
  document.getElementById("amountLabel").innerHTML = "Amount: " + multiBounties[bountyId].amount + " " + tokenSymbol
  document.getElementById("remainingLabel").innerHTML = "Num Left: " + multiBounties[bountyId].remaining
  document.getElementById("deadlineLabel").innerHTML = "Deadline: " + multiBounties[bountyId].deadline

}

function populateCreatorSelect(){
  console.log("populateCreatorSelect Multi")
  for (let j = 1; j<ubounties.length;j++){
    if(creatorList[ubounties[j].creatorIndex]==signer._address && ubounties[j].hunterIndex==0 && ubounties[j].numLeft!=0){
      var opt = document.createElement("option");
      console.log(j)
     opt.value= j;
     opt.innerHTML = j; // whatever property it has

     // then append it to the select element
     document.getElementById("BountySelect").appendChild(opt);
   }
 }
}

function populateHunterSelect(){
  console.log("populateHunterSelect")
  for (let j = 0; j<multiBounties.length;j++){

     if(multiBounties[j].active==true){
       var opt = document.createElement("option");
       opt.value= j;
       opt.innerHTML = j; // whatever property it has

       // then append it to the select element
       document.getElementById("BountySelect").appendChild(opt);
   }
 }
}

function populateSubmissionsSelect(bountyId) {
  console.log("populateSubmissionsSelect")
  let sumbissions = ubounties[bountyId].submissionStrings;
  let numSubmissions = sumbissions.length;
  for (let j = 0;j<numSubmissions;j++){
    let s = sumbissions[j]
    if(s.active){
      let hunter = s.hunter;
      let submission = s.submission
      console.log(hunter,submission)

      var opt = document.createElement("option");
      opt.value= j;
      opt.innerHTML = j; // whatever property it has

      // then append it to the select element
      document.getElementById("submissionSelect").appendChild(opt);
    }
    console.log(j)
  }
}

async function contribute() {
  console.log("contribute");
  let amount = document.getElementById("contributeAmount").value
  console.log(amount)
  amount = ethers.utils.parseUnits(amount,tokenDecimals);
  let bountyId = document.getElementById("BountySelect").value;
  let bountyAddress = await uBCContract.singleBounties(bountyId)
  await tokenContract.transfer(bountyAddress,amount,overrides)
}

async function submit() {
  console.log("submit")
  let submission = document.getElementById("submission").value
  let bountyId = document.getElementById("BountySelect").value;
  let bountyAddress = await uBCContract.multiBounties(bountyId)
  let bountyContract = new ethers.Contract(bountyAddress,sABI,signer)
  await bountyContract.submit(submission,overrides)
}

async function reward(){
  let bountyId = document.getElementById("BountySelect").value;
  let sId = document.getElementById("submissionSelect").value
  let bountyAddress = await uBCContract.multiBounties(bountyId)
  let bountyContract = new ethers.Contract(bountyAddress,mABI,signer)
  await bountyContract.reward(sId)
}
