const words = [
    { korean: "사과", english: "Apple" },
    { korean: "물", english: "Water" },
    { korean: "책", english: "Book" },
    { korean: "하늘", english: "Sky" }
];

let score = 0;
let incorrectWords = []; // Notog‘ri topilgan so‘zlar
let timeLeft = 10;
let timer;
let currentWord;

// HTML elementlari
const wordElement = document.getElementById("word");
const optionsContainer = document.getElementById("options");
const timeLeftElement = document.getElementById("timeLeft");
const scoreElement = document.getElementById("score");
const nextButton = document.getElementById("nextBtn");
const body = document.body;

// Dark mode funksiyasi
const toggleDarkMode = () => {
    body.classList.toggle("dark-mode");
};

// Dark mode tugmasini yaratish
const darkModeButton = document.createElement("button");
darkModeButton.textContent = "Dark Mode";
darkModeButton.style.position = "absolute";
darkModeButton.style.top = "20px";
darkModeButton.style.right = "20px";
darkModeButton.style.padding = "8px 12px";
darkModeButton.style.border = "none";
darkModeButton.style.borderRadius = "8px";
darkModeButton.style.cursor = "pointer";
darkModeButton.style.backgroundColor = "#333";
darkModeButton.style.color = "white";
darkModeButton.onclick = toggleDarkMode;
document.body.appendChild(darkModeButton);

// Dark mode CSS qo‘shish
const darkModeCSS = document.createElement("style");
darkModeCSS.innerHTML = `
    .dark-mode {
        background-color: #222;
        color: white;
    }
    .dark-mode .container {
        background: #333;
        box-shadow: 0 4px 10px rgba(255, 255, 255, 0.1);
    }
    .dark-mode button {
        background: #555;
        color: white;
    }
    .dark-mode button:hover {
        background: #777;
    }
`;
document.head.appendChild(darkModeCSS);

// O‘yinni boshlash
function startGame() {
    loadQuestion();
    startTimer();
}

// Savolni yuklash
function loadQuestion() {
    currentWord = words[Math.floor(Math.random() * words.length)];
    wordElement.textContent = currentWord.korean;
    optionsContainer.innerHTML = "";

    const options = [...words].sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.english;
        btn.onclick = () => checkAnswer(btn, option.english === currentWord.english);
        optionsContainer.appendChild(btn);
    });
}

// Javobni tekshirish
function checkAnswer(button, isCorrect) {
    clearInterval(timer);
    
    if (isCorrect) {
        button.style.backgroundColor = "green"; // Yashil rang
        score++;
    } else {
        button.style.backgroundColor = "red"; // Qizil rang
        incorrectWords.push(currentWord); // Notog‘ri topilgan so‘zlarni statistikaga qo‘shish
    }
    
    scoreElement.textContent = "Score: " + score;
    setTimeout(nextQuestion, 1000); // 1 soniyadan keyin yangi so‘z
}

// Taymerni boshlash
function startTimer() {
    timeLeft = 10;
    timeLeftElement.textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        timeLeftElement.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            incorrectWords.push(currentWord); // Agar vaqt tugasa, noto‘g‘ri topilganlar ro‘yxatiga qo‘shiladi
            nextQuestion();
        }
    }, 1000);
}

// Enter tugmasi bosilganda tekshirish
document.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        nextQuestion();
    }
});

// Keyingi savolni yuklash
function nextQuestion() {
    loadQuestion();
    startTimer();
}

// Statistikani ko‘rsatish
function showStatistics() {
    let message = "❌ Notog‘ri topilgan so‘zlar:\n";
    incorrectWords.forEach(word => {
        message += `${word.korean} - ${word.english}\n`;
    });
    alert(message || "Hammasi to‘g‘ri topildi! ✅");
}

// Statistika tugmasi yaratish
const statsButton = document.createElement("button");
statsButton.textContent = "Statistika";
statsButton.style.position = "absolute";
statsButton.style.bottom = "20px";
statsButton.style.right = "20px";
statsButton.style.padding = "8px 12px";
statsButton.style.border = "none";
statsButton.style.borderRadius = "8px";
statsButton.style.cursor = "pointer";
statsButton.style.backgroundColor = "#007bff";
statsButton.style.color = "white";
statsButton.onclick = showStatistics;
document.body.appendChild(statsButton);

startGame();
