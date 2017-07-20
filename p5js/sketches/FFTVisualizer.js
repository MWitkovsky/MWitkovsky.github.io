var song, analyzer;
var xspacing = 16; // Distance between each horizontal location
var w; // Width of entire wave
var period = 500.0; // How many pixels before the wave repeats
var dx; // Value for incrementing x
var yvalues; // Using an array to store height values for the wave
var rms;

var ww, wh; //window width and window height
var heightCoeff;

function preload() {
    song = loadSound('../../media/sound/DeathOfTheWhizzler.mp3');
}

function setup() {
    ww = 1024;
    wh = 720;
    createCanvas(ww, wh);
    song.loop();
    xspacing = (ww/1024)/2;
    heightCoeff = (wh*.80)/255;
    // create a new Amplitude analyzer
    analyzer = new p5.Amplitude();
    fft = new p5.FFT();
    //analyzer.smooth(0.99);

    // Patch the input to an volume analyzer
    analyzer.setInput(song);
    fft.setInput(song);

    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
}

function draw() {
    background(0);
    yvalues = fft.analyze();
    // Get the average (root mean square) amplitude
    rms = analyzer.getLevel();
    calcWave(rms);
    renderWave();
}

function calcWave(height) {
    //shift all values over left by one
    for (var i = 0; i < yvalues.length-1; i++) {
        yvalues[i] *= heightCoeff;
    }
}

function renderWave() {
    noStroke();
    fill(255);
    // A simple way to draw the wave with an ellipse at each location
    for (var x = 0; x < yvalues.length; x++) {
        ellipse((x+ww) * xspacing, wh - yvalues[x], 5, 5);
    }
    for (var x = 0; x < yvalues.length; x++) {
        ellipse(x * xspacing, wh - yvalues[yvalues.length-1-x], 5, 5);
    }
}