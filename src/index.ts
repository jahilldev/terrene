import { h, render } from 'preact';
import { createCanvas } from '@/utility/canvasHelper.utility';
import { Overlay } from '@/overlay';
import * as sceneActions from './actions';
import '@/styles/global.scss';

// https://vimeo.com/125095515
console.log('💫 Do it, just do it');

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const rootElement = document.querySelector(OVERLAY);
const canvasElement = createCanvas();

/* -----------------------------------
 *
 * Actions
 *
 * -------------------------------- */

sceneActions.setup(canvasElement);
sceneActions.start();

/* -----------------------------------
 *
 * Application
 *
 * -------------------------------- */

document.body.prepend(canvasElement);
render(h(Overlay, { sceneActions, canvasElement }), rootElement!);
