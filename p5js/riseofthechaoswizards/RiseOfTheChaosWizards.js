//Author: Michael Witkovsky
//Date: 7/16/2017 - 

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var song; //song to play

var circles;
var circlesToRemove;
var circleSpeed;
var spawnDelay;
var delayTimer;

var minStarSize;
var maxStarSize;
var starVX;
var maxStarVY;

var fighter;
var redMage;
var blackMage;
var whiteMage;

var meteor;
var meteorScale;
var meteorXOffset;
var meteorYOffset;

var wanderXMax;
var wanderYMax;

function createCircle(inputColor, xPos, yPos, size){
    var circle = {
        initColor:inputColor,
        color:inputColor,
        x:xPos,
        y:yPos,
        w:size,
        h:size,
        vx: -starVX,
        vy: maxStarVY-(Math.random()*maxStarVY*2),
    };
    return circle;
}

function createSprite(path, xPos, yPos, scale){
    var sprite = {
        img: loadImage(path),
        x:xPos,
        y:yPos,
        wanderX:0,
        wanderY:0,
        toWanderX: Math.random() > 0.5 ? true : false,
        toWanderY: Math.random() > 0.5 ? true : false,
        scale:scale
    };
    return sprite;
}

function removeCirclesMarkedForDeletion(){
    for (var i=0; i<circlesToRemove.length; i++){
        circles.splice(circles.indexOf(circlesToRemove[i]),1);
    }
    circlesToRemove = [];
}


function randomInt(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function preload() {
    song = loadSound('/static/media/sound/RiseOfTheChaosWizardsLoop.wav');
}

function setup() {
    ww = $(window).width();
    wh = $(window).height()-50;
    hw = ww/2;
    hh = wh/2;
    
    circles = [];
    circlesToRemove = [];
    maxSpeed = 15;
    spawnDelay = 1;
    delayTimer = spawnDelay;
    
    minStarSize = 2;
    maxStarSize = 10;
    starVX = 20;
    maxStarVY = 2;
    
    fighter = createSprite("/static/media/images/RiseOfTheChaosWizards/fighter.png",
              hw+100,
              hh,
              2);
    redMage = createSprite("/static/media/images/RiseOfTheChaosWizards/redmage.png",
              hw+25,
              hh-75,
              2);
    blackMage = createSprite("/static/media/images/RiseOfTheChaosWizards/blackmage.png",
              hw-25,
              hh+25,
              2);
    whiteMage = createSprite("/static/media/images/RiseOfTheChaosWizards/whitemage.png",
              hw-100,
              hh-50,
              2);
    
    meteor = loadImage("/static/media/images/RiseOfTheChaosWizards/meteor.png");
    meteorScale = 0.25;
    meteorXOffset = -7;
    meteorYOffset = 30;
    
    wanderXMax = 20;
    wanderYMax = 40;
    
    createCanvas(ww, wh);
    song.loop();
}

function windowResized() {
    ww = $(window).width();
    wh = $(window).height()-50;
    hw = ww/2;
    hh = wh/2;
    
    resizeCanvas(ww, wh);
    
    fighter.x = hw+100;
    fighter.y = hh;
    redMage.x = hw+25;
    redMage.y = hh-75;
    blackMage.x = hw-25;
    blackMage.y = hh+25;
    whiteMage.x = hw-100;
    whiteMage.y = hh-50;
}

function draw() {
    background(0);
    
    if(millis() > delayTimer){
        for(var i=0; i<4; i++){
            circles.push(createCircle(color(255,255,255), 
                                      ww+100, 
                                      randomInt(0, wh), 
                                      randomInt(minStarSize, maxStarSize)));
        }
        delayTimer += spawnDelay;
    }
    
    renderCircles();
    renderSprite(redMage);
    renderSprite(whiteMage);
    renderSprite(fighter);
    renderSprite(blackMage);
}

function renderCircles() {
    noStroke();
    fill(255);
    
    for (var i=0; i<circles.length; i++){
        circles[i].x += circles[i].vx;
        circles[i].y += circles[i].vy;
        
        ellipse(circles[i].x, circles[i].y, circles[i].w, circles[i].h);
        
        if(circles[i].x < 0+circles[i].w)
            circlesToRemove.push(circles[i]);
    }
    
    removeCirclesMarkedForDeletion();
}

function renderSprite(sprite){
    if(sprite.toWanderX){
        sprite.wanderX+=Math.random()/4;
        if(sprite.wanderX >= wanderXMax)
            sprite.toWanderX = false;
    }
    else{
        sprite.wanderX-=Math.random()/4;
        if(sprite.wanderX <= -wanderXMax)
            sprite.toWanderX = true;
    }
    
    if(sprite.toWanderY){
        sprite.wanderY+=Math.random()/2;
        if(sprite.wanderY >= wanderYMax)
            sprite.toWanderY = false;
    }
    else{
        sprite.wanderY-=Math.random()/2;
        if(sprite.wanderY <= -wanderXMax)
            sprite.toWanderY = true;
    }
    
    push();
    translate(sprite.x + meteorXOffset, sprite.y + meteorYOffset);
    scale(meteorScale);
    image(meteor, sprite.wanderX*sprite.scale/meteorScale, sprite.wanderY*sprite.scale/meteorScale);
    pop();
    push();
    translate(sprite.x, sprite.y);
    scale(sprite.scale);
    image(sprite.img, sprite.wanderX, sprite.wanderY);
    pop();
}