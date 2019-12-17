
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
  document.getElementById("amountLabel").innerHTML = bountyBalances[bountyId]
  document.getElementById("remainingLabel").innerHTML = "Remaining: " + ubounties[bountyId].numLeft

  //document.getElementById("submissionLabel").innerHTML = "Submission: " + ubounties[bountyId].submissionStrings[ubounties[bountyId].numSubmissions-1]
  document.getElementById("deadlineLabel").innerHTML = "Deadline: none"

  populateSubmissionsSelect(bountyId);
  updateSubmissionManager(bountyId)




}

function updateSubmissionManager(){
  var bountyId = document.getElementById("BountySelect").value
  if(ubounties[bountyId].numBounties==0){return}
  var submissionId = document.getElementById("submissionSelect").value
  console.log(bountyId)
  console.log(submissionId)
  document.getElementById("hunterLabel").innerHTML = "Hunter: " + ubounties[bountyId].submissions[submissionId].submitter
  document.getElementById("submissionLabel").innerHTML = "Submission: " + ubounties[bountyId].submissions[submissionId].submissionString

}

function updateHunterManager() {
  console.log("updateHunterManager")
  let HunterTable = document.getElementById("HunterTable")
  HunterTable.innerHTML = ""
  for (let j = 1; j<ubounties.length;j++){
    if(ubounties[j].numLeft>0&&ubounties[j].hunterIndex==0){
      console.log(j)




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
      console.log(ubounties[j].bountyChestIndex)
      let amount = bountyBalances[ubounties[j].bountyChestIndex]
      let submission
      if(ubounties[j].numSubmissions>0){
        submission = ubounties[j].submissions[ubounties[j].numSubmissions-1].submissionString
      } else {
        submission = "none"
      }
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

          //  console.log(textnode1);
          // console.log(textnode2);
          //  console.log(textnode3);
          //  console.log(amount);
          //  console.log(textnode5);
          //  console.log(textnode6);
          //  console.log(submissionInput);
          //  console.log(submitButton);

           row.appendChild(cell1);
           row.appendChild(cell2);
           row.appendChild(cell3);
           row.appendChild(cell4);
           row.appendChild(cell5);
           row.appendChild(cell6);
           row.appendChild(cell7);
           row.appendChild(cell8);

           console.log(row)
           HunterTable.appendChild(row);
    }
  }
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
  let submissions = ubounties[bountyId].submissions;
  let numSubmissions = ubounties[bountyId].numSubmissions;
  for (let j = 0;j<numSubmissions;j++){
    let s = submissions[j]

      let submitter = s.submitter;
      let submission = s.submission

      var opt = document.createElement("option");
      opt.value= j;
      opt.innerHTML = j; // whatever property it has

      // then append it to the select element
      document.getElementById("submissionSelect").appendChild(opt);

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
  let bountyId = document.getElementById("BountySelect").value-1;
  let sId = document.getElementById("submissionSelect").value
  await uBCContract.reward(bountyId,sId,overrides);
}

async function submitString(ubountyIndex,submissionString){
  await uBCContract.submitString(ubountyIndex,submissionString)
}
