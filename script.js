// Word list stored in a separate file
const words = [
    { korean: '안녕하세요', translation: 'Hello' },
    { korean: '사랑', translation: 'Love' },
    { korean: '학교', translation: 'School' },
    { korean: '행복', translation: 'Happiness' },
    { korean: '책', translation: 'Book' },
    { korean: '가족', translation: 'Family' },
    { korean: '친구', translation: 'Friend' },
    { korean: '언어', translation: 'Language' },
    { korean: '음악', translation: 'Music' },
    { korean: '문화', translation: 'Culture' },
    { korean: '날씨', translation: 'Weather' },
    { korean: '여행', translation: 'Travel' },
    { korean: '영화', translation: 'Movie' },
    { korean: '식사', translation: 'Meal' },
    { korean: '한국', translation: 'Korea' },
    { korean: '사전', translation: 'Dictionary' },
    { korean: '전화', translation: 'Phone' },
    { korean: '인터넷', translation: 'Internet' },
    { korean: '문제', translation: 'Problem' },
    { korean: '해결', translation: 'Solution' },
];

let currentWordIndex = 0;
let score = 0;

// Set initial word
function setNewWord() {
    const wordObj = words[currentWordIndex];
    document.getElementById('korean-word').textContent = wordObj.korean;
    document.getElementById('user-input').value = '';
    document.getElementById('result').textContent = '';
    document.getElementById('progress-bar').value = (currentWordIndex / words.length) * 100;
}

// Check user's answer
document.getElementById('check-btn').addEventListener('click', function () {
    const userInput = document.getElementById('user-input').value.trim();
    const correctAnswer = words[currentWordIndex].translation;

    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        score++;
        document.getElementById('result').textContent = 'Correct!';
        document.getElementById('score').textContent = `Correct Answers: ${score}`;
    } else {
        document.getElementById('result').textContent = `Incorrect! Correct answer is: ${correctAnswer}`;
    }

    currentWordIndex++;
    if (currentWordIndex < words.length) {
        setNewWord();
    } else {
        document.getElementById('result').textContent = 'Game Over!';
    }
});

// Toggle light/dark mode
document.getElementById('toggle-theme').addEventListener('click', function () {
    document.body.classList.toggle('dark');
    document.querySelector('.container').classList.toggle('dark');
    document.querySelector('button').classList.toggle('dark');
});

// Initialize game
setNewWord();
