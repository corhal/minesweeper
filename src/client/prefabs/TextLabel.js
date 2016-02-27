'use strict';

import Entity from '../Entity';
import Transform from '../components/Transform';
import Appearance from '../components/Appearance';

export default function TextLabel(parentTransform, text) {
  const textLabel = new Entity();

  textLabel
    .addComponent(new Transform(
      parentTransform.position.x,
      parentTransform.position.y,
      0
      ))
    .addComponent(new Appearance(undefined, 0, text));

  return textLabel;
}
