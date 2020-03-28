import Circle from './Circle.js';
export default class Game {
  constructor({
    allowOverLap,
    speed
  }) {
    this.setSpeed(speed);
    this.allowOverLap = allowOverLap;
    this.score = 0;
    this.virusIndex = 0;
  }

  init(canvas) {
    this.context = canvas.context;
    this.width = canvas.width;
    this.height = canvas.height;
    this.createCircles();
    this.initCircleTickInterval();
    this.tick();
  }
  /*
   * Wait 1000ms before adding the first circle.
   */


  createCircles() {
    this.circles = [];
    this.circles.push(new Circle(this.width));
    this.addCircleInterval = setInterval(() => {
      this.addCircle();
    }, 1000);
  }

  endGame() {
    this.gameOver = true;
    clearInterval(this.addCircleInterval);
    clearInterval(this.tickCircleInterval);
    cancelAnimationFrame(this.requestAnimationInterval);
    document.getElementById('game-over').display = 'block';

    const sound = document.getElementById('sound');
    sound.pause();
  }

  initCircleTickInterval() {
    this.tickCircleInterval = setInterval(() => {
      this.circles.forEach(circle => {
        this.tickCircle(circle);
      });
    }, 1000 / this.smoothness);
  }

  tick() {
    this.requestAnimationInterval = window.requestAnimationFrame(() => {
      this.animationLoop();
    });
  }

  addCircle() {
    let newCircle = new Circle(this.width);

    if (this.allowOverLap) {
      this.circles.push(new Circle(this.width));
    } else {
      let addCircle = true;
      this.circles.forEach(circle => {
        if (Circle.intersects(circle, newCircle)) {
          addCircle = false;
          return;
        }
      });

      if (addCircle) {
        this.circles.push(newCircle);
      }
    }
  }

  setSpeed(speed) {
    let speedInt = parseInt(speed);
    this.speed = speedInt;
    this.smoothness = speedInt;
  }

  updateSpeed(speed) {
    clearInterval(this.tickCircleInterval);
    this.setSpeed(speed);
    this.initCircleTickInterval();
  }

  getScore(radius) {
    let score = 0.1 * (2 * radius) + 11;
    return Math.floor(score);
  }

  makeMove(point) {
    this.circles = this.circles.filter(circle => {
      if (circle.contains(point)) {
        this.score = this.score + this.getScore(circle.radius);
       this.setSpeed(this.speed + 2);
        setTimeout(() => {
          this.addCircle();
        }, 1000);
        return false; // remove
      }

      return true; // keep
    });
    document.getElementById("score").innerHTML = this.score;
  }

  drawCircle(circle) {
    if (!circle.image) {
      circle.image = document.getElementById(`virus${this.virusIndex}`);
      this.virusIndex++;
      if (this.virusIndex > 4) {
        this.virusIndex = 0;
      }
    }

    this.context.drawImage(
        circle.image,circle.center.x,
        circle.center.y,
        circle.radius,
        circle.radius);
  }

  tickCircle(circle) {
    if (circle.center.y + circle.radius >= this.height) {
      this.endGame();
    }

    circle.center.y = circle.center.y + Math.floor(this.speed / this.smoothness);
  }

  animationLoop() {
    this.context.clearRect(0, 0, this.width, this.height);
    this.circles.forEach(circle => {
      this.drawCircle(circle);
    });
    this.tick();
  }

}