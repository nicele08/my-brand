import validateEmail from "./functions/validateEmail.js";
import validateMessage from "./functions/validateMessage.js";
import validateName from "./functions/validateName.js";
const saveBtn = document.getElementById("save-button");
const err = document.getElementsByClassName("error");
const name = document.getElementById("name");
const email = document.getElementById("email")
const message = document.getElementById("content");
const modal = document.getElementById("pop-modal");
const title = document.getElementById("title");

saveBtn.onclick = function(){

    let nameValid = validateName(name, err[0]);
    let emailValid = validateEmail(email, err[1]);
    let messageValid = validateMessage(message, err[2]);
    
    if(nameValid == true &&
         emailValid == true &&
         messageValid == true){
             title.textContent = name.value;
             modal.style.display = "block";
    }
    return false;
}
