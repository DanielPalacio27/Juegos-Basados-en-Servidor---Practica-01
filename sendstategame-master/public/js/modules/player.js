export class Player {
  constructor(x, y, type) {
    console.log(`New Player at (${x},${y}) type: ${type}`);
    this.x = x;
    this.y = y;
    this.type = type;
    this.radius = 10;
    this.speed = 1;
    this.color =
      type == 1
        ? "#0095DD"
        : "#" + Math.floor(Math.random() * 16777215).toString(16);
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
