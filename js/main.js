/*
 TODO:
 - Game Object
    -  Game play
        - Function when called runs the game
 

 - Player rendering
    
*/

import Player from "./game_class.js";
import defaultExport from "./GENERAL_VARIBELS.js";

//  Importing canvas and create teh drawing tool
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//?  Setting canvas width
canvas.width = defaultExport.GAME_WIDTH;
canvas.height = defaultExport.GAME_HEIGHT;

const PLAYER = new Player(10, 10, 10, defaultExport.PLAYER_SPRITE_IMAGE_SIZE);

//* Animaiton of stuff
let frameY = 0;
let frameX = 0;
let gameFrame = 0;
const STAGGERFRAMES = 5;

//? THE LIST WITH ALL THE LOOP
let GAME_OBJECTS = [PLAYER];

function CreateAnimationStates(...GAME_OBJECTS) {
  GAME_OBJECTS.forEach((value) => {
    if (
      value &&
      value.animationStates &&
      Array.isArray(value.animationStates)
    ) {
      value.animationStates.forEach((state, index) => {
        let frames = {
          loc: [],
        };
        for (let j = 0; j < state.frames; j++) {
          let positionX = j * value.spriteWidth;
          let positionY = index * value.spriteHeight;
          frames.loc.push({ x: positionX, y: positionY });
        }

        // Assuming obj is defined somewhere in your code
        obj.SpriteAnimations[state.name] = frames;
      });
    } else {
      // Handle the case where animationStates is not defined or not an array
      console.error(
        "Invalid value or missing animationStates property:",
        value
      );
    }
  });
}

//* Game loop
function gameLoop() {
  //! Logic loop
  GAME_OBJECTS.forEach((object) => {
    object?.update();
  });

  //! Graphics loop
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //! Render all game objects, including the player

  let postion = Math.floor(gameFrame / STAGGERFRAMES) % 6;
  let player_sprite_with = PLAYER.sprite_width;

  frameX = player_sprite_with * postion;
  GAME_OBJECTS.forEach((object) => {
    console.log(frameX);
    object?.renderer(ctx, frameX, frameY);
  });

  gameFrame++;
  requestAnimationFrame(gameLoop);
}

CreateAnimationStates(PLAYER);
gameLoop();
