let gridSize = 8;
let playerPos = 0;
let ghostPos = gridSize * gridSize - 1;
let cells = [];
let score = 0;
let level = "easy";
let soundEnabled = true;
let gameStarted = false;
let timer;
let timeLeft;
let playerLives = 1;

const board = document.getElementById("game-board");
const bgMusic = new Audio("assets/8bit");
const deathSound = new Audio("assets/");
bgMusic.loop = true;

function toggleSound() {
  soundEnabled = !soundEnabled;
  if (!soundEnabled) {
    bgMusic.pause();
  } else {
    bgMusic.play();
  }
  alert(`Som ${soundEnabled ? "ativado" : "desativado"}`);
}

function startGame() {
  document.getElementById("menu").style.display = "none";
  document.getElementById("game-container").style.display = "block";

  level = document.getElementById("level").value;
  if (level === "easy") timeLeft = 60;
  else if (level === "medium") timeLeft = 40;
  else timeLeft = 25;

  document.getElementById("timer").innerText = `Tempo: ${timeLeft}s`;
  startTimer();
  generateMap();
  drawCharacters();
  gameStarted = true;

  if (soundEnabled) bgMusic.play();
  document.addEventListener("keydown", movePlayer);
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById("timer").innerText = `Tempo: ${timeLeft}s`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      if (soundEnabled) deathSound.play();
      alert("Tempo esgotado! Fim de jogo!");
      location.reload();
    }
  }, 1000);
}

function generateMap() {
  board.innerHTML = "";
  board.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`;
  cells = [];

  for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (Math.random() < 0.1) {
      cell.classList.add("super-dot");
    } else {
      cell.classList.add("food");
    }

    board.appendChild(cell);
    cells.push(cell);
  }

  playerPos = 0;
  ghostPos = gridSize * gridSize - 1;
}

function drawCharacters() {
  updatePlayer();
  updateGhost();
}

function updatePlayer() {
  cells.forEach(cell => {
    cell.classList.remove("player");
    cell.style.backgroundImage = "none";
  });

  cells[playerPos].classList.add("player");

  const cell = cells[playerPos];
  if (cell.classList.contains("food")) {
    cell.classList.remove("food");
    score++;
  }
  if (cell.classList.contains("super-dot")) {
    cell.classList.remove("super-dot");
    playerLives++;
    console.log("Ganhou uma vida! Vidas:", playerLives);
  }
}

function updateGhost() {
  cells.forEach(cell => cell.classList.remove("ghost"));
  cells[ghostPos].classList.add("ghost");
}

function movePlayer(e) {
  if (!gameStarted) return;
  let newPos = playerPos;

  if (e.key === "ArrowRight" && playerPos % gridSize < gridSize - 1) newPos++;
  if (e.key === "ArrowLeft" && playerPos % gridSize > 0) newPos--;
  if (e.key === "ArrowUp" && playerPos >= gridSize) newPos -= gridSize;
  if (e.key === "ArrowDown" && playerPos + gridSize < gridSize * gridSize) newPos += gridSize;

  playerPos = newPos;
  updatePlayer();
}
