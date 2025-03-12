const attaquesEnnemi = [
    { nom: "Coup de griffe", degats: 10 },
    { nom: "Morsure", degats: 150 },
    { nom: "Lance-Flamme", degats: 25 },
    { nom: "Charge Violente", degats: 20 }
];



let vieJoueur = 150;
let vieEnnemi = 130;
const vieMaxJoueur = 150;
const vieMaxEnnemi = 130;

function mettreAJourVie() {
    // Met à jour le texte des PV
    document.getElementById("vieJoueur").innerText = "Vie = " + vieJoueur;
    document.getElementById("vieEnnemi").innerText = "Vie = " + vieEnnemi;

    // Met à jour la barre de vie en pourcentage
    let pourcentageJoueur = (vieJoueur / vieMaxJoueur) * 100;
    let pourcentageEnnemi = (vieEnnemi / vieMaxEnnemi) * 100;
    
    document.getElementById("barJoueur").style.width = pourcentageJoueur + "%";
    document.getElementById("barEnnemi").style.width = pourcentageEnnemi + "%";

    // Change la couleur de la barre en fonction de la vie restante
    document.getElementById("barJoueur").style.backgroundColor = getCouleurVie(pourcentageJoueur);
    document.getElementById("barEnnemi").style.backgroundColor = getCouleurVie(pourcentageEnnemi);
}

function getCouleurVie(pourcentage) {
    if (pourcentage > 50) return "green";
    if (pourcentage > 20) return "orange";
    return "red";
}

function Va() {
    vieEnnemi -= 150;  // Avant c'était 5, on augmente
    if (vieEnnemi < 0) vieEnnemi = 0;
    mettreAJourVie();
    setTimeout(attaqueEnnemi, 1000);  // L'ennemi contre-attaque après 1s
}

function Pic() {
    vieEnnemi -= 20;  // Plus puissant qu'avant
    if (vieEnnemi < 0) vieEnnemi = 0;
    mettreAJourVie();
    setTimeout(attaqueEnnemi, 1000);
}

function Charge() {
    vieEnnemi -= 25;
    vieJoueur -= 10;  // Charge fait perdre plus de PV
    if (vieEnnemi < 0) vieEnnemi = 0;
    if (vieJoueur < 0) vieJoueur = 0;
    mettreAJourVie();
    setTimeout(attaqueEnnemi, 1000);
}

function attaqueEnnemi() {
    let attaque = attaquesEnnemi[Math.floor(Math.random() * attaquesEnnemi.length)]; // Choisir une attaque aléatoire
    
    vieJoueur -= attaque.degats;
    if (vieJoueur < 0) vieJoueur = 0;

    // Mettre à jour les PV et la barre de vie
    document.getElementById("vieJoueur").innerText = "Vie = " + vieJoueur;
    document.getElementById("barJoueur").style.width = (vieJoueur / vieMaxJoueur) * 100 + "%";
    document.getElementById("barJoueur").style.backgroundColor = getCouleurVie((vieJoueur / vieMaxJoueur) * 100);

    // Afficher un message pour informer le joueur de l'attaque subie
    alert("L'ennemi utilise " + attaque.nom + " et inflige " + attaque.degats + " dégâts !");

    verifierFinPartie();
}


function verifierFinPartie() {
    if (vieJoueur <= 0) {
        alert("Tu as perdu ! L'ennemi a gagné !");
        location.reload(); // Recharge la page pour recommencer
    } else if (vieEnnemi <= 0) {
        alert("Bravo ! Tu as vaincu l'ennemi !");
        location.reload();
    }
}
