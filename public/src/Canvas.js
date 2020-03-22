export default class {
  init() {
    const $canvas = document.querySelector(".dot-game-canvas");
    const $controls = document.querySelector(".dot-game-controls");
    const userAgentMarginOffset = 24;
    const width = window.innerWidth - userAgentMarginOffset;
    const height = window.innerHeight - userAgentMarginOffset - window.innerHeight * .2;
    $canvas.setAttribute("width", width.toString());
    $canvas.setAttribute("height", height.toString());
    this.height = $canvas.height;
    this.width = $canvas.width;
    this.context = $canvas.getContext("2d");
  }

}