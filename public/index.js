(function () {

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

    const circle = {
        x : 50,
        y : 0,
        radius: 40
    };

    window.DotGame = window.DotGame || {};

    DotGame.handleClick = function handleCanvasClick () {
        const x = event.offsetX;
        const y = event.offsetY;
        console.log("Is Hit: ")
        console.log(isHit(circle, x, y));
    };


    DotGame.init = function initCanvas () {
        const $canvas = document.querySelector(".dot-game-canvas");
        const $controls = document.querySelector(".dot-game-controls");
        const userAgentMarginOffset = 24;
        const width = window.innerWidth - userAgentMarginOffset;
        const height = window.innerHeight - $controls.clientHeight - userAgentMarginOffset;

        $canvas.setAttribute("width", width.toString());
        $canvas.setAttribute("height", height.toString());

        const context = $canvas.getContext("2d");
        const canvasHeight = $canvas.height;
        const canvasWidth = $canvas.width;

        let speed = 1;
        function step () {
            //logCircle(circle);
            context.clearRect(0, 0, canvasWidth, canvasHeight);
            context.beginPath();
            context.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
            context.stroke();

            circle.y = circle.y + speed;

            if (circle.y > canvasHeight) {
                circle.y = 0;
            }

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    };



})();
