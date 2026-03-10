// Check authentication and redirect if not logged in
const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn || !user) {
  window.location.replace("login.html");
}

// Constructor for Answer object
function AnswerConstruct(id, text, isCorrect) {
  this.id = id;
  this.text = text;
  this.isCorrect = isCorrect;
}

// Constructor for Question object
function QuestionConstruct(id, text, answers) {
  this.id = id;
  this.text = text;
  this.answers = answers;
  this.userAnswer = null;

  // Method to check if answer is correct
  this.checkAnswer = function (answerId) {
    const answer = this.answers.find((a) => a.id === answerId);
    return answer ? answer.isCorrect : false;
  };

  // Method to set user's answer
  this.setUserAnswer = function (answerId) {
    this.userAnswer = answerId;
  };
}

// Exam Data

const examQuestions = [
  new QuestionConstruct(1, "I wish I ___ those words. But now it's too late.", [
    new AnswerConstruct(1, "had having said", false),
    new AnswerConstruct(2, "have never said", false),
    new AnswerConstruct(3, "never said", false),
    new AnswerConstruct(4, "had never said", true),
  ]),
  new QuestionConstruct(
    2,
    "___ in trying to solve this problem. It's clearly unsolvable.",
    [
      new AnswerConstruct(1, "There's no point", true),
      new AnswerConstruct(2, "I'll try point", false),
      new AnswerConstruct(3, "There isn't point", false),
      new AnswerConstruct(4, "try no point", false),
    ],
  ),
  new QuestionConstruct(
    3,
    "She ___ her keys. She's been looking for them all morning.",
    [
      new AnswerConstruct(1, "has lost", true),
      new AnswerConstruct(2, "had lost", false),
      new AnswerConstruct(3, "loses", false),
      new AnswerConstruct(4, "lost", false),
    ],
  ),
  new QuestionConstruct(4, "If I ___ you, I would accept the offer.", [
    new AnswerConstruct(1, "am", false),
    new AnswerConstruct(2, "was", false),
    new AnswerConstruct(3, "were", true),
    new AnswerConstruct(4, "be", false),
  ]),
  new QuestionConstruct(5, "The report ___ by tomorrow morning.", [
    new AnswerConstruct(1, "must finish", false),
    new AnswerConstruct(2, "must be finished", true),
    new AnswerConstruct(3, "must finishing", false),
    new AnswerConstruct(4, "must finishes", false),
  ]),
  new QuestionConstruct(6, "He's interested ___ learning new languages.", [
    new AnswerConstruct(1, "in", true),
    new AnswerConstruct(2, "on", false),
    new AnswerConstruct(3, "at", false),
    new AnswerConstruct(4, "for", false),
  ]),
];

// Exam State Variables

const EXAM_DURATION = 5 * 60; // 5 minutes in seconds
let currentQuestionIndex = 0;
let shuffledQuestions = [];
let markedQuestions = new Set();
let timerInterval = null;
let remainingTime = EXAM_DURATION;
let userFirstName = user.firstName || "Student";
let userLastName = user.lastName || "";

// Helper Functions

// Shuffle array function for randomizing questions
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

// Format time as MM:SS
function formatTime(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// Initialization

function initExam() {
  // Display user name
  const userDisplayName = userLastName
    ? `${userFirstName} ${userLastName}`
    : userFirstName;
  document.getElementById("userName").textContent = userDisplayName;

  // Shuffle questions for random display
  shuffledQuestions = shuffleArray(examQuestions);

  // Start timer
  startTimer();

  // Display first question
  displayQuestion();

  // Setup event listeners
  setupEventListeners();
}

// Timer Functions

function startTimer() {
  // Update timer bar initially
  updateTimerBar();

  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerBar();

    // Show reminder at 3 minutes and 1 minute remaining
    if (remainingTime === 180 || remainingTime === 60) {
      showTimeReminder();
    }

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      handleTimeout();
    }
  }, 1000);
}

function updateTimerBar() {
  const timerBar = document.getElementById("timerBar");
  const timerDisplay = document.getElementById("timerDisplay");

  // Calculate percentage of time remaining
  const percentageRemaining = (remainingTime / EXAM_DURATION) * 100;

  // Update timer bar width
  timerBar.style.width = percentageRemaining + "%";

  // Update timer text
  timerDisplay.textContent = formatTime(remainingTime);

  // Change bar color based on time remaining
  timerBar.classList.remove("warning", "danger");
  if (remainingTime <= 60) {
    // Less than 1 minute - red (danger)
    timerBar.classList.add("danger");
  } else if (remainingTime <= 120) {
    // Less than 2 minutes - orange (warning)
    timerBar.classList.add("warning");
  }
}

function showTimeReminder() {
  const reminderDiv = document.getElementById("timeReminder");
  const minutes = Math.floor(remainingTime / 60);

  reminderDiv.textContent = `⏰ ${minutes} minutes remaining!`;
  reminderDiv.classList.remove("hidden", "reminder-fade-out");

  // Auto-hide reminder after 4 seconds
  setTimeout(() => {
    reminderDiv.classList.add("reminder-fade-out");
    setTimeout(() => {
      reminderDiv.classList.add("hidden");
    }, 500);
  }, 4000);
}

// ========================================
// Question Display Functions
// ========================================

function displayQuestion() {
  const question = shuffledQuestions[currentQuestionIndex];

  // Update question text
  document.getElementById("questionText").textContent = question.text;

  // Update question number
  document.getElementById("questionNumber").textContent =
    currentQuestionIndex + 1;

  // Display answer options
  const answerOptionsDiv = document.getElementById("answerOptions");
  answerOptionsDiv.innerHTML = "";

  question.answers.forEach((answer) => {
    const optionDiv = document.createElement("div");
    optionDiv.className = "answer-option";
    if (question.userAnswer === answer.id) {
      optionDiv.classList.add("selected");
    }

    optionDiv.innerHTML = `
      <span class="answer-text">${answer.text}</span>
      <input type="radio" name="answer" value="${answer.id}" 
             ${question.userAnswer === answer.id ? "checked" : ""} 
             class="answer-radio">
    `;

    optionDiv.onclick = () => selectAnswer(answer.id);
    answerOptionsDiv.appendChild(optionDiv);
  });

  // Update Previous button state
  document.getElementById("previousBtn").disabled = currentQuestionIndex === 0;

  // Update Next button visibility
  const nextBtn = document.getElementById("nextBtn");
  if (currentQuestionIndex === shuffledQuestions.length - 1) {
    nextBtn.style.display = "none";
  } else {
    nextBtn.style.display = "inline-block";
  }

  // Update mark button text
  const markBtn = document.getElementById("markBtn");
  if (markedQuestions.has(currentQuestionIndex)) {
    markBtn.textContent = "Unmark";
  } else {
    markBtn.textContent = "Mark";
  }
}

// ========================================
// Answer Selection
// ========================================

function selectAnswer(answerId) {
  const question = shuffledQuestions[currentQuestionIndex];
  question.setUserAnswer(answerId);

  // Hide navigation alert when user selects an answer
  document.getElementById("navigationAlert").classList.add("hidden");

  // Update UI
  const options = document.querySelectorAll(".answer-option");
  options.forEach((option) => {
    option.classList.remove("selected");
    const radio = option.querySelector('input[type="radio"]');
    if (parseInt(radio.value) === answerId) {
      option.classList.add("selected");
      radio.checked = true;
    }
  });
}

// ========================================
// Navigation Functions
// ========================================

function canNavigate() {
  const question = shuffledQuestions[currentQuestionIndex];
  // User can navigate if they answered the question OR marked it
  return (
    question.userAnswer !== null || markedQuestions.has(currentQuestionIndex)
  );
}

function showNavigationAlert() {
  const alert = document.getElementById("navigationAlert");
  alert.classList.remove("hidden");

  // Auto-hide after 3 seconds
  setTimeout(() => {
    alert.classList.add("hidden");
  }, 3000);
}

function nextQuestion() {
  // Check if user can navigate
  if (!canNavigate()) {
    showNavigationAlert();
    return;
  }

  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    displayQuestion();
    // Hide alert when moving to next question
    document.getElementById("navigationAlert").classList.add("hidden");
  }
}

function previousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    displayQuestion();
    // Hide alert when moving to previous question
    document.getElementById("navigationAlert").classList.add("hidden");
  }
}

// ========================================
// Mark/Unmark Functions
// ========================================

function toggleMark() {
  if (markedQuestions.has(currentQuestionIndex)) {
    markedQuestions.delete(currentQuestionIndex);
  } else {
    markedQuestions.add(currentQuestionIndex);
    // Hide navigation alert when user marks the question
    document.getElementById("navigationAlert").classList.add("hidden");
  }
  updateMarkList();
  displayQuestion();
}

function updateMarkList() {
  const markListDiv = document.getElementById("markList");

  if (markedQuestions.size === 0) {
    markListDiv.innerHTML = '<p class="text-muted">No marked questions</p>';
  } else {
    markListDiv.innerHTML = "";
    markedQuestions.forEach((index) => {
      const markItem = document.createElement("div");
      markItem.className = "mark-item";
      markItem.textContent = `mark Question ${index + 1}`;
      markItem.onclick = () => {
        currentQuestionIndex = index;
        displayQuestion();
      };
      markListDiv.appendChild(markItem);
    });
  }
}

// ========================================
// Score Calculation
// ========================================

function calculateScore() {
  let correctAnswers = 0;
  shuffledQuestions.forEach((question) => {
    if (question.userAnswer && question.checkAnswer(question.userAnswer)) {
      correctAnswers++;
    }
  });
  const percentage = Math.round(
    (correctAnswers / shuffledQuestions.length) * 100,
  );
  return {
    correct: correctAnswers,
    total: shuffledQuestions.length,
    percentage,
  };
}

// ========================================
// Result Handling
// ========================================

function handleTimeout() {
  clearInterval(timerInterval);

  const score = calculateScore();

  // Hide exam page
  document.getElementById("examPage").classList.add("hidden");

  // Show timeout page
  const timeoutPage = document.getElementById("timeoutPage");
  timeoutPage.classList.remove("hidden");

  const fullName = userLastName
    ? `${userFirstName} ${userLastName}`
    : userFirstName;
  document.getElementById("timeoutName").textContent = fullName;
  document.getElementById("timeoutScore").textContent =
    `${score.percentage}% (${score.correct}/${score.total})`;
}

function handleSubmit() {
  // Check if there are marked questions
  const markedWarning = document.getElementById("markedQuestionsWarning");
  const markedCountSpan = document.getElementById("markedCount");

  if (markedQuestions.size > 0) {
    markedCountSpan.textContent = markedQuestions.size;
    markedWarning.classList.remove("hidden");
  } else {
    markedWarning.classList.add("hidden");
  }

  // Show the modal
  const submitModal = new bootstrap.Modal(
    document.getElementById("submitModal"),
  );
  submitModal.show();
}

function confirmSubmit() {
  // Hide the modal
  const submitModal = bootstrap.Modal.getInstance(
    document.getElementById("submitModal"),
  );
  submitModal.hide();

  clearInterval(timerInterval);

  const score = calculateScore();

  // Hide exam page
  document.getElementById("examPage").classList.add("hidden");

  // Show grades page
  const gradesPage = document.getElementById("gradesPage");
  gradesPage.classList.remove("hidden");

  const fullName = userLastName
    ? `${userFirstName} ${userLastName}`
    : userFirstName;
  document.getElementById("gradesName").textContent = fullName;
  document.getElementById("gradesScore").textContent =
    `${score.percentage}% (${score.correct}/${score.total})`;
}

function takeAnotherTest() {
  // Reload the page to restart the exam
  window.location.reload();
}

function logout() {
  // Clear all localStorage data
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");

  // Redirect to registration page
  window.location.replace("index.html");
}

// ========================================
// Event Listeners Setup
// ========================================

function setupEventListeners() {
  document.getElementById("nextBtn").addEventListener("click", nextQuestion);
  document
    .getElementById("previousBtn")
    .addEventListener("click", previousQuestion);
  document.getElementById("markBtn").addEventListener("click", toggleMark);
  document.getElementById("submitBtn").addEventListener("click", handleSubmit);
  document
    .getElementById("confirmSubmitBtn")
    .addEventListener("click", confirmSubmit);
  document
    .getElementById("takeAnotherTestBtn")
    .addEventListener("click", takeAnotherTest);
  document.getElementById("logoutBtn").addEventListener("click", logout);
}

// ========================================
// Initialize Exam on Page Load
// ========================================

window.addEventListener("DOMContentLoaded", initExam);
