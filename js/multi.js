
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

  await uBCContract.createMultiBounty(name,description,time,amount,numBounties,overrides)
}


function updateCreatorManager(){
  console.log("updateCreatorManager")
  var bountyId = document.getElementById("BountySelect").value

  if (bountyId==""){return}
  console.log(multiBounties)
  document.getElementById("creatorLabel").innerHTML = "Creator: " + multiBounties[bountyId].creator
  document.getElementById("nameLabel").innerHTML = "Name: " + multiBounties[bountyId].name
  document.getElementById("descriptionLabel").innerHTML = "Description: " + multiBounties[bountyId].description
  document.getElementById("amountLabel").innerHTML = "Amount: " + multiBounties[bountyId].amount + " " + tokenSymbol
  document.getElementById("remainingLabel").innerHTML = "Num Left: " + multiBounties[bountyId].remaining
  document.getElementById("deadlineLabel").innerHTML = "Deadline: " + multiBounties[bountyId].deadline
  populateSubmissionsSelect(bountyId);
  updateSubmissionManager(bountyId)


}

function updateSubmissionManager(){
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
  for (let j = 0; j<multiBounties.length;j++){
    if(multiBounties[j].creator==signer._address && multiBounties[j].active==true){
      var opt = document.createElement("option");
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
  console.log(bountyId)
  let sumbissions = multiBounties[bountyId].sumbissions;
  let numSubmissions = sumbissions.length;
  console.log(numSubmissions)
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
