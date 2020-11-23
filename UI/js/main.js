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

let modal = document.getElementById("pop-modal");
let spanClose = document.getElementsByClassName("close")[0];
let cancelBtn = document.getElementById("modal-cancel");
spanClose.onclick = function(){
    modal.style.display = "none";
}

cancelBtn.onclick = function(){
    modal.style.display = "none";
}

window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
}




