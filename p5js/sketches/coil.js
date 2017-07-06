//Edited from the sine wave example from p5js.org
var xspacing = 16; // Distance between each horizontal location
var w; // Width of entire wave
var dx; // Value for incrementing x
var yvalues; // Using an array to store height values for the wave
var dyvalues;
var minDY;
var maxDY;

//Wave properties
var theta = 0.0; // Start angle at 0
var amplitude = 75.0; // Height of wave
var period = 100.0; // How many pixels before the wave repeats
var angularVelocity = 0.1; // Theta increment step

function setup() {
    createCanvas(710, 400);
    w = width + 16;
    dx = (TWO_PI / period) * xspacing;
    yvalues = new Array(floor(w / xspacing));
    dyvalues = new Array(floor(w / xspacing));
    minDY = 0;
    maxDY = 0;
}

function draw() {
    background(0);
    calcWave();
    renderWave();
}

function calcWave() {
    // Increment theta (try different values for 
    // 'angular velocity' here)
    theta += angularVelocity;

    // For every x value, calculate a y value with sine function
    var x = theta;
    for (var i = 0; i < yvalues.length; i++) {
        yvalues[i] = sin(x) * amplitude;
        if (i == 0)
            dyvalues[i] = yvalues[i] - (sin(x - angularVelocity) * amplitude);
        else
            dyvalues[i] = yvalues[i] - yvalues[i - 1];

        if (dyvalues[i] > maxDY)
            maxDY = dyvalues[i];
        if (dyvalues[i] < minDY)
            minDY = dyvalues[i];

        x += dx;
    }
}

function renderWave() {
    noStroke();
    var velocityCoefficient;
    // A simple way to draw the wave with an ellipse at each location
    for (var x = 0; x < yvalues.length; x++) {
        velocityCoefficient = percentDistanceBetween(dyvalues[x], minDY * 3, maxDY);
        fill(255 * velocityCoefficient);
        ellipse(x * xspacing, height / 2 + yvalues[x], 16 * velocityCoefficient, 16 * velocityCoefficient);
    }
}


function percentDistanceBetween(x, lo, hi) {
    var result = (x - lo) / (hi - lo);
    if (result < 0)
        return 0;
    if (result > 100)
        return 100;
    else
        return result;
}