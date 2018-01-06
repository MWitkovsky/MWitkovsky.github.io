//Author: Michael Witkovsky
//Date: 1/5/2018

var ww, wh; //window width and window height
var hw, hh; //half width + half height
var song; //song to play

var coins;
var coinsToRemove;
var maxSpeed;
var spawnDelay;
var delayTimer;
var originalWidth;

function removeCoinsMarkedForDeletion(){
    for (var i=0; i<coinsToRemove.length; i++){
        coins.splice(coins.indexOf(coinsToRemove[i]),1);
    }
    coinsToRemove = [];
}

function createCoin(xPos, yPos, vel){
    var circle = {
        x:xPos,
        y:yPos,
        v:vel*maxSpeed,
        scale:vel*originalWidth
    };
    return circle;
}


function preload() {
    song = loadSound('/media/sound/gasgasgas.wav');
    ship = loadImage("/media/images/dogecoin/rocket.png");
    coin = loadImage("/media/images/dogecoin/dogecoin.png");
}

function setup() {
    ww = $(window).width();
    wh = $(window).height()-50;
    
    if(Math.max(ww,wh) == ww)
        hw = ww/2;
    else
        hw = wh/2;
    
    hw = ww/2;
    hh = wh/2;
        
    coins = [];
    coinsToRemove = [];
    maxSpeed = 20;
    spawnDelay = 1;
    delayTimer = spawnDelay;
    originalWidth = 68;
    
    minH = 1;
    minW = 1;
    maxH = 20;
    maxW = 20;
    
    theta = 0;
    rotationRate = 0.025;
    
    createCanvas(ww, wh);
    song.loop();
}

function windowResized() {
    ww = $(window).width();
    wh = $(window).height()-50;
    
    hw = ww/2;
    hh = wh/2;
        
    resizeCanvas(ww, wh);
}

function renderShip() {
    push();
    rotate(-0.7);
    image(ship, (0)+(Math.random()*10), hh*1.75+(Math.random()*10));
    pop();
}

function renderFrontCoins() {
    for (c in coins) {
        c_obj = coins[c];
        if (c_obj["v"] > maxSpeed/2){
            image(coin, c_obj["x"], c_obj["y"], c_obj["scale"], c_obj["scale"]);
            coins[c]["x"] -= c_obj["v"];
            coins[c]["y"] += c_obj["v"];
        }
        if (c_obj["x"] < -100 || c_obj["y"] > 1500){
            coinsToRemove.push(coins[c]);
        }
    }
}

function renderBackCoins() {
    for (c in coins) {
        c_obj = coins[c];
        if (c_obj["v"] <= maxSpeed/2){
            image(coin, c_obj["x"], c_obj["y"], c_obj["scale"], c_obj["scale"]);
            coins[c]["x"] -= c_obj["v"];
            coins[c]["y"] += c_obj["v"];
        }
        if (c_obj["x"] < -100 || c_obj["y"] > 1500){
            coinsToRemove.push(coins[c]);
        }
    }
}

function draw() {
    background(0);
    if(millis() > delayTimer){
        coins.push(createCoin(lerp(0, ww*2, Math.random()), -100, Math.random()));
        coins.push(createCoin(lerp(0, ww*2, Math.random()), -100, Math.random()));
        delayTimer += spawnDelay;
    }
    renderBackCoins();
    renderShip();
    renderFrontCoins();
    removeCoinsMarkedForDeletion();
}










































