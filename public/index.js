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

        log () {
            console.log("x: " + x + " y: " + y);
        }


    }

    class Circle {

        constructor () {
            this.center = new Point(50, 0);
            this.radius = this.getRandomCircleRadius();
        }

        log () {
            console.log(`x: ${this.center.x} y: ${this.center.y} radius: ${this.radius}`);
        }

        /*
         * Returns a circle radius with a
         * max diameter = 100 or
         * min diameter = 10
         */
        getRandomCircleRadius () {
            return Math.floor(Math.random() * 50) + 5;
        }

        contains (point) {
            return Point.distance(point, this.center) <= this.radius;
        }

    }

    class Game {

        constructor () {
            const circles = [];
            const MAX_CIRCLES = 2;
            for (let i = 0; i < MAX_CIRCLES; i++) {
                circles.push(new Circle());
            }
            this.circle = circles[0];
        }

        init (canvas) {
            this.context = canvas.context;
            this.width = canvas.width;
            this.height = canvas.height;
            this.tick();
        }

        tick () {
            window.requestAnimationFrame(() => {
                this.animationLoop();
            });
        }

        setSpeed(speed) {
            this.speed = parseInt(speed);
        }

        makeMove(point) {
            console.log(this.circle.contains(point));
        }

        animationLoop () {
            this.context.clearRect(0, 0, this.width, this.height);
            this.context.beginPath();
            this.context.arc(this.circle.center.x, this.circle.center.y, this.circle.radius, 0, 2 * Math.PI);
            this.context.stroke();
            this.circle.center.y = this.circle.center.y + this.speed;
            if (this.circle.center.y > this.height) {
                this.circle.center.y = 0;
            }
            this.tick();
        }
    }

    window.DotGame = window.DotGame || {};
    const canvas = new Canvas();
    const game = new Game(canvas);
    game.setSpeed(1);

    DotGame.handleClick = function handleCanvasClick () {
        game.makeMove(new Point(event.offsetX, event.offsetY));
    };
    DotGame.init = function init () {
        canvas.init();
        game.init(canvas);
    };

})();
