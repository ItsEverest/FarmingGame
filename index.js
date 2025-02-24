// Canvas initalization

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// Precautions of pixelart

ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.mozImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;

// Canvas Resizing

function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;
    ctx.scale(scale, scale);

    Cx = c.width / 2;
    Cy = c.height / 2;

    console.log("Resizing canvas")
}

resizeCanvas();

// Automatic resizing of canvas

window.addEventListener('resize', resizeCanvas, false);

// Center of the canvas

Cx = c.width / 2;
Cy = c.height / 2;

// Asset loader

let assets = {
    background: "assets/Tileset/spr_tileset_sunnysideworld_16px.png",
    player: "assets/Characters/Human/IDLE/base_idle_strip9.png"
}

let loadedAssets = 0;
let images = {};
let totalAssets = Object.keys(assets).length;

for(let key in assets){
    images[key] = new Image();
    images[key].src = assets[key];
    images[key].onload = () => {
        loadedAssets ++;
        if(loadedAssets === totalAssets){
            console.log(loadedAssets + "/" + totalAssets + " assets loaded");
            draw();
        }
    }
}

// Rendering

let scale = 5;

function draw(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.drawImage(images.player, (images.player.width/9)*0, 0, images.player.width/9, images.player.height, Cx-(images.player.width/9*scale/2), Cy-(images.player.height*scale/2), images.player.width/9*scale, images.player.height*scale);

    console.log("Rendered frame")

    requestAnimationFrame(draw);
}




