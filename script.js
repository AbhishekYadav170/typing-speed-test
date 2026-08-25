const input = document.getElementById("textInput");

const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");

const timer = document.getElementById("timer");
const wpm = document.getElementById("wpm");
const accuracy = document.getElementById("accuracy");
const mistakesDisplay = document.getElementById("mistakes");

const progressBar = document.getElementById("progressBar");

const textDisplay = document.getElementById("textDisplay");

const levelButtons =
  document.querySelectorAll(".level-btn");

const timeButtons =
  document.querySelectorAll(".time-btn");

const levelTitle =
  document.getElementById("levelTitle");

const levelDescription =
  document.getElementById("levelDescription");

const practiceHeading =
  document.getElementById("practiceHeading");

const fingerGuide =
  document.getElementById("fingerGuide");

const fingerTitle =
  document.getElementById("fingerTitle");

const fingerText =
  document.getElementById("fingerText");

const keyboardArea =
  document.getElementById("keyboardArea");

const keys =
  document.querySelectorAll(".key");

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

const bestWpm =
  document.getElementById("bestWpm");

const scoreHistory =
  document.getElementById("scoreHistory");

const clearHistory =
  document.getElementById("clearHistory");

const themeBtn =
  document.getElementById("themeBtn");



/* =================================
   LEVEL DATA
================================= */

const levels = {

  1: {
    title: "Level 1 - Finger Practice",

    description:
      "Learn which finger should be used for each keyboard key.",

    type: "finger"
  },

  2: {
    title: "Level 2 - Keyboard Keys",

    description:
      "Practice keyboard keys one by one and build your key memory.",

    type: "keys"
  },

  3: {
    title: "Level 3 - Easy Sentences",

    description:
      "Practice short and simple sentences.",

    type: "text"
  },

  4: {
    title: "Level 4 - Sentences",

    description:
      "Practice longer sentences with better accuracy.",

    type: "text"
  },

  5: {
    title: "Level 5 - Paragraph",

    description:
      "Final level! Type the paragraph by looking only at the text and try to achieve your best WPM.",

    type: "text"
  }

};



/* =================================
   FINGER PRACTICE
================================= */

const fingerPractice = [

  {
    key: "a",
    finger: "Left Pinky Finger",
    text: "Use your left little finger to press A."
  },

  {
    key: "s",
    finger: "Left Ring Finger",
    text: "Use your left ring finger to press S."
  },

  {
    key: "d",
    finger: "Left Middle Finger",
    text: "Use your left middle finger to press D."
  },

  {
    key: "f",
    finger: "Left Index Finger",
    text: "Use your left index finger to press F."
  },

  {
    key: "j",
    finger: "Right Index Finger",
    text: "Use your right index finger to press J."
  },

  {
    key: "k",
    finger: "Right Middle Finger",
    text: "Use your right middle finger to press K."
  },

  {
    key: "l",
    finger: "Right Ring Finger",
    text: "Use your right ring finger to press L."
  },

  {
    key: ";",
    finger: "Right Pinky Finger",
    text: "Use your right little finger to press the semicolon key."
  }

];



/* =================================
   LEVEL 2 KEY PRACTICE
================================= */

const keyPractice = [

  "asdf",

  "jkl;",

  "asdf jkl;",

  "fjfj",

  "djdj",

  "sksk",

  "alal",

  "fads",

  "jkl;",

  "asdf jkl; asdf"

];



/* =================================
   LEVEL 3
================================= */

const easySentences = [

  "I can type.",

  "Practice every day.",

  "Typing is easy.",

  "Keep your hands relaxed.",

  "I will improve my typing.",

  "Good typing needs practice.",

  "Stay focused and type carefully."

];



/* =================================
   LEVEL 4
================================= */

const sentences = [

  "Regular practice can improve your typing speed and accuracy.",

  "Keep your fingers on the correct keys and maintain a comfortable position.",

  "Typing slowly and correctly is better than typing quickly with many mistakes.",

  "Good typing skills help students and professionals work more efficiently.",

  "Stay focused, keep practicing, and your typing speed will improve over time."

];



/* =================================
   LEVEL 5
================================= */

const paragraphs = [

  "Web development combines creativity and technology to build useful digital experiences. Regular typing practice helps developers write code faster, communicate clearly, and work more efficiently.",

  "Learning new skills requires patience, practice, and consistency. When we practice typing every day, our fingers become familiar with the keyboard and our typing speed gradually improves.",

  "Technology has changed the way people learn and work. Strong typing skills can help students complete assignments faster and help professionals communicate and work more efficiently.",

  "Success does not happen in one day. Small improvements made through regular practice can create excellent results over time. Stay focused and continue learning every day."

];



/* =================================
   VARIABLES
================================= */

let selectedLevel = 1;

let selectedTime = 60;

let time = 60;

let interval = null;

let testStarted = false;

let currentText = "";

let currentTarget = "";

let fingerIndex = 0;

let keyIndex = 0;



/* =================================
   RANDOM ITEM
================================= */

function randomItem(array) {

  return array[
    Math.floor(Math.random() * array.length)
  ];

}



/* =================================
   LOAD LEVEL
================================= */

function loadLevel() {

  const level = levels[selectedLevel];

  levelTitle.innerText = level.title;

  levelDescription.innerText =
    level.description;


  levelButtons.forEach(function (button) {

    button.classList.toggle(
      "active",
      Number(button.dataset.level) === selectedLevel
    );

  });


  result.classList.add("hidden");

  input.value = "";

  wpm.innerText = "0";

  accuracy.innerText = "100%";

  mistakesDisplay.innerText = "0";

  fingerIndex = 0;

  keyIndex = 0;


  if (selectedLevel === 1) {

    loadFingerLevel();

  }

  else if (selectedLevel === 2) {

    loadKeyLevel();

  }

  else {

    loadTextLevel();

  }

}



/* =================================
   LEVEL 1
================================= */

function loadFingerLevel() {

  fingerGuide.classList.remove("hidden");

  keyboardArea.classList.remove("hidden");

  textDisplay.innerHTML = "";

  practiceHeading.innerText =
    "Finger Practice";

  showFingerStep();

}



/* =================================
   SHOW FINGER STEP
================================= */

function showFingerStep() {

  const item =
    fingerPractice[fingerIndex];

  currentTarget =
    item.key;

  currentText =
    item.key;

  fingerTitle.innerText =
    item.finger;

  fingerText.innerText =
    item.text;


  highlightKey(item.key);

  textDisplay.innerHTML =
    `<span class="current">${item.key.toUpperCase()}</span>`;

}



/* =================================
   LEVEL 2
================================= */

function loadKeyLevel() {

  fingerGuide.classList.add("hidden");

  keyboardArea.classList.remove("hidden");

  practiceHeading.innerText =
    "Keyboard Key Practice";

  currentTarget =
    keyPractice[keyIndex];

  currentText =
    currentTarget;

  showText(currentText);

  highlightCurrentKey();

}



/* =================================
   NEXT KEY LEVEL
================================= */

function nextKeyPractice() {

  keyIndex++;

  if (keyIndex >= keyPractice.length) {

    keyIndex = 0;

  }

  currentTarget =
    keyPractice[keyIndex];

  currentText =
    currentTarget;

  input.value = "";

  showText(currentText);

  highlightCurrentKey();

}



/* =================================
   LEVEL 3-5
================================= */

function loadTextLevel() {

  fingerGuide.classList.add("hidden");

  keyboardArea.classList.add("hidden");

  practiceHeading.innerText =
    selectedLevel === 3
      ? "Easy Sentence Practice"
      : selectedLevel === 4
        ? "Sentence Practice"
        : "Paragraph Practice";


  if (selectedLevel === 3) {

    currentText =
      randomItem(easySentences);

  }

  else if (selectedLevel === 4) {

    currentText =
      randomItem(sentences);

  }

  else {

    currentText =
      randomItem(paragraphs);

  }


  showText(currentText);

}



/* =================================
   SHOW TEXT
================================= */

function showText(text) {

  textDisplay.innerHTML = "";

  for (let i = 0; i < text.length; i++) {

    const span =
      document.createElement("span");

    span.innerText = text[i];

    textDisplay.appendChild(span);

  }

  highlightText();

}



/* =================================
   KEYBOARD HIGHLIGHT
================================= */

function highlightKey(key) {

  keys.forEach(function (item) {

    item.classList.remove(
      "active-key",
      "correct-key",
      "wrong-key"
    );

  });


  const target =
    document.querySelector(
      `.key[data-key="${key}"]`
    );


  if (target) {

    target.classList.add(
      "active-key"
    );

  }

}



/* =================================
   CURRENT KEY
================================= */

function highlightCurrentKey() {

  keys.forEach(function (item) {

    item.classList.remove(
      "active-key",
      "correct-key",
      "wrong-key"
    );

  });


  const typed =
    input.value.length;

  const next =
    currentText[typed];


  if (!next) {
    return;
  }


  const key =
    document.querySelector(
      `.key[data-key="${next.toLowerCase()}"]`
    );


  if (key) {

    key.classList.add(
      "active-key"
    );

  }

}



/* =================================
   TEXT HIGHLIGHT
================================= */

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


    if (index < typed.length) {

      if (
        typed[index] ===
        currentText[index]
      ) {

        span.classList.add("correct");

      }

      else {

        span.classList.add("wrong");

      }

    }


    if (
      index === typed.length &&
      index < currentText.length
    ) {

      span.classList.add("current");

    }

  });

}



/* =================================
   START TEST
================================= */

startBtn.addEventListener(
  "click",
  function () {

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

    startBtn.disabled = true;


    result.classList.add("hidden");


    if (selectedLevel === 1) {

      fingerIndex = 0;

      showFingerStep();

    }

    else if (selectedLevel === 2) {

      keyIndex = 0;

      loadKeyLevel();

    }

    else {

      loadTextLevel();

    }


    input.focus();

    startTimer();

  }
);



/* =================================
   TIMER
================================= */

function startTimer() {

  clearInterval(interval);


  interval =
    setInterval(function () {

      time--;


      if (time < 0) {

        time = 0;

      }


      timer.innerText =
        formatTime(time);


      const percentage =
        (time / selectedTime) * 100;


      progressBar.style.width =
        percentage + "%";


      calculate();


      if (time === 0) {

        finishTest();

      }

    }, 1000);

}



/* =================================
   FORMAT TIME
================================= */

function formatTime(seconds) {

  if (seconds < 60) {

    return seconds + "s";

  }


  const minutes =
    Math.floor(seconds / 60);

  const remaining =
    seconds % 60;


  if (remaining === 0) {

    return minutes + "m";

  }


  return (
    minutes +
    ":" +
    String(remaining).padStart(2, "0")
  );

}



/* =================================
   INPUT
================================= */

input.addEventListener(
  "input",
  function () {

    if (!testStarted) {
      return;
    }


    calculate();

    highlightText();


    if (selectedLevel === 1) {

      handleFingerInput();

    }

    else if (selectedLevel === 2) {

      highlightCurrentKey();

      if (
        input.value === currentText
      ) {

        setTimeout(
          nextKeyPractice,
          150
        );

      }

    }

    else {

      if (
        input.value === currentText
      ) {

        finishTest();

      }

    }

  }
);



/* =================================
   FINGER INPUT
================================= */

function handleFingerInput() {

  const typed =
    input.value.toLowerCase();


  if (
    typed.length === 1 &&
    typed === currentTarget
  ) {

    fingerIndex++;


    if (
      fingerIndex >=
      fingerPractice.length
    ) {

      fingerIndex = 0;

    }


    input.value = "";

    showFingerStep();

  }

}



/* =================================
   CALCULATE
================================= */

function calculate() {

  const typed =
    input.value;


  if (!typed.length) {

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
      typed[i] ===
      currentText[i]
    ) {

      correct++;

    }

    else {

      mistakes++;

    }

  }


  const accuracyValue =
    (correct / typed.length) * 100;


  accuracy.innerText =
    Math.round(accuracyValue) + "%";


  mistakesDisplay.innerText =
    mistakes;


  const usedTime =
    selectedTime - time;


  if (usedTime > 0) {

    const words =
      typed.trim()
        ? typed.trim().split(/\s+/).length
        : 0;


    const minutes =
      usedTime / 60;


    wpm.innerText =
      Math.round(words / minutes);

  }

}



/* =================================
   FINISH TEST
================================= */

function finishTest() {

  if (!testStarted) {
    return;
  }


  clearInterval(interval);

  interval = null;

  testStarted = false;


  time = 0;

  timer.innerText =
    formatTime(selectedTime);


  progressBar.style.width =
    "0%";


  input.disabled = true;

  startBtn.disabled = false;


  const typed =
    input.value;


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

    }

    else {

      mistakes++;

    }

  }


  const characters =
    typed.length;


  const words =
    typed.trim()
      ? typed.trim().split(/\s+/).length
      : 0;


  const accuracyValue =
    characters
      ? (correct / characters) * 100
      : 100;


  const speed =
    Math.round(
      words /
      (selectedTime / 60)
    );


  finalWpm.innerText =
    speed;

  finalAccuracy.innerText =
    Math.round(accuracyValue) + "%";

  finalWords.innerText =
    words;

  finalCharacters.innerText =
    characters;

  finalCorrect.innerText =
    correct;

  finalMistakes.innerText =
    mistakes;

  finalTime.innerText =
    formatTime(selectedTime);


  /* BEST SCORE */

  const oldBest =
    Number(
      localStorage.getItem("bestWpm")
    ) || 0;


  if (speed > oldBest) {

    localStorage.setItem(
      "bestWpm",
      speed
    );

    bestWpm.innerText =
      speed;

  }


  /* HISTORY */

  saveScore(
    speed,
    Math.round(accuracyValue)
  );


  /* MESSAGE */

  if (accuracyValue >= 95 && speed >= 60) {

    resultMessage.innerText =
      "🔥 Excellent! You are a typing master!";

  }

  else if (accuracyValue >= 90) {

    resultMessage.innerText =
      "👏 Great accuracy! Keep practicing to become faster.";

  }

  else if (accuracyValue >= 75) {

    resultMessage.innerText =
      "👍 Good effort! Focus on accuracy and regular practice.";

  }

  else {

    resultMessage.innerText =
      "💪 Keep practicing. Accuracy comes before speed.";

  }


  result.classList.remove(
    "hidden"
  );


  result.scrollIntoView({
    behavior: "smooth"
  });

}



/* =================================
   RESTART
================================= */

restartBtn.addEventListener(
  "click",
  function () {

    clearInterval(interval);

    interval = null;

    testStarted = false;


    time = selectedTime;


    timer.innerText =
      formatTime(selectedTime);


    wpm.innerText = "0";

    accuracy.innerText = "100%";

    mistakesDisplay.innerText = "0";


    progressBar.style.width =
      "100%";


    input.value = "";

    input.disabled = true;

    startBtn.disabled = false;


    result.classList.add(
      "hidden"
    );


    loadLevel();

  }
);



/* =================================
   LEVEL BUTTONS
================================= */

levelButtons.forEach(
  function (button) {

    button.addEventListener(
      "click",
      function () {

        if (testStarted) {
          return;
        }


        selectedLevel =
          Number(button.dataset.level);


        loadLevel();

      }
    );

  }
);



/* =================================
   TIME BUTTONS
================================= */

timeButtons.forEach(
  function (button) {

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


        button.classList.add(
          "active"
        );


        selectedTime =
          Number(
            button.dataset.time
          );


        time =
          selectedTime;


        timer.innerText =
          formatTime(selectedTime);


        progressBar.style.width =
          "100%";

      }
    );

  }
);



/* =================================
   SAVE SCORE
================================= */

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


  history.unshift({

    wpm: wpmValue,

    accuracy: accuracyValue,

    level: selectedLevel,

    date:
      new Date()
        .toLocaleDateString()

  });


  history =
    history.slice(0, 5);


  localStorage.setItem(
    "typingScores",
    JSON.stringify(history)
  );


  loadHistory();

}



/* =================================
   LOAD HISTORY
================================= */

function loadHistory() {

  const history =
    JSON.parse(
      localStorage.getItem(
        "typingScores"
      )
    ) || [];


  scoreHistory.innerHTML = "";


  if (!history.length) {

    scoreHistory.innerHTML =
      `<p class="no-history">
        No scores yet.
      </p>`;

    return;

  }


  history.forEach(
    function (score) {

      const item =
        document.createElement("div");


      item.className =
        "score-item";


      item.innerHTML = `

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


      scoreHistory.appendChild(
        item
      );

    }
  );

}



/* =================================
   CLEAR HISTORY
================================= */

clearHistory.addEventListener(
  "click",
  function () {

    localStorage.removeItem(
      "typingScores"
    );

    loadHistory();

  }
);



/* =================================
   DARK MODE
================================= */

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


    themeBtn.innerText =
      dark ? "☀️" : "🌙";


    localStorage.setItem(
      "theme",
      dark ? "dark" : "light"
    );

  }
);



/* =================================
   LOAD SAVED THEME
================================= */

if (
  localStorage.getItem("theme")
  === "dark"
) {

  document.body.classList.add(
    "dark"
  );

  themeBtn.innerText = "☀️";

}



/* =================================
   BEST SCORE
================================= */

bestWpm.innerText =
  localStorage.getItem(
    "bestWpm"
  ) || "0";



/* =================================
   INITIAL LOAD
================================= */

loadHistory();

loadLevel();