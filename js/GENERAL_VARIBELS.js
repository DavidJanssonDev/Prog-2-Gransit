const GAME_WIDTH = window.innerWidth;
const GAME_HEIGHT = window.innerHeight;

const PLAYER_STARTING_POSITON = [100, 100];
const PLAYER_DEFAULT_ANIMATIONSATE = "idle";
const PLAYER_ANIMATION_STATES = [
  {
    name: "idle",
    frames: 11,
  },
  {
    name: "GoingUp",
    frames: 11,
  },
  {
    name: "GoingDown",
    frames: 11,
  },
  {
    name: "GoingRight",
    frames: 11,
  },
  {
    name: "GoingLeft",
    frames: 11,
  },
];

export default {
  // GAME
  GAME_WIDTH,
  GAME_HEIGHT,

  // PLAYER
  PLAYER_STARTING_POSITON,
  PLAYER_ANIMATION_STATES,
  PLAYER_DEFAULT_ANIMATIONSATE,
};
