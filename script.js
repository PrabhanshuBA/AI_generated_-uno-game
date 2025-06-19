const colors = ['red', 'blue', 'green', 'yellow'];
const values = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let deck = [];
let topCard = null;
let currentPlayer = 1;
let playerHands = { 1: [], 2: [], 3: [], 4: [] };
const totalPlayers = 4;

const playerHandDiv = document.getElementById('player-hand');
const topCardDiv = document.getElementById('top-card');
const currentPlayerSpan = document.getElementById('current-player');

function createDeck() {
  deck = [];
  colors.forEach(color => {
    values.forEach(value => {
      deck.push({ color, value });
    });
  });
  shuffle(deck);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function drawCard(player) {
  const card = deck.pop();
  playerHands[player].push(card);
  renderHand();
}

function renderHand() {
  playerHandDiv.innerHTML = '';
  playerHands[currentPlayer].forEach((card, index) => {
    const div = document.createElement('div');
    div.className = `card ${card.color}`;
    div.innerText = card.value;
    div.onclick = () => playCard(index);
    playerHandDiv.appendChild(div);
  });
  renderTopCard();
}

function renderTopCard() {
  topCardDiv.innerHTML = '';
  const div = document.createElement('div');
  div.className = `card ${topCard.color}`;
  div.innerText = topCard.value;
  topCardDiv.appendChild(div);
}

function playCard(index) {
  const card = playerHands[currentPlayer][index];
  if (card.color === topCard.color || card.value === topCard.value) {
    topCard = card;
    playerHands[currentPlayer].splice(index, 1);
    renderHand();
  } else {
    alert("Invalid move. Must match color or value.");
  }
}

function nextPlayer() {
  currentPlayer = currentPlayer % totalPlayers + 1;
  currentPlayerSpan.innerText = currentPlayer;
  renderHand();
}

// INIT GAME
createDeck();
for (let i = 1; i <= totalPlayers; i++) {
  for (let j = 0; j < 5; j++) drawCard(i);
}
topCard = deck.pop();
renderHand();

document.getElementById('draw-button').onclick = () => drawCard(currentPlayer);
document.getElementById('next-player').onclick = nextPlayer;
