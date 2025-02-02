const koreanWords = [
    { korean: '안녕하세요', translation: 'Hello' },
    { korean: '사랑', translation: 'Love' },
    { korean: '감사합니다', translation: 'Thank you' },
    { korean: '사과', translation: 'Apple' }
];

let currentWordIndex = 0;
let correctAnswers = 0;  // To'g'ri javoblar sonini kuzatish

const koreanWordElement = document.getElementById('korean-word');
const userInputElement = document.getElementById('user-input');
const checkButton = document.getElementById('check-btn');
const resultElement = document.getElementById('result');
const scoreElement = document.getElementById('score');  // Hisoblagich elementi

// So'zni ekranga chiqaramiz
function displayWord() {
    koreanWordElement.textContent = koreanWords[currentWordIndex].korean;
}

// Tekshiruv funksiyasi
function checkAnswer() {
    const userAnswer = userInputElement.value.trim();
    const correctAnswer = koreanWords[currentWordIndex].translation;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
        resultElement.textContent = "Correct!";
        resultElement.style.color = "green";
        correctAnswers++;  // To'g'ri javob sonini oshiramiz
    } else {
        resultElement.textContent = `Incorrect! The correct answer is "${correctAnswer}".`;
        resultElement.style.color = "red";
    }

    scoreElement.textContent = `Correct Answers: ${correctAnswers}`;  // Hisoblagichni yangilash
    userInputElement.value = '';
    currentWordIndex = (currentWordIndex + 1) % koreanWords.length;
    displayWord();
}

checkButton.addEventListener('click', checkAnswer);

displayWord();
