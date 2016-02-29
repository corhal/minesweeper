'use strict';

import Entity from '../Entity';
import Appearance from '../components/Appearance';
import Transform from '../components/Transform';

export default function TileHighlighted(x, y) {
  const sprite = 'assets/tileHighlighted.png';
  const appearance = new Appearance(sprite, { x: 0.5, y: 0.5 });
  const transform = new Transform(x * appearance.width + appearance.width / 2, y * appearance.height + appearance.height / 2, 0);
  const tile = new Entity();

  tile
    .addComponent(appearance)
    .addComponent(transform);

  return tile;
}
