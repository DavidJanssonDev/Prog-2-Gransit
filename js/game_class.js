import defaultExport from "./GENERAL_VARIBELS.js";

class GeneralClass {
  constructor(hp, dmg, speed, animation, startX, startY) {
    this.canAnimate = animation;

    // GENERAL STATS
    this.health = hp;
    this.damage = dmg;
    this.speed = speed;

    this.x = startX;
    this.y = startY;
  }
}

class AnimationClass extends GeneralClass {
  constructor(
    defaultAnimationState,
    animationsStates,
    animation,
    hp,
    dmg,
    speed,
    startX,
    startY
  ) {
    super(hp, dmg, speed, animation, startX, startY);

    // ANIMATION
    this.animationCurrentState = defaultAnimationState;
    this.spriteAnimation = [];
    this.animationState = animationsStates;
    this.spriteWidth = 32;
    this.spriteHeight = 32;
  }
}

export class Player extends AnimationClass {
  constructor(
    defaultAnimationState,
    animationsStates,
    animation,
    hp,
    dmg,
    speed,
    startX,
    startY
  ) {
    super(
      defaultAnimationState,
      animationsStates,
      animation,
      hp,
      dmg,
      speed,
      startX,
      startY
    );

    // Player Sprite:
    this.playerImage = new Image();
    this.playerImage.src = "../Picture/PlayerSpriteProg2UPP.png";

    this.CANVAS_HEIGHT = defaultExport.GAME_HEIGHT;
    this.CANVAS_WIDTH = defaultExport.GAME_WIDTH;

    // Movment Stuff:
    this.acceleration = 0.5;
    this.deceleration = 1;
    this.currentSpeed = 0;

    this.movements_keys = {
      w: false,
      a: false,
      d: false,
      s: false,
      ArrowUp: false,
      ArrowDown: false,
      ArrowLeft: false,
      ArrowRight: false,
    };
  }

  #GetDirection(positivKeys, negativKeys) {
    return (
      (this.movements_keys[positivKeys[0]] ||
        this.movements_keys[positivKeys[1]]) -
      (this.movements_keys[negativKeys[0]] ||
        this.movements_keys[negativKeys[1]])
    );
  }

  movement() {
    // Calculate the movement in both x and y directions
    const moveX = this.#GetDirection(["ArrowRight", "d"], ["ArrowLeft", "a"]);
    const moveY = this.#GetDirection(["ArrowDown", "s"], ["ArrowUp", "w"]);

    // Calculate the diagonal speed
    const diagonalSpeed = Math.sqrt(moveX ** 2 + moveY ** 2);

    // Normalize the movement vector
    const normalizedMoveX = moveX / diagonalSpeed || 0;
    const normalizedMoveY = moveY / diagonalSpeed || 0;

    if (diagonalSpeed > 0) {
      this.currentSpeed = Math.min(
        this.currentSpeed + this.acceleration,
        this.speed
      );
    } else {
      // Decelerate to 0 when no movement keys are pressed
      this.currentSpeed = Math.max(this.currentSpeed - this.deceleration, 0);
    }

    // Update the player position
    this.x += this.currentSpeed * normalizedMoveX;
    this.y += this.currentSpeed * normalizedMoveY;

    console.log(` 
    Cordinates: 
        x: ${this.x} 
        y: ${this.y}
    
    Speed:
        Speed ${this.currentSpeed}
    `);
  }

  handleKeyEvent(event) {
    // Check if the pressed or released key is in the movements_keys dictionary
    if (this.movements_keys.hasOwnProperty(event.key)) {
      this.movements_keys[event.key] = event.type === "keydown";
    }
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) => {
      this.handleKeyEvent(event, true);
    });
    document.addEventListener("keyup", (event) => {
      this.handleKeyEvent(event, false);
    });
  }

  removeEventListeners() {
    document.removeEventListener("keydown", (event) =>
      this.handleKeyEvent(event, true)
    );
    document.removeEventListener("keyup", (event) =>
      this.handleKeyEvent(event, false)
    );
  }

  update() {
    // Player postion update:
    this.movement();
  }

  renderer(ctx, posCutX, posCutY) {
    let x = Math.round(this.x);
    let y = Math.round(this.y);

    ctx.drawImage(
      this.playerImage,
      posCutX,
      posCutY,
      this.spriteWidth,
      this.spriteHeight,
      x,
      y,
      this.spriteWidth,
      this.spriteHeight
    );
  }
}
