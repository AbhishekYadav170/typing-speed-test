
// ======================================================
// DOM ELEMENTS
// ======================================================

const input = document.getElementById("textInput");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");

const progressBar = document.getElementById("progressBar");

const textDisplay = document.getElementById("textDisplay");

const themeBtn = document.getElementById("themeBtn");

const bestWpmDisplay =
    document.getElementById("bestWpm");

const clearHistoryBtn =
    document.getElementById("clearHistory");

const scoreHistory =
    document.getElementById("scoreHistory");

const result =
    document.getElementById("result");

const finalWpm =
    document.getElementById("finalWpm");

const finalAccuracy =
    document.getElementById("finalAccuracy");

const finalWords =
    document.getElementById("finalWords");

const finalCharacters =
    document.getElementById("finalCharacters");

const finalCorrect =
    document.getElementById("finalCorrect");

const finalMistakes =
    document.getElementById("finalMistakes");

const finalTime =
    document.getElementById("finalTime");

const resultMessage =
    document.getElementById("resultMessage");


// ======================================================
// LEVEL ELEMENTS
// ======================================================

const levelButtons =
    document.querySelectorAll(".level-btn");

const levelTitle =
    document.getElementById("levelTitle");

const levelDescription =
    document.getElementById("levelDescription");

const practiceHeading =
    document.getElementById("practiceHeading");


// ======================================================
// FINGER GUIDE
// ======================================================

const fingerGuide =
    document.getElementById("fingerGuide");

const fingerTitle =
    document.getElementById("fingerTitle");

const fingerText =
    document.getElementById("fingerText");


// ======================================================
// KEYBOARD
// ======================================================

const keyboardArea =
    document.getElementById("keyboardArea");

const keys =
    document.querySelectorAll(".key");


// ======================================================
// TIME
// ======================================================

const timeButtons =
    document.querySelectorAll(".time-btn");


// ======================================================
// VARIABLES
// ======================================================

let selectedLevel = 1;

let selectedTime = 60;

let time = selectedTime;

let interval = null;

let testStarted = false;

let currentText = "";

let currentTargetKey = "";

let totalCorrect = 0;

let totalMistakes = 0;

let completedTests = 0;


// ======================================================
// LEVEL INFORMATION
// ======================================================

const levelInfo = {

    1: {
        title: "Level 1 - Finger Practice",

        description:
            "Learn which finger should be used for each keyboard key.",

        heading:
            "Finger Practice"
    },

    2: {
        title: "Level 2 - Keyboard Keys",

        description:
            "Practice individual keyboard keys and learn proper key positions.",

        heading:
            "Keyboard Key Practice"
    },

    3: {
        title: "Level 3 - Easy Sentences",

        description:
            "Practice simple words and easy sentences to build typing confidence.",

        heading:
            "Easy Sentence Practice"
    },

    4: {
        title: "Level 4 - Sentences",

        description:
            "Practice longer sentences with punctuation and capital letters.",

        heading:
            "Sentence Practice"
    },

    5: {
        title: "Level 5 - Paragraph",

        description:
            "Test your typing speed using long paragraphs and realistic text.",

        heading:
            "Paragraph Practice"
    }

};


// ======================================================
// FINGER MAPPING
// ======================================================

const fingerMap = {

    q: {
        finger: "Left Pinky Finger",
        text: "Use your left little finger to press Q."
    },

    a: {
        finger: "Left Pinky Finger",
        text: "Use your left little finger to press A."
    },

    z: {
        finger: "Left Pinky Finger",
        text: "Use your left little finger to press Z."
    },


    w: {
        finger: "Left Ring Finger",
        text: "Use your left ring finger to press W."
    },

    s: {
        finger: "Left Ring Finger",
        text: "Use your left ring finger to press S."
    },

    x: {
        finger: "Left Ring Finger",
        text: "Use your left ring finger to press X."
    },


    e: {
        finger: "Left Middle Finger",
        text: "Use your left middle finger to press E."
    },

    d: {
        finger: "Left Middle Finger",
        text: "Use your left middle finger to press D."
    },

    c: {
        finger: "Left Middle Finger",
        text: "Use your left middle finger to press C."
    },


    r: {
        finger: "Left Index Finger",
        text: "Use your left index finger to press R."
    },

    f: {
        finger: "Left Index Finger",
        text: "Use your left index finger to press F."
    },

    v: {
        finger: "Left Index Finger",
        text: "Use your left index finger to press V."
    },

    t: {
        finger: "Left Index Finger",
        text: "Use your left index finger to press T."
    },

    g: {
        finger: "Left Index Finger",
        text: "Use your left index finger to press G."
    },

    b: {
        finger: "Left Index Finger",
        text: "Use your left index finger to press B."
    },


    y: {
        finger: "Right Index Finger",
        text: "Use your right index finger to press Y."
    },

    h: {
        finger: "Right Index Finger",
        text: "Use your right index finger to press H."
    },

    n: {
        finger: "Right Index Finger",
        text: "Use your right index finger to press N."
    },

    u: {
        finger: "Right Index Finger",
        text: "Use your right index finger to press U."
    },

    j: {
        finger: "Right Index Finger",
        text: "Use your right index finger to press J."
    },

    m: {
        finger: "Right Index Finger",
        text: "Use your right index finger to press M."
    },


    i: {
        finger: "Right Middle Finger",
        text: "Use your right middle finger to press I."
    },

    k: {
        finger: "Right Middle Finger",
        text: "Use your right middle finger to press K."
    },


    o: {
        finger: "Right Ring Finger",
        text: "Use your right ring finger to press O."
    },

    l: {
        finger: "Right Ring Finger",
        text: "Use your right ring finger to press L."
    },


    p: {
        finger: "Right Pinky Finger",
        text: "Use your right little finger to press P."
    }

};


// ======================================================
// LEVEL 1 - FINGER PRACTICE
// ======================================================

const fingerPractice = [

    "asdf jkl;",

    "asdf asdf jkl; jkl;",

    "a s d f j k l",

    "f d s a j k l",

    "asdf jkl asdf jkl",

    "aass ddff jjkk ll",

    "asdf fdsa jkl lkj",

    "fj fj dk dk sl sl",

    "asdf jkl; asdf jkl;"

];


// ======================================================
// LEVEL 2 - KEYBOARD PRACTICE
// ======================================================

const keyboardPractice = [

    "qwerty",

    "asdfgh",

    "zxcvbn",

    "qwertyuiop",

    "asdfghjkl",

    "zxcvbnm",

    "qaz wsx edc rfv",

    "tgb yhn ujm",

    "qwert asdfg zxcvb",

    "yuiop hjkl nm"

];


// ======================================================
// LEVEL 3 - EASY SENTENCES
// ======================================================

const level3Texts = [

    "I like to learn typing every day.",

    "Typing is a useful skill for everyone.",

    "Practice typing and improve your speed.",

    "I can type faster with regular practice.",

    "Learning typing makes computer work easier.",

    "Small practice every day brings better results.",

    "Keep your fingers on the correct keyboard keys.",

    "Good typing needs patience and regular practice.",

    "I will improve my typing speed step by step.",

    "Typing correctly is more important than typing fast."

];


// ======================================================
// LEVEL 4 - SENTENCES
// ======================================================

const level4Texts = [

    "Technology has changed the way people work and communicate.",

    "Regular typing practice can improve both speed and accuracy.",

    "A good typist focuses on accuracy before trying to type faster.",

    "Web developers spend many hours writing and editing computer code.",

    "Learning keyboard shortcuts can make everyday computer work easier.",

    "Students can improve their productivity by learning touch typing.",

    "Professional typing requires concentration, consistency, and practice.",

    "Good posture and correct finger placement can make typing more comfortable.",

    "The best way to improve typing speed is to practice a little every day.",

    "Modern computer users can save a lot of time by developing strong typing skills."

];


// ======================================================
// LEVEL 5 - LONG PARAGRAPHS
// ======================================================

const level5Texts = [

    `Typing is an important computer skill that can help students, developers, writers, and professionals work more efficiently. When you practice regularly, your fingers slowly become familiar with the keyboard and you no longer need to look at every key. The main goal is not simply to type quickly, but to type accurately while maintaining a comfortable rhythm. With patience and daily practice, your typing speed can improve naturally over time.`,

    `Learning to type correctly requires patience, concentration, and consistency. At the beginning, it may feel difficult to remember which finger should press each key, but regular practice makes the movements easier. Try to keep your hands in the correct position and avoid looking at the keyboard too often. Focus on accuracy first and speed will gradually increase. A few minutes of focused practice every day can produce noticeable improvement after several weeks.`,

    `Modern software developers spend a large amount of time working with computers, writing code, reading documentation, testing applications, and communicating with their teams. Strong typing skills allow developers to focus more on solving problems instead of searching for individual keys. Touch typing also helps reduce unnecessary hand movement and can make long working sessions more comfortable. Improving typing is therefore a useful investment for anyone who works regularly with a computer.`,

    `Building a useful skill takes time and consistent effort. Typing is no different. Instead of trying to achieve a very high speed immediately, focus on making each practice session accurate and comfortable. Start with simple keys, move to words and sentences, and finally practice longer paragraphs. When you make a mistake, do not become frustrated. Learn from it, slow down when necessary, and continue practicing. Over time your muscle memory will improve and typing will become more natural.`,

    `A professional typing practice system should gradually increase difficulty as the learner becomes more comfortable. Beginners should first understand keyboard positions and finger movement. After that they can practice individual keys, common words, short sentences, and longer paragraphs. Timed tests can then be used to measure progress through words per minute, accuracy, correct characters, and mistakes. This step by step approach makes learning easier and gives the learner a clear sense of progress.`

];


// ======================================================
// GET RANDOM ITEM
// ======================================================

function randomItem(array) {

    const random =
        Math.floor(Math.random() * array.length);

    return array[random];
}


// ======================================================
// GET TEXT BASED ON LEVEL + TIME
// ======================================================

function getPracticeText() {

    // LEVEL 1
    if (selectedLevel === 1) {

        return randomItem(fingerPractice);

    }


    // LEVEL 2
    if (selectedLevel === 2) {

        return randomItem(keyboardPractice);

    }


    // LEVEL 3
    if (selectedLevel === 3) {

        const list = [...level3Texts];

        if (selectedTime >= 120) {
            list.push(
                "I practice typing slowly and carefully because accuracy helps me become faster."
            );
        }

        if (selectedTime >= 180) {
            list.push(
                "Every new typing lesson helps me become more comfortable with the keyboard."
            );
        }

        if (selectedTime >= 300) {
            list.push(
                "With daily practice, I can develop better finger movement, stronger accuracy, and faster typing speed."
            );
        }

        return randomItem(list);
    }


    // LEVEL 4
    if (selectedLevel === 4) {

        const list = [...level4Texts];

        if (selectedTime >= 120) {

            list.push(
                "Learning to type without looking at the keyboard can improve concentration and make computer work more efficient."
            );

        }

        if (selectedTime >= 180) {

            list.push(
                "Developing a consistent typing rhythm is important because speed should always be balanced with accuracy and control."
            );

        }

        if (selectedTime >= 300) {

            list.push(
                "People who spend many hours using computers can benefit greatly from touch typing because it reduces unnecessary movement and allows them to focus on their actual work."
            );

        }

        return randomItem(list);
    }


    // LEVEL 5
    if (selectedLevel === 5) {

        let text = randomItem(level5Texts);

        // Longer content for longer tests
        if (selectedTime >= 120) {

            text += " " + randomItem(level5Texts);

        }

        if (selectedTime >= 180) {

            text += " " + randomItem(level5Texts);

        }

        if (selectedTime >= 300) {

            text += " " + randomItem(level5Texts);

            text += " " + randomItem(level5Texts);

        }

        return text;
    }


    return randomItem(level3Texts);
}


// ======================================================
// SHOW RANDOM TEXT
// ======================================================

function showRandomText() {

    currentText = getPracticeText();

    textDisplay.innerHTML = "";

    for (
        let i = 0;
        i < currentText.length;
        i++
    ) {

        const span =
            document.createElement("span");

        span.innerText =
            currentText[i];

        textDisplay.appendChild(span);
    }

    highlightText();

    updateLevelUI();
}


// ======================================================
// UPDATE LEVEL UI
// ======================================================

function updateLevelUI() {

    const info =
        levelInfo[selectedLevel];

    levelTitle.innerText =
        info.title;

    levelDescription.innerText =
        info.description;

    practiceHeading.innerText =
        info.heading;


    // LEVEL 1 / 2 KEYBOARD
    if (
        selectedLevel === 1 ||
        selectedLevel === 2
    ) {

        keyboardArea.style.display =
            "block";

        fingerGuide.style.display =
            "flex";

    } else {

        keyboardArea.style.display =
            "none";

        fingerGuide.style.display =
            "none";

    }


    if (selectedLevel === 1) {

        fingerGuide.style.display =
            "flex";

        updateFingerGuide();

    }


    if (selectedLevel === 2) {

        fingerGuide.style.display =
            "flex";

        fingerTitle.innerText =
            "Keyboard Key Practice";

        fingerText.innerText =
            "Follow the highlighted key on the keyboard.";

    }

}


// ======================================================
// UPDATE FINGER GUIDE
// ======================================================

function updateFingerGuide() {

    if (!currentText) {
        return;
    }


    const typed =
        input.value;

    let index =
        typed.length;


    while (
        index < currentText.length &&
        currentText[index] === " "
    ) {

        index++;

    }


    if (index >= currentText.length) {
        return;
    }


    const character =
        currentText[index].toLowerCase();


    const info =
        fingerMap[character];


    if (info) {

        fingerTitle.innerText =
            info.finger;

        fingerText.innerText =
            info.text;

    } else {

        fingerTitle.innerText =
            "Space Bar";

        fingerText.innerText =
            "Use your thumb to press the Space Bar.";

    }

}


// ======================================================
// CLEAR KEYBOARD
// ======================================================

function clearKeyboard() {

    keys.forEach(function (key) {

        key.classList.remove(
            "active-key",
            "correct-key",
            "wrong-key"
        );

    });

}


// ======================================================
// HIGHLIGHT NEXT KEY
// ======================================================

function highlightNextKey() {

    clearKeyboard();

    if (!currentText) {
        return;
    }


    const typed =
        input.value;

    let index =
        typed.length;


    // Skip spaces
    while (
        index < currentText.length &&
        currentText[index] === " "
    ) {

        index++;

    }


    if (index >= currentText.length) {
        return;
    }


    const character =
        currentText[index].toLowerCase();


    currentTargetKey =
        character;


    keys.forEach(function (key) {

        const keyValue =
            key.dataset.key;

        if (keyValue === character) {

            key.classList.add(
                "active-key"
            );

        }

    });


    updateFingerGuide();
}


// ======================================================
// LOAD BEST SCORE
// ======================================================

function loadBestScore() {

    const best =
        Number(
            localStorage.getItem("bestWpm")
        ) || 0;

    bestWpmDisplay.innerText =
        best;
}

loadBestScore();


// ======================================================
// SCORE HISTORY
// ======================================================

function loadHistory() {

    const history =
        JSON.parse(
            localStorage.getItem(
                "typingScores"
            )
        ) || [];


    scoreHistory.innerHTML = "";


    if (history.length === 0) {

        scoreHistory.innerHTML =
            `<p class="no-history">
                No scores yet.
            </p>`;

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
                    ${score.date}
                </span>

                <span>
                    Level ${score.level}
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

loadHistory();


// ======================================================
// LEVEL BUTTONS
// ======================================================

levelButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            // Don't change level during test
            if (testStarted) {
                return;
            }


            levelButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            selectedLevel =
                Number(
                    button.dataset.level
                );


            // Reset practice
            input.value = "";

            time = selectedTime;

            timer.innerText =
                selectedTime + "s";

            wpm.innerText = "0";

            accuracy.innerText =
                "100%";

            mistakesDisplay.innerText =
                "0";

            progressBar.style.width =
                "100%";


            result.classList.add(
                "hidden"
            );


            showRandomText();

            highlightNextKey();

        }
    );

});


// ======================================================
// TIME BUTTONS
// ======================================================

timeButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            if (testStarted) {
                return;
            }


            timeButtons.forEach(
                function (btn) {

                    btn.classList.remove(
                        "active"
                    );

                }
            );


            button.classList.add("active");


            selectedTime =
                Number(
                    button.dataset.time
                );


            time = selectedTime;


            timer.innerText =
                selectedTime + "s";


            progressBar.style.width =
                "100%";


            showRandomText();

        }
    );

});


// ======================================================
// START TEST
// ======================================================

startBtn.addEventListener(
    "click",
    function () {

        if (testStarted) {
            return;
        }


        testStarted = true;


        time = selectedTime;


        totalCorrect = 0;

        totalMistakes = 0;


        timer.innerText =
            time + "s";


        wpm.innerText =
            "0";


        accuracy.innerText =
            "100%";


        mistakesDisplay.innerText =
            "0";


        progressBar.style.width =
            "100%";


        input.value = "";

        input.disabled = false;


        result.classList.add(
            "hidden"
        );


        startBtn.disabled = true;


        // Disable level/time changes
        levelButtons.forEach(
            function (btn) {

                btn.style.pointerEvents =
                    "none";

                btn.style.opacity =
                    "0.6";

            }
        );


        timeButtons.forEach(
            function (btn) {

                btn.style.pointerEvents =
                    "none";

                btn.style.opacity =
                    "0.6";

            }
        );


        showRandomText();


        input.focus();


        highlightNextKey();


        startTimer();

    }
);


// ======================================================
// TIMER
// ======================================================

function startTimer() {

    clearInterval(interval);


    interval =
        setInterval(
            function () {

                time--;


                if (time < 0) {
                    time = 0;
                }


                timer.innerText =
                    time + "s";


                const progress =
                    (time / selectedTime) *
                    100;


                progressBar.style.width =
                    progress + "%";


                calculate();


                if (time === 0) {

                    finishTest();

                }

            },
            1000
        );

}


// ======================================================
// INPUT
// ======================================================

input.addEventListener(
    "input",
    function () {

        if (!testStarted) {
            return;
        }


        // Don't allow typing beyond target
        if (
            input.value.length >
            currentText.length
        ) {

            input.value =
                input.value.substring(
                    0,
                    currentText.length
                );

        }


        calculate();

        highlightText();

        highlightNextKey();


        // Auto move to next text
        if (
            input.value.length >=
            currentText.length
        ) {

            if (selectedLevel >= 3) {

                input.value = "";

                showRandomText();

            } else {

                input.value = "";

                showRandomText();

            }

            highlightNextKey();

        }

    }
);


// ======================================================
// CALCULATE
// ======================================================

function calculate() {

    const typed =
        input.value;


    if (typed.length === 0) {

        wpm.innerText =
            "0";

        accuracy.innerText =
            "100%";

        mistakesDisplay.innerText =
            "0";

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
            typed[i] ===
            currentText[i]
        ) {

            correct++;

        } else {

            mistakes++;

        }

    }


    totalCorrect =
        correct;

    totalMistakes =
        mistakes;


    // Accuracy

    const accuracyValue =
        (correct / typed.length) * 100;


    accuracy.innerText =
        Math.round(
            accuracyValue
        ) + "%";


    // Mistakes

    mistakesDisplay.innerText =
        mistakes;


    // WPM

    const usedTime =
        selectedTime - time;


    if (usedTime > 0) {

        const words =
            typed.trim().length === 0
                ? 0
                : typed.trim()
                    .split(/\s+/)
                    .length;


        const minutes =
            usedTime / 60;


        const speed =
            words / minutes;


        wpm.innerText =
            Math.round(speed);

    }

}


// ======================================================
// HIGHLIGHT TEXT
// ======================================================

function highlightText() {

    const typed =
        input.value;


    const spans =
        textDisplay.querySelectorAll(
            "span"
        );


    spans.forEach(
        function (span, index) {

            span.classList.remove(
                "correct",
                "wrong",
                "current"
            );


            if (
                index <
                typed.length
            ) {

                if (
                    typed[index] ===
                    currentText[index]
                ) {

                    span.classList.add(
                        "correct"
                    );

                } else {

                    span.classList.add(
                        "wrong"
                    );

                }

            }


            if (
                index ===
                typed.length
            ) {

                span.classList.add(
                    "current"
                );

            }

        }
    );

}


// ======================================================
// FINISH TEST
// ======================================================

function finishTest() {

    if (!testStarted) {
        return;
    }


    clearInterval(interval);

    interval = null;


    testStarted = false;


    time = 0;


    timer.innerText =
        "0s";


    progressBar.style.width =
        "0%";


    input.disabled = true;


    startBtn.disabled = false;


    // Enable level/time buttons
    levelButtons.forEach(
        function (btn) {

            btn.style.pointerEvents =
                "auto";

            btn.style.opacity =
                "1";

        }
    );


    timeButtons.forEach(
        function (btn) {

            btn.style.pointerEvents =
                "auto";

            btn.style.opacity =
                "1";

        }
    );


    const typed =
        input.value;


    // ==================================================
    // WORDS
    // ==================================================

    let totalWords = 0;


    if (
        typed.trim().length > 0
    ) {

        totalWords =
            typed.trim()
                .split(/\s+/)
                .length;

    }


    // ==================================================
    // CHARACTERS
    // ==================================================

    const totalCharacters =
        typed.length;


    // ==================================================
    // CORRECT / MISTAKES
    // ==================================================

    let correct = 0;

    let mistakes = 0;


    for (
        let i = 0;
        i < typed.length;
        i++
    ) {

        if (
            typed[i] ===
            currentText[i]
        ) {

            correct++;

        } else {

            mistakes++;

        }

    }


    // ==================================================
    // ACCURACY
    // ==================================================

    let accuracyValue = 100;


    if (
        totalCharacters > 0
    ) {

        accuracyValue =
            (
                correct /
                totalCharacters
            ) * 100;

    }


    // ==================================================
    // WPM
    // ==================================================

    const speed =
        Math.round(
            totalWords /
            (selectedTime / 60)
        );


    // ==================================================
    // RESULT
    // ==================================================

    finalWpm.innerText =
        speed;


    finalAccuracy.innerText =
        Math.round(
            accuracyValue
        ) + "%";


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


    // ==================================================
    // BEST WPM
    // ==================================================

    const oldBest =
        Number(
            localStorage.getItem(
                "bestWpm"
            )
        ) || 0;


    if (speed > oldBest) {

        localStorage.setItem(
            "bestWpm",
            speed
        );


        bestWpmDisplay.innerText =
            speed;

    }


    // ==================================================
    // SAVE HISTORY
    // ==================================================

    saveScore(
        speed,
        Math.round(accuracyValue)
    );


    // ==================================================
    // RESULT MESSAGE
    // ==================================================

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
            "Keep practicing! Focus on accuracy first and speed will improve. 🚀";

    }


    result.classList.remove(
        "hidden"
    );


    result.scrollIntoView({
        behavior: "smooth"
    });


    completedTests++;

}


// ======================================================
// SAVE SCORE
// ======================================================

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

        wpm: wpmValue,

        accuracy:
            accuracyValue,

        level:
            selectedLevel,

        date:
            date

    });


    history =
        history.slice(0, 5);


    localStorage.setItem(
        "typingScores",
        JSON.stringify(history)
    );


    loadHistory();

}


// ======================================================
// CLEAR HISTORY
// ======================================================

clearHistoryBtn.addEventListener(
    "click",
    function () {

        localStorage.removeItem(
            "typingScores"
        );

        loadHistory();

    }
);


// ======================================================
// RESTART
// ======================================================

restartBtn.addEventListener(
    "click",
    function () {

        clearInterval(interval);

        interval = null;

        testStarted = false;


        time =
            selectedTime;


        timer.innerText =
            selectedTime + "s";


        wpm.innerText =
            "0";


        accuracy.innerText =
            "100%";


        mistakesDisplay.innerText =
            "0";


        progressBar.style.width =
            "100%";


        input.value = "";

        input.disabled = true;


        startBtn.disabled = false;


        result.classList.add(
            "hidden"
        );


        // Enable selectors

        levelButtons.forEach(
            function (btn) {

                btn.style.pointerEvents =
                    "auto";

                btn.style.opacity =
                    "1";

            }
        );


        timeButtons.forEach(
            function (btn) {

                btn.style.pointerEvents =
                    "auto";

                btn.style.opacity =
                    "1";

            }
        );


        showRandomText();

        highlightNextKey();

    }
);


// ======================================================
// DARK MODE
// ======================================================

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

            themeBtn.innerText =
                "☀️";


            localStorage.setItem(
                "theme",
                "dark"
            );

        }

        else {

            themeBtn.innerText =
                "🌙";


            localStorage.setItem(
                "theme",
                "light"
            );

        }

    }
);


// ======================================================
// LOAD SAVED THEME
// ======================================================

const savedTheme =
    localStorage.getItem("theme");


if (
    savedTheme === "dark"
) {

    document.body.classList.add(
        "dark"
    );


    themeBtn.innerText =
        "☀️";

}


// ======================================================
// INITIAL SETUP
// ======================================================

input.disabled = true;

time = selectedTime;

timer.innerText =
    selectedTime + "s";


showRandomText();

highlightNextKey();

loadBestScore();

loadHistory();


// ======================================================
// KEYBOARD PHYSICAL KEY SUPPORT
// ======================================================

document.addEventListener(
    "keydown",
    function (event) {

        if (!testStarted) {
            return;
        }


        const key =
            event.key.toLowerCase();


        keys.forEach(
            function (keyboardKey) {

                if (
                    keyboardKey.dataset.key ===
                    key
                ) {

                    keyboardKey.classList.add(
                        "correct-key"
                    );


                    setTimeout(
                        function () {

                            keyboardKey.classList.remove(
                                "correct-key"
                            );

                        },
                        150
                    );

                }

            }
        );

    }
);