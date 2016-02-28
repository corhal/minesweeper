'use strict';

import Tile from '../components/Tile';
import Appearance from '../components/Appearance';

/**
 * @class Game
 */
export default class Game {
  constructor(board) {
    this.board = board;

    window.addEventListener('click', (event) => {
      const clickedTileObject = this.board.getTileByAbsCoordinates(event.clientX, event.clientY);
      const clickedTile = clickedTileObject.getComponent(Tile);
      if (!clickedTile.isRevealed) {
        clickedTile.isRevealed = true;
        clickedTileObject.removeComponent(Appearance);
        clickedTileObject.addComponent(new Appearance('assets/TileRevealed.png', { x: 0.5, y: 0.5 }));
        console.log(clickedTileObject);
      }
    });
  }
}

