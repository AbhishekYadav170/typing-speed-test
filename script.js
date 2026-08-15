


const input = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");

const textDisplay = document.getElementById("textDisplay");
const progressBar = document.getElementById("progressBar");

const result = document.getElementById("result");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalWords = document.getElementById("finalWords");
const finalCharacters = document.getElementById("finalCharacters");
const finalCorrect = document.getElementById("finalCorrect");
const finalTime = document.getElementById("finalTime");
const resultMessage = document.getElementById("resultMessage");

const bestWpm = document.getElementById("bestWpm");


// ===============================
// PARAGRAPHS
// ===============================

const paragraphs = [

    "The quick brown fox jumps over the lazy dog. Learning to type quickly and accurately is an important skill for students and professionals.",

    "Technology has changed the way we work and communicate. Learning new skills and practicing regularly can help us become more confident and productive.",

    "Success does not come from doing something once. Regular practice, patience, and consistency are important for improving any skill over time.",

    "Web development is an interesting field where creativity and technology work together. HTML, CSS, and JavaScript are important tools for building websites.",

    "Reading books and learning new things can improve knowledge and communication skills. Small improvements every day can make a big difference.",
    
    "Practice makes typing faster and easier. Stay focused, keep your hands relaxed, and type each word carefully. With regular practice, your speed, accuracy, and confidence will improve every day."
];


// ===============================
// VARIABLES
// ===============================

let time = 60;
let interval = null;
let testStarted = false;
let currentText = "";


// ===============================
// RANDOM TEXT
// ===============================

function showRandomText() {

    let randomNumber =
        Math.floor(Math.random() * paragraphs.length);

    currentText = paragraphs[randomNumber];

    textDisplay.innerHTML = "";

    for (let i = 0; i < currentText.length; i++) {

        let span = document.createElement("span");

        span.innerText = currentText[i];

        textDisplay.appendChild(span);
    }
}


// Show first paragraph
showRandomText();


// ===============================
// BEST WPM
// ===============================

let savedBest = localStorage.getItem("bestWpm");

if (savedBest) {
    bestWpm.innerText = savedBest;
}


// ===============================
// START TEST
// ===============================

startBtn.addEventListener("click", function () {

    if (testStarted) {
        return;
    }

    testStarted = true;

    time = 60;

    timer.innerText = "60s";
    wpm.innerText = "0";
    accuracy.innerText = "100%";

    progressBar.style.width = "100%";

    input.value = "";
    input.disabled = false;

    result.classList.add("hidden");

    startBtn.disabled = true;

    input.focus();

    startTimer();

});


// ===============================
// TIMER
// ===============================

function startTimer() {

    interval = setInterval(function () {

        time--;

        timer.innerText = time + "s";


        // Progress bar
        let progress = (time / 60) * 100;

        progressBar.style.width = progress + "%";


        calculate();


        if (time <= 0) {

            time = 0;

            timer.innerText = "0s";

            progressBar.style.width = "0%";

            finishTest();
        }

    }, 1000);
}


// ===============================
// TYPING
// ===============================

input.addEventListener("input", function () {

    if (!testStarted) {
        return;
    }

    calculate();

    highlightText();

});


// ===============================
// CALCULATE
// ===============================

function calculate() {

    let typed = input.value;

    if (typed.length === 0) {

        wpm.innerText = "0";
        accuracy.innerText = "100%";

        return;
    }


    // Correct characters
    let correct = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === currentText[i]) {
            correct++;
        }

    }


    // Accuracy
    let accuracyValue =
        (correct / typed.length) * 100;

    accuracy.innerText =
        Math.round(accuracyValue) + "%";


    // WPM
    let usedTime = 60 - time;

    if (usedTime > 0) {

        let words =
            typed.trim().split(/\s+/).length;

        let minutes = usedTime / 60;

        let speed = words / minutes;

        wpm.innerText =
            Math.round(speed);
    }

}


// ===============================
// CHARACTER HIGHLIGHT
// ===============================

function highlightText() {

    let typed = input.value;

    let spans = textDisplay.querySelectorAll("span");


    for (let i = 0; i < spans.length; i++) {

        spans[i].classList.remove(
            "correct",
            "wrong",
            "current"
        );


        if (i < typed.length) {

            if (typed[i] === currentText[i]) {

                spans[i].classList.add("correct");

            } else {

                spans[i].classList.add("wrong");
            }

        }


        if (i === typed.length) {

            spans[i].classList.add("current");
        }

    }

}


// ===============================
// FINISH TEST
// ===============================

function finishTest() {

    clearInterval(interval);

    interval = null;

    testStarted = false;

    time = 0;

    timer.innerText = "0s";

    progressBar.style.width = "0%";

    input.disabled = true;

    startBtn.disabled = false;


    let typed = input.value;


    // Words
    let totalWords = 0;

    if (typed.trim().length > 0) {

        totalWords =
            typed.trim().split(/\s+/).length;
    }


    // Characters
    let totalCharacters = typed.length;


    // Correct characters
    let correct = 0;

    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === currentText[i]) {
            correct++;
        }

    }


    // Accuracy
    let accuracyValue = 100;

    if (totalCharacters > 0) {

        accuracyValue =
            (correct / totalCharacters) * 100;
    }


    // WPM
    // Test is exactly 60 seconds
    let speed = totalWords;


    // Final result
    finalWpm.innerText = speed;

    finalAccuracy.innerText =
        Math.round(accuracyValue) + "%";

    finalWords.innerText =
        totalWords;

    finalCharacters.innerText =
        totalCharacters;

    finalCorrect.innerText =
        correct;

    finalTime.innerText =
        "60s";


    // Best score
    let oldBest =
        Number(localStorage.getItem("bestWpm")) || 0;

    if (speed > oldBest) {

        localStorage.setItem(
            "bestWpm",
            speed
        );

        bestWpm.innerText = speed;

    }


    // Message
    if (speed >= 60) {

        resultMessage.innerText =
            "Excellent! Your typing speed is amazing! 🔥";

    } else if (speed >= 40) {

        resultMessage.innerText =
            "Great job! Keep practicing to improve your speed. 💪";

    } else if (speed >= 25) {

        resultMessage.innerText =
            "Good effort! Regular practice will make you faster. 👍";

    } else {

        resultMessage.innerText =
            "Keep practicing! You will improve with time. 🚀";
    }


    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth"
    });

}


// ===============================
// RESTART
// ===============================

restartBtn.addEventListener("click", function () {

    clearInterval(interval);

    interval = null;

    testStarted = false;

    time = 60;

    timer.innerText = "60s";

    wpm.innerText = "0";

    accuracy.innerText = "100%";

    progressBar.style.width = "100%";

    input.value = "";

    input.disabled = true;

    startBtn.disabled = false;

    result.classList.add("hidden");


    // New paragraph
    showRandomText();

});