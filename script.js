const questions = [
    {
        question: "Quel type de combat préférez-vous ?",
        answers: [
            { text: "Combat rapproché", class: "Iop" },
            { text: "Attaques à distance", class: "Cra" },
            { text: "Soutien aux alliés", class: "Eniripsa" },
            { text: "Contrôle du champ de bataille", class: "Sadida" }
        ]
    },
    {
        question: "Quel est votre élément préféré ?",
        answers: [
            { text: "Feu", class: "Iop" },
            { text: "Air", class: "Cra" },
            { text: "Eau", class: "Eniripsa" },
            { text: "Terre", class: "Sadida" }
        ]
    },
    {
        question: "Quel est votre style de jeu préféré ?",
        answers: [
            { text: "Offensif", class: "Iop" },
            { text: "Tactique", class: "Cra" },
            { text: "Support", class: "Eniripsa" },
            { text: "Défensif", class: "Sadida" }
        ]
    },
    {
        question: "Quel est votre rôle préféré dans un groupe ?",
        answers: [
            { text: "Dégâts", class: "Iop" },
            { text: "DPS à distance", class: "Cra" },
            { text: "Soigneur", class: "Eniripsa" },
            { text: "Tank", class: "Sadida" }
        ]
    },
    {
        question: "Quel est votre animal préféré ?",
        answers: [
            { text: "Lion", class: "Iop" },
            { text: "Aigle", class: "Cra" },
            { text: "Panda", class: "Eniripsa" },
            { text: "Chêne", class: "Sadida" }
        ]
    },

];
let currentQuestionIndex = 0;
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");

// Récupérer les résultats sauvegardés ou initialiser un nouvel objet
let results = JSON.parse(localStorage.getItem("results")) || {};


function startQuiz() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = "";
    question.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        button.addEventListener("click", () => selectAnswer(answer.class));
        answerButtonsElement.appendChild(button);
    });
}

function selectAnswer(selectedClass) {
    results[selectedClass] = (results[selectedClass] || 0) + 1;
    localStorage.setItem("results", JSON.stringify(results));
    currentQuestionIndex++;
    startQuiz();
}

function showResults() {
    const mostFrequentClass = Object.keys(results).reduce((a, b) =>
        results[a] > results[b] ? a : b
    );
    document.body.className = ""; // Réinitialise les classes existantes
    document.body.classList.add(`body-${mostFrequentClass}`); // Ajoute la classe basée sur le résultat

    questionElement.innerText = `Votre classe de Wakfu est : ${mostFrequentClass}`;
    answerButtonsElement.innerHTML = `<button class="btn" onclick="resetQuiz()">Recommencer le quiz</button>`;
}


function resetQuiz() {
    localStorage.removeItem("results");
    currentQuestionIndex = 0;
    results = {};
    document.body.className = ""; // Réinitialise le style du corps
    startQuiz();
}


startQuiz();
