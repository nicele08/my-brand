import checkUsername from "./functions/checkUsername.js";
import checkPassword from "./functions/checkPassword.js";

const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const err = document.getElementsByClassName("error");


loginButton.onclick = function(){
  let isValid = false;
  isValid = checkUsername(email);
  
  if(isValid === true){
    isValid = checkPassword(password);
  }
  
  if(isValid === false){
    err[0].textContent = "Invalid login, please try again";
    err[0].style.display = "block";
  }else{
    err[0].style.display = "none";
  }

  return false;
}



