function addSingle(){
  let bountyName = document.getElementById("bountyNameSingle").value
  let bountyDescription = document.getElementById("bountyNameSingle").value
  let bountyHunter = document.getElementById("bountyHunterSingle").value

  let bountyAmount = document.getElementById("bountyNameSingle").value
  //let bountyDeadline = document.getElementById("timeIntervalInputSingle").value
  addRow("Single",bountyName,bountyDescription,bountyHunter,1,bountyAmount)

}

function addMulti(){
  let bountyName = document.getElementById("bountyNameMulti").value
  let bountyDescription = document.getElementById("bountyNameMulti").value
  let bountyNum = document.getElementById("bountyNameMulti").value
  let bountyAmount = document.getElementById("bountyNameMulti").value
  addRow("Multi",bountyName,bountyDescription,"Any",bountyNum,bountyAmount)
}

function addRow(Type,Name,Description,Hunter,bountyNum,bountyAmount){
      table=document.getElementById("milestonesTable");
      row=document.createElement("tr");

      CreatorCell = document.createElement("td");
      TypeCell = document.createElement("td");
      NameCell = document.createElement("td");
      DescriptionCell = document.createElement("td");
      HunterCell = document.createElement("td");
      bountyNumCell = document.createElement("td");
      bountyAmountCell  = document.createElement("td");

      Creatortextnode = document.createTextNode("0x00D606D54fA0dD4172f09583E0c338E30da9FF6b");
      Typetextnode = document.createTextNode(Type);
      Nametextnode = document.createTextNode(Name);
      Descriptiontextnode = document.createTextNode(Description);
      Huntertextnode = document.createTextNode(Hunter);
      bountyNumtextnode = document.createTextNode(bountyNum);
      bountyAmounttextnode = document.createTextNode(bountyAmount);

      CreatorCell.appendChild(Creatortextnode);
      TypeCell.appendChild(Typetextnode);
      NameCell.appendChild(Nametextnode);
      DescriptionCell.appendChild(Descriptiontextnode)
      HunterCell.appendChild(Huntertextnode)
      bountyNumCell.appendChild(bountyNumtextnode)
      bountyAmountCell.appendChild(bountyAmounttextnode)

      row.appendChild(CreatorCell);
      row.appendChild(TypeCell);
      row.appendChild(NameCell);
      row.appendChild(DescriptionCell);
      row.appendChild(HunterCell);
      row.appendChild(bountyAmountCell);
      row.appendChild(bountyNumCell);


      table.appendChild(row);
}
