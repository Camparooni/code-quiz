// Quiz questions and answers
const questions = [
  {
    question: "Commonly used data types do NOT include:",
    options: ["strings", "booleans", "alerts", "numbers"],
    answer: "alerts"
  },
  {
    question: "The condition in an if / else statement is enclosed with ____.",
    options: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    answer: "parenthesis"
  },
  {
    question: "Arrays in JavaScript can be used to store ____.",
    options: ["numbers and strings", "other arrays", "booleans", "all of the above"],
    answer: "all of the above"
  },
  {
    question: "String values must be enclosed within ____ when being assigned to variables",
    options: ["commas", "curly brackets", "quotes", "parenthesis"],
    answer: "quotes"
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is: ",
    options: ["JavaScript", "terminal/bash", "for loops", "console.log"],
    answer: "console.log"
  },
];

// page variables
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120;
let timerId;

const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const optionsContainer = document.getElementById("options-container");
const feedbackContainer = document.getElementById("feedback-container");
const timerContainer = document.getElementById("timer-container");
const gameOverContainer = document.getElementById("game-over-container");
const finalScoreSpan = document.getElementById("final-score");
const scoreFormContainer = document.getElementById("score-form-container");
const initialsInput = document.getElementById("initials");
const scoreForm = document.getElementById("score-form");
const playAgainBtn = document.getElementById("play-again-btn");

// event listeners
startBtn.addEventListener("click", startQuiz);
scoreForm.addEventListener("submit", saveScore);
playAgainBtn.addEventListener("click", playAgain);

// functions
function startQuiz() {
  startTimer();
  showQuestion();
  startBtn.style.display = "none";
}

// countdown timer
function startTimer() {
  timerId = setInterval(() => {
    timeLeft--;
    timerContainer.textContent = "Time: " + timeLeft;

    if (timeLeft <= 0) {
      endQuiz();
    }
  }, 1000);
}

function showQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionContainer.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  for (let i = 0; i < currentQuestion.options.length; i++) {
    const option = document.createElement("button");
    option.textContent = currentQuestion.options[i];
    option.addEventListener("click", checkAnswer);
    optionsContainer.appendChild(option);
  }
}

// answer checking 
function checkAnswer(event) {
  const selectedOption = event.target;
  const currentQuestion = questions[currentQuestionIndex];

  if (selectedOption.textContent === currentQuestion.answer) {
    score++;
    feedbackContainer.textContent = "Correct!";
  } else {
    timeLeft -= 10;
    feedbackContainer.textContent = "Incorrect!";
  }

  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timerId);
  questionContainer.textContent = "";
  optionsContainer.textContent = "";
  feedbackContainer.textContent = "";
  timerContainer.textContent = "";

  finalScoreSpan.textContent = score;
  scoreFormContainer.classList.remove("hidden");
  playAgainBtn.style.display = "block";
}

// storing score in console
function saveScore(event) {
  event.preventDefault();
  const initials = initialsInput.value;
  
  console.log("Initials: " + initials + ", Score: " + score);
  scoreForm.reset();
}

function playAgain() {
  currentQuestionIndex = 0;
  score = 0;
  timeLeft = 120;
  scoreFormContainer.classList.add("hidden");
  playAgainBtn.style.display = "none";
  startQuiz();
}