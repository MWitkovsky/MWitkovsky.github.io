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

function createCircle(inputColor, xPos, yPos, w, h){
    var afterimage = {
        initColor:inputColor,
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
    circlesToRemove = [];
    maxSpeed = 20;
    spawnDelay = 1;
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
        circles.push(createCircle(color(255,255,255,255), 0, 0, 1, 1));
        circles.push(createCircle(color(255,255,255,255), 0, 0, 1, 1));
        circles.push(createCircle(color(255,255,255,255), 0, 0, 1, 1));
        circles.push(createCircle(color(255,255,255,255), 0, 0, 1, 1));
        delayTimer += spawnDelay;
    }
    renderCircles();
}

function renderCircles() {
    noStroke();
    
    push();
    
    translate(ww/2, wh/2);
    theta += .025;
    rotate(theta);

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
        
        if(circles[i].x > 0 && circles[i].y > 0)
            circles[i].color = lerpColor(circles[i].initColor, color(255,0,0,255), Math.max(circles[i].x/hw, circles[i].y/hh))
        else if(circles[i].x > 0 && circles[i].y < 0)
            circles[i].color = lerpColor(circles[i].initColor, color(255,0,0,255), Math.max(circles[i].x/hw, circles[i].y/-hh))
        else if(circles[i].x < 0 && circles[i].y > 0)
            circles[i].color = lerpColor(circles[i].initColor, color(255,0,0,255), Math.max(circles[i].x/-hw, circles[i].y/hh))
        else
            circles[i].color = lerpColor(circles[i].initColor, color(255,0,0,255), Math.max(circles[i].x/-hw, circles[i].y/-hh))
        
        
        if(Math.abs(circles[i].x) > hw+200 || Math.abs(circles[i].y) > hh+200)
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
