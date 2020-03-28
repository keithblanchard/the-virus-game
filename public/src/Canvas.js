export default class {
  init() {
    const $canvas = document.getElementById('canvas');
    const $uiWrapper = document.getElementById('ui-wrapper');
    const $uiWrapperHeight = window.getComputedStyle($uiWrapper).height;

    let computedWidth = window.innerWidth;
    if (computedWidth > 1024) {
      computedWidth = 1024;
    }
    const width = computedWidth;

    const canvasBorderOffset = 80;
    const height = window.innerHeight - parseFloat($uiWrapperHeight) - canvasBorderOffset;
    $canvas.setAttribute("width", width.toString());
    $canvas.setAttribute("height", height.toString());
    this.height = $canvas.height;
    this.width = $canvas.width;
    this.context = $canvas.getContext("2d");
    $canvas.style.borderBottom = `solid ${canvasBorderOffset}px red`;
  }

}