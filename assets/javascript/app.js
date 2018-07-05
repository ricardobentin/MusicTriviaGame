//hide the submit button to start the game
$("#submit").hide();
$("#gameContent").hide();
//declare global variables to keep track of time, correct answers, incorrect answers, and unanswered questions
var gameTime;
var intervalId;
var correctAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
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
    {
        ques: "In what city were the Rolling Stones formed?",
        ans: ["Liverpool", "Manchester", "Bristol", "London"],
        name: "rollingStones",
        correct: "London",
        divClass: ".rollingStones"
    },
    {
        ques: "Who was the first artist to win a Grammy without a record contract?",
        ans: ["Taylor Swift", "Chance the Rapper", "Amy Winehouse", "Beyonce"],
        name: "grammy",
        correct: "Chance the Rapper",
        divClass: ".grammy"
    },
    {
        ques: "What was the first music video played on MTV when it launched on August 1, 1981?",
        ans: ["The Buggles - Video Killed The Radio Star", "Sheena Easton - 9 to 5", "Rick Springfield - Jessie's Girl", "Hall and Oates - Private Eyes"],
        name: "mtv",
        correct: "The Buggles - Video Killed The Radio Star",
        divClass: ".mtv"
    },
    {
        ques: "What is the name of the beat that is featured in all reggaeton songs?",
        ans: ["Paradiddle", "Train Beat", "Money Beat", "Dem Bow"],
        name: "beat",
        correct: "Dem Bow",
        divClass: ".beat"
    },

]
//create logic that when the button is pressed, game starts
//if the user selects Challenge Mode, then gameTime = 30 seconds
$("#hard").on("click", function () {
    gameTime = 30;
    intervalId = setInterval(decrement, 1000);
    $("#start").hide();
    $("#submit").show();
    $("#gameContent").show();
    $("#startScreen").remove();
    //function call to generate the questions and write them to the page
    questionDisplay();
});
//if the user selects Easy Mode, then gameTime = 60 seconds
$("#easy").on("click", function () {
    gameTime = 60;
    intervalId = setInterval(decrement, 1000);
    $("#start").hide();
    $("#submit").show();
    $("#gameContent").show();
    $("#startScreen").remove();
    //function call to generate the questions and write them to the page
    questionDisplay();
});
//function to display the questions on the page by looping through the questions array and then appending the answer options by looping through the answer options corresponding to each question
function questionDisplay() {
    for (var j = 0; j < questions.length; j++) {
        $('.questions').prepend(`<div class= ${questions[j].name}></div>`);
        $(questions[j].divClass).append(`<h2>${questions[j].ques}</h2`);
        // loops through answers for each radio button and write them to the page as radio buttons
        for (var i = 0; i <= 3; i++) {
            $(questions[j].divClass).append(`<input type="radio"  name="${questions[j].name}" value="${questions[j].ans[i]}"/><label>${questions[j].ans[i]}</label>`);
        }
        $('.questions').prepend(`<hr />`);

    }
}
//create a function that grades the trivia challenge
function grade() {

    //for loop to compare the answer the user selected via radio buttons to the correct answer in the questions array
    for (var i = 0; i < questions.length; i++) {
        if ($(`input:radio[name="${questions[i].name}"]:checked`).val() === questions[i].correct) {
            correctAnswers++;
        }
        else if ($(`input:radio[name="${questions[i].name}"]:checked`).val() === undefined) {
            unAnswered++;
        }
        else {
            wrongAnswers++;
        }
    }

}
//this click event handler dictates what happens when submit is clicked
$("#submit").on("click", function () {
    grade();
    endGame();
})
//function to tell the user how much time is left for the trivia challenge. The number gets updated to the page every second.
function decrement() {
    gameTime--;
    $("#time-left").html(`<h2>Time Remaining: ${gameTime} seconds</h2>`);
    if (gameTime === 0) {
        grade();
        endGame();
    }
}
function endGame() {
    //need to stop the timer
    clearInterval(intervalId);
    //hide the time div
    $("#time-left").hide();
    //hide the questions
    $(".questions").hide();
    $("#masthead").hide();
    //show stats on the page
    $("#results").prepend(`<h2>Thanks for taking the Music Trivia Challenge!</h2> <br>Correct Answers: ${correctAnswers}<br> Wrong Answers: ${wrongAnswers} <br> Unanswered Questions: ${unAnswered}`);

}
