# Exam System - Code Structure

## Overview

The exam system code has been modularized for better maintainability and readability.

## File Structure

```
examination-system/
├── exam.html              # Main exam page HTML
├── exam.css              # Exam page styles
├── exam.js               # (deprecated - replaced by modular files)
├── js/
│   ├── exam-state.js     # Global state and authentication
│   ├── exam-data.js      # Question data and constructors
│   ├── exam-utils.js     # Utility functions (shuffle, formatTime)
│   ├── exam-timer.js     # Timer functionality
│   ├── exam-display.js   # Question display and UI updates
│   ├── exam-navigation.js # Navigation between questions
│   ├── exam-scoring.js   # Score calculation and results
│   └── exam-main.js      # Initialization and event listeners
├── login.html
├── login.js
├── index.html            # Registration page
├── register.js
└── style.css             # Shared styles for login/register
```

## Module Descriptions

### 1. **exam-state.js**

- Checks user authentication
- Defines global state variables
- Manages exam duration and current question index
- **Must load first** - other modules depend on these variables

### 2. **exam-data.js**

- `AnswerConstruct()` - Constructor for answer objects
- `QuestionConstruct()` - Constructor for question objects
- `examQuestions` - Array of all exam questions
- Question objects have methods to check answers and store user responses

### 3. **exam-utils.js**

- `shuffleArray()` - Randomizes question order
- `formatTime()` - Converts seconds to MM:SS format

### 4. **exam-timer.js**

- `startTimer()` - Initiates the countdown timer
- `updateTimerBar()` - Updates progress bar and changes colors
- `showTimeReminder()` - Displays time warning notifications

### 5. **exam-display.js**

- `displayQuestion()` - Renders current question and answers
- `selectAnswer()` - Handles answer selection
- `toggleMark()` - Marks/unmarks questions for review
- `updateMarkList()` - Updates the marked questions sidebar

### 6. **exam-navigation.js**

- `canNavigate()` - Checks if user can move to next question
- `showNavigationAlert()` - Shows alert when navigation is blocked
- `nextQuestion()` - Navigate to next question
- `previousQuestion()` - Navigate to previous question

### 7. **exam-scoring.js**

- `calculateScore()` - Computes exam results
- `handleTimeout()` - Displays timeout page when timer expires
- `handleSubmit()` - Shows submission modal
- `confirmSubmit()` - Finalizes exam submission
- `takeAnotherTest()` - Reloads page for new exam
- `logout()` - Clears user data and redirects to registration

### 8. **exam-main.js**

- `initExam()` - Initializes the exam on page load
- `setupEventListeners()` - Attaches all event handlers
- **Must load last** - calls functions from all other modules

## Loading Order

The scripts must be loaded in this specific order in exam.html:

```html
<script src="js/exam-state.js"></script>
<!-- 1. State variables -->
<script src="js/exam-data.js"></script>
<!-- 2. Data definitions -->
<script src="js/exam-utils.js"></script>
<!-- 3. Utilities -->
<script src="js/exam-timer.js"></script>
<!-- 4. Timer logic -->
<script src="js/exam-display.js"></script>
<!-- 5. Display logic -->
<script src="js/exam-navigation.js"></script>
<!-- 6. Navigation logic -->
<script src="js/exam-scoring.js"></script>
<!-- 7. Scoring logic -->
<script src="js/exam-main.js"></script>
<!-- 8. Initialization -->
```

## Key Features

### Navigation Restriction

- Users must either select an answer OR mark a question before proceeding
- Implemented in `exam-navigation.js`

### Timer System

- 5-minute countdown with visual progress bar
- Color changes: Purple → Yellow (warning) → Red (danger)
- Reminders at 3 and 1 minutes remaining

### Marking System

- Users can mark questions for later review
- Marked questions appear in sidebar
- Clicking a marked question navigates directly to it

### Submit Modal

- Shows warning if questions are marked
- Displays count of marked questions
- Options: Go Back or Submit Anyway

### Result Pages

- Timeout page: when time expires
- Grades page: when user submits
- Both pages show score and offer "Take Another Test" or "Log Out"

## CSS Styling

All exam page styles are now in `exam.css`, including:

- Purple-blue gradient background
- Timer progress bar styles
- Question and answer styles
- Navigation buttons
- Modal customization
- Result page styling

## Adding New Questions

To add new questions, edit `js/exam-data.js`:

```javascript
const examQuestions = [
  new QuestionConstruct(7, "Your question text here?", [
    new AnswerConstruct(1, "Option 1", false),
    new AnswerConstruct(2, "Option 2", true), // correct answer
    new AnswerConstruct(3, "Option 3", false),
    new AnswerConstruct(4, "Option 4", false),
  ]),
];
```

## Modifying Exam Duration

Edit `EXAM_DURATION` in `js/exam-state.js`:

```javascript
const EXAM_DURATION = 5 * 60; // 5 minutes in seconds
```

## Benefits of Modular Structure

1. **Easier Maintenance** - Each module has a single responsibility
2. **Better Readability** - Smaller files are easier to understand
3. **Reusability** - Modules can be reused or replaced independently
4. **Debugging** - Easier to locate and fix bugs
5. **Team Collaboration** - Multiple developers can work on different modules
6. **Testing** - Individual modules can be tested in isolation
