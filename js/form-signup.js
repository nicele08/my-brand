import validateName from "./functions/validateName.js";
import validateEmail from "./functions/validateEmail.js";
import { passwordMatch, validatePassword } from "./functions/validatePassword.js";

const name = document.getElementsByName("name");
const email = document.getElementsByName("email")[0];
const message = document.getElementsByName("password")[0];
const submit = document.getElementById("send-button");
const err = document.getElementsByClassName("error");
const password = document.getElementsByName("password");

submit.onclick = function(){
    let passValidation = true;

    if(!validateName(name[0], err[0], "first ")){
        passValidation = false;
    }

    if(!validateName(name[1], err[1], "last ")){
        passValidation = false;
    } 

    if(!validateEmail(email, err[2])){
        passValidation = false;
    }
    
    if(!validateName(name[2], err[3], "user")){
        passValidation = false;
    }

    if(!validatePassword(password[0], err[4])){
        passValidation = false;
    }

    if(!passwordMatch(password[0], password[1], err[5])){
        passValidation = false;
    }

    return passValidation;
} 