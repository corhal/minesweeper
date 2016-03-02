'use strict';

import Tile from '../components/Tile';
import Appearance from '../components/Appearance';
import Canvas from '../constants/canvas';

/**
 * @class Game
 */
export default class Game {
  constructor(board, textMatrix) {
    this.board = board;
    this.textMatrix = textMatrix;
    this.isInMarkMode = false;
    this.highlightTileSource;

    window.addEventListener('click', (event) => {
      if (event.clientX < Canvas.Width && event.clientY < Canvas.Height) {
        const clickedTileObject = this.board.getTileByAbsCoordinates(event.clientX, event.clientY);
        const clickedTile = clickedTileObject.getComponent(Tile);
        if (this.isInMarkMode) {
          this.markTile(clickedTileObject);
        } else if (!clickedTile.isRevealed) {
          this.revealTile(clickedTileObject);
        }
      }
    });

    window.addEventListener('mousedown', (event) => {
      if (event.clientX < Canvas.Width && event.clientY < Canvas.Height) {
        this.highlightTileSource = this.board.getTileByAbsCoordinates(event.clientX, event.clientY);
        const clickedTile = this.highlightTileSource.getComponent(Tile);
        if (clickedTile.isRevealed) {
          this.highlightNeighbours(this.highlightTileSource);
        }
      }
    });

    window.addEventListener('mouseup', () => {
      if (event.clientX < Canvas.Width && event.clientY < Canvas.Height) {
        if (this.highlightTileSource !== undefined) {
          const clickedTile = this.highlightTileSource.getComponent(Tile);
          if (clickedTile.isRevealed) {
            this.stopHighlightNeighbours(this.highlightTileSource);
          }
        }
      }
    });

    /* window.addEventListener('keypress', (event) => {
      if (event.keyCode === 49) {
        this.isInMarkMode = !this.isInMarkMode;
      }
    });*/

    window.addEventListener('keydown', (event) => {
      if (event.keyCode === 17) {
        this.isInMarkMode = true;
      }
    });

    window.addEventListener('keyup', (event) => {
      if (event.keyCode === 17) {
        this.isInMarkMode = false;
      }
    });
  }

  markTile(tileObject) {
    const tile = tileObject.getComponent(Tile);
    const textObject = this.getTextByTileCoordinates(tile).getComponent(Text);
    const textToMark = textObject.text;
    if (!tile.isMarked && !tile.isRevealed) {
      textToMark.text = '*';
      tile.isMarked = true;
    } else if (tile.isMarked && !tile.isRevealed) {
      textToMark.text = '';
      tile.isMarked = false;
    }
  }

  highlightNeighbours(tileObject) {
    const tile = tileObject.getComponent(Tile);
    const tileNeighbours = this.board.getTileNeighbours(tile, false);
    for (const tileNeighbour of tileNeighbours) {
      const neighbourTile = tileNeighbour.getComponent(Tile);
      if (!neighbourTile.isRevealed && !neighbourTile.isMarked) {
        tileNeighbour.removeComponent(Appearance);
      }
    }
  }

  stopHighlightNeighbours(tileObject) {
    const tile = tileObject.getComponent(Tile);
    const textObject = this.getTextByTileCoordinates(tile).getComponent(Text);
    const markText = textObject.text;
    const tileNeighbours = this.board.getTileNeighbours(tile, false);
    let markedTiles = 0;
    for (const tileNeighbour of tileNeighbours) {
      const neighbourTile = tileNeighbour.getComponent(Tile);
      if (neighbourTile.isMarked) {
        markedTiles++;
      }
      if (!neighbourTile.isRevealed && !neighbourTile.isMarked) {
        tileNeighbour.addComponent(new Appearance('assets/tileUnrevealed.png', { x: 0.5, y: 0.5 }));
      }
    }
    console.log(markedTiles + ' ' + markText.text + ' ' + parseInt(markText.text, 10));
    if (markedTiles === parseInt(markText.text, 10)) {
      for (const tileNeighbour of tileNeighbours) {
        const neighbourTile = tileNeighbour.getComponent(Tile);
        if (!neighbourTile.isRevealed && !neighbourTile.isMarked) {
          this.revealTile(tileNeighbour);
        }
      }
    }
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
      /* if (tile.hasMine) {
        textToRefresh.text = '';
      } else {
        textToRefresh.text = '';
      }*/
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

