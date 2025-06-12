let gameStarted = false;
let pacman = document.getElementById("pacman");
let ghost = document.getElementById("ghost");
let music = document.getElementById("background-music");
let deathSound = document.getElementById("death-sound");
let isSoundOn = true;
let timer;
let timeLeft;
let level = "easy";
let playerPos = 0;
let ghostPos = 63;
let cells = [];
let playerLives = 1;

const ctx = document.getElementById("gameCanvas").getContext("2d");

// Criação do tabuleiro (8x8)
function generateMap() {
  const gameBoard = document.getElementById("game-board");
  gameBoard.innerHTML = '';  // Limpa o tabuleiro antes de gerar

  // Criando as células do tabuleiro
  for (let i = 0; i < 64; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    
    // Adiciona comida aleatória
    if (Math.random() < 0.1) {
      cell.classList.add("super-dot");
    } else {
      cell.classList.add("food");
    }
    
    gameBoard.appendChild(cell);
    cells.push(cell);
  }
  
  updatePlayer();
  updateGhost();
}

function updatePlayer() {
  // Atualiza a posição do Pac-Man com base no playerPos
  pacman.style.left = `${(playerPos % 8) * 40}px`;
  pacman.style.top = `${Math.floor(playerPos / 8) * 40}px`;
}

function updateGhost() {
  // Atualiza a posição do Fantasma
  ghost.style.left = `${(ghostPos % 8) * 40}px`;
  ghost.style.top = `${Math.floor(ghostPos / 8) * 40}px`;
}

function movePlayer(e) {
  if (!gameStarted) return;

  if (e.key === "ArrowRight" && playerPos % 8 < 7) playerPos++;
  if (e.key === "ArrowLeft" && playerPos % 8 > 0) playerPos--;
  if (e.key === "ArrowUp" && playerPos >= 8) playerPos -= 8;
  if (e.key === "ArrowDown" && playerPos < 56) playerPos += 8;

  updatePlayer();
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";

  level = document.getElementById("difficulty").value;
  if (level === "easy") timeLeft = 60;
  else if (level === "medium") timeLeft = 40;
  else timeLeft = 25;

  document.getElementById("timer").innerText = `Tempo: ${timeLeft}s`;
  startTimer();
  generateMap();
  gameStarted = true;

  if (isSoundOn) music.play();
  document.addEventListener("keydown", movePlayer);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Tempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (isSoundOn) deathSound.play();
      alert("Tempo esgotado! Fim de jogo!");
      location.reload();
    }
  }, 1000);
}

