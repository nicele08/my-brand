import validateName from "./functions/validateName.js";
import validateEmail from "./functions/validateEmail.js";
import validateMessage from "./functions/validateMessage.js";

const name = document.getElementsByName("name")[0];
const email = document.getElementsByName("email")[0];
const message = document.getElementsByName("message")[0];
const submit = document.getElementById("send-button");
const err = document.getElementsByClassName("error");

submit.onclick = function(){
    let passValidation = true;

    if(!validateName(name, err[0])){
        passValidation = false;
    }

    if(!validateEmail(email, err[1])){
        passValidation = false;
    }

    if(!validateMessage(message, err[2])){
        passValidation = false;
    }

    return passValidation;
}