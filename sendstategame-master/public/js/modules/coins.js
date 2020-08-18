export const name = "Coin";

export class Coin {
  constructor(x, y) {
    console.log(`New Coin at (${x},${y})`);
    this.x = x;
    this.y = y;
    this.points = 1;
    this.radius = Math.floor(Math.random() * 15) + 5;
    this.taken = false;
  }

  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#f5d142";
    ctx.fill();
    ctx.closePath();
  }

  take(player) {
    if (!this.taken) {
      let dx = player.x - this.x;
      let dy = player.y - this.y;
      let rSum = this.radius + player.radius;

      return dx * dx + dy * dy <= rSum * rSum;
    }
  }
  isTaken() {
    return this.taken;
  }
}
