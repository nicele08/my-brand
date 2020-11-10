import validateEmail from "./functions/validateEmail.js";
import { passwordMatch, validatePassword } from "./functions/validatePassword.js";


const email = document.getElementsByName("email")[0];
const submit = document.getElementById("send-button");
const err = document.getElementsByClassName("error");
const password = document.getElementsByName("password");

submit.onclick = function(){
    let passValidation = true;

    if(!validateEmail(email, err[0])){
        passValidation = false;
    }
    if(!validatePassword(password[0], err[1])){
        passValidation = false;
    }

    if(!passwordMatch(password[0], password[1], err[2])){
        passValidation = false;
    }

    return passValidation;
} 