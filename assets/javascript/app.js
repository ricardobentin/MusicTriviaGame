//need to create logic that when button is pressed, game starts
var gameTime = 30;
var intervalId;

$("#start").on("click", function () {
    console.log("CLICKED");
    intervalId = setInterval(decrement, 1000);
    $("#start").hide();
});

function decrement() {
    gameTime--;
    $("#time-left").html("<h2>Time Remaining: " + gameTime + "</h2>");
    if (gameTime === 0) {
        alert("Time Up!");
        clearInterval(intervalId);
    }
}