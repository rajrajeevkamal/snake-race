// Game Variables and Constants

let inputDir={x:0, y:0};
const startSound= new Audio('http://localhost/snake-race/audio/game-intro.wav');
const pauseSound= new Audio('http://localhost/snake-race/audio/game-over.wav');
const gameOverSound= new Audio('http://localhost/snake-race/audio/player-loosing.wav');
const foodSound= new Audio('http://localhost/snake-race/audio/eat-stuff.wav');
const gameWinningSound= new Audio('http://localhost/snake-race/audio/winning.wav');
const keySound= new Audio('http://localhost/snake-race/audio/move.mp3');
const moveSound= new Audio('http://localhost/snake-race/audio/move.wav');


let totalSlot=45;
let lastPaintTime=0;
let speed=10;
let score=0;
let snakeArr=[{x:13,y:15}];

let food={x:6,y:7};
let gamePause=false;
let gameStarted=false;
let gameTitle="Snake Race: ";
let gameDefaultSubtitle =" Dev by Rajeev";
//let gameSubtitle ="";

// Game functions

startSound.muted;
startSound.play();


function changeGameStatus(subTitle='')
{
 if(subTitle != '')
 {
  document.title=gameTitle+subTitle;
 } 
 else 
 {
  document.title=gameTitle+gameDefaultSubtitle;
 }
}



function main(ctime) 
{

  
  

  if(!gamePause)
  {
    window.requestAnimationFrame(main);
    moveSound.muted;
    moveSound.play();
   
  } 
  else
  {
    pauseSound.play();
    moveSound.pause(); 
  }
 
 //console.log(ctime);
 if((ctime-lastPaintTime)/1000 < 1/speed)
 {
  return;  
 }
 lastPaintTime=ctime;
 gameEngine();

}

function isCollide(snkArr)
{
  let selfCollide=false;  
  snkArr.forEach((e,index)=>{
   
  
   if(index != 0)
   {
    if((e.x == snkArr[0].x) && (e.y == snkArr[0].y)) 
    {
     selfCollide=true;
     return true;
    }
   }
  })

 if((selfCollide) || ((snkArr[0].x == '0') || (snkArr[0].x == totalSlot) || (snkArr[0].y == '0') || (snkArr[0].y == totalSlot)) )
 {
  gameOverSound.play();
  return true;  
 }
 else
 {
  return false;  
 }
  
}

function gameEngine()
{
  // Updating the snake and food
  


  if(isCollide(snakeArr))
  {
    moveSound.pause();
    
    inputDir={x:0, y:0};
    changeGameStatus('Game Over !!!');
    alert('Game Over!!! Press any key to play again.'); 
    snakeArr=[{x:13,y:15 }];   
    moveSound.play();
    score=0;
    changeGameStatus();
  }

   if((snakeArr[0].x === food.x) && (snakeArr[0].y === food.y))
   {
    foodSound.play();
    a=2;
    b=totalSlot;
    snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y});

    food={x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())};
   }

   // Moving the snake

   //alert((snakeArr.length -2));

   for(let i=(snakeArr.length -2); i >= 0; i--)
   {
    snakeArr[i+1]={...snakeArr[i]};
   }

   snakeArr[0].x +=inputDir.x;
   snakeArr[0].y +=inputDir.y;


  // Display the snake.
  board.innerHTML="";
  snakeArr.forEach((e,index)=>{

    snakeElement=document.createElement("div");
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    
    //console.log(snakeArr);

    
    if(index === 0)
    {
      snakeElement.classList.add('head');   
    }
    else 
    {
      snakeElement.classList.add('snake');
    }
    board.appendChild(snakeElement);
    

  });
  
   // Display the food


    foodElement=document.createElement("div");
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

 



}




 // Logic starts here
 if(!gameStarted)
 {

  changeGameStatus();
  window.requestAnimationFrame(main);
  gameStarted=true;
 
 }
 

 window.addEventListener('keydown', e => {
 // start the game
 inputDir={x:0,y:1};
 moveSound.play();

 if(e.key == ' ')
 {
  gamePause=true; 
  changeGameStatus('Paused !!!'); 
}
 else // resume the game
 {
  gamePause=false; 
  window.requestAnimationFrame(main);
  changeGameStatus('Playing');

 }
 
 
 switch (e.key) {

 

  case "ArrowUp":
  inputDir.x=0;
  inputDir.y=-1;

  break;
  case "ArrowDown":
    inputDir.x=0;
    inputDir.y=1;
    break;

  case "ArrowLeft":
    inputDir.x=-1;
    inputDir.y=0;
    break;

  case "ArrowRight":
    inputDir.x=1;
    inputDir.y=0;
    break;


  default:
    
  break;      

 } 



})