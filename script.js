let choixJoueur = "";
let choixIA = "";
let scoreJoueur = 0;
let scoreIA = 0;
let resultat = 0;
const iaImageElement = document.querySelector(".imgIA");
let resultatEl = document.getElementById("resultat");
const historiqueJoueur = {
  pierre: 0,
  feuille: 0,
  ciseaux: 0,
};

function FchoixIA() {
  const choixFrequents = Object.keys(historiqueJoueur).sort(
    (a, b) => historiqueJoueur[b] - historiqueJoueur[a]
  );

  const contreChoix = {
    pierre: "feuille",
    feuille: "ciseaux",
    ciseaux: "pierre",
  };
  if (Math.random() < 0.66) {
    return contreChoix[choixFrequents[0]];
  } else {
    const choix = ["pierre", "feuille", "ciseaux"];
    return choix[Math.floor(Math.random() * 3)];
  }
}

function MAJHistorique(choixJoueur) {
  if (historiqueJoueur[choixJoueur] !== undefined) {
    historiqueJoueur[choixJoueur]++;
  }
}

function determinerGagnant(choixJoueur, choixIA) {
  if (choixJoueur === choixIA) {
    return "Match nul";
  } else if (
    (choixJoueur === "pierre" && choixIA === "ciseaux") ||
    (choixJoueur === "feuille" && choixIA === "pierre") ||
    (choixJoueur === "ciseaux" && choixIA === "feuille")
  ) {
    return "Gagné";
  } else {
    return "Perdu";
  }
}

function afficherResultat(resultat) {
  resultatEl.textContent = resultat;

  if (resultat === "Gagné") {
    scoreJoueur++;
  } else if (resultat === "Perdu") {
    scoreIA++;
  }
}

function updateScores() {
  document.getElementById("playerScore").textContent = scoreJoueur;
  document.getElementById("iaScore").textContent = scoreIA;
}

function afficherChoixIA(choix) {
  iaImageElement.src = "img/" + choixIA + ".png";
  iaImageElement.alt = `Choix de l'IA : ${choixIA}`;
}

function gererClicBouton(choixJoueur) {
  // Retirer la classe 'selected' de tous les boutons
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("selected");
  });

  // Ajouter la classe 'selected' au bouton cliqué
  const boutonClique = document.querySelector(`[data-choice="${choixJoueur}"]`);
  if (boutonClique) {
    boutonClique.classList.add("selected");
  }

  iaImageElement.src = "";
  iaImageElement.alt = "";

  setTimeout(() => {
    choixIA = FchoixIA();
    afficherChoixIA(choixIA);
    const resultat = determinerGagnant(choixJoueur, choixIA);
    afficherResultat(resultat);
    updateScores();
    MAJHistorique(choixJoueur);
  }, 1000);
}

document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", (event) => {
    choixJoueur = event.target.dataset.choice;
    gererClicBouton(choixJoueur);
  });
});

document.addEventListener("keydown", (event) => {
  const touches = { 1: "pierre", 2: "feuille", 3: "ciseaux" };
  if (touches[event.key]) {
    choixJoueur = touches[event.key];
    gererClicBouton(choixJoueur);
  }
});

document.querySelector("#reset").addEventListener("click", () => {
  scoreJoueur = 0;
  scoreIA = 0;
  iaImageElement.src = "";
  iaImageElement.alt = "";
  updateScores();
  resultatEl.textContent = "";
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.classList.remove("selected");
  });
});
