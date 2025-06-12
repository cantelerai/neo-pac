let gameStarted = false;
let pacman = document.getElementById("pacman");
let ghost = document.getElementById("ghost");
let music = document.getElementById("background-music");

let pacmanPosX = 50;
let pacmanPosY = 50;

let ghostPosX = 350;
let ghostPosY = 350;

let ghostSpeed = 1;  // A velocidade do fantasma
let moveAmount = 10; // Quantos pixels o Pac-Man se moverá por vez

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";

  if (music) music.play();

  gameStarted = true;
  document.addEventListener("keydown", movePlayer);
  updateGhost();
}

function movePlayer(e) {
  if (!gameStarted) return;

  if (e.key === "ArrowRight") pacmanPosX += moveAmount;
  if (e.key === "ArrowLeft") pacmanPosX -= moveAmount;
  if (e.key === "ArrowUp") pacmanPosY -= moveAmount;
  if (e.key === "ArrowDown") pacmanPosY += moveAmount;

  pacman.style.left = `${pacmanPosX}px`;
  pacman.style.top = `${pacmanPosY}px`;
}

function updateGhost() {
  // A cada 100ms, o fantasma vai se mover em direção ao Pac-Man
  setInterval(() => {
    if (ghostPosX < pacmanPosX) ghostPosX += ghostSpeed;
    if (ghostPosX > pacmanPosX) ghostPosX -= ghostSpeed;
    if (ghostPosY < pacmanPosY) ghostPosY += ghostSpeed;
    if (ghostPosY > pacmanPosY) ghostPosY -= ghostSpeed;

    ghost.style.left = `${ghostPosX}px`;
    ghost.style.top = `${ghostPosY}px`;
  }, 100);  // A cada 100ms
}
