//hide the submit button and gameContent to start the game
$("#submit").hide();
$("#gameContent").hide();
//declare global variables to keep track of time, correct answers, incorrect answers, unanswered questions, and which mode the user has selected
var gameTime;
var intervalId;
var correctAnswers = 0;
var wrongAnswers = 0;
var unAnswered = 0;
var hardClicked;
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
//create logic that when the button is pressed, game starts - my game has 2 modes, so the timing will depend on which mode the user chose
//if the user selects Challenge Mode, then gameTime = 31 seconds. if the user selectes Easy Mode, then gameTime = 61 seconds. Added 1 second here to give the user the full time.
$("#hard").on("click", function () {
    hardClicked = true;
    startGame();
});
$("#easy").on("click", function () {
    hardClicked = false;
    startGame();
});

function startGame() {
    //conditional to set gameTime based on whether the user selects Challenge Mode or Easy Mode
    if (hardClicked) {
        gameTime = 31;
    }
    else {
        gameTime = 61;
    }
    //setInterval function to call decrement every second
    intervalId = setInterval(decrement, 1000);
    $("#submit").show();
    $("#gameContent").show();
    $("#startScreen").hide();
    //function call to generate the questions and write them to the page
    questionDisplay();
}
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
        //scenario where a user selects the correct answer is if the checked value of the question radio button is the same as the correct option in the questions object
        if ($(`input:radio[name="${questions[i].name}"]:checked`).val() === questions[i].correct) {
            correctAnswers++;
            //scenario where a user leaves a question unanswered is if the checked value of the question radio button is undefined which means that it is not checked
        }
        else if ($(`input:radio[name="${questions[i].name}"]:checked`).val() === undefined) {
            unAnswered++;
            //scenario where a user gets a question wrong is if it is neither correct nor unanswered
        }
        else {
            wrongAnswers++;
        }
    }

}
//this click event handler dictates what happens when the Submit button is clicked
$("#submit").on("click", function () {
    //call grade function to get the user's count of correct and wrong answers, and unanswered questions
    grade();
    //call the endGame function to end the game
    endGame();
})
//function to tell the user how much time is left for the trivia challenge. The number gets updated to the page every second.
function decrement() {
    gameTime--;
    $("#time-left").html(`<h2>Time Remaining: ${gameTime} seconds</h2>`);
    //if the user runs out of time, or time = 0, then the game ends and the user's score is shown
    if (gameTime === 0) {
        //call grade function to get the user's count of correct and wrong answers, and unanswered questions
        grade();
        //call the endGame function to end the game
        endGame();
    }
}
function endGame() {
    //stop the timer
    clearInterval(intervalId);
    //hide the time div
    $("#time-left").hide();
    //hide the questions
    $(".questions").hide();
    //hide the masthead
    $("h1").hide();
    //show stats on the page
    $("#results").prepend(`<h2>Thanks for taking the Music Trivia Challenge!</h2> <br>Correct Answers: ${correctAnswers}<br> Wrong Answers: ${wrongAnswers} <br> Unanswered Questions: ${unAnswered}`);

}
