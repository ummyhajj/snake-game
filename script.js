// board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
//snakes head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

var velocityX = 0;
var velocityY = 0;
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
    // update()
    setInterval(update,1000/10);// Every 100 milliseceond,it is going to run the update function
   
}
function update(){
    context.fillStyle = '#000';
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX,foodY, blockSize, blockSize);
    if(snakeX === foodX && snakeY === foodY){

    }
    context.fillStyle = 'lime';
    snakeX += velocityX * blockSize;
    snakeY += velocityY * blockSize;
    context.fillRect(snakeX,snakeY, blockSize, blockSize);
    // The parameters entails the x(snakeX) and y(snakeY) coordinates,width(blockSize) and height(blockSize)
    
}
function changeDirection(e){
    if (e.code =='ArrowUp' && velocityY !=1){
        velocityX =0;
        velocityY = -1;
    }
    else if (e.code =='ArrowDown' && velocityY !=-1){
        velocityX =0;
        velocityY = 1;
    }
    else if (e.code =='ArrowLeft'&& velocityX !=-1){ 
        velocityX =-1;
        velocityY = 0;
    }
    else if (e.code =='ArrowRight' && velocityX !=1){
        velocityX =1;
        velocityY = 0;
    }
    
}
function placeFood(){
    foodX = Math.floor(Math.random() * cols) * blockSize;
    foodY = Math.floor(Math.random() * rows ) * blockSize;

}