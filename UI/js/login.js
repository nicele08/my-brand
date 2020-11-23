import checkUsername from "./functions/checkUsername.js";
import checkPassword from "./functions/checkPassword.js";
import canvas1 from "./functions/canvas.js";

const canvas = canvas1;
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const err = document.getElementsByClassName("error");
const formLogin = document.querySelector("#form-login");

auth.onAuthStateChanged(user => {
    if(user){        
        // window.location.replace("./blog.html");
    }else{      
    }
});

formLogin.addEventListener('submit', e => {
  e.preventDefault();
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

    const wait = document.querySelector("#wait-modal");
    wait.style.display = "block";
    auth.signInWithEmailAndPassword(email.value, password.value).then(cred=>{
      wait.style.display = "none";
      window.location.replace("./blog.html");
    }).catch(e=>{
      console.log(e.message);
      err[0].textContent = "Invalid login, please try again";
      err[0].style.display = "block";
      password.value = '';
      wait.style.display = "none";
    })
  }

  return false;
});



