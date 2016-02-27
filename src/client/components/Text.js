'use strict';

/**
 * @typedef {Object} Point
 * @property {number} x
 * @property {number} y
 */

/**
 * Описывает текст.
 * @class Text
 */
export default class Text {
  /**
   * @memberof Text
   * @param {string} текст
   * @param {Object} стиль
   * @constructor
   */
  constructor(text, style) {
    this.text = new PIXI.Text(text);
    this.style = style; // рыба для rich text
  }
}
