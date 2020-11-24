import auth from "./auth.js";

document.addEventListener("DOMContentLoaded", () => {
    auth.signOut().then(() => {
    window.location.replace('./login.html');
})
})