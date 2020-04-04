import Canvas from './Canvas.js';
import Game from './Game.js';
import Point from './Point.js'
import score from './score.js';
let game;

window.TheVirus = window.TheVirus || {};

let mute = true;
window.TheVirus.toggleAudio = function (button) {
    if (mute) {
        game.pauseAudio();
        button.innerHTML = 'Play Music';
    } else {
        game.playAudio();
        button.innerHTML = 'Pause Music';
    }
    mute = !mute;
};

async function includeHTML() {
    const response = await fetch('./templates/root.html');
    const html = await response.text();
    document.body.insertAdjacentHTML('afterbegin', html);
}

window.TheVirus.handleClick = function handleCanvasClick() {
    if (!game.gameOver) {
        const point = new Point(event.offsetX, event.offsetY);
        game.makeMove(point);
    }
};

window.TheVirus.onLoad = async function onLoad () {
    await includeHTML();
    game = new Game();
    score.initHighScore();
};

window.TheVirus.init = function init() {
    document.getElementById('sound-toggle-button').style.visibility = 'visible';
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

