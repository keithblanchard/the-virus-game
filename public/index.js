(function () {

    class Canvas {

        init () {
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

        static distance(a, b) {
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            return Math.hypot(dx, dy);
        }

        constructor(x, y) {
            this.x = parseFloat(x);
            this.y = parseFloat(y);
        }

    }

    class Circle {

        constructor (maxX) {
            this.radius = this.getRandomCircleRadius();
            let x = Math.random() * maxX;
            const padding = 10;
            if (x < this.radius) {
                x = this.radius + padding;
            }
            const realMax = maxX - this.radius;
            if (x > realMax ) {
                x = realMax - padding;
            }
            this.center = new Point(x, 0);
        }

        /*
         * Returns a circle radius with a
         * max diameter = 100 or
         * min diameter = 10
         */
        getRandomCircleRadius () {
           return Math.floor(Math.random() * (50 - 5) ) + 5;
        }

        contains (point) {
            return Point.distance(point, this.center) <= this.radius;
        }

    }

    class Game {

        constructor () {
            this.score = 0;
        }

        init (canvas) {
            this.context = canvas.context;
            this.width = canvas.width;
            this.height = canvas.height;
            this.initCircles();
            this.tick();
        }

        /*
         * Wait 1000ms before adding the first circle.
         */
        initCircles () {
            this.circles = [];
            this.circles.push(new Circle(this.width));
            setInterval(() => {
                this.circles.push(new Circle(this.width));
            }, 1000);
            setInterval(() => {
                this.circles.forEach( (circle)=> {
                    this.tickCircle(circle);
                });
            }, 1000);
        }

        tick () {
            window.requestAnimationFrame(() => {
                this.animationLoop();
            });
        }

        addCircle () {
            setTimeout(() => {
                this.circles.push(new Circle(this.width));
            }, 1000);
        }

        setSpeed(speed) {
            this.speed = parseInt(speed);
        }

        getScore (radius) {
            let score = (-0.1 * (2 * radius)) + 11;
            return Math.floor(score);
        }

        makeMove(point) {
            this.circles = this.circles.filter((circle)=> {
                if (circle.contains(point)) {
                    this.score = this.score + this.getScore(circle.radius);
                    this.addCircle();
                    return false; // remove
                }
                return true; // keep
            });
            document.querySelector(".dot-game-controls__score").innerHTML = this.score;
        }

        drawCircle (circle) {
            this.context.beginPath();
            this.context.arc(circle.center.x, circle.center.y, circle.radius, 0, 2 * Math.PI);
            this.context.stroke();
        }

        tickCircle (circle) {
            if (circle.center.y > this.height) {
                circle.center.y = 0;
            }
            console.log(this.speed);
            circle.center.y = circle.center.y + this.speed;
        }

        animationLoop () {
            this.context.clearRect(0, 0, this.width, this.height);
            this.circles.forEach((circle)=> {
               this.drawCircle(circle) ;
            });
            this.tick();
        }
    }

    window.DotGame = window.DotGame || {};
    const canvas = new Canvas();
    const game = new Game(canvas);
    game.setSpeed(50);

    DotGame.handleClick = function handleCanvasClick () {
        const point = new Point(event.offsetX, event.offsetY);
        game.makeMove(point);
    };

    DotGame.init = function init () {
        canvas.init();
        game.init(canvas);
    };

    DotGame.setSpeed = ((speed) => {
        game.setSpeed(speed.value);
    });

})();
