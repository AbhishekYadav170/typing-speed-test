
const input = document.getElementById("textInput");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");

const textDisplay = document.getElementById("textDisplay");
const progressBar = document.getElementById("progressBar");

const result = document.getElementById("result");

const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalWords = document.getElementById("finalWords");
const finalCharacters = document.getElementById("finalCharacters");
const finalCorrect = document.getElementById("finalCorrect");
const finalMistakes = document.getElementById("finalMistakes");
const finalTime = document.getElementById("finalTime");
const resultMessage = document.getElementById("resultMessage");

const bestWpmDisplay = document.getElementById("bestWpm");

const themeBtn = document.getElementById("themeBtn");
const clearHistoryBtn = document.getElementById("clearHistory");
const scoreHistory = document.getElementById("scoreHistory");

const difficultyButtons =
    document.querySelectorAll(".difficulty-btn");

const timeButtons =
    document.querySelectorAll(".time-btn");


// ======================================
// PARAGRAPHS
// ======================================

const paragraphs = {

    easy: [
        "The quick brown fox jumps over the lazy dog. Learning to type quickly is a useful skill for students and professionals.",

        "Practice makes typing faster and easier. Stay focused and type each word carefully. Regular practice improves your confidence.",

        "Reading books and learning new things can improve knowledge and communication skills. Small improvements every day can make a big difference."
    ],

    medium: [
        "Technology has changed the way people work and communicate. Learning new skills and practicing regularly can help us become more confident and productive.",

        "Web development is an interesting field where creativity and technology work together. HTML, CSS, and JavaScript are important tools for building websites.",

        "Success does not come from doing something once. Regular practice, patience, and consistency are important for improving any skill over time."
    ],

    hard: [
        "Modern software development requires developers to understand algorithms, responsive interfaces, accessibility, performance optimization, and clean maintainable code.",

        "Artificial intelligence is transforming industries by helping organizations analyze information, automate repetitive tasks, and create intelligent applications for different users.",

        "Professional developers continuously improve their problem-solving abilities by studying documentation, debugging applications, reviewing code, and learning from practical experience."
    ]

};


// ======================================
// VARIABLES
// ======================================

let selectedDifficulty = "easy";

let selectedTime = 60;

let time = selectedTime;

let interval = null;

let testStarted = false;

let currentText = "";


// ======================================
// RANDOM TEXT
// ======================================

function showRandomText() {

    const list = paragraphs[selectedDifficulty];

    const randomNumber =
        Math.floor(Math.random() * list.length);

    currentText = list[randomNumber];

    textDisplay.innerHTML = "";

    for (let i = 0; i < currentText.length; i++) {

        const span = document.createElement("span");

        span.innerText = currentText[i];

        textDisplay.appendChild(span);
    }

}


// ======================================
// BEST SCORE
// ======================================

function loadBestScore() {

    const best =
        Number(localStorage.getItem("bestWpm")) || 0;

    bestWpmDisplay.innerText = best;
}

loadBestScore();


// ======================================
// SCORE HISTORY
// ======================================

function loadHistory() {

    const history =
        JSON.parse(localStorage.getItem("typingScores")) || [];

    scoreHistory.innerHTML = "";

    if (history.length === 0) {

        scoreHistory.innerHTML =
            '<p class="no-history">No scores yet.</p>';

        return;
    }

    history.slice(0, 5).forEach(function (score) {

        const item =
            document.createElement("div");

        item.className = "score-item";

        item.innerHTML = `
            <span>${score.date}</span>
            <span>${score.accuracy}% Accuracy</span>
            <strong>${score.wpm} WPM</strong>
        `;

        scoreHistory.appendChild(item);

    });

}

loadHistory();


// ======================================
// DIFFICULTY
// ======================================

difficultyButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (testStarted) {
            return;
        }

        difficultyButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedDifficulty =
            button.dataset.level;

        showRandomText();

    });

});


// ======================================
// TIME
// ======================================

timeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        if (testStarted) {
            return;
        }

        timeButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        selectedTime =
            Number(button.dataset.time);

        time = selectedTime;

        timer.innerText =
            selectedTime + "s";

        progressBar.style.width = "100%";

    });

});


// ======================================
// START TEST
// ======================================

startBtn.addEventListener("click", function () {

    if (testStarted) {
        return;
    }

    testStarted = true;

    time = selectedTime;

    timer.innerText =
        time + "s";

    wpm.innerText = "0";

    accuracy.innerText = "100%";

    mistakesDisplay.innerText = "0";

    progressBar.style.width = "100%";

    input.value = "";

    input.disabled = false;

    result.classList.add("hidden");

    startBtn.disabled = true;

    input.focus();

    highlightText();

    startTimer();

});


// ======================================
// TIMER
// ======================================

function startTimer() {

    clearInterval(interval);

    interval = setInterval(function () {

        time--;

        if (time < 0) {
            time = 0;
        }

        timer.innerText =
            time + "s";


        const progress =
            (time / selectedTime) * 100;

        progressBar.style.width =
            progress + "%";


        calculate();


        if (time === 0) {

            finishTest();

        }

    }, 1000);

}


// ======================================
// TYPING
// ======================================

input.addEventListener("input", function () {

    if (!testStarted) {
        return;
    }

    calculate();

    highlightText();

});


// ======================================
// CALCULATE
// ======================================

function calculate() {

    const typed = input.value;

    if (typed.length === 0) {

        wpm.innerText = "0";

        accuracy.innerText = "100%";

        mistakesDisplay.innerText = "0";

        return;
    }


    let correct = 0;

    let mistakes = 0;


    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === currentText[i]) {

            correct++;

        } else {

            mistakes++;

        }

    }


    // Accuracy

    const accuracyValue =
        (correct / typed.length) * 100;

    accuracy.innerText =
        Math.round(accuracyValue) + "%";


    // Mistakes

    mistakesDisplay.innerText =
        mistakes;


    // WPM

    const usedTime =
        selectedTime - time;

    if (usedTime > 0) {

        const words =
            typed.trim().split(/\s+/).length;

        const minutes =
            usedTime / 60;

        const speed =
            words / minutes;

        wpm.innerText =
            Math.round(speed);

    }

}


// ======================================
// HIGHLIGHT TEXT
// ======================================

function highlightText() {

    const typed = input.value;

    const spans =
        textDisplay.querySelectorAll("span");


    spans.forEach(function (span, index) {

        span.classList.remove(
            "correct",
            "wrong",
            "current"
        );


        if (index < typed.length) {

            if (
                typed[index] ===
                currentText[index]
            ) {

                span.classList.add("correct");

            } else {

                span.classList.add("wrong");

            }

        }


        if (index === typed.length) {

            span.classList.add("current");

        }

    });

}


// ======================================
// FINISH TEST
// ======================================

function finishTest() {

    if (!testStarted) {
        return;
    }

    clearInterval(interval);

    interval = null;

    testStarted = false;

    time = 0;

    timer.innerText = "0s";

    progressBar.style.width = "0%";

    input.disabled = true;

    startBtn.disabled = false;


    const typed = input.value;


    // Words

    let totalWords = 0;

    if (typed.trim().length > 0) {

        totalWords =
            typed.trim().split(/\s+/).length;

    }


    // Characters

    const totalCharacters =
        typed.length;


    // Correct / mistakes

    let correct = 0;

    let mistakes = 0;


    for (let i = 0; i < typed.length; i++) {

        if (typed[i] === currentText[i]) {

            correct++;

        } else {

            mistakes++;

        }

    }


    // Accuracy

    let accuracyValue = 100;

    if (totalCharacters > 0) {

        accuracyValue =
            (correct / totalCharacters) * 100;

    }


    // WPM

    const speed =
        Math.round(
            totalWords / (selectedTime / 60)
        );


    // Result

    finalWpm.innerText = speed;

    finalAccuracy.innerText =
        Math.round(accuracyValue) + "%";

    finalWords.innerText =
        totalWords;

    finalCharacters.innerText =
        totalCharacters;

    finalCorrect.innerText =
        correct;

    finalMistakes.innerText =
        mistakes;

    finalTime.innerText =
        selectedTime + "s";


    // Best WPM

    const oldBest =
        Number(localStorage.getItem("bestWpm")) || 0;

    if (speed > oldBest) {

        localStorage.setItem(
            "bestWpm",
            speed
        );

        bestWpmDisplay.innerText =
            speed;

    }


    // History

    saveScore(
        speed,
        Math.round(accuracyValue)
    );


    // Message

    if (speed >= 60) {

        resultMessage.innerText =
            "Excellent! Your typing speed is amazing! 🔥";

    } else if (speed >= 40) {

        resultMessage.innerText =
            "Great job! Keep practicing to become even faster. 💪";

    } else if (speed >= 25) {

        resultMessage.innerText =
            "Good effort! Regular practice will improve your speed. 👍";

    } else {

        resultMessage.innerText =
            "Keep practicing! You will improve with consistency. 🚀";

    }


    result.classList.remove("hidden");

    result.scrollIntoView({
        behavior: "smooth"
    });

}


// ======================================
// SAVE SCORE
// ======================================

function saveScore(wpmValue, accuracyValue) {

    let history =
        JSON.parse(
            localStorage.getItem("typingScores")
        ) || [];


    const now =
        new Date();

    const date =
        now.toLocaleDateString();


    history.unshift({

        wpm: wpmValue,

        accuracy: accuracyValue,

        date: date

    });


    history =
        history.slice(0, 5);


    localStorage.setItem(
        "typingScores",
        JSON.stringify(history)
    );


    loadHistory();

}


// ======================================
// CLEAR HISTORY
// ======================================

clearHistoryBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "typingScores"
        );

        loadHistory();

    }
);


// ======================================
// RESTART
// ======================================

restartBtn.addEventListener("click", function () {

    clearInterval(interval);

    interval = null;

    testStarted = false;

    time = selectedTime;

    timer.innerText =
        selectedTime + "s";

    wpm.innerText = "0";

    accuracy.innerText = "100%";

    mistakesDisplay.innerText = "0";

    progressBar.style.width = "100%";

    input.value = "";

    input.disabled = true;

    startBtn.disabled = false;

    result.classList.add("hidden");

    showRandomText();

});


// ======================================
// DARK MODE
// ======================================

themeBtn.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const dark =
        document.body.classList.contains("dark");

    if (dark) {

        themeBtn.innerText = "☀️";

        localStorage.setItem(
            "theme",
            "dark"
        );

    } else {

        themeBtn.innerText = "🌙";

        localStorage.setItem(
            "theme",
            "light"
        );

    }

});


// Load saved theme

const savedTheme =
    localStorage.getItem("theme");

if (savedTheme === "dark") {

    document.body.classList.add("dark");

    themeBtn.innerText = "☀️";

}


// ======================================
// INITIAL TEXT
// ======================================

showRandomText();