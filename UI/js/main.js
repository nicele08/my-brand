let home = document.getElementById("home");
let blog = document.getElementById("blog");
let about = document.getElementById("about");
let contact = document.getElementById("contact");
let login = document.getElementById("login");
let header = document.getElementsByTagName("header");
let menuIconOpen = false;

function closeNav(id){
    home.style.display = "none";
    blog.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";
    login.style.display = "none";
    menuIconOpen = false;
}

function openNav(){
    home.style.display = "block";
    blog.style.display = "block";
    about.style.display = "block";
    contact.style.display = "block";
    login.style.display = "block";
    menuIconOpen = true;

}

function changeMenu(id){
    menuIconOpen ? closeNav() : openNav();
}

const formSubscribe = document.querySelector("#form-subscribe");

formSubscribe.addEventListener('submit', e => {
    e.preventDefault();

    db.collection('subscribers').add({
        email: formSubscribe['form-email'].value,
        date: new Date().toDateString()
    }).then(() => {
        alert("You are registered now.");
    }).catch(e => {
        console.log(e.message);
    });
    
})




