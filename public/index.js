(function () {

    window.DotGame = window.DotGame || {};

    DotGame.handleClick = function handleCanvasClick () {
        console.log(arguments);
        console.log("click event");
    };

    DotGame.init = function initCanvas () {
        const canvas = document.querySelector(".dot-game-canvas");
        const context = canvas.getContext("2d");
        const canvasHeight = canvas.height;
        const canvasWidth = canvas.width;

        let index = 0;


        function step () {
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            context.beginPath();
            context.arc(50, index, 40, 0, 2 * Math.PI);
            context.stroke();

            index++;

            if (index > canvasHeight) {
                index = 0;
            }

            window.requestAnimationFrame(step);
        }

        window.requestAnimationFrame(step);
    };



})();
