export default class Player {
  constructor(
    hp,
    dmg,
    speed,
    start_x,
    start_y,
    width_player,
    height_player,
    acceleration_speed
  ) {
    this.hp = hp;
    this.dmg = dmg;
    this.height_player = height_player;
    this.width_player = width_player;

    this.x = start_x;
    this.y = start_y;

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

  update() {
    const xDirection =
      (this.movements_keys["a"] || this.movements_keys["ArrowLeft"] ? -1 : 0) +
      (this.movements_keys["d"] || this.movements_keys["ArrowRight"] ? 1 : 0);
    const yDirection =
      (this.movements_keys["w"] || this.movements_keys["ArrowUp"] ? -1 : 0) +
      (this.movements_keys["s"] || this.movements_keys["ArrowDown"] ? 1 : 0);

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

    this.x += this.currentSpeed * normalizedX;
    this.y += this.currentSpeed * normalizedY;

    console.log(`X-axes: ${xDirection}`);
    console.log(`Y-axes: ${yDirection}`);
  }

  renderer(ctx) {
    // Align to Pixel Grid
    const x = Math.round(this.x);
    const y = Math.round(this.y);

    // Disable Anti-aliasing
    ctx.imageSmoothingEnabled = false;

    ctx.fillRect(x, y, this.width_player, this.height_player);

    // Reset imageSmoothingEnabled to its default value
    ctx.imageSmoothingEnabled = true;
  }
}
