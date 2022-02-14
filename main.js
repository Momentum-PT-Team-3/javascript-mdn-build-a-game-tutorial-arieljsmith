// ==========================================
// V A R I A B L E  D E F I N I T I O N S
// ==========================================

// Store the canvas element and create the ctx variable to store rendering tool
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

// Define the ball radius to help with collision detection
var ballRadius = 10;

// Define the variables to hold the starting position for our ball
var x = canvas.width/2;
var y = canvas.height-30;

// Define variables that will add to x and y to give the ball the appearance of
// movement
var dx = 2;
var dy = -2;

// Define the paddle to hit the ball
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

// Tracking button presses
var rightPressed = false;
var leftPressed = false;


// ==========================================
// K E Y U P / D O W N  E V E N T  L I S T E N E R S
// ==========================================

// Listen for key presses
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


// ==========================================
// K E Y U P / D O W N  F U N C T I O N S
// ==========================================

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


// ==========================================
// D R A W  F U N C T I O N S
// ==========================================

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to clear the canvas, draw the ball calling the drawBall
// function, and get the ball moving
function draw() {
    // Clear the canvas so movement doesn't leave a trail
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball and paddle
    drawBall();
    drawPaddle();

    // Check if the ball is touching the bottom or top edges of the canvas
    if(y + dy > canvas.height-ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }

    // Check if the ball is touching the right or left edges of the canvas
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Check if the cursor keys are pressed; if so, move accordingly
    // within the bounds of the canvas
    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }

    // Get the ball rolling...er, moving.
    x += dx;
    y += dy;

}


// ==========================================
// M I S C E L L A N E O U S
// ==========================================

// Call draw() which also calls drawBall(); set draw interval
setInterval(draw, 10);


// ==========================================
// N O T E S
// ==========================================

// N/A
