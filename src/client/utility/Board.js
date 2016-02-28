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
    this.tileTiles = [];
    const sampleTile = new TilePrefab(0, 0);
    this.tileSize = sampleTile.getComponent(Tile).width;
    this.width = width;
    this.height = height;

    for (let i = 0; i < height; i++) {
      const xArray = [];

      for (let j = 0; j < width; j++) {
        const newTile = new TilePrefab(j, i);
        const newTileTile = newTile.getComponent(Tile);

        xArray.push(newTile);
        this.tileTiles.push(newTileTile);
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

  getTileNeighboursTiles(tile, immediate) {
    let resultArray = [];
    const returnArray = [];
    resultArray = this.getTileNeighbours(tile, immediate);
    for (let i = 0; i < resultArray.length; i++) {
      returnArray.push(resultArray[i].getComponent(Tile));
    }
    return returnArray;
  }

  getTileNeighbours(tile, immediate) { // Govnocode time
    const resultArray = [];
    const semiResultArray = [];

    if (tile.y < this.height - 1) {
      semiResultArray.push(this.tiles[tile.y + 1][tile.x]);
    }
    if (tile.y > 0) {
      semiResultArray.push(this.tiles[tile.y - 1][tile.x]);
    }
    if (tile.x < this.width - 1) {
      semiResultArray.push(this.tiles[tile.y][tile.x + 1]);
    }
    if (tile.x > 0) {
      semiResultArray.push(this.tiles[tile.y][tile.x - 1]);
    }

    if (!immediate) {
      if (tile.x < this.width - 1 && tile.y < this.height - 1) {
        semiResultArray.push(this.tiles[tile.y + 1][tile.x + 1]);
      }
      if (tile.x > 0 && tile.y > 0) {
        semiResultArray.push(this.tiles[tile.y - 1][tile.x - 1]);
      }
      if (tile.x > 0 && tile.y < this.height - 1) {
        semiResultArray.push(this.tiles[tile.y + 1][tile.x - 1]);
      }
      if (tile.x < this.width - 1 && tile.y > 0) {
        semiResultArray.push(this.tiles[tile.y - 1][tile.x + 1]);
      }
    }

    if (semiResultArray.length > 0) {
      for (let i = 0; i < semiResultArray.length; i++) {
        if (semiResultArray[i] !== undefined) {
          resultArray.push(semiResultArray[i]);
        }
      }
    }
    return resultArray;
  }
}
