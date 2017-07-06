var song;
var yvalues; // Using an array to store height values for the wave

var ww, wh; //window width and window height
var heightCoeff;
var message = "EVERYTHINGS GONNA BE ALRIGHT";

var afterimages = [];
var fadeRate = 40;
var messageFont;
var messageX;
var messageY;

function createAfterimage(inputColor, xPos, yPos){
    var afterimage = {
        color:inputColor,
        x:xPos,
        y:yPos
    };
    return afterimage;
}

function preload() {
    song = loadSound('../media/sound/EverythingsGonnaBeAlright.wav');
    //  messageFont = loadFont('../media/fonts/28 Days Later.ttf');
}

function setup() {
    ww = 1024;
    wh = 720;
    createCanvas(ww, wh);
    
    heightCoeff = (wh*.80)/255;
    
    messageX = ww/4;
    messageY = wh/2;
    
    //AUDIO STUFF
    // create a new Amplitude analyzer
    song.loop();
    fft = new p5.FFT();
    //analyzer.smooth(0.99);

    // Patch the input to an volume analyzer
    fft.setInput(song);
}

function draw() {
    background(0);
    yvalues = fft.analyze();
    // Get the average (root mean square) amplitude
    calcWave();
    renderWave(color(190,35,35,100));
    renderAfterimages();
    renderText(messageFont, color(255,200,100,255), messageX + randomInt(-2,2), messageY + randomInt(-2,2));
    
}

function calcWave() {
    //shift all values over left by one
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

function renderText(font, inputColor, x, y){
    noStroke();
    fill(inputColor);
    //textFont(font, 36);
    text(message, x, y);
    
    var reducedColor = color(red(inputColor)/2,blue(inputColor)/2,green(inputColor)/2,255);
    afterimages.push(createAfterimage(reducedColor, x + randomInt(-20,20), y + randomInt(-20,20)));
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

function randomInt(min, max){
    return Math.floor(Math.random() * (max-min)) + min;
}