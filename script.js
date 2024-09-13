const board = document.getElementById('board');
const ctx = board.getContext('2d');
const scoreElement = document.getElementById('scoreValue');
const highScoreElement = document.getElementById('highScoreValue');
const startButton = document.getElementById('startButton');
const gameOverScreen = document.getElementById('gameOverScreen');
const finalScoreElement = document.getElementById('finalScore');
const restartButton = document.getElementById('restartButton');

const gridSize = 20;
const tileCount = board.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let food = { x: 15, y: 15, type: 'normal' };
let dx = 0;
let dy = 0;
let score = 0;
let highScore = 0;
let gameSpeed = 100;
let gameLoop;
let isPaused = false;
let isGameStarted = false;

const foodTypes = [
    { type: 'normal', color: 'red', points: 1, probability: 0.7 },
    { type: 'bonus', color: 'gold', points: 3, probability: 0.2 },
    { type: 'speed', color: 'purple', points: 1, probability: 0.1 }
];

function drawGame() {
    if (isPaused) return;

    clearBoard();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();
    updateScore();
}

function clearBoard() {
    ctx.fillStyle = isGameStarted ? 'black' : 'white';
    ctx.fillRect(0, 0, board.width, board.height);
}

function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += foodTypes.find(f => f.type === food.type).points;
        if (food.type === 'speed') {
            gameSpeed = Math.max(50, gameSpeed - 5);
            clearInterval(gameLoop);
            gameLoop = setInterval(drawGame, gameSpeed);
        }
        generateFood();
    } else {
        snake.pop();
    }
}

function drawSnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize - 2, gridSize - 2);
    });
}

function drawFood() {
    ctx.fillStyle = foodTypes.find(f => f.type === food.type).color;
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize - 2, gridSize - 2);
}

function generateFood() {
    const randomType = Math.random();
    let cumulativeProbability = 0;
    food.type = foodTypes.find(f => {
        cumulativeProbability += f.probability;
        return randomType <= cumulativeProbability;
    }).type;

    food.x = Math.floor(Math.random() * tileCount);
    food.y = Math.floor(Math.random() * tileCount);
}

function checkCollision() {
    const head = snake[0];

    if (head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount) {
        gameOver();
    }

    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function gameOver() {
    clearInterval(gameLoop);
    if (score > highScore) {
        highScore = score;
        localStorage.setItem('snakeHighScore', highScore);
        highScoreElement.textContent = highScore;
    }
    finalScoreElement.textContent = score;
    gameOverScreen.style.display = 'block';
    isGameStarted = false;
}

function updateScore() {
    scoreElement.textContent = score;
}

function changeDirection(event) {
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;
    const SPACE_KEY = 32;

    const keyPressed = event.keyCode;

    if (keyPressed === SPACE_KEY) {
        togglePause();
        return;
    }

    if (isPaused) return;

    const goingUp = dy === -1;
    const goingDown = dy === 1;
    const goingRight = dx === 1;
    const goingLeft = dx === -1;

    if (keyPressed === LEFT_KEY && !goingRight) {
        dx = -1;
        dy = 0;
    }

    if (keyPressed === UP_KEY && !goingDown) {
        dx = 0;
        dy = -1;
    }

    if (keyPressed === RIGHT_KEY && !goingLeft) {
        dx = 1;
        dy = 0;
    }

    if (keyPressed === DOWN_KEY && !goingUp) {
        dx = 0;
        dy = 1;
    }
}

function togglePause() {
    isPaused = !isPaused;
    if (isPaused) {
        clearInterval(gameLoop);
    } else {
        gameLoop = setInterval(drawGame, gameSpeed);
    }
}

function startGame() {
    snake = [{ x: 10, y: 10 }];
    generateFood();
    dx = 0;
    dy = 0;
    score = 0;
    gameSpeed = 100;
    isPaused = false;
    isGameStarted = true;
    updateScore();
    startButton.style.display = 'none';
    gameOverScreen.style.display = 'none';
    clearBoard(); // Clear the board with the new background color
    gameLoop = setInterval(drawGame, gameSpeed);
}

function init() {
    highScore = localStorage.getItem('snakeHighScore') || 0;
    highScoreElement.textContent = highScore;
    document.addEventListener('keydown', changeDirection);
    startButton.addEventListener('click', startGame);
    restartButton.addEventListener('click', startGame);
    clearBoard(); // Initial clear to set the white background
}

init();