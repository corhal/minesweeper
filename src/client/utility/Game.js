'use strict';

import Tile from '../components/Tile';
import Appearance from '../components/Appearance';

/**
 * @class Game
 */
export default class Game {
  constructor(board, textMatrix) {
    this.board = board;
    this.textMatrix = textMatrix;

    window.addEventListener('click', (event) => {
      const clickedTileObject = this.board.getTileByAbsCoordinates(event.clientX, event.clientY);
      const clickedTile = clickedTileObject.getComponent(Tile);
      if (!clickedTile.isRevealed) {
        this.revealTile(clickedTileObject);
      }
    });
  }

  revealTile(tileObject) {
    const tile = tileObject.getComponent(Tile);
    if (!tile.isRevealed) {
      tile.isRevealed = true;
      tileObject.removeComponent(Appearance);
      tileObject.addComponent(new Appearance('assets/TileRevealed.png', { x: 0.5, y: 0.5 }));
      const tileNeighbours = this.board.getTileNeighboursTiles(tile, false);
      this.refreshText(tile);
      tileNeighbours.forEach(this.refreshText, this);
    }
  }

  refreshText(tile) { // Здесь водятся чудовища
    const textObject = this.getTextByTileCoordinates(tile).getComponent(Text);
    const textToRefresh = textObject.text;
    const tileNeighbours = this.board.getTileNeighbours(tile, false);
    let minesCount = 0;
    let hasUnrevealedNeighbours = false;
    if (!tile.isRevealed) {
      if (tile.hasMine) {
        textToRefresh.text = '*';
      } else {
        textToRefresh.text = '';
      }
    } else {
      if (tileNeighbours.length > 0) {
        for (let i = 0; i < tileNeighbours.length; i++) {
          if (!tileNeighbours[i].getComponent(Tile).isRevealed) {
            hasUnrevealedNeighbours = true;
          }
          if (tileNeighbours[i].getComponent(Tile).hasMine) {
            minesCount++;
          }
        }
      }
      if (tile.hasMine) {
        textToRefresh.text = '*';
      } else if (!hasUnrevealedNeighbours) {
        textToRefresh.text = '';
      } else {
        textToRefresh.text = minesCount;
      }

      if (minesCount === 0) {
        tileNeighbours.forEach(this.revealTile, this);
      }
    }
  }

  getTextByTileCoordinates(tile) {
    return this.textMatrix[tile.y][tile.x];
  }
}

