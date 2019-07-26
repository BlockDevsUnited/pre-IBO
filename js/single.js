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

  await uBCContract.createSingleBounty(hunter,name,description,time,amount,overrides)
}


function updateCreatorManager(){
  console.log("updateCreatorManager")
  var bountyId = document.getElementById("BountySelect").value
  if (bountyId==""){return}

  document.getElementById("creatorLabel").innerHTML = "Creator: " + singleBounties[bountyId].creator
  document.getElementById("hunterLabel").innerHTML = "Hunter: " + singleBounties[bountyId].hunter

  document.getElementById("nameLabel").innerHTML = "Name: " + singleBounties[bountyId].name
  document.getElementById("descriptionLabel").innerHTML = "Description: " + singleBounties[bountyId].description
  document.getElementById("amountLabel").innerHTML = "Amount: " + singleBounties[bountyId].amount + " " + tokenSymbol
  document.getElementById("submissionLabel").innerHTML = "Submission: " + singleBounties[bountyId].submission
  document.getElementById("deadlineLabel").innerHTML = "Deadline: " + singleBounties[bountyId].deadline
}

function updateHunterManager() {
  console.log("updateHunterManager")

  var bountyId = document.getElementById("BountySelect").value

  if (bountyId==""){return}

  var bountyId = document.getElementById("BountySelect").value
  document.getElementById("creatorLabel").innerHTML = "Creator: " + singleBounties[bountyId].creator
  document.getElementById("nameLabel").innerHTML = "Name: " + singleBounties[bountyId].name
  document.getElementById("descriptionLabel").innerHTML = "Description: " + singleBounties[bountyId].description
  document.getElementById("amountLabel").innerHTML = "Amount: " + singleBounties[bountyId].amount + " " + tokenSymbol
  document.getElementById("submissionLabel").innerHTML = "Submission: " + singleBounties[bountyId].submission
  document.getElementById("deadlineLabel").innerHTML = "Deadline: " + singleBounties[bountyId].deadline

}

function populateCreatorSelect(){
  console.log("populateCreatorSelect")
  for (let j = 0; j<singleBounties.length;j++){
    if(singleBounties[j].creator==signer._address && singleBounties[j].active==true){
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
  for (let j = 0; j<singleBounties.length;j++){

     if(singleBounties[j].hunter==signer._address && singleBounties[j].active==true){
       var opt = document.createElement("option");
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
  let bountyId = document.getElementById("BountySelect").value;
  let bountyAddress = await uBCContract.singleBounties(bountyId)
  let bountyContract = new ethers.Contract(bountyAddress,sABI,signer)
  await bountyContract.reward(overrides)
}
