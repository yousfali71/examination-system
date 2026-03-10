/**
 * Exam Display Module
 * Handles question display and answer selection
 */

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
