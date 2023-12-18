import {
  ACCELERATION,
  DECELERATION,
  GAME_HEIGHT,
  GAME_WIDTH,
  SPRITE_SIZE,
} from "./GENERAL_VARIBELS.js";

class GeneralClass {
  constructor(hp, dmg, speed, animation, startX, startY, type) {
    this.canAnimate = animation;
    this.health = hp;
    this.damage = dmg;
    this.speed = speed;
    this.x = startX;
    this.y = startY;
    this.type = type;

    // Add sprite width and height properties here
    this.spriteWidth = SPRITE_SIZE;
    this.spriteHeight = SPRITE_SIZE;
  }

  collision(otherObject) {
    const thisRect = this.getBoundingBox();
    const otherRect = otherObject.getBoundingBox();

    return (
      thisRect.x < otherRect.x + otherRect.width &&
      thisRect.x + thisRect.width > otherRect.x &&
      thisRect.y < otherRect.y + otherRect.height &&
      thisRect.y + thisRect.height > otherRect.y
    );
  }

  getBoundingBox() {
    return {
      x: this.x,
      y: this.y,
      width: this.spriteWidth,
      height: this.spriteHeight,
    };
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
    startY,
    type
  ) {
    super(hp, dmg, speed, animation, startX, startY, type);

    // ANIMATION
    this.animationCurrentState = defaultAnimationState;
    this.spriteAnimation = [];
    this.animationState = animationsStates;
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
    startY,
    type
  ) {
    super(
      defaultAnimationState,
      animationsStates,
      animation,
      hp,
      dmg,
      speed,
      startX,
      startY,
      type
    );

    this.playerImage = new Image();
    this.playerImage.src = "../Picture/PlayerSpriteProg2UPP.png";

    this.CANVAS_HEIGHT = GAME_HEIGHT;
    this.CANVAS_WIDTH = GAME_WIDTH;

    this.acceleration = ACCELERATION;
    this.deceleration = DECELERATION;
    this.currentSpeed = 0;
    this.isColiding = false;

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

  #getDirection(positivKeys, negativKeys) {
    return (
      (this.movements_keys[positivKeys[0]] ||
        this.movements_keys[positivKeys[1]]) -
      (this.movements_keys[negativKeys[0]] ||
        this.movements_keys[negativKeys[1]])
    );
  }

  movement() {
    if (this.isColiding) return;
    const moveX = this.#getDirection(["ArrowRight", "d"], ["ArrowLeft", "a"]);
    const moveY = this.#getDirection(["ArrowDown", "s"], ["ArrowUp", "w"]);

    this.updateAnimationState(moveX, moveY);

    const diagonalSpeed = Math.sqrt(moveX ** 2 + moveY ** 2);
    const normalizedMoveX = moveX / diagonalSpeed || 0;
    const normalizedMoveY = moveY / diagonalSpeed || 0;

    this.updateSpeed(diagonalSpeed);
    this.updatePosition(normalizedMoveX, normalizedMoveY);
  }

  updateAnimationState(moveX, moveY) {
    if (moveX > 0) this.animationCurrentState = "GoingRight";
    else if (moveX < 0) this.animationCurrentState = "GoingLeft";
    else if (moveY > 0) this.animationCurrentState = "GoingDown";
    else if (moveY < 0) this.animationCurrentState = "GoingUp";
    else this.animationCurrentState = "idle";
  }

  updateSpeed(diagonalSpeed) {
    if (diagonalSpeed > 0) {
      this.currentSpeed = Math.min(
        this.currentSpeed + this.acceleration,
        this.speed
      );
    } else {
      this.currentSpeed = Math.max(this.currentSpeed - this.deceleration, 0);
    }
  }

  updatePosition(normalizedMoveX, normalizedMoveY) {
    this.x += this.currentSpeed * normalizedMoveX;
    this.y += this.currentSpeed * normalizedMoveY;
  }

  collisionHandling(object) {
    console.log(object.type);
    if (object.type === "wall") {
      this.currentSpeed = 0;
      this.isColiding = true;
    } else if (object.type === "enemy") {
      object.health -= this.damage;
      console.log("Dealt damage to the enemy. Enemy health:", object.health);
    }

    // Additional collision handling logic can be added here
  }

  colistion(gameObjectsIndex, AllGameObjects) {
    AllGameObjects.forEach((object, index) => {
      console.log(this.collision(object));
      if (index !== gameObjectsIndex && this.collision(object)) {
        this.collisionHandling(object);
      }
    });
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

  update(index, Objects) {
    // Player postion update:
    this.movement();
    this.colistion(index, Objects);
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
