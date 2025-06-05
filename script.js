const board = document.getElementById("game-board");
const scoreText = document.getElementById("score");
let score = 0;
const size = 10;
let playerPos = 0;

function createBoard() {
  for (let i = 0; i < size * size; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    if (i !== playerPos) cell.classList.add("food");
    board.appendChild(cell);
  }
  updatePlayer();
}

function updatePlayer() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => cell.classList.remove("player"));
  cells[playerPos].classList.add("player");
  if (cells[playerPos].classList.contains("food")) {
    cells[playerPos].classList.remove("food");
    score++;
    scoreText.textContent = `Pontuação: ${score}`;
  }
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

createBoard();

