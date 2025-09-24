const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let ninja = { x: 50, y: 320, w: 40, h: 60, vy: 0, jumping: false };
let gravity = 1.5;
let groundY = 380;
let obstacles = [];
let gameOver = false;
let score = 0;

function drawNinja() {
  ctx.fillStyle = "#4ad";
  ctx.fillRect(ninja.x, ninja.y, ninja.w, ninja.h);
}

function drawObstacles() {
  ctx.fillStyle = "#f00";
  obstacles.forEach(obs => {
    ctx.fillRect(obs.x, obs.y, obs.w, obs.h);
  });
}

function updateObstacles() {
  if (Math.random() < 0.02) {
    obstacles.push({ x: canvas.width, y: groundY - 40, w: 30, h: 40 });
  }
  obstacles.forEach(obs => obs.x -= 6);
  obstacles = obstacles.filter(obs => obs.x + obs.w > 0);
}

function checkCollision() {
  obstacles.forEach(obs => {
    if (
      ninja.x < obs.x + obs.w &&
      ninja.x + ninja.w > obs.x &&
      ninja.y < obs.y + obs.h &&
      ninja.y + ninja.h > obs.y
    ) {
      gameOver = true;
    }
  });
}

function jump() {
  if (!ninja.jumping) {
    ninja.vy = -20;
    ninja.jumping = true;
  }
}

function updateNinja() {
  ninja.y += ninja.vy;
  ninja.vy += gravity;
  if (ninja.y > groundY - ninja.h) {
    ninja.y = groundY - ninja.h;
    ninja.vy = 0;
    ninja.jumping = false;
  }
}

function drawScore() {
  ctx.fillStyle = "#fff";
  ctx.font = "24px Arial";
  ctx.fillText("Score: " + score, 620, 40);
}

function gameLoop() {
  if (gameOver) {
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#fff";
    ctx.font = "48px Arial";
    ctx.fillText("Game Over!", 280, 180);
    ctx.font = "32px Arial";
    ctx.fillText("Score: " + score, 330, 240);
    ctx.font = "20px Arial";
    ctx.fillText("Refresh to play again!", 320, 300);
    return;
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawNinja();
  drawObstacles();
  updateObstacles();
  updateNinja();
  checkCollision();
  drawScore();

  score++;
  requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown", (e) => {
  if (e.code === "Space") jump();
});

gameLoop();
