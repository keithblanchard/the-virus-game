export default class Point {
	static distance(p1, p2) {
		const dx = p1.x - p2.x;
		const dy = p1.y - p2.y;
		return Math.hypot(dx, dy);
	}

	constructor(x, y) {
		this.x = parseFloat(x);
		this.y = parseFloat(y);
	}

}