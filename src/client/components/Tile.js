'use strict';

export default class Tile {
  constructor(x, y, width, height, hasMine) {
    this.position = {
      x: x,
      y: y
    };
    this.hasMine = hasMine;
    this.revealed = false;
    this.width = width;
    this.height = height;
  }
}
