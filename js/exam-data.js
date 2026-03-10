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

// Exam Questions Data
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
