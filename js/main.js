/*
 TODO:
 - Game Object
    -  Game play
        - Function when called runs the game
 

 - Player rendering
    
*/

import { Player } from "./game_class.js";
import defaultExport from "./GENERAL_VARIBELS.js";

//  Importing canvas and create teh drawing tool
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//?  Setting canvas width
canvas.width = defaultExport.GAME_WIDTH;
canvas.height = defaultExport.GAME_HEIGHT;

const PLAYER = new Player(
  defaultExport.PLAYER_DEFAULT_ANIMATIONSATE,
  defaultExport.PLAYER_ANIMATION_STATES,
  true,
  10,
  10,
  5,
  defaultExport.PLAYER_STARTING_POSITON[1],
  defaultExport.PLAYER_STARTING_POSITON[0],
  0.2,
  0.1
);
PLAYER.addEventListeners();

//* Animaiton of stuff
let gameTick = 0;
const STAGGERFRAMES = 7;

//? THE LIST WITH ALL THE LOOP
let GAME_OBJECTS = [PLAYER];

function CreateAnimationStates(...GAME_OBJECTS) {
  GAME_OBJECTS.forEach((obj) => {
    obj.animationState.forEach((state, index) => {
      let frames = {
        loc: [],
      };
      for (let j = 0; j < state.frames; j++) {
        let positionX = j * obj.spriteWidth;
        let positionY = index * obj.spriteHeight;
        frames.loc.push({ x: positionX, y: positionY });
      }

      // Assuming obj is defined somewhere in your code
      obj.spriteAnimation[state.name] = frames;
    });
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

  GAME_OBJECTS.forEach((object) => {
    if (object.canAnmate) {
      let postion =
        Math.floor(gameTick / STAGGERFRAMES) %
        PLAYER.spriteAnimation[object.animaitonCurrentState].loc.length;

      let frameX = object.spriteWidth * postion;
      let frameY =
        object.spriteAnimation[object.animaitonCurrentState].loc[postion].y;
      object?.renderer(ctx, frameX, frameY);
    } else {
      object?.renderer(ctx, 0, 0);
    }
  });

  gameTick++;
  requestAnimationFrame(gameLoop);
}

CreateAnimationStates(PLAYER);

console.log(PLAYER);

gameLoop();
