'use strict';

export default class Tile {
  constructor(x, y, hasMine) {
    this.position = {
      x: x,
      y: y
    };
    this.hasMine = hasMine;
    this.revealed = false;
  }
}
