import validateEmail from "./functions/validateEmail.js";
import { passwordMatch, validatePassword } from "./functions/validatePassword.js";
import canvas1 from "./functions/canvas.js";

const canvas = canvas1;

const email = document.getElementsByName("email")[0];
const submit = document.getElementById("send-button");
const err = document.getElementsByClassName("error");
const password = document.getElementsByName("password");
const signupForm = document.querySelector("#signup-form");

submit.onclick = function(){
    
}

signupForm.addEventListener('submit', e => {
    e.preventDefault();

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

    if(passValidation){
        const wait = document.querySelector("#wait-modal");
        const userEmail = signupForm['signup-email'].value;
        const userPassword = signupForm['signup-password'].value;

        wait.style.display = "block";
        auth.createUserWithEmailAndPassword(userEmail, userPassword).then(()=>{
            wait.style.display = "none";
            const modal = document.querySelector("#pop-modal");
            modal.style.display = "block";

            const succesClose = document.querySelector("#success-close");
            succesClose.addEventListener('click', e=>{modal.style.display = "none";});
        }).then(()=>{
            email.value = '';
            password[0].value = '';
            password[1].value = '';
        }).catch(e=>{
            wait.style.display = "none";
            const errModal = document.querySelector("#err-modal");
            errModal.style.display = "block";

            const errClose = document.querySelector("#err-close");
            errClose.addEventListener('click', e=>{errModal.style.display = "none";});
        });
    }

    
});