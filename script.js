const board = document.getElementById("game-board");
const scoreText = document.getElementById("score");
const startBtn = document.getElementById("start-btn");
const muteBtn = document.getElementById("mute-btn");
const welcome = document.getElementById("welcome");
const gameArea = document.getElementById("game-area");
const bgMusic = document.getElementById("bg-music");
const gameOverMusic = document.getElementById("gameover-music");

const size = 8;
let score = 0;
let level = 1;
let playerPos = 0;
let ghostPos = size * size - 1;
let ghostInterval;
let isMuted = true;

startBtn.addEventListener("click", () => {
  welcome.style.display = "none";
  gameArea.style.display = "block";

  if (!isMuted) bgMusic.play();
  createBoard();
});

muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? "🔇 Som" : "🔊 Som";

  if (isMuted) {
    bgMusic.pause();
    gameOverMusic.pause();
  } else {
    bgMusic.play();
  }
});

function createBoard() {
  board.innerHTML = "";
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    if (i !== playerPos && i !== ghostPos && Math.random() < 0.3 + level * 0.05) {
      cell.classList.add("food");
    }

    board.appendChild(cell);
  }
  updatePlayer();
  updateGhost();
  ghostSpeedUp();
}

function updatePlayer() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("player"));
  cells[playerPos].classList.add("player");

  if (cells[playerPos].classList.contains("food")) {
    cells[playerPos].classList.remove("food");
    score++;
    updateScore();
  }

  if (playerPos === ghostPos) {
    gameOver();
  }

  if (document.querySelectorAll(".food").length === 0) {
    alert("Você venceu o nível " + level + "!");
    level++;
    ghostSpeedUp();
    resetBoard();
  }
}

function updateGhost() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("ghost"));
  cells[ghostPos].classList.add("ghost");

  if (ghostPos === playerPos) {
    gameOver();
  }
}

function moveGhost() {
  const directions = [-1, 1, -size, size];
  const possibleMoves = directions.filter(dir => {
    const newPos = ghostPos + dir;
    return newPos >= 0 &&
      newPos < size * size &&
      Math.abs((ghostPos % size) - (newPos % size)) <= 1;
  });

  const move = possibleMoves[Math.floor(Math.random() * possibleMoves.length)];
  ghostPos += move;
  updateGhost();
}

function updateScore() {
  scoreText.textContent = `Pontuação: ${score} | Nível: ${level}`;
}

function ghostSpeedUp() {
  clearInterval(ghostInterval);
  const speed = Math.max(300, 1000 - level * 150);
  ghostInterval = setInterval(moveGhost, speed);
}

function resetBoard() {
  playerPos = 0;
  ghostPos = size * size - 1;
  createBoard();
}

function gameOver() {
  clearInterval(ghostInterval);
  bgMusic.pause();
  if (!isMuted) gameOverMusic.play();
  setTimeout(() => {
    alert("Game Over! O fantasma pegou você!");
    window.location.reload();
  }, 100);
}

document.addEventListener("keydown", e => {
  switch (e.key) {
    case "ArrowUp":
      if (playerPos >= size) playerPos -= size;
      break;
    case "ArrowDown":
      if (playerPos < size * (size - 1)) playerPos += size;
      break;
    case "ArrowLeft":
      if (playerPos % size !== 0) playerPos -= 1;
      break;
    case "ArrowRight":
      if ((playerPos + 1) % size !== 0) playerPos += 1;
      break;
  }
  updatePlayer();
});
