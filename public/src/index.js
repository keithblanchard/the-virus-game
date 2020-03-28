import Canvas from './Canvas.js';
import Game from './Game.js';
import Point from './Point.js'
import select from './form/select.js';

(function () {
  window.DotGame = window.DotGame || {};
  let canvas = new Canvas();
  let game = new Game({
    allowOverLap: false,
    speed: 10
  });

  window.DotGame.handleClick = function handleCanvasClick() {
    if (!game.gameOver) {
      const point = new Point(event.offsetX, event.offsetY);
      game.makeMove(point);
    }
  };

  window.DotGame.onLoad = function onLoad () {

  };

  window.DotGame.init = function init() {
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    const sound = document.getElementById('sound');
    sound.play();
    canvas.init();
    game.init(canvas);

  };

  window.DotGame.setSpeed = speed => {
    game.updateSpeed(speed.value);
  };

})();