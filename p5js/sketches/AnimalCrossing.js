//Author: Michael Witkovsky
//Date: 7/20/2017

var ww, wh; //window width and window height
var hw, hh; //half width + half height

function preload() {}

function setup() {
    ww = $(window).width();
    wh = $(window).height() - 50;

    if (Math.max(ww, wh) == ww)
        hw = ww / 2;
    else
        hw = wh / 2;

    hh = hw;

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
    background(0);
}
