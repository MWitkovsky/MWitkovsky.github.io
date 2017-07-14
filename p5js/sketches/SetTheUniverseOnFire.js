var ww, wh; //window width and window height
var hw, hh; //half width + half height
var song; //song to play

var circles;
var maxSpeed;
var spawnDelay;
var delayTimer;

var minH;
var minW;
var maxH;
var maxW;

var theta;

function createCircle(inputColor, xPos, yPos, w, h){
    var afterimage = {
        color:inputColor,
        x:xPos,
        y:yPos,
        w:w,
        h:h,
        vx: maxSpeed-(Math.random()*maxSpeed*2),
        vy: maxSpeed-(Math.random()*maxSpeed*2),
    };
    return afterimage;
}

function preload() {
    song = loadSound('../media/sound/SetTheUniverseOnFireLoop.wav');
}

function setup() {
    ww = 1024;
    wh = 720;
    hw = ww/2;
    hh = wh/2;
        
    circles = [];
    maxSpeed = 10;
    spawnDelay = 10;
    delayTimer = spawnDelay;
    
    minH = 1;
    minW = 1;
    maxH = 20;
    maxW = 20;
    
    theta = 0;
    
    createCanvas(ww, wh);
    song.loop();
}

function draw() {
    background(0);
    if(millis() > delayTimer){
        circles.push(createCircle(color(255,200,100,255), 0, 0, 1, 1));
        delayTimer += spawnDelay;
    }
    renderCircles();
}

function renderCircles() {
    noStroke();
    fill(255);
    translate(ww/2, wh/2);
    theta += .025;
    rotate(theta);
    // A simple way to draw the wave with an ellipse at each location
    for (var i=0; i<circles.length; i++){
        circles[i].x += circles[i].vx;
        circles[i].y += circles[i].vy;
        
        if(circles[i].vx >= 0)  
            circles[i].w = lerp(minW, maxW, circles[i].x/hw);
        else
            circles[i].w = lerp(minW, maxW, (-circles[i].x)/-hw);
        
        if (circles[i].vy >= 0)
            circles[i].h = lerp(minH, maxH, circles[i].y/hh);
        else
            circles[i].h = lerp(minH, maxH, (-circles[i].y)/-hh);
        
        //circles[i].h += 1;
        ellipse(circles[i].x, circles[i].y, circles[i].w, circles[i].h);
    }
    
    
}

function lerp(a, b, p){
    return a+p*(b-a);
}