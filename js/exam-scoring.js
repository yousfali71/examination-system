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
