// Canvas initalization

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

// Precautions of pixelart



// Canvas Resizing

function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;

    Cx = c.width / 2;
    Cy = c.height / 2;

    ctx.imageSmoothingEnabled = false;
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

let lastTime = performance.now();
let fps = 0;
let frames = 0;

function draw(){
    frames++;
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    ctx.drawImage(images.player, (images.player.width/9)*0, 0, images.player.width/9, images.player.height, player.x, player.y, images.player.width/9*player.scale, images.player.height*player.scale);





    // FPS counter
    let now = performance.now();
    let delta = now - lastTime;

    if(delta>= 1000){
        fps = frames;
        frames = 0;
        lastTime = now;
        console.log("FPS: " + fps);
    }
    requestAnimationFrame(draw);
}

// Input

// - keydrown dependency

kd.W.down(()=>{
    if(player.y > 0){
        player.y -= player.speed;
    }
})

kd.S.down(()=>{
    if(player.y < canvas.height - images.player.height*player.scale){
        player.y += player.speed;
    }
})

kd.A.down(()=>{
    if(player.x > 0){
        player.x -= player.speed;
    }
})

kd.D.down(()=>{
    if(player.x < canvas.width - images.player.width/9*player.scale){
        player.x += player.speed;
    }
})


kd.run(()=>{
    kd.tick();
})


// Objects

function Player(name, x, y, scale=4, speed=3){
    this.name = name;
    this.x = Cx-(images.player.width/9*scale/2);
    this.y = Cy-(images.player.height*scale/2);
    this.scale = scale;
    this.speed = speed;

    this.animate = function(event){
        switch(event){
            case "idle":

        }
    }
}


const player = new Player("Player");

console.log(player)




