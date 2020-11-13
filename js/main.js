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

<<<<<<< HEAD
let canvas = document.getElementById("logo-blog");
let ctx = canvas.getContext("2d");

let grd = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 20, canvas.width/2, canvas.height/2, 70);
grd.addColorStop(0, "#6D627C");
grd.addColorStop(0.6, "#6D627C");
ctx.fillStyle = grd;
ctx.fillRect(0,0,100,70);

ctx.font = "italic small-caps bold 32px sans-serif";
ctx.fillStyle = "#CCFFFF";
ctx.fillText("NICE", 0, 24);

ctx.beginPath();
ctx.moveTo(4, 27);
ctx.quadraticCurveTo(2, 45, 62, 28);

let gradient = ctx.createLinearGradient(0, 0, 170, 0);
gradient.addColorStop("0", "magenta");
gradient.addColorStop("0.5" ,"#CCFFFF");
gradient.addColorStop("1.0", "red");

// Fill with gradient
ctx.strokeStyle = gradient;
ctx.lineWidth = 5;
ctx.stroke();
=======


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


>>>>>>> ft-create-blog-route


