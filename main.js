// Store the canvas element and create the ctx variable to store rendering tool
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define the variables to hold the starting position for our ball
var x = canvas.width/2;
var y = canvas.height-30;

// Define variables that will add to x and y to give the ball the appearance of
// movement
var dx = 2;
var dy = -2;

// Define the ball radius to help with collision detection
var ballRadius = 10;

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to clear the canvas, draw the ball calling the drawBall
// function, and get the ball moving
function draw() {
    // Clear the canvas so movement doesn't leave a trail
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball
    drawBall();

    // Get the ball rolling...er, moving.
    x += dx;
    y += dy;

    // Check if the ball is touching the bottom or top edges of the canvas
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Check if the ball is touching the right or left edges of the canvas
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
}

// Call draw() which also calls drawBall(); set draw interval
setInterval(draw, 10);
