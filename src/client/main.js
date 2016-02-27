'use strict';

import Canvas from './constants/canvas';
import Transform from './components/Transform';
import Appearance from './components/Appearance';
import TextLabel from './prefabs/TextLabel';
import Board from './utility/Board';
import RenderSystem from './systems/RenderSystem';
import engine from './engine';

const assetsToLoad = ['assets/bunny.png', 'assets/carrot.png', 'assets/tileWalkable.png', 'assets/tileUnwalkable.png'];

const render = new RenderSystem(Canvas.Width, Canvas.Height, Canvas.BackgroundColor);
const loader = PIXI.loader;

loader.add(assetsToLoad);
loader.once('complete', onAssetsLoaded);
loader.load();

function onAssetsLoaded() {
  const board = new Board(12, 9);

  engine.init();
  engine.registerSystem(render);

  const boardMatrix = board.tiles;

  for (let i = 0; i < boardMatrix.length; i++) {
    const xArray = boardMatrix[i];

    for (let j = 0; j < xArray.length; j++) {
      engine.addEntity(xArray[j]);
      // console.log(xArray[j].getComponent(Transform));
      const textEntity = new TextLabel(xArray[j].getComponent(Transform), j);
      engine.addEntity(textEntity);
    }
  }
}
