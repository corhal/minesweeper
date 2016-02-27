'use strict';

import TilePrefab from '../prefabs/TilePrefab';

/**
 * @TODO: Этот класс создает объект доски и хранит его
 * @class Board
 */
export default class BoardSystem {
  /**
   * @param {number} width  ширина поля
   * @param {number} height высота поля
   * @constructor
   */
  constructor(width, height) {
    this.tiles = [];
    const sampleTile = new TilePrefab(0, 0);
    this.tileSize = sampleTile.width;

    for (let i = 0; i < height; i++) {
      const xArray = [];

      for (let j = 0; j < width; j++) {
        const newTile = new TilePrefab(j, i);

        xArray.push(newTile);
      }

      this.tiles.push(xArray);
    }
  }

  /**
   * @method
   * @param {number} x
   * @param {number} y
   * @return {TilePrefab}
   */
  getTileByAbsCoordinates(x, y) {
    const xFloored = Math.floor(x / this.tileSize);
    const yFloored = Math.floor(y / this.tileSize);

    const result = this.tiles[yFloored][xFloored];

    return result;
  }
}
