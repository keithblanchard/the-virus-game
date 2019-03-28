(function () {

    class Canvas {

        init() {
            const $canvas = document.querySelector(".dot-game-canvas");
            const $controls = document.querySelector(".dot-game-controls");
            const userAgentMarginOffset = 24;
            const width = window.innerWidth - userAgentMarginOffset;
            const height = window.innerHeight - $controls.clientHeight - userAgentMarginOffset;

            $canvas.setAttribute("width", width.toString());
            $canvas.setAttribute("height", height.toString());

            this.height = $canvas.height;
            this.width = $canvas.width;
            this.context = $canvas.getContext("2d");
        }
    }

    class Point {

        static distance(p1, p2) {
            const dx = p1.x - p2.x;
            const dy = p1.y - p2.y;
            return Math.hypot(dx, dy);
        }

        constructor(x, y) {
            this.x = parseFloat(x);
            this.y = parseFloat(y);
        }

    }

    class Circle {

        static intersects(c1, c2) {
            let distance = Point.distance(c1.center, c2.center);
            let radiusSum = c1.radius + c2.radius;

            return distance <= radiusSum;

        }

        constructor(maxX) {
            this.radius = this.getRandomCircleRadius();
            let x = Math.random() * maxX;
            const padding = 10; // Don't touch the side walls.
            if (x < this.radius) {
                x = this.radius + padding;
            }
            const realMax = maxX - this.radius;
            if (x > realMax) {
                x = realMax - padding;
            }
            this.center = new Point(x, 0);
        }

        /*
         * Returns a circle radius with a
         * max diameter = 100 or
         * min diameter = 10
         */
        getRandomCircleRadius() {
            return Math.floor(Math.random() * (50 - 5)) + 5;
        }

        contains(point) {
            return Point.distance(point, this.center) <= this.radius;
        }

    }

    class Game {

        constructor({allowOverLap, speed}) {
            this.setSpeed(speed);
            this.allowOverLap = allowOverLap;
            this.score = 0;
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

        initCircleTickInterval () {
            this.tickCircleInterval = setInterval(() => {
                this.circles.forEach((circle) => {
                    this.tickCircle(circle);
                });
            }, 1000 / this.smoothness);
        }

        tick() {
            window.requestAnimationFrame(() => {
                this.animationLoop();
            });
        }

        addCircle() {
            let newCircle = new Circle(this.width);
            if (this.allowOverLap) {
                this.circles.push(new Circle(this.width));
            } else {
                let addCircle = true;
                this.circles.forEach((circle) => {
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
            let score = (-0.1 * (2 * radius)) + 11;
            return Math.floor(score);
        }

        makeMove(point) {
            this.circles = this.circles.filter((circle) => {
                if (circle.contains(point)) {
                    this.score = this.score + this.getScore(circle.radius);
                    setTimeout(() => {
                        this.addCircle();
                    }, 1000);
                    return false; // remove
                }
                return true; // keep
            });
            document.querySelector(".dot-game-controls__score").innerHTML = this.score;
        }

        drawCircle(circle) {
            this.context.beginPath();
            this.context.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
            this.context.stroke();
        }

        tickCircle(circle) {
            if (circle.center.y > this.height) {
                circle.center.y = -100;
            }
            circle.center.y = circle.center.y + Math.floor(this.speed / this.smoothness);
        }

        animationLoop() {
            this.context.clearRect(0, 0, this.width, this.height);
            this.circles.forEach((circle) => {
                this.drawCircle(circle);
            });
            this.tick();
        }
    }

    window.DotGame = window.DotGame || {};
    let canvas = new Canvas();
    const game = new Game({
        allowOverLap : false,
        speed: 50
    });

    window.DotGame.handleClick = function handleCanvasClick() {
        const point = new Point(event.offsetX, event.offsetY);
        game.makeMove(point);
    };

    window.DotGame.init = function init() {
        canvas.init();
        game.init(canvas);
    };

    window.DotGame.setSpeed = ((speed) => {
        game.updateSpeed(speed.value);
    });

})();
