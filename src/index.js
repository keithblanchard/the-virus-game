import Canvas from './Canvas.js';
import Game from './Game.js';
import Point from './Point.js'

(function () {
  window.DotGame = window.DotGame || {};
  let canvas = new Canvas();
  const game = new Game({
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
    canvas.init();
    game.init(canvas);
  };

  window.DotGame.setSpeed = speed => {
    game.updateSpeed(speed.value);
  };
})();