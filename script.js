let words = [];
let currentWordIndex = 0;
let correctCount = 0;
let incorrectCount = 0;

async function loadWords() {
    try {
        const response = await fetch("words.json");
        words = await response.json();
        setNewWord();
    } catch (error) {
        console.error("Error loading words:", error);
    }
}

function setNewWord() {
    if (words.length === 0 || currentWordIndex >= words.length) {
        document.getElementById("result").textContent = "🎉 Game Over!";
        return;
    }
    
    const wordObj = words[currentWordIndex];
    document.getElementById("korean-word").textContent = wordObj.korean;
    document.getElementById("user-input").value = "";
    document.getElementById("result").textContent = "";
    document.getElementById("progress-bar").value = (currentWordIndex / words.length) * 100;
}

document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("user-input");
    const checkButton = document.getElementById("check-btn");

    inputField.focus();
    inputField.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            checkButton.click();
        }
    });
});

document.getElementById("check-btn").addEventListener("click", function () {
    const userInput = document.getElementById("user-input").value.trim();
    const correctAnswer = words[currentWordIndex].english;

    if (userInput.toLowerCase() === correctAnswer.toLowerCase()) {
        correctCount++;
        document.getElementById("result").textContent = "✅ Correct!";
        document.getElementById("correct-count").textContent = correctCount;
    } else {
        incorrectCount++;
        document.getElementById("result").textContent = `❌ Incorrect! Correct answer: ${correctAnswer}`;
        document.getElementById("incorrect-count").textContent = incorrectCount;
    }

    currentWordIndex++;
    setNewWord();
});

document.getElementById("toggle-theme").addEventListener("click", function () {
    document.body.classList.toggle("dark");
});

loadWords();
