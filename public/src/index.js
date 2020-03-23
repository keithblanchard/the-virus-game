import Canvas from './Canvas.js';
import Game from './Game.js';
import Point from './Point.js'

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

  window.DotGame.init = function init() {
    const startButton = document.getElementById('start-button');
    startButton.style.display = 'none';
    const sound = document.getElementById('sound');
    sound.play();
    canvas.init();
    const floor = document.getElementById('floor');
    floor.style.display = 'block';
    game.init(canvas);

  };

  window.DotGame.setSpeed = speed => {
    game.updateSpeed(speed.value);
  };

  window.DotGame.reset = function () {
    canvas = new Canvas();
    game = new Game({
      allowOverLap: false,
      speed: 10
    });
  };
})();