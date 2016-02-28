'use strict';

import Appearance from '../components/Appearance';
import Text from '../components/Text';
import Transform from '../components/Transform';

export default class RenderSystem {
  constructor(width, height, backgroundColor) {
    this.renderer = PIXI.autoDetectRenderer(
      width,
      height,
      { backgroundColor: backgroundColor }
      );
    document.body.appendChild(this.renderer.view);

    this.stage = new PIXI.Container();
    this.objects = {};

    this.spriteContainer = new PIXI.Container();
    this.textContainer = new PIXI.Container();

    this.spriteContainer.zIndex = 105;
    this.textContainer.zIndex = 10;

    /* adding children, no matter in which order */
    this.stage.addChild(this.spriteContainer);
    this.stage.addChild(this.textContainer);

    this.updateLayersOrder();

    this.animate();
  }

  /* call this function whenever you added a new layer/container */
  updateLayersOrder() {
    this.stage.children.sort(function sort(a, b) {
      a.zIndex = a.zIndex || 0;
      b.zIndex = b.zIndex || 0;
      return b.zIndex - a.zIndex;
    });
  }

  animate() {
    requestAnimationFrame(this.animate.bind(this));
    this.renderer.render(this.stage);
  }

  removeEntitiesByIds(ids) {
    ids.forEach((id) => {
      this.stage.removeChild(this.objects[id]);
      delete this.objects[id];
    });
  }

  addEntity(entity) {
    const appearance = entity.getComponent(Appearance);
    if (appearance !== undefined) {
      const object = appearance.object;

      this.objects[entity.id] = object;

      this.spriteContainer.addChild(object);
    }

    const text = entity.getComponent(Text);
    if (text !== undefined) {
      const object = text.text;

      this.objects[entity.id] = object;

      this.textContainer.addChild(object);
    }
  }

  updateEntity(entity) {
    const transform = entity.getComponent(Transform);
    const appearance = entity.getComponent(Appearance);
    const object = this.objects[entity.id];

    if (appearance !== undefined && object !== appearance.object) {
      console.log('Should change appearance');
      this.removeEntitiesByIds([entity.id]);
      this.addEntity(entity);
    }

    object.position.x = transform.position.x;
    object.position.y = transform.position.y;
    object.rotation = transform.angle * Math.PI / 180;
  }

  /**
   * @TODO:
   * Read it!
   * Array.prototype.filter | more or less
   * Array.prototype.some | eh
   * Array.prototype.map | what
   * Array.prototype.reduce | what
   * Array.prototype.forEach + context (2nd argument) | yeah
   * Function.prototype.bind | what
   * Object.keys | eh
   */
  update(entities) {
    const renderEntities = entities.filter((el) => {
      return el.hasComponent(Appearance) || el.hasComponent(Text);
    });
    const oldIds = Object.keys(this.objects).map((id) => {
      return parseInt(id, 10);
    });
    const removeIds = oldIds.filter((id) => {
      return !renderEntities.some((el) => {
        return el.id === id;
      });
    });
    const addEntities = renderEntities.filter((el) => {
      return oldIds.indexOf(el.id) === -1;
    });

    addEntities.forEach(this.addEntity, this);

    this.removeEntitiesByIds(removeIds);

    renderEntities.forEach(this.updateEntity, this);
  }
}
