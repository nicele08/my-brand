import checkUsername from "./functions/checkUsername.js";
import checkPassword from "./functions/checkPassword.js";
import canvas1 from "./functions/canvas.js";
import auth from "./auth.js";

const canvas = canvas1;
const email = document.getElementById("email");
const password = document.getElementById("password");
const loginButton = document.getElementById("login-button");
const err = document.getElementsByClassName("error");
const formLogin = document.querySelector("#form-login");
const wait = document.querySelector("#wait-modal");

function redirectUser(userId){
  
  wait.style.display = "block";
  db.collection('users').doc(userId).get().then(user => {
    const userType = user.data().userType;
    console.log(userType)
    wait.style.display = "none";
    if(userType === 'admin'){
      window.location.replace('../admin/index.html');
    }else if(userType === 'client'){
      window.location.replace('./blog.html');
    }
    
  }).catch((e) => {
    wait.style.display = "none";
    window.location.replace('../index.html');
  })
}

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
    
    wait.style.display = "block";
    auth.signInWithEmailAndPassword(email.value, password.value).then(cred=>{
        redirectUser(cred.user.uid);
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



