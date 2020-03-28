export default class {
  init() {
    const $canvas = document.getElementById('canvas');
    const $uiWrapper = document.getElementById('ui-wrapper');
    const $uiWrapperHeight = window.getComputedStyle($uiWrapper).height;

    const width = window.innerWidth;
    const canvasBorderOffset = 80;
    const height = window.innerHeight - parseFloat($uiWrapperHeight) - canvasBorderOffset;
    $canvas.setAttribute("width", width.toString());
    $canvas.setAttribute("height", height.toString());
    this.height = $canvas.height;
    this.width = $canvas.width;
    this.context = $canvas.getContext("2d");
  }

}