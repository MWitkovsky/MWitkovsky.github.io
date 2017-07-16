var ww, wh; //window width and window height
var hw, hh; //half width + half height
var song; //song to play

var circles;
var circlesToRemove;
var maxSpeed;
var spawnDelay;
var delayTimer;

var minH;
var minW;
var maxH;
var maxW;

var theta;
var rotationRate;
var max;

function createCircle(inputColor, xPos, yPos, w, h){
    var circle = {
        initColor:inputColor,
        color:inputColor,
        x:xPos,
        y:yPos,
        w:w,
        h:h,
        vx: maxSpeed-(Math.random()*maxSpeed*2),
        vy: maxSpeed-(Math.random()*maxSpeed*2),
    };
    return circle;
}

function preload() {
    song = loadSound('../media/sound/SetTheUniverseOnFireLoop.wav');
}

function setup() {
    ww = $(window).width();
    wh = $(window).height()-50;
    
    if(Math.max(ww,wh) == ww)
        hw = ww/2;
    else
        hw = wh/2;
    
    hh = hw;
        
    circles = [];
    circlesToRemove = [];
    maxSpeed = 15;
    spawnDelay = 1;
    delayTimer = spawnDelay;
    
    minH = 1;
    minW = 1;
    maxH = 20;
    maxW = 20;
    
    theta = 0;
    rotationRate = 0.025;
    
    colorMode(HSB, 255, 255, 255);
    createCanvas(ww, wh);
    song.loop();
}

function windowResized() {
    ww = $(window).width();
    wh = $(window).height()-50;
    
    if(Math.max(ww,wh) == ww)
        hw = ww/2;
    else
        hw = wh/2;
    
    hh = hw;
        
    resizeCanvas(ww, wh);
}

function draw() {
    background(0);
    if(millis() > delayTimer){
        for(var i=0; i<2; i++){
            circles.push(createCircle(color(50,255,255), 0, 0, 1, 1));
            circles.push(createCircle(color(100,255,255), 0, 0, 1, 1));
            circles.push(createCircle(color(150,255,255), 0, 0, 1, 1));
            circles.push(createCircle(color(200,255,255), 0, 0, 1, 1));
        }
        delayTimer += spawnDelay;
    }
    renderCircles();
}

function renderCircles() {
    noStroke();
    
    push();
    
    translate(ww/2, wh/2);
    theta += rotationRate;
    rotate(theta);

    for (var i=0; i<circles.length; i++){
        circles[i].x += circles[i].vx;
        circles[i].y += circles[i].vy;
        
        if(circles[i].x > 0 && circles[i].y > 0)
            max = Math.max(circles[i].x/hw, circles[i].y/hh);
        else if(circles[i].x > 0 && circles[i].y < 0)
            max = Math.max(circles[i].x/hw, circles[i].y/-hh);
        else if(circles[i].x < 0 && circles[i].y > 0)
            max = Math.max(circles[i].x/-hw, circles[i].y/hh);  
        else
            max = Math.max(circles[i].x/-hw, circles[i].y/-hh);
        
        circles[i].w = lerp(minW, maxW, max);
        circles[i].h = lerp(minH, maxH, max);
        circles[i].color = lerpColor(circles[i].initColor, color(255,255,255), max);
        
        if(Math.abs(circles[i].x) > hw+400 || Math.abs(circles[i].y) > hh+400)
            circlesToRemove.push(circles[i]);
        
        fill(circles[i].color);
        ellipse(circles[i].x, circles[i].y, circles[i].w, circles[i].h);
    }
    
    removeCirclesMarkedForDeletion();
    
    pop();
}

function removeCirclesMarkedForDeletion(){
    for (var i=0; i<circlesToRemove.length; i++){
        circles.splice(circles.indexOf(circlesToRemove[i]),1);
    }
    circlesToRemove = [];
}
