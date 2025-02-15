let basket = document.getElementById("basket");
let ball = document.getElementById("ball");
let scoreDisplay = document.getElementById("score");
let missesDisplay = document.getElementById("misses");

let score = 0;
let misses = 0;
let basketSpeed = 40;
let ballSpeed = 2;
let ballInterval;
let isDragging = false;
let previousX = 0;

document.addEventListener("keydown", moveBasket);
basket.addEventListener("mousedown", startDrag);
document.addEventListener("mousemove", dragBasket);
document.addEventListener("mouseup", endDrag);

document.addEventListener("keydown", moveBasket);

// Move the basket left and right using arrow keys
function moveBasket(event) {
    let basketLeft = basket.offsetLeft;
    if (event.key === "ArrowLeft" && basketLeft > 0) {
        basket.style.left = basketLeft - basketSpeed + "px";
    }
    if (event.key === "ArrowRight" && basketLeft < window.innerWidth - 100) {
        basket.style.left = basketLeft + basketSpeed + "px";
    }
}

// Start dragging the basket
function startDrag(event) {
    isDragging = true;
    previousX = event.clientX;
}

// Drag the basket horizontally
function dragBasket(event) {
    if (isDragging) {
        let movementX = event.clientX - previousX;
        let basketLeft = basket.offsetLeft;
        basket.style.left = basketLeft + movementX + "px";
        previousX = event.clientX;
    }
}

// End dragging the basket
function endDrag() {
    isDragging = false;
}

// Start the ball falling from a random position
function startBall() {
    let randomPosition = Math.floor(Math.random() * (window.innerWidth - 30));
    ball.style.left = randomPosition + "px";
    ball.style.top = "-30px";
    ballInterval = setInterval(dropBall, 20);
}

// Drop the ball and check if it is caught or missed
function dropBall() {
    let ballTop = ball.offsetTop;
    let basketLeft = basket.offsetLeft;
    let ballLeft = ball.offsetLeft;

    if (ballTop < 570) {
        ball.style.top = ballTop + ballSpeed + "px";
    } else {
        if (ballLeft > basketLeft && ballLeft < basketLeft + 108) {
            // Ball caught
            score++;
            scoreDisplay.innerText = score;
            clearInterval(ballInterval);
            startBall();

            // Change ball color on gaining points
            ball.style.backgroundColor = getRandomColor();


        // Increase ball speed every 10 points
        if (score % 10 === 0) {
        increaseDifficulty();
        basket.style.backgroundColor = getRandomColor();
        }
        
        // // Change background every 50 points
        // if (score % 50 === 0) {
        //     gameContainer.style.backgroundColor = getRandomColor();
        // }

        } else {
            // Ball missed
            misses++;
            missesDisplay.innerText = misses;
            clearInterval(ballInterval);
            if (misses < 5) {
                startBall();
            } else {
                alert("Game Over! Final Score: " + score);
                resetGame();
            }
        }
    }
}

// Function to increase ball speed
function increaseDifficulty() {
    ballSpeed++; // Increase ball falling speed
}

// Function to generate a random color
function getRandomColor() {
    let letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Reset the game
function resetGame() {
    score = 0;
    misses = 0;
    ballSpeed = 2;
    scoreDisplay.innerText = score;
    missesDisplay.innerText = misses;
    startBall();
}

// Start the game
startBall();
