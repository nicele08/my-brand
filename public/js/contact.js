import validateName from "./functions/validateName.js";
import validateEmail from "./functions/validateEmail.js";
import validateMessage from "./functions/validateMessage.js";
import canvas1 from "./functions/canvas.js";
canvas1
const name = document.getElementsByName("name")[0];
const email = document.getElementsByName("email")[0];
const message = document.getElementsByName("message")[0];
const submit = document.getElementById("send-button");
const err = document.getElementsByClassName("error");
const formContact = document.querySelector("#form-contact");

formContact.addEventListener('submit', e => {
    e.preventDefault();

    const validName = validateName(name, err[0]);
    const validEmail = validateEmail(email, err[1]);
    const validMessage = validateMessage(message, err[2]);

    if(validName && validEmail && validMessage){
        const wait = document.querySelector("#wait-modal");
        wait.style.display = "block";
        db.collection("queries").add({
            name: formContact["form-name"].value,
            email: formContact["form-email"].value,
            message: formContact["message"].value,
            date: new Date().toDateString(),
            searchKey: formContact["form-name"].value.split(" ")
        }).then(() => {
            wait.style.display = "none";
            const successModal = document.querySelector("#success-modal");
            const successClose = document.querySelector("#success-close");
            successModal.style.display = "block"; 
            successClose.addEventListener("click", e => {
                e.preventDefault();
                e.stopPropagation();
                successModal.style.display = "none";
            });
            formContact["form-name"].value = "";
            formContact["form-email"].value = "";
            formContact["message"].value = "";           
        })
    }

})