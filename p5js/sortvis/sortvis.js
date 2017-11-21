//Author: Michael Witkovsky
//Date: 10/24/2017

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var song; //song to play

var circles;
var stepDelay;
var delayTimer;

var radius;
var numCircles;
var dt;

var states = {
    idle: 0,
    shuffling: 1,
}
var state = states.idle;

var shuffleIndex;
var k, l, temp, newK;

function print(m){
    console.log(m);
}

function createCircle(inputHue, inputRadius, inputTheta, w, h){
    var circle = {
        hue:inputHue,
        radius:inputRadius,
        theta:inputTheta,
        w:w,
        h:h,
    };
    return circle;
}

function shuffleArray(a, i) {
    var j, x;
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
    
    --shuffleIndex;
}

function setState(desiredState){
    state = desiredState;
    if (state === states.shuffling){
        shuffleIndex = circles.length-1;
    }
    else if (state === states.insertionSort){
        k = -1;
        l = 0;
        temp = 0;
        newK = true;
    }
}

function preload() {
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
    delayTimer = stepDelay;
    
    numCircles = 360;
    colorMode(HSB, numCircles, 1, 1);
    
    radius = numCircles/2;
    dt = (3.14*2)/numCircles;
    var t = 0;
    for (var i=0; i<numCircles; i++){
        t += dt;
        circles.push(createCircle(i, radius, t, 3, 3));
    }
    setState(states.shuffling);
    createCanvas(ww, wh);
    frameRate(500);
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

function drawFunc(){
    if (state === states.shuffling){
        shuffleArray(circles, shuffleIndex);
        
        if(shuffleIndex === 0){
            setState(states.insertionSort);
        }
    }
    else if (state === states.insertionSort){
        insertionSort();
        
        if(k >= circles.length-1){
            setState(states.shuffling);
        }
    }
}

function draw() {
    if (state !== states.idle){
        background(0);
        drawFunc();
        renderCircles();
    }
}

function calculateRadius(circle){
    circle.radius = radius-Math.min(
        Math.abs(circle.hue - circles.indexOf(circle)),
        Math.abs(circle.hue - numCircles - circles.indexOf(circle))
    );
}

function renderCircles() {
    noStroke();
    
    push();
    
    translate(ww/2, wh/2);

    var t=0;
    for (var i=0; i<circles.length; i++){
        fill(color(circles[i].hue, 255, 255));
        t += dt;
        calculateRadius(circles[i]);
        ellipse(circles[i].radius*Math.cos(t), 
                circles[i].radius*Math.sin(t), 
                circles[i].w, circles[i].h);
    }
    
    pop();
}

//SORTS
function insertionSort(){
    if (newK){
        ++k;
        temp = circles[k];
        l = k-1;
        
        newK = false;
    }
    
    if (l >= 0 && circles[l].hue > temp.hue){
        circles[l+1] = circles[l];
        --l;
    }
    else{
        circles[l+1] = temp;
        newK = true;
    }
}

//SORTS
function insertionSort2(){
    if (newK){
        ++k;
        temp = circles[k];
        l = k-1;
        
        newK = false;
    }
    
    while (l >= 0 && circles[l].hue > temp.hue){
        circles[l+1] = circles[l];
        --l;
    }
    circles[l+1] = temp;
    newK = true;
}
