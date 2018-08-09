//Author: Michael Witkovsky
//Date: 11/18/2017

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var ws, hs; //width scale + height scale

var frameWidth;
var frameHeight;
var frameCounter;
var frameData;
var framePixels;

function preload() {
    song = loadSound('/static/media/sound/RetroTV.wav');
//    retro1 = loadImage("/static/media/images/AnimalCrossing/retrotv/retro1.png");
//    retro2 = loadImage("/static/media/images/AnimalCrossing/retrotv/retro2.png");
//    retro3 = loadImage("/static/media/images/AnimalCrossing/retrotv/retro3.png");
    retro1 = "1";
    retro2 = "2";
    retro3 = "3";
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

    tileFactor = 10;
    
    frameRate(9);
    
    frameWidth = 32;
    frameHeight = 21;
    frameCounter = 0;
    frameData = [0, 0, 1, 0, 1, 0, 1, 2, 0];
    
    createCanvas(ww, wh);
    song.loop();
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
    background(0);
    renderTV();
}

function frameDataToImage(requestedFrame){
    if (requestedFrame === 0) {
        return retro1;
    } else if (requestedFrame === 1) {
        return retro2;
    } else {
        return retro3;
    }
}

function renderTV() {
    ++frameCounter;
    if (frameCounter >= frameData.length)
        frameCounter = 0;
    
    $(".retro_img").each(function () {
       $(this).hide(); 
    });
    $("#"+frameDataToImage(frameData[frameCounter])).show();
}