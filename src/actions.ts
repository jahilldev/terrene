import { Clock, Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { spaceBox } from './scene/spaceBox.scene';
import { setupRenderer, updateRenderer, resizeRenderer } from './scene/renderer.scene';
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

  setupRenderer({ canvas, scene, camera });

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

  updateRenderer({ scene });

  if (isPaused) {
    return;
  }

  updateGlowingStar();
  updateSpinningPlanet({ delta });

  requestAnimationFrame(animate);
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

  resizeRenderer();
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { setup, start, stop, resize };
