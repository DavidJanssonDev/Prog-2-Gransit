/*
 TODO:
 - Game Object
    -  Game play
        - Function when called runs the game
 

 - Player rendering
    
*/

import { Player } from "./game_class.js";
import {
  GAME_HEIGHT,
  GAME_WIDTH,
  PLAYER_DEFAULT_ANIMATIONSATE,
  PLAYER_ANIMATION_STATES,
  PLAYER_STARTING_POSITON,
} from "./GENERAL_VARIBELS.js";

//  Importing canvas and create teh drawing tool
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

//?  Setting canvas width
canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

const PLAYER = new Player(
  PLAYER_DEFAULT_ANIMATIONSATE,
  PLAYER_ANIMATION_STATES,
  true,
  10,
  10,
  5,
  PLAYER_STARTING_POSITON[1],
  PLAYER_STARTING_POSITON[0],
  "player" // <-- Specify the type as "player"
);
PLAYER.addEventListeners();

const enemy = new Player(
  PLAYER_DEFAULT_ANIMATIONSATE,
  PLAYER_ANIMATION_STATES,
  false,
  10,
  10,
  5,
  PLAYER_STARTING_POSITON[1] * 2,
  PLAYER_STARTING_POSITON[0] * 2,
  "wall" // <-- Specify the type as "enemy"
);

//* Animaiton of stuff
let gameTick = 0;
const STAGGERFRAMES = 7;

//? THE LIST WITH ALL THE LOOP
let GAME_OBJECTS = [PLAYER, enemy];

function CreateAnimationStates(obj) {
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
}

function logicLoop() {
  console.log(GAME_OBJECTS);
  GAME_OBJECTS.forEach((object, index) => {
    object?.update(
      index,
      GAME_OBJECTS,
      GAME_OBJECTS.filter((obj) => obj.type === "wall")
    );
  });
}

function renderLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  GAME_OBJECTS.forEach((object) => {
    if (object.canAnimate) {
      let postion =
        Math.floor(gameTick / STAGGERFRAMES) %
        object.spriteAnimation[object.animationCurrentState].loc.length;

      let frameX = object.spriteWidth * postion;
      let frameY =
        object.spriteAnimation[object.animationCurrentState].loc[postion].y;
      object?.renderer(ctx, frameX, frameY);
    } else {
      object?.renderer(ctx, 0, 0);
    }
  });
  gameTick++;
  requestAnimationFrame(gameLoop);
}

function setUp() {
  GAME_OBJECTS.forEach((obj) => {
    if (obj.canAnimate) {
      CreateAnimationStates(obj);
    }
  });
}

//* Game loop
function gameLoop() {
  logicLoop();
  renderLoop();
}

setUp();
gameLoop();
