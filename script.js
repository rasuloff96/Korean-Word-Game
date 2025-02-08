const words = [
    { korean: "사과", english: "Apple" },
    { korean: "물", english: "Water" },
    { korean: "책", english: "Book" },
    { korean: "하늘", english: "Sky" }
];
let score = 0;
let timeLeft = 10;
let timer;

function startGame() {
    loadQuestion();
    startTimer();
}

function loadQuestion() {
    const randomIndex = Math.floor(Math.random() * words.length);
    const wordObj = words[randomIndex];
    document.getElementById("word").textContent = wordObj.korean;
    document.getElementById("options").innerHTML = "";
    const options = [...words].sort(() => Math.random() - 0.5);
    
    options.forEach(option => {
        const btn = document.createElement("button");
        btn.textContent = option.english;
        btn.onclick = () => checkAnswer(option.english === wordObj.english);
        document.getElementById("options").appendChild(btn);
    });
}

function checkAnswer(isCorrect) {
    if (isCorrect) {
        score++;
        document.getElementById("score").textContent = "Score: " + score;
    }
    clearInterval(timer);
    document.getElementById("nextBtn").classList.remove("hidden");
}

function startTimer() {
    timeLeft = 10;
    document.getElementById("timeLeft").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timeLeft").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            document.getElementById("nextBtn").classList.remove("hidden");
        }
    }, 1000);
}

document.getElementById("nextBtn").addEventListener("click", () => {
    document.getElementById("nextBtn").classList.add("hidden");
    loadQuestion();
    startTimer();
});

startGame();