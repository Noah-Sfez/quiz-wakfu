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


function randomEffect() {
    document.querySelectorAll(".magic-effects").forEach((effect) => {
        // Position aléatoire sur la page
        effect.style.left = `${Math.random() * window.innerWidth}px`;
        effect.style.top = `${Math.random() * window.innerHeight}px`;

        // Animation aléatoire
        effect.style.animation = "flicker 2s infinite";

        // Afficher l'effet brièvement
        effect.style.opacity = 1;
        setTimeout(() => {
            effect.style.opacity = 0;
        }, 2000); // Dure 2 secondes
    });

    // Répéter à intervalle aléatoire
    setTimeout(randomEffect, Math.random() * 5000 + 2000); // Entre 2 et 7 secondes
}

// Démarrer l'animation
randomEffect();


function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");
    document.body.appendChild(particle);

    // Position aléatoire en largeur et une durée de vie aléatoire
    const size = Math.random() * 5 + 15; // Taille aléatoire entre 2 et 7px
    const duration = Math.random() * 3 + 2; // Durée entre 2 et 5 secondes
    const xPosition = Math.random() * window.innerWidth;

    // Appliquer le style dynamique
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${xPosition}px`;
    particle.style.animation = `fall ${duration}s linear`;

    // Nettoyer la particule après sa chute
    setTimeout(() => {
        particle.remove();
    }, duration * 1000); // Convertir en millisecondes
}

function startFalling() {
    setInterval(createParticle, 100); // Créer une particule toutes les 100 ms
}

// Commencer à faire tomber les particules
startFalling();
