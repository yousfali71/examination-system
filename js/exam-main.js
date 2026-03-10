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

// Initialize Exam on Page Load
window.addEventListener("DOMContentLoaded", initExam);
