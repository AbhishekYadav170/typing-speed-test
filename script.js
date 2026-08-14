const input = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");

const result = document.getElementById("result");
const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalTime = document.getElementById("finalTime");
const resultMessage = document.getElementById("resultMessage");

const textDisplay = document.getElementById("textDisplay");

const text = textDisplay.innerText.trim();

let time = 60;
let interval = null;
let testStarted = false;


// ============================
// START BUTTON
// ============================

startBtn.addEventListener("click", function () {

    if (testStarted) {
        return;
    }

    testStarted = true;

    time = 60;

    timer.innerText = "60s";
    wpm.innerText = "0";
    accuracy.innerText = "100%";

    input.value = "";
    input.disabled = false;

    result.classList.add("hidden");

    startBtn.disabled = true;

    input.focus();


    interval = setInterval(function () {

        time--;

        timer.innerText = time + "s";

        calculateResult();


        if (time <= 0) {

            time = 0;

            timer.innerText = "0s";

            finishTest();
        }

    }, 1000);

});


// ============================
// TYPING
// ============================

input.addEventListener("input", function () {

    if (!testStarted) {
        return;
    }

    calculateResult();

});


// ============================
// CALCULATE
// ============================

function calculateResult() {

    let typedText = input.value;

    if (typedText.length === 0) {

        wpm.innerText = "0";
        accuracy.innerText = "100%";

        return;
    }


    // Correct characters
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === text[i]) {
            correctCharacters++;
        }

    }


    // Accuracy
    let accuracyValue =
        (correctCharacters / typedText.length) * 100;

    accuracy.innerText =
        Math.round(accuracyValue) + "%";


    // WPM
    let usedTime = 60 - time;

    if (usedTime > 0) {

        let words = typedText.trim().split(/\s+/).length;

        let minutes = usedTime / 60;

        let speed = words / minutes;

        wpm.innerText = Math.round(speed);
    }

}


// ============================
// FINISH TEST
// ============================

function finishTest() {

    clearInterval(interval);

    interval = null;

    testStarted = false;

    time = 0;

    timer.innerText = "0s";

    input.disabled = true;

    startBtn.disabled = false;


    let typedText = input.value;


    // Total words
    let totalWords = 0;

    if (typedText.trim().length > 0) {

        totalWords =
            typedText.trim().split(/\s+/).length;
    }


    // Correct characters
    let correctCharacters = 0;

    for (let i = 0; i < typedText.length; i++) {

        if (typedText[i] === text[i]) {
            correctCharacters++;
        }

    }


    // Accuracy
    let accuracyValue = 100;

    if (typedText.length > 0) {

        accuracyValue =
            (correctCharacters / typedText.length) * 100;
    }


    // WPM
    // Because test is exactly 60 seconds,
    // total words = WPM
    let speed = totalWords;


    // Final result
    finalWpm.innerText = speed;

    finalAccuracy.innerText =
        Math.round(accuracyValue) + "%";

    finalTime.innerText = "60s";


    resultMessage.innerText =
        "You typed " +
        totalWords +
        " words in 60 seconds with " +
        Math.round(accuracyValue) +
        "% accuracy.";


    result.classList.remove("hidden");
}


// ============================
// RESTART BUTTON
// ============================

restartBtn.addEventListener("click", function () {

    clearInterval(interval);

    interval = null;

    testStarted = false;

    time = 60;


    timer.innerText = "60s";

    wpm.innerText = "0";

    accuracy.innerText = "100%";


    input.value = "";

    input.disabled = true;


    startBtn.disabled = false;


    result.classList.add("hidden");

});