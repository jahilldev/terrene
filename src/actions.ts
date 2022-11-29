import { Color, PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { spinningHedron } from '@/scene/spinningHedron.scene';
import { fluidTerrain } from '@/scene/fluidTerrain.scene';
import { onResize } from '@/utility/canvasHelper.utility';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

const scene = new Scene();
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
  const [nearPlane, farPlane] = [0.1, 100];

  camera = new PerspectiveCamera(fieldOfView, aspectRatio, nearPlane, farPlane);
  camera.position.set(0, 0, 10);

  controls = new OrbitControls(camera, canvas);

  scene.background = new Color('black');
  scene.add(spinningHedron);
  scene.add(fluidTerrain);

  renderer = new WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

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
  if (isPaused) {
    return;
  }

  requestAnimationFrame(animate);

  spinningHedron.rotation.x += 0.008;
  spinningHedron.rotation.y += 0.008;

  renderer.render(scene, camera);
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
