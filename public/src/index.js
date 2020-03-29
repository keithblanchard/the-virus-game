import Canvas from './Canvas.js';
import Game from './Game.js';
import Point from './Point.js'
import score from './score.js';

window.onresize = function () {
    window.location.reload();
};

window.DotGame = window.DotGame || {};

let game;

window.DotGame.handleClick = function handleCanvasClick() {
    if (!game.gameOver) {
        const point = new Point(event.offsetX, event.offsetY);
        game.makeMove(point);
    }
};

window.DotGame.onLoad = function onLoad () {
    score.init();
};

window.DotGame.init = function init() {
    score.init();
    let canvas = new Canvas();
    game = new Game({
        speed: 10
    });
    document.getElementById('controls').style.display = 'none';
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('game-status').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('score').innerHTML = '0';
    const sound = document.getElementById('sound');
    sound.play();
    canvas.init();
    game.init(canvas);

};

window.DotGame.setSpeed = speed => {
    game.updateSpeed(speed.value);
};

