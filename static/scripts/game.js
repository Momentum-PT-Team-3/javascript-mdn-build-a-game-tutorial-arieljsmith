// ==========================================
// V A R I A B L E  D E F I N I T I O N S
// ==========================================

// Store the canvas element and create the ctx variable to store rendering tool
let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

// Define the ball radius to help with collision detection
let ballRadius = 10;

// Define the variables to hold the starting position for our ball
let x = canvas.width / 2;
let y = canvas.height - 30;

// Define variables that will add to x and y to give the ball the appearance of
// movement
let dx = 2;
let dy = -2;

// Define the paddle to hit the ball
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2;

// Define laser fire
let laserHeight = 10;
let laserWidth = 3;
let laserX = 0;
let laserY = 0;

// Tracking button presses
let rightPressed = false;
let leftPressed = false;
let spacePressed = false;

// Brick variables
let brickRowCount = 3;
let brickColumnCount = 5;
let brickWidth = 75;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

// define score form submission visibility
<<<<<<< HEAD
let scoreFormVisible = false
=======
let scoreFormVisible = false;
>>>>>>> main

// Handling the brick array
let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}

// Score variable
let score = 0;

// Lives variable
let lives = 3;


// ==========================================
// K E Y U P / D O W N  E V E N T  L I S T E N E R S
// ==========================================

// Listen for key presses or mouse movement
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

// Listen for any clicks
document.addEventListener("keypress", keyPressHandler, false);


// ==========================================
// M O U S E M O V E  F U N C T I O N S
// ==========================================

function mouseMoveHandler(e) {
    let relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}


// ==========================================
// K E Y U P / D O W N  F U N C T I O N S
// ==========================================

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if (e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}


// ==========================================
// C O L L I S I O N  D E T E C T I O N  F U N C T I O N 
// ==========================================

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        scoreFormVisible = true
                        scoreForm.classList.remove('is-hidden')
                        console.log(score);
                        alert("YOU WIN, CONGRATULATIONS!");
<<<<<<< HEAD
                        // this is where you win
                        // make score form visible
=======
>>>>>>> main
                        console.log(document.location)
                        // document.location.reload();
                    }
                }
            }
        }
    }
}


// ==========================================
// D R A W  O B J E C T  F U N C T I O N S
// ==========================================

// Function to draw the score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

// Function to draw lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

// Function to draw the ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to draw the paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

// Function to draw laser beam
function drawPewPew() {
    ctx.beginPath();
    ctx.rect(laserX, canvas.height / 2, laserWidth, laserHeight);
    ctx.fillStyle = "red";
    ctx.fill();
    ctx.closePath();
}

// Function to draw the bricks
function drawBricks() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                let brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                let brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}


// ==========================================
// K E Y P R E S S  F U N C T I O N S
// ==========================================

function keyPressHandler(e) {
    if (e.keyCode == 32) {
        spacePressed = true;
        laserX = paddleX;
    }
}


// ==========================================
// M A I N  D R A W  F U N C T I O N S
// ==========================================

// Function to clear the canvas, draw the ball calling the drawBall
// function, and get the ball moving
function draw() {
    // console.log('draw called')
    // console.log(scoreFormVisible)
    // Clear the canvas so movement doesn't leave a trail
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the ball, paddle, bricks, score, and lives
    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();

    // Activate collision detection
    collisionDetection();

    // Check if the ball is touching the bottom or top edges of the canvas.
    // If it  hits the paddle, bounce. Otherwise if it touches the bottom edge
    // of the canvas, it's game over.
    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            lives--;
            if (!lives) {
                scoreFormVisible = true
                scoreForm.classList.remove('is-hidden')
                console.log(scoreForm.classList)
                alert("GAME OVER");
                // this is where you lose
                // make score form visible
                console.log(score)
                // document.location.reload();
            }
            else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
            }
        }
    }

    // Check if the ball is touching the right or left edges of the canvas
    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    // Check if the cursor keys are pressed; if so, move accordingly
    // within the bounds of the canvas
    if (rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width) {
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if (leftPressed) {
        paddleX -= 7;
        if (paddleX < 0) {
            paddleX = 0;
        }
    }

    // Check if the space has been pressed, and if so...fire???
    if (spacePressed) {
        drawPewPew();
        // let laserX = PaddleX;
    }

    // Get the ball rolling...er, moving.
    x += dx;
    y += dy;

    // Causes the draw() function to call itself over and over again:
    // Check to see if the game is over and the form is visible
    if (!scoreFormVisible){
    requestAnimationFrame(draw);
    } else {
        console.log('paused')
    }
}


// ==========================================
// M I S C E L L A N E O U S
// ==========================================

// Create a variable that calls draw() which also calls drawBall(); set draw interval


draw();


// ==========================================
// N O T E S
// ==========================================

// N/A