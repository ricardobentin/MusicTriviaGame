//hide the submit button
$("#submit").hide();
//need to create logic that when button is pressed, game starts
var gameTime = 60;
var intervalId;

//create question object
var questions = [
    {
        ques: "Who was the first drummer of the Beatles?",
        ans: ["Pete Best", "Ringo Starr", "Travis Barker", "Buddy Rich"],
        name: "firstBeatlesDrummer",
        correct: "Pete Best",
        divClass: ".firstBeatlesDrummer"
    },
    {
        ques: "What city is synonymous with grunge?",
        ans: ["New York", "Los Angeles", "Seattle", "London"],
        name: "grunge",
        correct: "Seattle",
        divClass: ".grunge"
    },
    {
        ques: "What sport was Bob Marley's skill considered to be at a professional level?",
        ans: ["Cricket", "Soccer", "Tennis", "Basketball"],
        name: "bobMarley",
        correct: "Soccer",
        divClass: ".bobMarley"
    },
    {
        ques: "Who is one famous musician that died on the day the music died?",
        ans: ["Don McLean", "Prince", "Amy Winehouse", "Buddy Holly"],
        name: "musicDied",
        correct: "Buddy Holly",
        divClass: ".musicDied"
    },
    {
        ques: "Who is not a left-handed guitarist?",
        ans: ["Kurt Cobain", "Paul McCartney", "Slash", "Jimi Hendrix"],
        name: "leftHanded",
        correct: "Slash",
        divClass: ".leftHanded"
    },
    {
        ques: "What famous song's bass line was sampled for Shaggy's song 'Angel'?",
        ans: ["Queen - Under Pressure", "The Steve Miller Band - The Joker", "The Seinfeld Intro", "Motörhead - Ace of Spades"],
        name: "angel",
        correct: "The Steve Miller Band - The Joker",
        divClass: ".angel"
    },



]
//labels for each answer option
var labels = ["first", "second", "third", "forth"];


//click to start the game
$("#start").on("click", function () {
    console.log("CLICKED");
    intervalId = setInterval(decrement, 1000);
    $("#start").hide();
    $("#submit").show();
    questionDisplay();
});

//function to display the questions on the page by looping through the questions array and then appending the answer options by looping through the answer options corresponding to each question
function questionDisplay() {
    for (var j = 0; j < questions.length; j++) {
        $('.questions').prepend(`<div class= ${questions[j].name}></div>`);
        $(questions[j].divClass).append(`<div class ="ques-title">${questions[j].ques} </div>`);
        // loops through answers for each radio button
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append('<input type="radio"  name="' + questions[j].name + '" value="' + questions[j].ans[i] + '"/><label for="' + labels[i] + '">' + questions[j].ans[i] + '</label>');
        }
        $('.questions').prepend(`<hr />`);

    }
}

$("#submit").on("click", function(){
    var correctAnswers = 0;
    var wrongAnswers = 0;
    var unAnswered = 0;

    //for loop to compare the answers the user selected via radio buttons to the correct answers in the questions array
    for (var i = 0; i<questions.length; i++){
        if ($('input:radio[name="' + questions[i].name + '"]:checked').val() === questions[i].correct){
            correctAnswers++;
            console.log(`Correct Answer count: ${correctAnswers}`);
        }
        else{
            wrongAnswers++;
            console.log(`Wrong Answer count: ${wrongAnswers}`);
        }
    }

    //need to stop the timer
    clearInterval(intervalId);
    //hide the questions
    $(".questions").hide();
    //show stats on the page
    $("#results").append(`Correct Answers: ${correctAnswers}<br> Wrong Answers: ${wrongAnswers} <br> Unanswered Questions: ${unAnswered}`);
})

function decrement() {
    gameTime--;
    $("#time-left").html("<h2>Time Remaining: " + gameTime + "</h2>");
    if (gameTime === 0) {
        alert("Time Up!");
        clearInterval(intervalId);
    }
}