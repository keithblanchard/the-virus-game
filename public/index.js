(function () {

    function logCircle (circle) {
        console.log(`x: ${circle.x} y: ${circle.y} radius: ${circle.radius}`);
    }

    function isHit (circle, x, y) {

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

        console.log("x: " + x + " y: " + y);
        logCircle(circle);

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
