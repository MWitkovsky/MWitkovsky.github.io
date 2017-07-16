var ww, wh; //window width and window height
var hw, hh; //half width + half height
var song; //song to play

var circles;
var circlesToRemove;
var circleSpeed;
var spawnDelay;
var delayTimer;

function preload() {
    song = loadSound('../media/sound/RiseOfTheChaosWizardsLoop.wav');
}

function setup() {
    ww = 1024;
    wh = 720;
    
    createCanvas(ww, wh);
    song.loop();
}

function draw() {
    background(0);
    renderCircles();
}

function renderCircles() {
    noStroke();
    fill(255);
}