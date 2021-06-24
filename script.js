"use strict";

$("#myNumber").focus();
let winSound = new Audio("audio/won.wav");
let loseSound = new Audio("audio/lose.wav");
let wrongGuessSound = new Audio("audio/wrongGuess.wav");
let randomNumber = Math.floor(Math.random()*20)+1;
let userinput;
let leftTurns = 10; 
let highScore=0;
const screenNumber = $(".screenNumber");
const highScoreDisplay = $("#heighScoreDisplay");
const score = $("#score");
const correctNum = $("#correctNum");
let winStatus = false;
let checkWinStatus = (guessNum,randomNum)=>{
  
    if(guessNum === randomNum){
        return true;
    } 
    else{
        return false;
    }
}

const checkRange = (guessNum,randomNum)=>{
    if(guessNum > randomNum){
        return `Your Guess is Too High`;
    } 

    if(guessNum < randomNum){
        return `Your Guess is Too Low`;
    } 

}


const gameLoop = ()=>{

        let status = checkWinStatus(Number(userinput),randomNumber);

        if(leftTurns>1){
            if(status){
                screenNumber.text(userinput);
                $("body").css("background-color","green");
                correctNum.text("You Won..!");
                winStatus = true;
                winSound.play();
                $(".continue").removeClass("continue").addClass("win");
                $(".enter").addClass("getRid");
                if(leftTurns>highScore){
                    highScore=leftTurns;
                    highScoreDisplay.text("Heighest Score: "+highScore);
                }
            }else{
                leftTurns--;
                screenNumber.text(userinput);
                score.text("Score:"+leftTurns);
                wrongGuessSound.play();
                
            }
        }else{
            
            score.text("Score:"+ 0);
            screenNumber.text("You lose.!");
            loseSound.play();
            $("body").css("background-color","Red");
            $(".continue").removeClass("continue").addClass("win");
        }
    
}

const resetGame = ()=>{
    randomNumber = Math.floor(Math.random()*20)+1;
    console.log(randomNumber);
    leftTurns = 10;
    $("body").css("background-color","black");
    screenNumber.text("?");
    correctNum.text("Please enter a number :");
    score.text("Score: 10");
    highScoreDisplay.text("Heighest Score: 0");
    highScoreDisplay.text("Heighest Score: "+highScore);
    userinput=$("#myNumber").val(""); 
    $("#myNumber").focus();
    $(".win").removeClass("win").addClass("continue");
    $(".enter").removeClass("getRid");
    winStatus = false;
}



$("#check").click(function(){
    score.text("Score:"+leftTurns);
    userinput=$("#myNumber").val(); 
    screenNumber.text(userinput);
    correctNum.text(`${checkRange(Number(userinput),randomNumber)}`);
    gameLoop();
    $("#myNumber").focus();
    $("#myNumber").val("");
});

$("#reset").click(()=>{
    highScore = 0;
    resetGame();
});

$("body").keydown((e)=>{
    if(e.key=="Enter" && !winStatus){
        score.text("Score:"+leftTurns);
        userinput=$("#myNumber").val();
        screenNumber.text(userinput); 
        correctNum.text(`${checkRange(Number(userinput),randomNumber)}`);
        gameLoop();
        $("#myNumber").focus();
        $("#myNumber").val("");
    }
})

$("#btnContinue").click(()=>{
    resetGame();
    $(".win").removeClass("win").addClass("continue");
});

