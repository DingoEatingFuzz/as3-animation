export default class Rect {
  constructor(x, y, x2, y2) {
    this.x = x;
    this.y = y;
    this.x2 = x2;
    this.y2 = y2;
  }

  get height() {
    return this.y2 - this.y;
  }

  get width() {
    return this.x2 - this.x;
  }
}
