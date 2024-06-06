const questions = [
    {
        question: "What is the capital of France?",
        answers: [
            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Lisbon", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        answers: [
            { text: "Harper Lee", correct: true },
            { text: "J.K. Rowling", correct: false },
            { text: "Ernest Hemingway", correct: false },
            { text: "Jane Austen", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Pacific Ocean", correct: true },
            { text: "Arctic Ocean", correct: false }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "Vatican City", correct: true },
            { text: "San Marino", correct: false },
            { text: "Liechtenstein", correct: false }
        ]
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Oxygen", correct: true },
            { text: "Osmium", correct: false },
            { text: "Oxide", correct: false }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Claude Monet", correct: false }
        ]
    },
    {
        question: "What is the hardest natural substance on Earth?",
        answers: [
            { text: "Gold", correct: false },
            { text: "Iron", correct: false },
            { text: "Diamond", correct: true },
            { text: "Platinum", correct: false }
        ]
    },
    {
        question: "Who developed the theory of relativity?",
        answers: [
            { text: "Isaac Newton", correct: false },
            { text: "Albert Einstein", correct: true },
            { text: "Galileo Galilei", correct: false },
            { text: "Nikola Tesla", correct: false }
        ]
    },
    {
        question: "Which country is home to the kangaroo?",
        answers: [
            { text: "India", correct: false },
            { text: "Australia", correct: true },
            { text: "South Africa", correct: false },
            { text: "Canada", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("score");
const scoreValueElement = document.getElementById("score-value");
const progressBarElement = document.getElementById("progress-bar");
const timerCircleProgress = document.querySelector(".timer-circle-progress");

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 10;
let timer;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 10;
    scoreElement.classList.add('hidden');
    nextButton.classList.add('hidden');
    questionElement.classList.remove('hidden');
    answerButtonsElement.classList.remove('hidden');
    showQuestion();
    startTimer();
    updateProgressBar();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.textContent = (currentQuestionIndex + 1) + ". " + currentQuestion.question;
    questionElement.style.opacity = 1;
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswer);
        answerButtonsElement.appendChild(button);
        setTimeout(() => {
            button.classList.add('show');
        }, 100);
    });
}

function resetState() {
    nextButton.classList.add('hidden');
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    const buttons = Array.from(answerButtonsElement.children);

    buttons.forEach(button => {
        if (button === selectedButton && !correct) {
            setStatusClass(button, false);
        } else if (button.dataset.correct === "true") {
            setStatusClass(button, true);
        }
    });

    if (correct) {
        score++;
    }

    clearInterval(timer);

    if (questions.length > currentQuestionIndex + 1) {
        setTimeout(() => {
            currentQuestionIndex++;
            showQuestion();
            startTimer();
            updateProgressBar();
        }, 1000);
    } else {
        setTimeout(() => {
            showScore();
            nextButton.innerText = 'Restart';
            nextButton.classList.remove('hidden');
        }, 1000);
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

function startTimer() {
    timeLeft = 10;
    timerElement.textContent = timeLeft;
    timerCircleProgress.style.strokeDashoffset = 157;
    timer = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft;
        timerCircleProgress.style.strokeDashoffset = 157 - (timeLeft * 157 / 10);
        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore();
            nextButton.innerText = 'Restart';
            nextButton.classList.remove('hidden');
        }
    }, 1000);
}

function showScore() {
    scoreElement.classList.remove('hidden');
    scoreValueElement.textContent = score + " out of " + questions.length;
    questionElement.classList.add('hidden');
    answerButtonsElement.classList.add('hidden');
}

function updateProgressBar() {
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBarElement.style.width = progressPercentage + '%';
}

nextButton.addEventListener('click', startQuiz);

startQuiz();