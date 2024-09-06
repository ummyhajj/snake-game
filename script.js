// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
//Food
var foodX 
var foodY 
window.onload = function(){
    board =document.getElementById('board');
    board.height = rows* blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // Used for drawing on the canvas
    
    placeFood();
    document.addEventListener('keyup', changeDirection);
    update();
   
}
function update(){
    context.fillStyle = '#000';
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = 'line';
    context.fillRect(snakeX,snakeY, blockSize, blockSize);
    // The parameters entails the x(snakeX) and y(snakeY) coordinates,width(blockSize) and height(blockSize)

    context.fillStyle = 'red';
    context.fillRect(foodX,foodY, blockSize, blockSize);
}
function changeDirection(){

}
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows ) * blockSize;

}