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
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import { spaceBox } from './scene/spaceBox.scene';
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

// TEST
let bloomComposer;
let bloomLayer;
let finalComposer;
let materials = {};
const darkMaterial = new MeshBasicMaterial({ color: 'black' });

function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

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

  glowingStar.layers.enable(1);

  scene.background = new Color('black');
  scene.add(spaceBox);
  scene.add(glowingStar);
  scene.add(sunLight);
  scene.add(spinningPlanet);

  renderer = new WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  // BLOOM
  // --------------------------------
  bloomLayer = new Layers();
  bloomLayer.set(1);

  const renderPass = new RenderPass(scene, camera);
  const bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );

  bloomPass.threshold = 0;
  bloomPass.strength = 5;
  bloomPass.radius = 0;

  bloomComposer = new EffectComposer(renderer);

  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderPass);
  bloomComposer.addPass(bloomPass);

  const shaderPass = new ShaderPass(
    new ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture },
      },
      vertexShader: `
      varying vec2 vUv;

      void main() {

          vUv = uv;

          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `
      uniform sampler2D baseTexture;
			uniform sampler2D bloomTexture;

			varying vec2 vUv;

			void main() {

				gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );

			}
      `,
      defines: {},
    }),
    'baseTexture'
  );

  shaderPass.needsSwap = true;

  finalComposer = new EffectComposer(renderer);

  finalComposer.addPass(renderPass);
  finalComposer.addPass(shaderPass);
  // --------------------------------
  // END

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

  // renderer.render(scene, camera);

  scene.traverse(darkenNonBloomed);
  bloomComposer.render();
  scene.traverse(restoreMaterial);
  finalComposer.render();

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
