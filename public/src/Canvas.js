export default class {
  init() {
    const $canvas = document.getElementById('canvas');
    const $uiWrapper = document.getElementById('canvas');
    let innerWidth = window.innerWidth;
    if (innerWidth > 1021) {
      innerWidth = 1024;
    }
    const width = innerWidth;
    const height = window.innerHeight - $uiWrapper.height;
    $canvas.setAttribute("width", width.toString());
    $canvas.setAttribute("height", height.toString());
    this.height = $canvas.height;
    this.width = $canvas.width;
    this.context = $canvas.getContext("2d");
  }

}