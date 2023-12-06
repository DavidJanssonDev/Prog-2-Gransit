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

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const player = new Player(10, 5, 5, 100, 100, 10, 10);
const GAME_OBJECTS = [player];

//* Game loop
function gameLoop() {
  requestAnimationFrame(gameLoop);

  //! Logic
  GAME_OBJECTS.forEach((object) => {
    object.update();
  });

  //! Graphics
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Render all game objects, including the player
  GAME_OBJECTS.forEach((object) => {
    object.renderer(ctx);
  });
}

//? User Input direction:

// KeyUp
document.addEventListener("keydown", (event) => {
  let playerObject = GAME_OBJECTS.find((object) => object instanceof Player);

  // Check if the pressed key is in the movements_keys dictionary
  if (playerObject.movements_keys.hasOwnProperty(event.key)) {
    playerObject.movements_keys[event.key] = true;
  }
});

document.addEventListener("keyup", (event) => {
  let playerObject = GAME_OBJECTS.find((object) => object instanceof Player);

  // Check if the released key is in the movements_keys dictionary
  if (playerObject.movements_keys.hasOwnProperty(event.key)) {
    playerObject.movements_keys[event.key] = false;
  }
});

gameLoop();
