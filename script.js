let words = [
    {"korean": "안녕하세요", "uzbek": "Salom"},
    {"korean": "사랑", "uzbek": "Sevgi"},
    {"korean": "학교", "uzbek": "Maktab"},
    {"korean": "고양이", "uzbek": "Mushuk"},
    {"korean": "강아지", "uzbek": "Kuchuk"},
    {"korean": "책", "uzbek": "Kitob"},
    {"korean": "컴퓨터", "uzbek": "Kompyuter"},
    {"korean": "전화", "uzbek": "Telefon"},
    {"korean": "음식", "uzbek": "Oziq-ovqat"},
    {"korean": "친구", "uzbek": "Do'st"}
];

let currentWords = [];
let currentIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let timer;
let timeLeft = 10;

document.getElementById("startBtn").addEventListener("click", startQuiz);
document.getElementById("checkBtn").addEventListener("click", checkAnswer);
document.getElementById("nextBtn").addEventListener("click", nextQuestion);
document.getElementById("darkModeToggle").addEventListener("click", toggleDarkMode);

if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
}

function startQuiz() {
    currentWords = getRandomWords();
    currentIndex = 0;
    correctCount = 0;
    wrongCount = 0;
    updateStats();
    showWord();
}

function getRandomWords() {
    return words.sort(() => 0.5 - Math.random()).slice(0, 10);
}

function showWord() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("wordDisplay").textContent = currentWords[currentIndex].korean;
    document.getElementById("answerInput").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("nextBtn").style.display = "none";
    startTimer();
}

function startTimer() {
    document.getElementById("timer").textContent = `⏳ ${timeLeft}`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `⏳ ${timeLeft}`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            markWrong();
        }
    }, 1000);
}

function checkAnswer() {
    let userAnswer = document.getElementById("answerInput").value.trim().toLowerCase();
    let correctAnswer = currentWords[currentIndex].uzbek.toLowerCase();

    if (userAnswer === correctAnswer) {
        markCorrect();
    } else {
        markWrong();
    }
}

function markCorrect() {
    document.getElementById("feedback").textContent = "✅ To‘g‘ri!";
    document.getElementById("checkBtn").classList.add("correct");
    correctCount++;
    updateStats();
    nextStep();
}

function markWrong() {
    document.getElementById("feedback").textContent = `❌ Noto‘g‘ri! To‘g‘ri javob: ${currentWords[currentIndex].uzbek}`;
    document.getElementById("checkBtn").classList.add("wrong");
    wrongCount++;
    updateStats();
    nextStep();
}

function nextStep() {
    clearInterval(timer);
    document.getElementById("nextBtn").style.display = "block";
}

function nextQuestion() {
    document.getElementById("checkBtn").classList.remove("correct", "wrong");
    currentIndex++;
    if (currentIndex < currentWords.length) {
        showWord();
    } else {
        saveResults();
        document.getElementById("wordDisplay").textContent = "O‘yin tugadi!";
    }
}

function updateStats() {
    document.getElementById("correctCount").textContent = correctCount;
    document.getElementById("wrongCount").textContent = wrongCount;
}

function saveResults() {
    let results = JSON.parse(localStorage.getItem("quizResults")) || [];
    let newResult = {
        date: new Date().toLocaleString(),
        correct: correctCount,
        wrong: wrongCount
    };
    results.push(newResult);
    if (results.length > 10) results.shift(); 
    localStorage.setItem("quizResults", JSON.stringify(results));
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
    } else {
        localStorage.setItem("darkMode", "disabled");
    }
}
