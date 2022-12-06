import {
  Clock,
  Color,
  Layers,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { spaceBox } from './scene/spaceBox.scene';
import { setupBloomEffect, updateBloomEffect } from './scene/bloomEffect.scene';
import { glowingStar, updateGlowingStar } from './scene/glowingStar.scene';
import { sunLight } from './scene/sunLight.scene';
import { spinningPlanet, updateSpinningPlanet } from '@/scene/spinningPlanet.scene';
import { onResize } from '@/utility/canvasHelper.utility';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const scene = new Scene();
const clock = new Clock();
let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let controls: OrbitControls;
let isPaused = false;

/* -----------------------------------
 *
 * Setup
 *
 * -------------------------------- */

function setup(canvas: HTMLCanvasElement) {
  const fieldOfView = 35;
  const aspectRatio = window.innerWidth / window.innerHeight;
  const [nearPlane, farPlane] = [0.1, 3e3];

  camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  camera.position.set(-95, 0, 20);

  controls = new OrbitControls(camera, canvas);
  controls.minDistance = 25;
  controls.maxDistance = 750;

  scene.background = new Color('black');
  scene.add(spaceBox);
  scene.add(glowingStar);
  scene.add(sunLight);
  scene.add(spinningPlanet);

  renderer = new WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  setupBloomEffect({ scene, camera, renderer });

  window.addEventListener('resize', () => onResize(resize), false);
}

/* -----------------------------------
 *
 * Start
 *
 * -------------------------------- */

function start() {
  isPaused = false;

  animate();
}

/* -----------------------------------
 *
 * Start
 *
 * -------------------------------- */

function stop() {
  isPaused = true;
}

/* -----------------------------------
 *
 * Animate
 *
 * -------------------------------- */

function animate() {
  const delta = clock.getDelta();

  updateBloomEffect({ scene });

  if (isPaused) {
    return;
  }

  requestAnimationFrame(animate);
  updateGlowingStar();
  updateSpinningPlanet({ delta });
}

/* -----------------------------------
 *
 * Resize
 *
 * -------------------------------- */

function resize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  controls.update();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { setup, start, stop, resize };
