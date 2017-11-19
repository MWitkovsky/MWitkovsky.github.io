//Author: Michael Witkovsky
//Date: 7/20/2017

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var ws, hs; //width scale + height scale

function preload() {
    song = loadSound('/media/sound/RetroTV.wav');
}

function setup() {
    ww = $(window).width();
    wh = $(window).height() - 50;

    if (Math.max(ww, wh) == ww)
        hw = ww / 2;
    else
        hw = wh / 2;

    hh = hw;
    $("#retrotv").css("width", hw);
    ws = 0.1;
    hs = 0.1;

    tileFactor = 10;
    
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
    $("#retrotv").css("width", hw);
    resizeCanvas(ww, wh);
}

function draw() {
}
