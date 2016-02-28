'use strict';

import Entity from '../Entity';
import Appearance from '../components/Appearance';
import Transform from '../components/Transform';
import Tile from '../components/Tile';

export default function TilePrefab(x, y) {
  const coinToss = Math.random();
  const hasMine = coinToss <= 0.2;
  const sprite = 'assets/tileUnrevealed.png';
  const appearance = new Appearance(sprite, { x: 0.5, y: 0.5 });
  const transform = new Transform(x * appearance.width + appearance.width / 2, y * appearance.height + appearance.height / 2, 0);
  const tile = new Entity();

  tile
    .addComponent(appearance)
    .addComponent(transform)
    .addComponent(new Tile(x, y, appearance.width, appearance.height, hasMine));

  return tile;
}
