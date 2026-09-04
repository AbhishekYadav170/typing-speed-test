
/* ELEMENTS */

const input = document.getElementById("textInput");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const themeBtn = document.getElementById("themeBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");

const progressBar = document.getElementById("progressBar");

const textDisplay = document.getElementById("textDisplay");

const bestWpmDisplay = document.getElementById("bestWpm");

const result = document.getElementById("result");

const finalWpm = document.getElementById("finalWpm");
const finalAccuracy = document.getElementById("finalAccuracy");
const finalWords = document.getElementById("finalWords");
const finalCharacters = document.getElementById("finalCharacters");
const finalCorrect = document.getElementById("finalCorrect");
const finalMistakes = document.getElementById("finalMistakes");
const finalTime = document.getElementById("finalTime");

const resultMessage = document.getElementById("resultMessage");

const clearHistoryBtn = document.getElementById("clearHistory");
const scoreHistory = document.getElementById("scoreHistory");

const levelTitle = document.getElementById("levelTitle");
const levelDescription = document.getElementById("levelDescription");

const practiceHeading = document.getElementById("practiceHeading");

const fingerGuide = document.getElementById("fingerGuide");
const fingerTitle = document.getElementById("fingerTitle");
const fingerText = document.getElementById("fingerText");

const keyboardArea = document.getElementById("keyboardArea");

const levelButtons = document.querySelectorAll(".level-btn");
const timeButtons = document.querySelectorAll(".time-btn");

const keyboardKeys = document.querySelectorAll(".key");


/* =========================================
   VARIABLES
========================================= */

let selectedLevel = 1;

let selectedTime = 60;

let time = 60;

let timerInterval = null;

let testStarted = false;

let currentText = "";

let correctCharacters = 0;

let mistakeCharacters = 0;


/* =========================================
   LEVEL INFORMATION
========================================= */

const levelInfo = {

    1: {
        title: "Level 1 - Finger Practice",
        description:
            "Learn which finger should be used for each keyboard key.",
        heading: "Finger Practice"
    },

    2: {
        title: "Level 2 - Keyboard Keys",
        description:
            "Practice keyboard keys and follow the highlighted key.",
        heading: "Keyboard Key Practice"
    },

    3: {
        title: "Level 3 - Easy Sentences",
        description:
            "Practice simple sentences while improving typing accuracy.",
        heading: "Easy Sentence Practice"
    },

    4: {
        title: "Level 4 - Sentence Practice",
        description:
            "Type longer sentences to improve your speed and accuracy.",
        heading: "Sentence Practice"
    },

    5: {
        title: "Level 5 - Paragraph Practice",
        description:
            "Type long paragraphs just like a professional typing institute.",
        heading: "Paragraph Practice"
    }

};


/* == FINGER INFORMATION == */

const fingerData = {

    q: ["Left Pinky Finger", "Use your left little finger."],
    a: ["Left Pinky Finger", "Use your left little finger."],
    z: ["Left Pinky Finger", "Use your left little finger."],

    w: ["Left Ring Finger", "Use your left ring finger."],
    s: ["Left Ring Finger", "Use your left ring finger."],
    x: ["Left Ring Finger", "Use your left ring finger."],

    e: ["Left Middle Finger", "Use your left middle finger."],
    d: ["Left Middle Finger", "Use your left middle finger."],
    c: ["Left Middle Finger", "Use your left middle finger."],

    r: ["Left Index Finger", "Use your left index finger."],
    f: ["Left Index Finger", "Use your left index finger."],
    v: ["Left Index Finger", "Use your left index finger."],

    t: ["Left Index Finger", "Use your left index finger."],
    g: ["Left Index Finger", "Use your left index finger."],
    b: ["Left Index Finger", "Use your left index finger."],

    y: ["Right Index Finger", "Use your right index finger."],
    h: ["Right Index Finger", "Use your right index finger."],
    n: ["Right Index Finger", "Use your right index finger."],

    u: ["Right Index Finger", "Use your right index finger."],
    j: ["Right Index Finger", "Use your right index finger."],
    m: ["Right Index Finger", "Use your right index finger."],

    i: ["Right Middle Finger", "Use your right middle finger."],
    k: ["Right Middle Finger", "Use your right middle finger."],

    o: ["Right Ring Finger", "Use your right ring finger."],
    l: ["Right Ring Finger", "Use your right ring finger."],

    p: ["Right Pinky Finger", "Use your right little finger."]
};


/* =========================================
   LEVEL 1 KEY PRACTICE
========================================= */

const level1Keys = [

    "a s d f",
    "j k l",
    "a s d f j k l",
    "f j f j",
    "a a s s d d f f",
    "j j k k l l",

    "asdf",
    "jkl",
    "asdf jkl",
    "fj fj",
    "asdf jkl",
    "fdsa jkl"

];


/* == LEVEL 2 KEY PRACTICE == */

const level2Keys = [

    "q w e r t y u i o p",

    "a s d f g h j k l",

    "z x c v b n m",

    "qaz wsx edc rfv tgb",

    "yhn ujm ik ol p",

    "qwerty",

    "asdfgh",

    "zxcvbnm",

    "qwertyuiop",

    "asdfghjkl",

    "zxcvbnm"

];


/* == LEVEL 3 SENTENCES == */

const level3Texts = [

    "I can type faster with regular practice.",

    "Typing is an important computer skill.",

    "Practice every day and improve your typing.",

    "Keep your fingers on the correct keyboard keys.",

    "Good typing requires speed and accuracy.",

    "Learning typing can make computer work easier.",

    "Stay focused and type every word carefully.",

    "Small improvements can make a big difference."

];


/* == LEVEL 4 SENTENCES == */

const level4Texts = [

    "Learning to type correctly takes time, patience, and regular practice every day.",

    "A good typist focuses on accuracy first and gradually increases typing speed.",

    "Keep your hands in the correct position and use the proper finger for every key.",

    "Typing without looking at the keyboard helps you become faster and more confident.",

    "Regular practice improves muscle memory and makes typing more comfortable.",

    "Students and professionals can save a lot of time by developing good typing skills.",

    "Focus on every character, maintain a steady rhythm, and avoid unnecessary mistakes.",

    "The goal of typing practice is to become fast, accurate, comfortable, and consistent."

];


/* == LEVEL 5 PARAGRAPHS == */

const level5Texts = [

    `Typing is an essential computer skill that can help students and professionals work more efficiently. When you practice regularly, your fingers slowly learn the position of every key on the keyboard. At first, typing may feel difficult and slow, but with patience and consistency, your speed and accuracy will improve. The most important thing is to focus on correct typing rather than trying to type extremely fast.`,

    `Technology has become an important part of education, business, communication, and everyday life. Almost every profession requires people to use computers and digital tools. Good typing skills can save time and make computer work much easier. By practicing regularly, learning the correct finger positions, and maintaining good accuracy, anyone can gradually become a confident and efficient typist.`,

    `Becoming a fast typist does not happen in one day. It requires regular practice, concentration, patience, and a willingness to correct mistakes. Beginners should first learn the correct finger positions and practice individual keyboard keys. After becoming comfortable with the keyboard, they can move to words, sentences, and finally longer paragraphs. With consistent practice, typing becomes natural and requires less conscious effort`,

    `A successful typing session should always focus on both speed and accuracy. Typing very quickly while making many mistakes is not useful because correcting those mistakes takes additional time. Instead, try to maintain a steady rhythm and concentrate on each character. As your accuracy improves, your speed will naturally increase. Practice different sentences and paragraphs so that your fingers become comfortable with many different combinations of letters and words.`

];


/* =========================================
   GET TEXT ACCORDING TO TIME
========================================= */

function getTextForPractice() {

    /* LEVEL 1 */

    if (selectedLevel === 1) {

        const random =
            Math.floor(Math.random() * level1Keys.length);

        return level1Keys[random];
    }


    /* LEVEL 2 */

    if (selectedLevel === 2) {

        const random =
            Math.floor(Math.random() * level2Keys.length);

        return level2Keys[random];
    }


    /* LEVEL 3 */

    if (selectedLevel === 3) {

        const random =
            Math.floor(Math.random() * level3Texts.length);

        return level3Texts[random];
    }


    /* LEVEL 4 */

    if (selectedLevel === 4) {

        const random =
            Math.floor(Math.random() * level4Texts.length);

        return level4Texts[random];
    }


    /* LEVEL 5 */

    if (selectedLevel === 5) {

        const random =
            Math.floor(Math.random() * level5Texts.length);

        return level5Texts[random];
    }

}


/* =========================================
   SHOW TEXT
========================================= */

function showRandomText() {

    currentText = getTextForPractice();

    textDisplay.innerHTML = "";

    for (let i = 0; i < currentText.length; i++) {

        const span = document.createElement("span");

        span.innerText = currentText[i];

        textDisplay.appendChild(span);

    }

    highlightText();

    updateKeyboard();

}


/* =========================================
   LEVEL UI
========================================= */

function updateLevelUI() {

    const info = levelInfo[selectedLevel];

    levelTitle.innerText = info.title;

    levelDescription.innerText = info.description;

    practiceHeading.innerText = info.heading;


    /* LEVEL 1 */

    if (selectedLevel === 1) {

        fingerGuide.style.display = "flex";

        keyboardArea.style.display = "block";

        updateFingerGuide();

    }


    /* LEVEL 2 */

    else if (selectedLevel === 2) {

        fingerGuide.style.display = "flex";

        keyboardArea.style.display = "block";

        fingerTitle.innerText = "Keyboard Practice";

        fingerText.innerText =
            "Follow the highlighted keyboard key.";

    }


    /* LEVEL 3,4,5 */

    else {

        fingerGuide.style.display = "none";

        keyboardArea.style.display = "none";

    }

}


/* =========================================
   LEVEL BUTTONS
========================================= */

levelButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        /* Do not change level while test is running */

        if (testStarted) {

            return;

        }


        /* Remove active */

        levelButtons.forEach(function (btn) {

            btn.classList.remove("active");

        });


        /* Add active */

        button.classList.add("active");


        /* Get level */

        selectedLevel =
            Number(button.dataset.level);


        /* Reset */

        resetTest(false);


        /* Update UI */

        updateLevelUI();

        showRandomText();

    });

});


/* =========================================
   TIME BUTTONS
========================================= */

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
            selectedTime >= 60
                ? formatTime(selectedTime)
                : selectedTime + "s";


        progressBar.style.width = "100%";


        /* New text according to level */

        showRandomText();

    });

});


/* =========================================
   FORMAT TIME
========================================= */

function formatTime(seconds) {

    const minutes =
        Math.floor(seconds / 60);

    const remainingSeconds =
        seconds % 60;


    if (minutes > 0 && remainingSeconds === 0) {

        return minutes + "m";

    }


    if (minutes > 0) {

        return (
            minutes +
            "m " +
            remainingSeconds +
            "s"
        );

    }


    return seconds + "s";

}


/* =========================================
   FINGER GUIDE
========================================= */

function updateFingerGuide() {

    if (selectedLevel !== 1) {

        return;

    }


    const typed = input.value;

    const nextCharacter =
        currentText[typed.length];


    if (!nextCharacter) {

        fingerTitle.innerText =
            "Practice Complete";

        fingerText.innerText =
            "Excellent! Keep practicing.";

        return;

    }


    const key =
        nextCharacter.toLowerCase();


    if (fingerData[key]) {

        fingerTitle.innerText =
            fingerData[key][0];

        fingerText.innerText =
            fingerData[key][1];

    }

}


/* =========================================
   KEYBOARD HIGHLIGHT
========================================= */

function updateKeyboard() {

    keyboardKeys.forEach(function (key) {

        key.classList.remove(
            "active-key",
            "correct-key",
            "wrong-key"
        );

    });


    /* Keyboard only needed for Level 1 and 2 */

    if (
        selectedLevel !== 1 &&
        selectedLevel !== 2
    ) {

        return;

    }


    const typed =
        input.value;


    const nextCharacter =
        currentText[typed.length];


    if (!nextCharacter) {

        return;

    }


    const nextKey =
        nextCharacter.toLowerCase();


    keyboardKeys.forEach(function (key) {

        if (
            key.dataset.key === nextKey
        ) {

            key.classList.add("active-key");

        }

    });


    /* Finger information */

    if (selectedLevel === 1) {

        updateFingerGuide();

    }

}


/* =========================================
   START TEST
========================================= */

startBtn.addEventListener("click", function () {

    if (testStarted) {

        return;

    }


    testStarted = true;


    time = selectedTime;


    timer.innerText =
        formatTime(time);


    wpm.innerText = "0";

    accuracy.innerText = "100%";

    mistakesDisplay.innerText = "0";


    progressBar.style.width = "100%";


    input.value = "";

    input.disabled = false;

    result.classList.add("hidden");

    startBtn.disabled = true;


    /* Generate fresh text */

    showRandomText();


    input.focus();


    startTimer();

});


/* =========================================
   TIMER
========================================= */

function startTimer() {

    clearInterval(timerInterval);


    timerInterval =
        setInterval(function () {

            time--;


            if (time < 0) {

                time = 0;

            }


            timer.innerText =
                formatTime(time);


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


/* =========================================
   INPUT
========================================= */

input.addEventListener("input", function () {

    if (!testStarted) {

        return;

    }


    calculate();

    highlightText();

    updateKeyboard();


    /* Automatically finish if complete */

    if (
        input.value.length >=
        currentText.length
    ) {

        finishTest();

    }

});


/* =========================================
   CALCULATE
========================================= */

function calculate() {

    const typed =
        input.value;


    if (typed.length === 0) {

        wpm.innerText = "0";

        accuracy.innerText = "100%";

        mistakesDisplay.innerText = "0";

        return;

    }


    let correct = 0;

    let mistakes = 0;


    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i] === currentText[i]
        ) {

            correct++;

        } else {

            mistakes++;

        }

    }


    correctCharacters = correct;

    mistakeCharacters = mistakes;


    /* ACCURACY */

    const accuracyValue =
        (correct / typed.length) * 100;


    accuracy.innerText =
        Math.round(accuracyValue) + "%";


    /* MISTAKES */

    mistakesDisplay.innerText =
        mistakes;


    /* WPM */

    const usedTime =
        selectedTime - time;


    if (usedTime > 0) {

        const words =
            typed.trim().length > 0
                ? typed.trim().split(/\s+/).length
                : 0;


        const minutes =
            usedTime / 60;


        const speed =
            words / minutes;


        wpm.innerText =
            Math.round(speed);

    }

}


/* =========================================
   HIGHLIGHT TEXT
========================================= */

function highlightText() {

    const typed =
        input.value;


    const spans =
        textDisplay.querySelectorAll("span");


    spans.forEach(function (span, index) {

        span.classList.remove(
            "correct",
            "wrong",
            "current"
        );


        if (
            index < typed.length
        ) {

            if (
                typed[index] ===
                currentText[index]
            ) {

                span.classList.add("correct");

            } else {

                span.classList.add("wrong");

            }

        }


        if (
            index === typed.length
        ) {

            span.classList.add("current");

        }

    });

}


/* =========================================
   FINISH TEST
========================================= */

function finishTest() {

    if (!testStarted) {

        return;

    }


    clearInterval(timerInterval);

    timerInterval = null;


    testStarted = false;


    time = 0;


    timer.innerText = "0s";

    progressBar.style.width = "0%";


    input.disabled = true;

    startBtn.disabled = false;


    const typed =
        input.value;


    /* WORDS */

    let totalWords = 0;


    if (
        typed.trim().length > 0
    ) {

        totalWords =
            typed.trim().split(/\s+/).length;

    }


    /* CHARACTERS */

    const totalCharacters =
        typed.length;


    /* CORRECT / MISTAKES */

    let correct = 0;

    let mistakes = 0;


    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i] === currentText[i]
        ) {

            correct++;

        } else {

            mistakes++;

        }

    }


    /* ACCURACY */

    let accuracyValue = 100;


    if (
        totalCharacters > 0
    ) {

        accuracyValue =
            (correct / totalCharacters) * 100;

    }


    /* WPM */

    const speed =
        Math.round(
            totalWords /
            (selectedTime / 60)
        );


    /* RESULT */

    finalWpm.innerText =
        speed;


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
        formatTime(selectedTime);


    /* BEST WPM */

    const oldBest =
        Number(
            localStorage.getItem("bestWpm")
        ) || 0;


    if (speed > oldBest) {

        localStorage.setItem(
            "bestWpm",
            speed
        );


        bestWpmDisplay.innerText =
            speed;

    }


    /* SAVE SCORE */

    saveScore(
        speed,
        Math.round(accuracyValue)
    );


    /* RESULT MESSAGE */

    if (speed >= 60) {

        resultMessage.innerText =
            "Excellent! Your typing speed is amazing! 🔥";

    }

    else if (speed >= 40) {

        resultMessage.innerText =
            "Great job! Keep practicing to become even faster. 💪";

    }

    else if (speed >= 25) {

        resultMessage.innerText =
            "Good effort! Regular practice will improve your speed. 👍";

    }

    else {

        resultMessage.innerText =
            "Keep practicing! You will improve with consistency. 🚀";

    }


    result.classList.remove("hidden");


    result.scrollIntoView({
        behavior: "smooth"
    });

}


/* =========================================
   SAVE SCORE
========================================= */

function saveScore(
    wpmValue,
    accuracyValue
) {

    let history =
        JSON.parse(
            localStorage.getItem(
                "typingScores"
            )
        ) || [];


    const now =
        new Date();


    const date =
        now.toLocaleDateString();


    history.unshift({

        level: selectedLevel,

        time: selectedTime,

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


/* =========================================
   LOAD HISTORY
========================================= */

function loadHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "typingScores"
            )
        ) || [];


    scoreHistory.innerHTML = "";


    if (
        history.length === 0
    ) {

        scoreHistory.innerHTML =
            '<p class="no-history">No scores yet.</p>';

        return;

    }


    history
        .slice(0, 5)
        .forEach(function (score) {

            const item =
                document.createElement("div");


            item.className =
                "score-item";


            item.innerHTML = `

                <span>
                    Level ${score.level}
                    • ${score.date}
                </span>

                <span>
                    ${score.accuracy}% Accuracy
                </span>

                <strong>
                    ${score.wpm} WPM
                </strong>

            `;


            scoreHistory.appendChild(item);

        });

}


/* =========================================
   CLEAR HISTORY
========================================= */

clearHistoryBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "typingScores"
        );


        loadHistory();

    }
);


/* =========================================
   RESTART
========================================= */

restartBtn.addEventListener(
    "click",
    function () {

        resetTest(true);

    }
);


/* =========================================
   RESET TEST
========================================= */

function resetTest(generateText = true) {

    clearInterval(timerInterval);

    timerInterval = null;

    testStarted = false;

    time = selectedTime;


    timer.innerText =
        formatTime(selectedTime);


    wpm.innerText = "0";

    accuracy.innerText = "100%";

    mistakesDisplay.innerText = "0";


    progressBar.style.width = "100%";


    input.value = "";

    input.disabled = true;


    startBtn.disabled = false;


    result.classList.add("hidden");


    if (generateText) {

        showRandomText();

    }

}


/* =========================================
   BEST SCORE
========================================= */

function loadBestScore() {

    const best =
        Number(
            localStorage.getItem("bestWpm")
        ) || 0;


    bestWpmDisplay.innerText =
        best;

}


loadBestScore();


/* =========================================
   DARK MODE
========================================= */

themeBtn.addEventListener(
    "click",
    function () {

        document.body.classList.toggle(
            "dark"
        );


        const dark =
            document.body.classList.contains(
                "dark"
            );


        if (dark) {

            themeBtn.innerText = "☀️";


            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        else {

            themeBtn.innerText = "🌙";


            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


/* =========================================
   LOAD THEME
========================================= */

const savedTheme =
    localStorage.getItem("theme");


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );


    themeBtn.innerText = "☀️";

}


/* =========================================
   INITIAL SETUP
========================================= */

updateLevelUI();

showRandomText();

resetTest(false);

loadHistory();
