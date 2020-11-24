import auth from "./auth.js"

const logout = document.querySelector("#logout");

logout.addEventListener('click', e => {
    e.preventDefault();
    auth.signOut().then(() => {
        window.location.replace('../pages/login.html');
    })
})

auth.onAuthStateChanged(user => {
    console.log(user.email);
})