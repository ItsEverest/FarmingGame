let currentAnim = "idle"

// Canvas initalization

let c = document.getElementById("canvas");
let ctx = c.getContext("2d");

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
    playerIdle: "assets/Characters/Human/IDLE/base_idle_strip9.png",
    playerWalk: "assets/Characters/Human/WALKING/base_walk_strip8.png",
    playerRun: "assets/Characters/Human/RUN/base_run_strip8.png",
    playerHatBowlhairIdle: "assets/Characters/Human/IDLE/bowlhair_idle_strip9.png",
    playerHatBowlhairWalk: "assets/Characters/Human/WALKING/bowlhair_walk_strip8.png",
    playerHatBowlhairRun: "assets/Characters/Human/RUN/bowlhair_run_strip8.png",
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




    player.draw(currentAnim);


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

    currentAnim = "walk";

    if(player.y > 0){
        player.y -= player.speed;
    }
})

kd.W.up(()=>{
    currentAnim = "idle";
})

kd.S.down(()=>{

    currentAnim = "walk";

    if(player.y < canvas.height - images.playerIdle.height*player.scale){
        player.y += player.speed;
    }
})

kd.S.up(()=>{
    currentAnim = "idle";
})

kd.A.down(()=>{
    currentAnim = "walk";

    if(player.x > 0){
        player.x -= player.speed;
    }
})

kd.A.up(()=>{    
    currentAnim = "idle";
})

kd.D.down(()=>{

    currentAnim = "walk";

    if(player.x < canvas.width - images.playerIdle.width/9*player.scale){
        player.x += player.speed;
    }
})

kd.D.up(()=>{
    currentAnim = "idle";
})



kd.run(()=>{
    kd.tick();
})



// Objects

function Player(name, x, y, facing="right", scale=4, speed=3, hat){
    this.name = name;
    this.x = Cx-(images.playerIdle.width/9*scale/2);
    this.y = Cy-(images.playerIdle.height*scale/2);
    this.scale = scale;
    this.facing = facing;
    this.speed = speed;
    this.hat = hat;
    this.animFrame = 0;

    this.draw = function(event){
        let interval;
        let frames;
        let frameIndex;

        switch(event){
            case "idle":

                interval = 5;
                frames = 8; // Count from 0

                if(this.animFrame >= interval*frames){
                    this.animFrame = 0;
                } else {
                    this.animFrame++;   
                }
               
                frameIndex = Math.floor(this.animFrame/interval);
                
                
                ctx.drawImage(images.playerIdle, (images.playerIdle.width/(frames+1))*frameIndex, 0, images.playerIdle.width/(frames+1), images.playerIdle.height, player.x, player.y, images.playerIdle.width/(frames+1)*player.scale, images.playerIdle.height*player.scale);
                ctx.drawImage(images.playerHatBowlhairIdle, (images.playerHatBowlhairIdle.width/(frames+1))*frameIndex, 0, images.playerHatBowlhairIdle.width/(frames+1), images.playerHatBowlhairIdle.height, player.x, player.y, images.playerHatBowlhairIdle.width/(frames+1)*player.scale, images.playerHatBowlhairIdle.height*player.scale);

                
                break;
            case "walk":

                interval = 5;
                frames = 7; // Count from 0

                if(this.animFrame >= interval*frames){
                    this.animFrame = 0;
                } else {
                    this.animFrame++;   
                }
            
                frameIndex = Math.floor(this.animFrame/interval);

                if(this.facing === "right"){
                    ctx.drawImage(images.playerWalk, (images.playerWalk.width/(frames+1))*frameIndex, 0, images.playerWalk.width/(frames+1), images.playerWalk.height, player.x, player.y, images.playerWalk.width/(frames+1)*player.scale, images.playerWalk.height*player.scale);
                    ctx.drawImage(images.playerHatBowlhairWalk, (images.playerHatBowlhairWalk.width/(frames+1))*frameIndex, 0, images.playerHatBowlhairWalk.width/(frames+1), images.playerHatBowlhairWalk.height, player.x, player.y, images.playerHatBowlhairWalk.width/(frames+1)*player.scale, images.playerHatBowlhairWalk.height*player.scale);
                } else {
                    ctx.drawImage(images.playerWalk, (images.playerWalk.width/(frames+1))*frameIndex, 0, images.playerWalk.width/(frames+1), images.playerWalk.height, player.x, player.y, images.playerWalk.width/(frames+1)*player.scale, images.playerWalk.height*player.scale);
                    ctx.drawImage(images.playerHatBowlhairWalk, (images.playerHatBowlhairWalk.width/(frames+1))*frameIndex, 0, images.playerHatBowlhairWalk.width/(frames+1), images.playerHatBowlhairWalk.height, player.x, player.y, images.playerHatBowlhairWalk.width/(frames+1)*player.scale, images.playerHatBowlhairWalk.height*player.scale);
                }
            

                break;
            case "run":
                interval = 5;
                frames = 7; // Count from 0

                if(this.animFrame >= interval*frames){
                    this.animFrame = 0;
                } else {
                    this.animFrame++;   
                }
            
                frameIndex = Math.floor(this.animFrame/interval);

                if(this.facing === "right"){
                    ctx.drawImage(images.playerRun, (images.playerRun.width/(frames+1))*frameIndex, 0, images.playerRun.width/(frames+1), images.playerRun.height, player.x, player.y, images.playerRun.width/(frames+1)*player.scale, images.playerRun.height*player.scale);
                    ctx.drawImage(images.playerHatBowlhairRun, (images.playerHatBowlhairRun.width/(frames+1))*frameIndex, 0, images.playerHatBowlhairRun.width/(frames+1), images.playerHatBowlhairRun.height, player.x, player.y, images.playerHatBowlhairRun.width/(frames+1)*player.scale, images.playerHatBowlhairRun.height*player.scale);
                } else {
                    ctx.drawImage(images.playerRun, (images.playerRun.width/(frames+1))*frameIndex, 0, images.playerRun.width/(frames+1), images.playerRun.height, player.x, player.y, images.playerRun.width/(frames+1)*player.scale, images.playerRun.height*player.scale);
                    ctx.drawImage(images.playerHatBowlhairRun, (images.playerHatBowlhairRun.width/(frames+1))*frameIndex, 0, images.playerHatBowlhairRun.width/(frames+1), images.playerHatBowlhairRun.height, player.x, player.y, images.playerHatBowlhairRun.width/(frames+1)*player.scale, images.playerHatBowlhairRun.height*player.scale);
                }
            

                break;
        }
    };

}


const player = new Player("Player");

console.log(player)




