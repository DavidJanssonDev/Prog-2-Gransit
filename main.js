/*
 TODO:
 - Game Object
    -  Game play
        - Function when called runs the game
 
 - Player moment
 - Player rendering
    
*/

import Player from "./game_class.js";

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

const accelerationValue = 0.1;

const player = new Player(100, 10, accelerationValue);

const GAME_OBJECTS = [player];

function gameLoop() {
  requestAnimationFrame(gameLoop);

  // Logic
  GAME_OBJECTS.forEach((object) => {
    object.update();
  });

  // Graphics
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render all game objects, including the player
  GAME_OBJECTS.forEach((object) => {
    object.renderer(ctx);
  });
}

// Event listener for keydown
document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case "W":
    case "w":
      player.accelerate(0, -1);
      break;
    case "ArrowDown":
    case "S":
    case "s":
      player.accelerate(0, 1);
      break;
    case "ArrowLeft":
    case "A":
    case "a":
      player.accelerate(-1, 0);
      break;
    case "ArrowRight":
    case "D":
    case "d":
      player.accelerate(1, 0);
      break;
  }
});

// Event listener for keyup
document.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "ArrowUp":
    case "W":
    case "w":
    case "ArrowDown":
    case "S":
    case "s":
      player.decelerate(0, player.velocityY);
      break;
    case "ArrowLeft":
    case "A":
    case "a":
    case "ArrowRight":
    case "D":
    case "d":
      player.decelerate(player.velocityX, 0);
      break;
  }
});

gameLoop();
