// Get HTML elements and save as const variables
const howToPlayBtn = document.querySelector(".btn-how-to-play");
const startQuizBtn = document.querySelector(".btn-start-quiz");
const quizContainer = document.querySelector(".quiz-container");
const scoreCounter = document.querySelector(".score-counter");
const questionContent = document.querySelector("#question");
const choicesContainer = document.querySelector(".choices-container");
const gameOverContainer = document.querySelector(".game-over-container");
const finalScore = document.querySelector(".final-score");
const background = document.querySelector("body");
const difficultyContainer = document.querySelector(".difficulty-container");

let button, score, currentQuestionIndex, quizQuestions;

function selectDifficulty() {
    difficultyContainer.classList.remove("hidden");
    howToPlayModal.classList.add("hidden");
}

function loadQuiz(questions) {
    difficultyContainer.classList.add("hidden");
    howToPlayBtn.classList.add("hidden");
    startQuizBtn.classList.add("hidden");
    quizContainer.classList.remove("hidden");

    score = 0;
    scoreCounter.innerHTML = "Score: " + score;
    quizQuestions = questions;
    currentQuestionIndex = 0;

    displayQuestion();
}

function clearChoices() {
    while (choicesContainer.firstChild) {
        choicesContainer.removeChild(choicesContainer.firstChild);
    }
}

function displayQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        gameOver();
    } else {
        questionContent.innerHTML = quizQuestions[currentQuestionIndex].question;
        for (let i = 0; i < 4; i++) {
            button = document.createElement("button");
            button.innerHTML = quizQuestions[currentQuestionIndex].choices[i];
            button.classList.add("choices", "btn");
            if (button.innerHTML === quizQuestions[currentQuestionIndex].correct) {
                button.dataset.correct = true;
            }
            choicesContainer.appendChild(button);
            button.setAttribute("onclick", "checkAnswer(this)");
        }
    }
}

// Set time out learnt at https://www.w3schools.com/js/js_timing.asp
function checkAnswer(e) {
    if (e.innerHTML == quizQuestions[currentQuestionIndex].correct) {
        background.classList.add("correct");
        score++;
        scoreCounter.innerHTML = "Score: " + score;
    } else if (e.innerHTML !== quizQuestions[currentQuestionIndex].correct) {
        background.classList.add("wrong");
    }
    setTimeout(nextQuestion, 350);
}

function nextQuestion() {
    background.classList.remove("correct");
    background.classList.remove("wrong");
    clearChoices();
    currentQuestionIndex++;
    displayQuestion();
}

function gameOver() {
    quizContainer.classList.add("hidden");
    gameOverContainer.classList.remove("hidden");
    finalScore.innerHTML = score;
}

function playAgain() {
    gameOverContainer.classList.add("hidden");
    selectDifficulty();
}