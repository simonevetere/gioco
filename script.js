const words = [
    "cane", "gatto", "auto", "albero", "casa", 
    "libro", "computer", "telefono", "finestra", "porta",
    "sedia", "tavolo", "cucina", "giardino", "mare",
    "montagna", "sole", "luna", "stella", "neve",
    "pioggia", "vento", "fuoco", "nuvola", "arcobaleno",
    "mare", "laghetto", "piscina", "fiume", "foresta",
    "animale", "uccello", "pesce", "insetto", "farfalla",
    "cavallo", "pecora", "mucca", "maiale", "elefante",
    "leone", "tigre", "panda", "zebra", "giraffa",
    "scimmia", "foca", "delfino", "canguro", "orso",
    "tartaruga", "pinguino", "canguro", "scoiattolo", "riccio",
    "sorriso", "abbraccio", "bacio", "amicizia", "amore",
    "felicità", "tristezza", "gioco", "divertimento", "sogno",
    "storia", "arte", "musica", "danza", "film",
    "libertà", "pace", "giustizia", "rispetto", "onestà",
    "famiglia", "comunità", "scuola", "lavoro", "studio",
    "cultura", "tradizione", "festa", "celebrazione", "ricordo"
];

let players = [];
let imposterIndex;
let currentTurn = Math.floor(Math.random() * 100);

const wordElement = document.getElementById('word');
const startGameButton = document.getElementById('startGameButton');
const playerButtonsDiv = document.getElementById('playerButtons');
const numPlayersInput = document.getElementById('numPlayers');

startGameButton.addEventListener('click', () => {
    const numPlayers = parseInt(numPlayersInput.value);
    if (isNaN(numPlayers) || numPlayers < 2) {
        alert("Per favore, inserisci un numero valido di giocatori.");
        return;
    }
    
    // Crea un array di giocatori
    players = Array.from({ length: numPlayers }, (_, i) => `Giocatore ${i + 1}`);
    imposterIndex = Math.floor(Math.random() * numPlayers);
    currentTurn = Math.floor(Math.random() * 100);
 
    wordElement.textContent = "Impostore selezionato!";

    // Nascondi il pulsante di inizio e mostra i pulsanti dei giocatori
    startGameButton.style.display = 'none';
    playerButtonsDiv.style.display = 'block';
    playerButtonsDiv.innerHTML = ''; // Resetta i pulsanti dei giocatori

    // Mostra i pulsanti per ogni giocatore
    players.forEach((player, index) => {
        const button = document.createElement('button');
        button.textContent = player;
        button.onclick = () => revealImpostor(index);
        playerButtonsDiv.appendChild(button);
    });
});

function revealImpostor(index) {
    if (index === imposterIndex) {
        wordElement.textContent = "IMPOSTORE";
    } else {
        wordElement.textContent = `Sei "${words[currentTurn % words.length]}"`;
    }

    setTimeout(() => {
	wordElement.textContent = 'Scopri';
    },3000);

    // Incrementa il turno
    currentTurn;
    
    // Rimuovi i pulsanti dopo un turno
    playerButtonsDiv.innerHTML = '';

    // Se ci sono ancora turni, ripristina i pulsanti
    if (currentTurn < words.length) {
        players.forEach((player, index) => {
            const button = document.createElement('button');
            button.textContent = player;
            button.onclick = () => revealImpostor(index);
            playerButtonsDiv.appendChild(button);
        });
    } else {
        wordElement.textContent = "Gioco finito!";
    }
}
