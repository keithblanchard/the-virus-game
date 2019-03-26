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

        }

        init () {

        }

        loop () {

        }
    }

    const canvas = new Canvas();


    const circles = [];
    const MAX_CIRCLES = 2;
    for (let i = 0; i < MAX_CIRCLES; i++) {
        circles.push(new Circle());
    }

    const circle = circles[0];

    window.DotGame = window.DotGame || {};

    DotGame.handleClick = function handleCanvasClick () {
        const point = new Point(event.offsetX, event.offsetY);
        console.log(circle.contains(point));
    };


    // Game loop

    DotGame.init = function initCanvas () {
        canvas.init();
    };

    DotGame.init = function initCanvas () {
        canvas.init();
        const context = canvas.context;
        const width = canvas.width;
        const height = canvas.height;
        let speed = 1;
        function gameLoop () {
            context.clearRect(0, 0, width, height);
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            context.stroke();
            circle.y = circle.y + speed;
            if (circle.y > height) {
                circle.y = 0;
            }
            window.requestAnimationFrame(gameLoop);
        }

        window.requestAnimationFrame(gameLoop);
    };



})();
