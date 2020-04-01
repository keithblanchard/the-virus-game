import Canvas from './Canvas.js';
import Game from './Game.js';
import Point from './Point.js'
import score from './score.js';
let game;

window.TheVirus = window.TheVirus || {};

window.TheVirus.handleClick = function handleCanvasClick() {
    if (!game.gameOver) {
        const point = new Point(event.offsetX, event.offsetY);
        game.makeMove(point);
    }
};

window.TheVirus.onLoad = function onLoad () {
    loadHtml();
    game = new Game();
    score.initHighScore();
};

function loadHtml () {
    let link = document.querySelector('link[rel=import]');
    let content = link.import.querySelector('#root');
    document.body.appendChild(document.importNode(content, true));
}

window.TheVirus.init = function init() {
    score.init(game.score);
    let canvas = new Canvas();
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

