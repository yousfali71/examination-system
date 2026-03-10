const user = JSON.parse(localStorage.getItem("user"));
const isLoggedIn = localStorage.getItem("isLoggedIn");

if (!isLoggedIn || !user) {
  window.location.replace("login.html");
}

// Exam Configuration
const EXAM_DURATION = 5 * 60; // 5 minutes in seconds

// State Variables
let currentQuestionIndex = 0;
let shuffledQuestions = [];
let markedQuestions = new Set();
let timerInterval = null;
let remainingTime = EXAM_DURATION;
let userFirstName = user.firstName || "Student";
let userLastName = user.lastName || "";
