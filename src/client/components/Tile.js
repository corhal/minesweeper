'use strict';

export default class Tile {
  constructor(x, y, width, height, hasMine) {

    this.x = x;
    this.y = y;

    this.hasMine = hasMine;
    this.isRevealed = false;
    this.isMarked = false;
    this.width = width;
    this.height = height;
  }
}
