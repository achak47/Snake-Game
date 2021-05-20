// Game constants
alert("Press any arrow key to start AND Select a mode") ;
let inputDir = {x: 0, y: 0};
let score = 0 ;
let food = { x: 6 , y: 7} ;
const foodsound = new Audio('music/mixkit-chewing-something-crunchy-2244.wav') ;
const gameoversound = new Audio('music/mixkit-failure-arcade-alert-notification-240.wav') ;
const movementsound = new Audio('music/Rattle-Snake-Hissing-A1-www.fesliyanstudios.com.mp3') ;
let lastPaintTime = 0 ;
let speed = 0 ;
let snakearr = [
    {x:13, y:15} , //It is the snake head position , the origin here is the top left corner , downwards y +ve , rightwards x +ve
] ; 
//Button functionality

document.getElementById('easy').addEventListener('click' ,()=>{
    speed = 3 ;
    console.log('easy') ;
    document.getElementById('easy').style.backgroundColor = 'red' ;
    document.getElementById('medium').style.backgroundColor = 'springgreen' ;
    document.getElementById('hard').style.backgroundColor = 'springgreen' ;
    setHighscore() ;
}) ;
document.getElementById('medium').addEventListener('click' ,()=>{
    speed = 6 ;
    console.log('medium') ;
    document.getElementById('easy').style.backgroundColor = 'springgreen' ;
    document.getElementById('medium').style.backgroundColor = 'red' ;
    document.getElementById('hard').style.backgroundColor = 'springgreen' ;
    setHighscore() ;
}) ;
document.getElementById('hard').addEventListener('click' ,()=>{
    speed = 10 ;
    console.log('hard') ;
    console.log(speed) ;
    document.getElementById('easy').style.backgroundColor = 'springgreen' ;
    document.getElementById('medium').style.backgroundColor = 'springgreen' ;
    document.getElementById('hard').style.backgroundColor = 'red' ;
    setHighscore() ;
}) ;

// All Game functions 
 function main(ctime){
    window.requestAnimationFrame(main) ; // The game loop
    //console.log(ctime) ;
    if((ctime-lastPaintTime)/1000 < 1/speed)
    {
        return ;
    }
    lastPaintTime = ctime ;
    gameEngine() ;
}
function isCollide(snake){
  // If u strike yourself
  for(let i = 1 ; i<snakearr.length ; i++)
  {
      if(snake[i].x === snake[0].x && snake[i].y === snake[0].y )
      {
        gameoversound.play() ;
          return true ;
      }
  }
  //If u strike the wall
  if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
    gameoversound.play() ;
    return true;
}
  return false ;
}
function gameEngine(){
    // Part 1 : Updating the snake array
     if(isCollide(snakearr))
     {
         inputDir = {x:0 , y:0} ;
         alert("Game Over !!! Press any key to play again") ;
         snakearr = [{x:13, y:15}] ;
         score = 0 ;
         scorebox.innerHTML = "Score :"+score ;
     } 
   // If food is eaten , then increment the score and regenerate the food  
    if(snakearr[0].y === food.y && snakearr[0].x === food.x)
    {
        score += 1 ;
        if(speed == 3)
        {
        if(score>highscoreval)
        {
            highscoreval = score ;
            console.log(highscoreval) ;
            localStorage.setItem("highscore", JSON.stringify(highscoreval)) ;
            highscorebox.innerHTML = "Highscore :"+ highscoreval ;
        } 
        }   
        if(speed == 6)
        {
            if(score>highscoremedval)
            {
                highscoremedval = score ;
                console.log(highscoremedval) ;
                localStorage.setItem("highscoremed", JSON.stringify(highscoremedval)) ;
                highscorebox.innerHTML = "Highscore :"+ highscoremedval ;
            } 
        } 
        if(speed == 10)
        {
            if(score>highscorehardval)
            {
                highscorehardval = score ;
                console.log(highscorehardval) ;
                localStorage.setItem("highscorehard", JSON.stringify(highscorehardval)) ;
                highscorebox.innerHTML = "Highscore :"+ highscorehardval ;
            } 
        }           
        scorebox.innerHTML = "Score :"+score ;
        foodsound.play() ;
        snakearr.unshift({x:snakearr[0].x+inputDir.x , y:snakearr[0].y+inputDir.y }) ;
        food = {x: Math.round(1+(15)*Math.random()) , y: Math.round(1+(15)*Math.random())} ;
 // Math.round(a+(b-a)*Math.random()) , This is the syntax for generating a random number between a and b , Math.random() returns a number between 0 and 1 .
 // Here we are generating between 1 and 15 .  
  }
  // Moving the snake
  for(let i = snakearr.length -2 ; i>=0 ; i--)
  {
     snakearr[i+1] = {...snakearr[i]} ; // Destructuring
  }
  snakearr[0].x += inputDir.x ;
  snakearr[0].y += inputDir.y ;
    // Part 2 : Display the snake
    document.getElementById("board").innerHTML = "" ;
    snakearr.forEach((e,index)=>{
         snakeElement = document.createElement("div") ;
         snakeElement.style.gridRowStart = e.y ;
         snakeElement.style.gridColumnStart = e.x ;
         if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
         document.getElementById("board").appendChild(snakeElement) ;
    }) ;
    // part 3 : Display the food
         FoodElement = document.createElement("div") ;
         FoodElement.style.gridRowStart = food.y ;
         FoodElement.style.gridColumnStart = food.x ;
         FoodElement.classList.add('food') ;
         document.getElementById("board").appendChild(FoodElement) ;
}
// Main logic starts here
function setHighscore(){
    let highscore = localStorage.getItem('highscore') ;
    let highscoremed = localStorage.getItem('highscoremed') ;
    let highscorehard = localStorage.getItem('highscorehard') ;
if(speed == 3)
{
if(highscore === null)
{
    highscoreval = 0 ;
    localStorage.setItem("highscore", JSON.stringify(highscoreval)) ;
}
else{
    highscoreval = JSON.parse(highscore) ;
    highscorebox.innerHTML = "Highscore :"+ highscore ;
}
console.log('Bohot easy') ;
}
if(speed == 6)
{
if(highscoremed === null)
{
    highscoremedval = 0 ;
    localStorage.setItem("highscoremed", JSON.stringify(highscoremedval)) ;
}
else{
    highscoremedval = JSON.parse(highscoremed) ;
    highscorebox.innerHTML = "Highscore :"+ highscoremedval ;
}
}
if(speed == 10)
{
if(highscorehard === null)
{
    highscorehardval = 0 ;
    
    localStorage.setItem("highscorehard", JSON.stringify(highscorehardval)) ;
}
else{
    highscorehardval = JSON.parse(highscorehard) ;
    highscorebox.innerHTML = "Highscore :"+ highscorehardval ;
}
console.log('Bohot hard') ;
}
}

window.requestAnimationFrame(main) ; // It only calls the main function once so inorder to repeat it multiple times we use the game loop 
// ie call this function inside the main function , in other words it is a function recursion
// its better to use request animation frame than set timeout as it gives highest fps and also renders well .
window.addEventListener('keydown', e =>{   // Arguments are an event and a corresponding function
   if(speed)
   {
   inputDir = {x:0, y:1 } // Start the game 
   movementsound.play() ;
   switch(e.key){
       case "ArrowUp": console.log("ArrowUp") ;
                       inputDir.x = 0 ;
                       inputDir.y =  -1 ;
                       break ;
       case "ArrowDown": console.log("ArrowDown") ;
                        inputDir.x = 0 ;
                        inputDir.y =  1 ;
                        break ;
       case "ArrowLeft": console.log("ArrowLeft") ;
                        inputDir.x = -1 ;
                        inputDir.y =  0 ;
                       break ;  
       case "ArrowRight": console.log("ArrowRight") ;
                         inputDir.x = 1 ;
                         inputDir.y =  0 ;
                       break ;   
       default : break ;          
   }
}
else{
    alert('Pls choose mode') ;
}
}) ;
