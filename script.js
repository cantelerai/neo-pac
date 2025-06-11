let gameStarted = false;
let music = document.getElementById("background-music");
let deathSound = document.getElementById("death-sound");
let isSoundOn = true;

function toggleSound() {
  isSoundOn = !isSoundOn;
  if (isSoundOn) {
    music.play();
    document.getElementById("sound-button").innerText = "🔊 Som";
  } else {
    music.pause();
    document.getElementById("sound-button").innerText = "🔇 Som";
  }
}

function startGame() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("game-container").style.display = "block";
  if (isSoundOn) music.play();
  initGame();
}

function gameOver() {
  if (isSoundOn) deathSound.play();
  // outras ações de game over
}

function initGame() {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = "yellow";
  ctx.beginPath();
  ctx.arc(50, 50, 20, 0.2 * Math.PI, 1.8 * Math.PI); // Pac-Man
  ctx.lineTo(50, 50);
  ctx.fill();
}
