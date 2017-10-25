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

var states = ["shuffling"];
var state = states[0];

var shuffleIndex;

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
    let j, x;
    j = Math.floor(Math.random() * (i + 1));
    x = a[i];
    a[i] = a[j];
    a[j] = x;
}

function setState(desiredState){
    state = desiredState;
    if (state === states[0]){
        shuffleIndex = circles.length-1;
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
    
    numCircles = 720;
    colorMode(HSB, numCircles, 1, 1);
    
    radius = numCircles/2;
    dt = (3.14*2)/numCircles;
    let t = 0;
    for (let i=0; i<numCircles; i++){
        t += dt;
        circles.push(createCircle(i, radius, t, 3, 3));
    }
    setState("shuffling");
    createCanvas(ww, wh);
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
    if (state == states[0]){
        background(0);
        shuffleArray(circles, shuffleIndex);
        --shuffleIndex;
        renderCircles();
        
        if(shuffleIndex === 0){
            setState("idle");
        }
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

    let t=0;
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