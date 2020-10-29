let home = document.getElementById("home");
let blog = document.getElementById("blog");
let about = document.getElementById("about");
let contact = document.getElementById("contact");
let login = document.getElementById("login");
let header = document.getElementsByTagName("header");
let menuIconOpen = true;

function closeNav(id){
    home.style.display = "none";
    blog.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";
    login.style.display = "none";
    header[0].style.paddingBottom = "0px";
    menuIconOpen = false;
}

function openNav(){
    home.style.display = "block";
    blog.style.display = "block";
    about.style.display = "block";
    contact.style.display = "block";
    login.style.display = "block";
    header[0].style.paddingBottom = "32px";
    menuIconOpen = true;

}

function changeMenu(id){
    menuIconOpen ? closeNav() : openNav();
}



