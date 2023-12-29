
let userClickPattern=[];
let gamePattern=[];
let buttonColours=["red", "blue", "green", "yellow"];
let level=0;
function nextSequence(){
    let randomNumber=Math.floor(Math.random()*4);
    let randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(50).fadeIn(50);
    playSound(randomChosenColour);
    $('h1').text('Level '+level);
    level++;    
}

function playSound(name){
    new Audio('./sounds/'+name+".mp3").play();
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(() => {
        $("#"+currentColour).removeClass('pressed');
    }, 200);
}
function checkAnswer(currentLevel){
    if (userClickPattern[currentLevel]===gamePattern[currentLevel]) {
        console.log('success');
        return true;
    } else {
        console.log('fail');
        return false;
    }
}

let gameStarted = false; // Variable to track game state
$(document).keypress(function() {
    if (!gameStarted) {
        // Call nextSequence only on the first keypress
        nextSequence();
        gameStarted = true; // Change game state to started
    }
});
$(".btn").click(function(event){
    // console.log(event);
    var userChosenColour=$(this).attr("id");
    console.log(userChosenColour);
    userClickPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    gameStarted=checkAnswer(userClickPattern.length-1);
    if(!gameStarted){
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over, Press Any Key to Restart");
        level=0;
        gamePattern=[];
        userClickPattern=[];
    }   
    else if(userClickPattern.length===gamePattern.length){
        setTimeout(() => {
            nextSequence();
        userClickPattern=[];
        }, 1000);
        
    }
})


