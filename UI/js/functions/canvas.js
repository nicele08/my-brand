let canvas1 = document.getElementById("canvas1");
let ctx1 = canvas1.getContext("2d");
let grd1 = ctx1.createRadialGradient(canvas1.width/2, canvas1.height/2, 20, canvas1.width/2, canvas1.height/2, 70);
grd1.addColorStop(0, "#f1ebeb");
grd1.addColorStop(0.6, "#f1ebeb");
ctx1.fillStyle = grd1;
ctx1.fillRect(0,0,100,70);

ctx1.font = "italic small-caps bold 32px sans-serif";
ctx1.fillStyle = "#1B5E5E";
ctx1.fillText("NICE", 0, 24);

ctx1.beginPath();
ctx1.moveTo(4, 27);
ctx1.quadraticCurveTo(2, 45, 62, 28);

let gradient1 = ctx1.createLinearGradient(0, 0, 170, 0);
gradient1.addColorStop("0", "magenta");
gradient1.addColorStop("0.5" ,"#1B5E5E");
gradient1.addColorStop("1.0", "red");

// Fill with gradient
ctx1.strokeStyle = gradient1;
ctx1.lineWidth = 5;
ctx1.stroke();

export default canvas1;