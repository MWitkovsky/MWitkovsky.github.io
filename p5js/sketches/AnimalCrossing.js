//Author: Michael Witkovsky
//Date: 7/20/2017

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var ws, hs; //width scale + height scale

var grass;

function preload() {
    grass = loadImage("/media/images/AnimalCrossing/grass.png");
}

function setup() {
    ww = $(window).width();
    wh = $(window).height() - 50;

    if (Math.max(ww, wh) == ww)
        hw = ww / 2;
    else
        hw = wh / 2;

    hh = hw;
    
    ws = 0.1;
    hs = 0.1;

    createCanvas(ww, wh);
}

function windowResized() {
    ww = $(window).width();
    wh = $(window).height() - 50;

    if (Math.max(ww, wh) == ww)
        hw = ww / 2;
    else
        hw = wh / 2;

    hh = hw;

    resizeCanvas(ww, wh);
}

function draw() {
    scale(ws, hs);
    drawBackground();
}

function drawBackground(){
    for(var i=0; i<wh/hs; i+=1024){
        for(var j=0; j<ww/ws; j+=1024){
            image(grass, j, i);
        }
    }
}
