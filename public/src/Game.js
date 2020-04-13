import Circle from './Circle.js';
import score from './score.js';
import sound from './sound.js'

const { setHighScore } = score;

export default class Game {
    constructor() {
        this.initalSpeed = 100;
        this.score = 0;
        this.gameOver = false;
    }

    init(canvas) {
        this.context = canvas.context;
        this.width = canvas.width;
        this.height = canvas.height;
        this.height = canvas.height;
        this.score = 0;
        this.gameOver = false;
        this.virusIndex = 0;
        this.setSpeed(this.initalSpeed);
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
        document.getElementById('game-over').style.display = 'block';
        document.getElementById('controls').style.display = 'flex';
        document.getElementById('canvas').style.display = 'none';
        setHighScore(this.score);
        sound.endGame();
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

    setSpeed(speed) {
        let speedInt = parseInt(speed);
        this.speed = speedInt;
        this.smoothness = speedInt;
    }

    getScore(radius) {
        let score = 0.1 * (2 * radius) + 11;
        return Math.floor(score);
    }

    makeMove(point) {
        let highScore = localStorage.getItem('high-score');
        if (!highScore) {
            highScore = 0;
        }
        this.circles = this.circles.filter(circle => {
            if (circle.contains(point)) {
                this.score = this.score + this.getScore(circle.radius);
                this.setSpeed(this.speed + 5);
                setTimeout(() => {
                    this.addCircle();
                }, 1000);
                return false; // remove
            }
            return true; // keep
        });

        const scoreElement = document.getElementById("score");
        scoreElement.innerHTML = this.score;
        if (this.score > highScore) {
            scoreElement.style.color = 'gold';
        }
    }

    drawCircle(circle) {
        if (!circle.image) {
            circle.image = document.getElementById(`virus${this.virusIndex}`);
            this.virusIndex++;
            if (this.virusIndex > 6) {
                this.virusIndex = 0;
            }
        }

        this.context.drawImage(
            circle.image,
            circle.center.x,
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