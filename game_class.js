export default class Player {
  constructor(hp, dmg, acceleration) {
    this.hp = hp;
    this.dmg = dmg;
    this.acceleration = acceleration;
    this.velocityX = 0;
    this.velocityY = 0;
    this.x = 0;
    this.y = 0;
    this.prevX = 0;
    this.prevY = 0;
    this.interpolationFactor = 0.1;
    this.maxVelocity = 2;
  }

  update() {
    this.x = this.prevX + this.interpolationFactor * (this.x - this.prevX);
    this.y = this.prevY + this.interpolationFactor * (this.y - this.prevY);

    this.velocityX += this.accelerationX;
    this.velocityY += this.accelerationY;

    const magnitude = Math.sqrt(this.velocityX ** 2 + this.velocityY ** 2);
    if (magnitude > this.maxVelocity) {
      const scale = this.maxVelocity / magnitude;
      this.velocityX *= scale;
      this.velocityY *= scale;
    }

    this.x += this.velocityX;
    this.y += this.velocityY;

    this.prevX = this.x;
    this.prevY = this.y;
  }

  accelerate(accelerationX, accelerationY) {
    const magnitude = Math.sqrt(accelerationX ** 2 + accelerationY ** 2);
    if (magnitude > 0) {
      const scale = this.acceleration / magnitude;
      this.accelerationX = accelerationX * scale;
      this.accelerationY = accelerationY * scale;
    } else {
      this.accelerationX = 0;
      this.accelerationY = 0;
    }
  }

  decelerate(decelerationX, decelerationY) {
    this.accelerationX = -decelerationX * this.acceleration;
    this.accelerationY = -decelerationY * this.acceleration;
  }

  renderer(ctx) {
    ctx.fillRect(this.x, this.y, this.width, this.height);

    // Add rendering logic here to draw the player on the canvas
    // You might use the canvas and ctx variables from your main.js file
  }
}
