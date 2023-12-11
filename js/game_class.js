import defaultExport from "./GENERAL_VARIBELS.js";
export default class Player {
  constructor(hp, dmg, speed, animation) {
    this.hp = hp;
    this.dmg = dmg;

    this.x = 100;
    this.y = 100;

    // Player Sprite:
    this.playerImage = new Image();
    this.playerImage.src = "../Picture/PlayerSpriteProg2UPP.png";

    this.CANVAS_HEIGHT = defaultExport.GAME_HEIGHT;
    this.CANVAS_WIDTH = defaultExport.GAME_WIDTH;

    //? Animation
    this.canAnmate = animation;
    this.animaitonCurrentState = "idle";
    this.spriteAnimation = [];
    this.animationState = [
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

    this.spriteWidth = 32;
    this.spriteHeight = 32;

    // Movment Stuff:
    this.speed = speed;
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

  handleKeyEvent(event) {
    let playerObject = GAME_OBJECTS.find((object) => object instanceof Player);

    // Check if the pressed or released key is in the movements_keys dictionary
    if (playerObject.movements_keys.hasOwnProperty(event.key)) {
      playerObject.movements_keys[event.key] = event.type === "keydown";
    }
  }

  addEventListeners() {
    document.addEventListener("keydown", (event) =>
      this.handleKeyEvent(event, true)
    );
    document.addEventListener("keyup", (event) =>
      this.handleKeyEvent(event, false)
    );
  }

  removeEventListeners() {
    document.removeEventListener("keydown", (event) =>
      this.handleKeyEvent(event, true)
    );
    document.removeEventListener("keyup", (event) =>
      this.handleKeyEvent(event, false)
    );
  }

  movement() {
    const xDirection =
      (this.movements_keys["a"] || this.movements_keys["ArrowLeft"] ? -1 : 0) +
      (this.movements_keys["d"] || this.movements_keys["ArrowRight"] ? 1 : 0);
    const yDirection =
      (this.movements_keys["w"] || this.movements_keys["ArrowUp"] ? -1 : 0) +
      (this.movements_keys["s"] || this.movements_keys["ArrowDown"] ? 1 : 0);

    //
    const magnitude = Math.sqrt(xDirection ** 2 + yDirection ** 2);
    const normalizedX = magnitude === 0 ? 0 : xDirection / magnitude;
    const normalizedY = magnitude === 0 ? 0 : yDirection / magnitude;

    if (magnitude > 0) {
      // Accelerate towards the max speed
      this.currentSpeed = Math.min(
        this.currentSpeed + this.acceleration,
        this.speed
      );
    } else {
      // Decelerate when no movement keys are pressed
      this.currentSpeed = Math.max(this.currentSpeed - this.deceleration, 0);
    }
    console.log(this.currentSpeed);
    this.x += this.currentSpeed * normalizedX;
    this.y += this.currentSpeed * normalizedY;
  }

  update() {
    // Player postion update:
    this.movement();
  }

  renderer(ctx, posCutX, posCutY) {
    // ctx.drawImage(imgae, sx, sy, sw, sh, dx, dy, dw, dh);
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
