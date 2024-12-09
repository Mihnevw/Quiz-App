const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: "Pacific Ocean"
    }
];

let currentQuestionIndex = 0;
let score = 0;

// Функция за показване на въпросите
function showQuestion() {
    const questionContainer = document.getElementById('question');
    const answersContainer = document.getElementById('answers');
    const currentQuestion = questions[currentQuestionIndex];

    questionContainer.textContent = currentQuestion.question;
    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach(answer => {
        const li = document.createElement('li');
        li.textContent = answer;
        li.addEventListener('click', checkAnswer);
        answersContainer.appendChild(li);
    });
}

// Функция за проверка на отговорите
function checkAnswer(event) {
    const selectedAnswer = event.target; // Получаваме самия DOM елемент
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;

    selectedAnswer.classList.add('selected');

    // Проверка дали отговорът е верен и увеличаване на резултата
    if (selectedAnswer.textContent === correctAnswer) {
        score++; // Увеличаваме резултата при верен отговор
    }

    // Деактивиране на всички отговори
    const answerItems = document.querySelectorAll('#answers li');
    answerItems.forEach(item => item.removeEventListener('click', checkAnswer));

    // Показване на бутона "Next Question"
    const nextButton = document.getElementById('nextButton');
    nextButton.style.display = 'block';
}

// Добавяне на събитие за клик върху отговорите (когато започнете викторината)
document.querySelectorAll('#answers li').forEach(item => {
    item.addEventListener('click', checkAnswer);
});

// Функция за преминаване към следващия въпрос
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
        document.getElementById('nextButton').style.display = 'none';
    } else {
        //Показване на резултата
        showResult();
    }
}

// Функция за показване на резултата
function showResult() {
    const resultContainer = document.getElementById('result');
    resultContainer.textContent = `Your score: ${score} / ${questions.length}`;
    document.getElementById('nextButton').style.display = 'none';
}

document.getElementById('nextButton').addEventListener('click', nextQuestion);

// Инициализация
showQuestion();
document.getElementById('nextButton').style.display = 'none';
