'use strict';

import TilePrefab from '../prefabs/TilePrefab';
import Tile from '../components/Tile';

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
    this.tileSize = sampleTile.getComponent(Tile).width;

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

  getTileNeighbours(tile, immediate) {
    const resultArray = [];
    if (immediate) {
      if (this.tiles[tile.y + 1][tile.x] !== undefined) {
        resultArray.push(this.tiles[tile.y + 1][tile.x]);
      }
      if (this.tiles[tile.y + 1][tile.x] !== undefined) {
        resultArray.push(this.tiles[tile.y - 1][tile.x]);
      }
      if (this.tiles[tile.y + 1][tile.x] !== undefined) {
        resultArray.push(this.tiles[tile.y][tile.x + 1]);
      }
      if (this.tiles[tile.y + 1][tile.x] !== undefined) {
        resultArray.push(this.tiles[tile.y][tile.x - 1]);
      }
    }
    return resultArray;
  }
}
