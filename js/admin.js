import tickAllCheckboxes from "./functions/check-boxes.js";
import checkedBoxes from "./functions/checkedBoxes.js";
import updateCount from "./functions/updateCount.js";

let deleteElement = document.getElementById("go");
let checkUncheckAll = document.getElementById("check-all");
let modal = document.getElementById("pop-modal");
let number = document.getElementById("message-number");
let select = document.getElementById("select-action");
let checkboxes = document.getElementsByClassName("chk-box");
let countElement = document.getElementById("count");
let totalElement = document.getElementById("total");

let selected = select.value;
let count = checkedBoxes(checkboxes);
totalElement.textContent = checkboxes.length;
countElement.textContent = updateCount(checkboxes);

select.onchange = function(){
    selected = select.value;
}

window.onclick = function(event){
     if(event.target.tagName == "INPUT"){
         count = updateCount(checkboxes);
         countElement.textContent =  count;
         if(count !== checkboxes.length){
            checkUncheckAll.checked = false;
         }else{
             checkUncheckAll.checked = true;
         }        
    }
}

checkUncheckAll.onclick = function(){
    tickAllCheckboxes(checkUncheckAll, checkboxes);
}
deleteElement.onclick = function(){

    if(count > 0 && selected === "delete"){
        number.textContent = `${count}`;
        modal.style.display = "block";
    }

    return false;
}
