// Storing the loaded audio
var song;

// Canvas properties
var ww, wh; //window width and window height
var heightCoeff;

// Everything for bar rendering
var fft;
var yvalues;

// Everything for message rendering
var message = "EVERYTHINGS GONNA BE ALRIGHT";
var afterimages = [];
var fadeRate = 10;
var messageFont;
var messageX;
var messageY;
var afterimageSpawnRate = 5;
var afterimageSpawnCounter = afterimageSpawnRate;

// Everything for rotating circles rendering
var analyzer;
var circles = [];
var theta = 0;

// Creates an afterimage object for saving its color and position properties
function createAfterimage(inputColor, xPos, yPos){
    var afterimage = {
        color:inputColor,
        x:xPos,
        y:yPos
    };
    return afterimage;
}

function createCricleWithPivot(inputColor, startX, startY, pivotX, pivotY){
    var circle = {
        color:inputColor,
        x:startX,
        y:startY,
        pivot:createVector(pivotX, pivotY)
    };
    return circle
}

function preload() {
    song = loadSound('/media/sound/EverythingsGonnaBeAlright.wav');
}

function setup() {
    angleMode(DEGREES);
    
    // Create the canvas
    ww = 1024;
    wh = 720;
    createCanvas(ww, wh);
    
    // Store canvas properties for bar rendering
    xspacing = (ww/1024)/2;
    heightCoeff = (wh*.80)/255;
    
    // Calculate message position
    messageX = (ww/4)-75;
    messageY = wh/2;
    
    // Create the cirlces
    circles[0] = createCricleWithPivot(color(0,0,0,255), ww/2, wh*.25, ww/2, wh/2);
    circles[1] = createCricleWithPivot(color(0,0,0,255), ww/2, wh*.75, ww/2, wh/2);
    //AUDIO STUFF
    song.loop();
    fft = new p5.FFT();
    analyzer = new p5.Amplitude();
    
    fft.setInput(song);
    analyzer.setInput(song);
    analyzer.toggleNormalize(true);
    analyzer.smooth(0.9);
}

function draw() {
    background(0);
    
    // Render frequency bars
    yvalues = fft.analyze();
    calcWave();
    renderWave(color(190,35,35,100));
    
    // Render circles
    renderCircles();
    
    // Render message and afterimages
    renderAfterimages();
    renderText(color(255,200,100,255), messageX + randomInt(-2,2), messageY + randomInt(-2,2));
}

function calcWave() {
    for (var i = 0; i < yvalues.length-1; i++) {
        yvalues[i] *= heightCoeff;
    }
}

function renderWave(color) {
    noStroke();
    fill(color);

    beginShape();
    for (i = 0; i<yvalues.length-510; i++) {
        rect(i+ww/2, wh, ww/yvalues.length, -yvalues[i]);
        rect(ww/2-i-1, wh, ww/yvalues.length, -yvalues[i]);
    }
    endShape();
}

function renderText(inputColor, x, y){
    noStroke();
    fill(inputColor);
    textSize(36);
    text(message, x, y);
    
    if(--afterimageSpawnCounter == 0){
        var reducedColor = color(red(inputColor)/2,blue(inputColor)/2,green(inputColor)/2,255);
    	afterimages.push(createAfterimage(reducedColor, x + randomInt(-20,20), y + randomInt(-20,20)));
        afterimageSpawnCounter = afterimageSpawnRate;
    }
}

function renderAfterimages(){
    noStroke();
    var afterimagesToRemove = [];
    var alpha;
    afterimages.forEach(function(afterimage, index){
        fill(afterimage.color);
        text(message, afterimage.x, afterimage.y);
        
        alpha = afterimage.color.levels[3] - fadeRate;
        if(alpha >= 0){
            afterimage.color = color(red(afterimage.color), green(afterimage.color), 
                                 blue(afterimage.color), alpha);
        }
        else{
            afterimagesToRemove.push(afterimage);
        }
    });
    
    afterimagesToRemove.forEach(function(afterimageToRemove, index){
       afterimages.splice(afterimages.indexOf(afterimageToRemove),1);
    });
}

function renderCircles(){
    // Get the average (root mean square) amplitude
    var rms = analyzer.getLevel();
    fill(color(0, 200, 200, 255));
    stroke(0);
    theta += 4;
    
    push();
    translate(ww/2, wh/2);
    rotate(theta);

    circles[0].y = (wh/2) - (100+rms*1000);
    circles[1].y = (wh/2) + (100+rms*1000);
    
    // Draw an ellipse with size based on volume
    circles.forEach(function(circle, index){
        ellipse(circle.x-ww/2, circle.y-wh/2, 10+rms*200, 10+rms*200);
    });
    pop();  
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}
