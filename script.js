// board
var blockSize = 25;
var rows = 20;
var cols = 20;
const board = document.querySelector('#board')
var context;
//snake's head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;
//Snake's body
const snakeBody = [];
//Snake's speed and direction
var velocityX = 0;
var velocityY = 0;
//Food
var foodX 
var foodY 


window.onload = function(){
    //board =document.getElementById('board');
    board.height = rows* blockSize;
    board.width = cols * blockSize;
    context = board.getContext('2d'); // Used for drawing on the canvas
    
    placeFood();
    document.addEventListener('keyup', changeDirection);
    // update()
    setInterval(update,1000);// Every 100 milliseceond,it is going to run the update function
   
}
function update(){
    context.fillStyle = '#000';
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle = 'red';
    context.fillRect(foodX,foodY, blockSize, blockSize);
    if(snakeX === foodX && snakeY === foodY){
        snakeBoby.push([foodX,foodY]);
        placeFood();
    }
    for(let i = snakeBody.length-1; i> 0; i--){
        snakeBody[i] = snakeBody[i-1];
    }   

    if(snakeBody.length){
        snakeBody[0] = (snakeX,snakeY);
    }
    
    context.fillStyle = 'lime';
    snakeX = resetCoordinate(snakeX + (velocityX * blockSize));
    snakeY = resetCoordinate(snakeY +(velocityY * blockSize));
    context.fillRect(snakeX,snakeY, blockSize, blockSize);
    for(let i= 0; i < snakeBody.length; i++){
        context.fillRect(snakeBoby[i][0],snakeBody[i][1]),blockSize,blockSize;


    }
    // The parameters entails the x(snakeX) and y(snakeY) coordinates,width(blockSize) and height(blockSize)
    console.log(snakeX,snakeY);
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
// When the snake head collides with the left wall of the board,the head will be placed at the right wall of the board.
function resetCoordinate(coordinate){
    // if (coordinate < 0) {
    //     coordinate = 475;
    //   } else if (coordinate > 475) {
    //     coordinate = 0;
    //   }

    // check if the coordinate is within the board
    // if true, return the coordinate

    // else check if less than zero
    // if true return return 475
    // if coordinate is more that 475
    // return 0
    if( coordinate >= 0 && coordinate <= 475){
        return coordinate;
    }else if(coordinate < 0){
        return 475;
    }else if(coordinate > 475){
        return 0;
    }
        
    
    //Game over conditions
if(snakeX < 0 || snakeX > cols*blockSize || snakeY < 0 ||snakeY > rows*blockSize){
    gameOver = 'true';
    alert('Game Over!');
}
for (let i =0;snakeBody.length;i++){

}

}