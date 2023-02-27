var level = 0;
var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var gameCounter = 0;
var userCounter = 0;
var started = false;

$("body").keydown(function () {
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        started = true;
        $(".start-button").text("Playing..");
    }
});

$(".start-button").click(function (){
    if (!started) {
        $("h1").text("level " + level);
        nextSequence();
        $(".start-button").text("Playing..");
        started = true;
    }
});

$(".btn").click(function () {
    
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor);
    playAudio(userChosenColor);
    animatePress(userChosenColor);
    gameLogic();
    
})

function nextSequence() {
    level++;
    $("h1").text("level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playAudio(randomChosenColor);
    userCounter = 0;
    userClickedPattern = [];
}
function playAudio(randomChosenColor) {
    var audio = new Audio('sounds/' + randomChosenColor + '.mp3');
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}
function gameLogic() {
    if (gamePattern[userCounter] === userClickedPattern[userCounter]) {
        userCounter++;
        if (userCounter === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else {
        playAudio("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game Over ☠, Press Any Key to Restart");
        $(".start-button").text("Restart");
        startOver();
    }
}
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}