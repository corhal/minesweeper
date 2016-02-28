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
        clickedTile.isRevealed = true;
        clickedTileObject.removeComponent(Appearance);
        clickedTileObject.addComponent(new Appearance('assets/TileRevealed.png', { x: 0.5, y: 0.5 }));
        const text = this.getTextByTileCoordinates(clickedTile);
        if (clickedTile.hasMine) {
          text.getComponent(Text).text.text = '***';
        } else {
          this.refreshText(clickedTile);
        }
      }
    });
  }

  refreshText(tile) {
    const textObject = this.getTextByTileCoordinates(tile).getComponent(Text);
    const textToRefresh = textObject.text;
    const tileNeighbours = this.board.getTileNeighbours(tile, false);
    let minesCount = 0;
    let hasUnrevealedNeighbours = false;
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
    if (!hasUnrevealedNeighbours) {
      textToRefresh.text = '';
    } else {
      textToRefresh.text = minesCount;
    }
  }

  getTextByTileCoordinates(tile) {
    return this.textMatrix[tile.y][tile.x];
  }
}

