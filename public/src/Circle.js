import Point from "./Point.js";
export default class Circle {
  static intersects(c1, c2) {
    let distance = Point.distance(c1.center, c2.center);
    let radiusSum = c1.radius + c2.radius;
    return distance <= radiusSum;
  }

  constructor(maxX) {
    this.radius = this.getRandomCircleRadius();
    let x = Math.random() * maxX;
    const padding = 10; // Don't touch the side walls.

    if (x < this.radius) {
      x = this.radius + padding;
    }

    const realMax = maxX - this.radius;

    if (x > realMax) {
      x = realMax - padding;
    }

    this.center = new Point(x, 10);
  }

  /*
   * Returns a circle radius with a
   * max diameter = 100 or
   * min diameter = 10
   */
  getRandomCircleRadius() {
    return Math.floor(Math.random() * (100 - 50)) + 50;
  }

  contains(point) {
    return Point.distance(point, this.center) <= this.radius;
  }

}