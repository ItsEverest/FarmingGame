// Canvas Setup

const c = document.getElementById("canvas");
const ctx = c.getContext("2d");


// Automatic canvas resizing

function resizeCanvas() {
    const scale = window.devicePixelRatio || 1;
    canvas.width = canvas.clientWidth * scale;
    canvas.height = canvas.clientHeight * scale;

    Cx = c.width / 2;
    Cy = c.height / 2;

    ctx.imageSmoothingEnabled = false;

    console.log(`Resized canvas: x: ${c.width}, y: ${c.height}`);
}


// Canvas resizing initialization

resizeCanvas();

window.addEventListener('resize', resizeCanvas, false);


// Center of the canvas

Cx = c.width / 2;
Cy = c.height / 2;


// Asset loader

// Path library

let assets = {
    background: "assets/Tileset/spr_tileset_sunnysideworld_16px.png",
    player: {
        idle_base: "assets/Characters/Human/IDLE/base_idle_strip9.png",

        walk_base: "assets/Characters/Human/WALKING/base_walk_strip8.png",
    }
}


// Loading assets

let loadedAssets = 0;
let images = {};
let totalAssets = Object.keys(assets).length;

for(let key in assets){
    if(typeof assets[key] === "string"){
        images[key] = new Image();
        images[key].src = assets[key];
        images[key].onload = () => {
            loadedAssets ++;

            if(loadedAssets === totalAssets){
                console.log(loadedAssets + "/" + totalAssets + " assets loaded", images);
                draw();
            }
        }
    } else
    {
        images[key] = {};
        let localTotalAssets = Object.keys(assets[key]).length;
        let localLoadedAssets = 0;

        for(let localKey in assets[key]){
            images[key][localKey] = new Image();
            images[key][localKey].src = assets[key][localKey];
            images[key][localKey].onload = () => {
                localLoadedAssets ++;
                if(localLoadedAssets === localTotalAssets){
                    loadedAssets ++;

                    if(loadedAssets === totalAssets){
                        console.log(loadedAssets + "/" + totalAssets + " assets loaded", images);
                        draw();
                    }
                }
            }

        }
    }
}


// FPS counter

let lastTime = performance.now();
let fpsLastTime = lastTime;
let fps = 0;
let frames = 0;
let deltaTime;

// Main Rendering

function draw(){
    let now = performance.now();
    deltaTime = now - lastTime;
    lastTime = now;

    frames++;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    player.draw();
    debugWindow();





    // FPS counter
    

    if(now-fpsLastTime >= 1000){
        fps = frames;
        frames = 0;
        fpsLastTime = now;
        console.log("FPS: " + fps);
    }

    requestAnimationFrame(draw);
}


// Input

kd.W.down(()=>{
    
    player.currentAnim = "walk";

    if(player.y-player.hitbox.y> 0){
        player.y -= player.speed;
    }
})

kd.W.up(()=>{
    
    player.currentAnim = "idle";
})

kd.S.down(()=>{

    player.currentAnim = "walk";

    if(player.y+player.hitbox.y < canvas.height){
        player.y += player.speed;
    }
})

kd.S.up(()=>{
    player.currentAnim = "idle";
    
})

kd.A.down(()=>{

    player.currentAnim = "walk";

    if(player.x-player.hitbox.x> 0){
        player.x -= player.speed;
    }
})

kd.A.up(()=>{
    player.currentAnim = "idle";
    
})

kd.D.down(()=>{

    player.currentAnim = "walk";

    if(player.x+player.hitbox.x < canvas.width){
        player.x += player.speed;
    }
})

kd.D.up(()=>{
    player.currentAnim = "idle";
    
})















kd.run(()=>{
    kd.tick();
})

// #Classes#

// Player

class Player {
    constructor(x, y, scale = 4, speed = 3, currentAnim = "idle", cosmetics, hitbox = {x: 6, y: 10, width: 11, height: 15}) {
        this.x = x;
        this.y = y;
        this.scale = scale;
        this.speed = speed;
        this.currentAnim = currentAnim;
        this.animations = {
            idle: {
                totalFrames: 9,
                interval: 80
            },
            walk: {
                totalFrames: 8,
                interval: 80
            }
        }
        this.animAccumulator = 0;
        this.animFrame = 0;
        this.cosmetics = cosmetics;
        this.hitbox = {x: hitbox.x * this.scale, y: hitbox.y * this.scale, width: hitbox.width * this.scale, height: hitbox.height * this.scale};
        this.centerOrigin = {x: this.hitbox.width /2, y: this.hitbox.height /2};
        this.width = images.player.idle_base.width * this.scale;
        this.height = images.player.idle_base.height * this.scale;

        this.draw = (currentAnim = this.currentAnim) => {
        
            
            this.animAccumulator += deltaTime;
            while (this.animAccumulator >= this.animations[this.currentAnim].interval) {
                this.animAccumulator -= this.animations[this.currentAnim].interval;
                this.animFrame++;
                if (this.animFrame >= this.animations[this.currentAnim].totalFrames) {
                    this.animFrame = 0;
                }
            }            


            this.currentAnim = currentAnim;

            switch(currentAnim){
                case "idle":
                    ctx.drawImage(images.player.idle_base, images.player.idle_base.width / this.animations[this.currentAnim].totalFrames * this.animFrame, 0, images.player.idle_base.width / this.animations[this.currentAnim].totalFrames, images.player.idle_base.height, this.x-(images.player.idle_base.width*this.scale/this.animations[this.currentAnim].totalFrames/2), this.y-(images.player.idle_base.height*this.scale/2), images.player.idle_base.width / this.animations[this.currentAnim].totalFrames * this.scale, images.player.idle_base.height * this.scale);
                    break;
                case "walk":
                    ctx.drawImage(images.player.walk_base, images.player.walk_base.width / this.animations[this.currentAnim].totalFrames * this.animFrame, 0, images.player.walk_base.width / this.animations[this.currentAnim].totalFrames, images.player.walk_base.height, this.x-(images.player.walk_base.width*this.scale/this.animations[this.currentAnim].totalFrames/2), this.y-(images.player.walk_base.height*this.scale/2), images.player.walk_base.width / this.animations[this.currentAnim].totalFrames * this.scale, images.player.walk_base.height * this.scale);
                    break;
            }
        }
    }
}

const player = new Player(Cx, Cy);


// Debug Window

let debugWindowObject = document.getElementById("debugWindow");

function debugWindow(){
    debugWindowObject.innerText = `
    Player:
        x: ${player.x}
        y: ${player.y}
        scale: ${player.scale}
        speed: ${player.speed}
        currentAnim: ${player.currentAnim}
        hitbox: ${player.hitbox.x}, ${player.hitbox.y}, ${player.hitbox.width}, ${player.hitbox.height}
        centerOrigin: ${player.centerOrigin.x}, ${player.centerOrigin.y}
        width: ${player.width}
        height: ${player.height}
    `
}