let c = document.getElementById("my-canvas");
let cntx = c.getContext("2d");
const gridSize = 20;
const tileCount = canvas.width;
let snake = [{x: 10, y:10}];
let dx = 0;
let dy = 0;
let frog = {x: 20, y: 20};
let score =0;
function drawSnake() {
    snake.forEach(segment => {
        cntx.fillStyle = "green";
        cntx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    })
}
function drawFrog() {
    cntx.fillStyle = "yellow";
    cntx.fillRect = ""
}
