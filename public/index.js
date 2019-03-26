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

    class Circle {

    }

    const canvas = new Canvas();


    function logCircle (circle) {
        console.log(`x: ${circle.x} y: ${circle.y} radius: ${circle.radius}`);
    }

    function logPoint (x, y) {
        console.log("x: " + x + " y: " + y);
    }

    function getDistanceFromCenter(circle, x, y) {
        const xDistanceSquare = Math.pow(parseFloat(circle.x) - parseFloat(x), 2);
        const yDistanceSquare = Math.pow(parseFloat(circle.y) - parseFloat(y), 2);
        return Math.sqrt(xDistanceSquare + yDistanceSquare);
    }

    function isHit (circle, x, y) {
        const distanceFromCenter = getDistanceFromCenter(circle, x, y);
        return distanceFromCenter <= circle.radius;
    }

    /*
     * Returns a circle radius with a
     * max diameter = 100 or
     * min diameter = 10
     */
    function getRandomCircleRadius () {
        return Math.floor(Math.random() * 50) + 5;
    }

    function getRandomXLocation () {

    }


    const circles = [];
    const MAX_CIRCLES = 2;
    for (let i = 0; i < MAX_CIRCLES; i++) {

        circles.push({
            x: 50,
            y: 0,
            radius : getRandomCircleRadius()
        });
    }

    const circle = circles[0];

    window.DotGame = window.DotGame || {};

    DotGame.handleClick = function handleCanvasClick () {
        const x = event.offsetX;
        const y = event.offsetY;
        console.log("Is Hit: ")
        console.log(isHit(circle, x, y));
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
