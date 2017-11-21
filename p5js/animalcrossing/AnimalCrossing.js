//Author: Michael Witkovsky
//Date: 7/20/2017

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var ws, hs; //width scale + height scale

var sky;
var grass;
var tree;

var tileFactor;

var webGL;

function checkForWebGL() {
    var gl = null;
    
    try {
        gl = canvas.getContext("webgl");
        webGL = true;
    } catch (x) {
        webGL = false;
    }

    if (!webGL) {
        try {
            gl = canvas.getContext("experimental-webgl");
            webGL = true;
        } catch (x) {
            webGL = false;
        }
    }
    
    webGL=false;
}

function preload() {
    sky = loadImage("/media/images/AnimalCrossing/sky.png");
    grass = loadImage("/media/images/AnimalCrossing/grass.png");
    tree = loadImage("/media/images/AnimalCrossing/Tree_GCN.png");
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

    //tileFactor = Math.floor(wh/100);
    tileFactor = 10;

    checkForWebGL();

    if (webGL)
        createCanvas(ww, wh, WEBGL);
    else
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
    //tileFactor = Math.floor(wh/100);

    resizeCanvas(ww, wh);
}

function draw() {
    if (webGL) {
        //background(0);
        drawSky();
        drawGround();
        drawTrees();
    } else {
        scale(ws, hs);
        drawBackground();
    }
}

//WEBGL
function drawSky() {
    texture(sky);
    plane(ww, wh);
}

function drawGround() {
    texture(grass);
    push();
    rotateX(5);
    translate(0, 100);
    translate(-((ww / tileFactor) * (tileFactor / 2)), -((wh / tileFactor) * (tileFactor / 2)));
    for (var i = 0; i <= tileFactor; i++) {
        for (var j = 0; j <= tileFactor; j++) {
            plane(ww / tileFactor, wh / tileFactor);
            translate(ww / tileFactor, 0);
        }
        translate(-ww / tileFactor * (tileFactor + 1), wh / tileFactor);
    }
    pop();
}

function drawTrees() {
    fill(0, 0, 0, 0);
    texture(tree);
    push();
    plane(316 / 2, 358 / 2);
    pop();
}

//NON-WEBGL
function drawBackground() {
    for (var i = 0; i < wh / hs; i += 1024) {
        for (var j = 0; j < ww / ws; j += 1024) {
            image(grass, j, i);
        }
    }
}
