function startTimer() {
  updateTimerBar();

  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerBar();

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
