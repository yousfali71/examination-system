/**
 * Exam Navigation Module
 * Handles navigation between questions
 */

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
