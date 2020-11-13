
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