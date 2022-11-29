/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

let canvasElement: HTMLCanvasElement;

/* -----------------------------------
 *
 * onResize
 *
 * -------------------------------- */

function onResize(callback?: Function) {
  if (!canvasElement) {
    console.error('onResize: canvasElement is not defined, call createCanvas first');

    return;
  }

  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;

  callback && callback(canvasElement);
}

/* -----------------------------------
 *
 * Canvas
 *
 * -------------------------------- */

function createCanvas(elementId = CANVAS) {
  canvasElement = document.createElement('canvas');

  canvasElement.id = elementId;
  canvasElement.width = window.innerWidth;
  canvasElement.height = window.innerHeight;
  canvasElement.style.width = '100%';
  canvasElement.style.height = '100%';

  return canvasElement;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { createCanvas, onResize };
