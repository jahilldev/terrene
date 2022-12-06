import { Layers, MeshBasicMaterial, ShaderMaterial, Vector2, WebGLRenderer } from 'three';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

/* -----------------------------------
 *
 * Variables
 *
 * -------------------------------- */

let renderer: WebGLRenderer;
let bloomLayer = new Layers();
let bloomPass: UnrealBloomPass;
let bloomComposer: EffectComposer;
let finalComposer: EffectComposer;
const materials: Record<string, any> = {};
const darkMaterial = new MeshBasicMaterial({ color: 'black' });

/* -----------------------------------
 *
 * Vertex
 *
 * -------------------------------- */

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;

/* -----------------------------------
 *
 * Fragment
 *
 * -------------------------------- */

const fragmentShader = `
  uniform sampler2D baseTexture;
  uniform sampler2D bloomTexture;

  varying vec2 vUv;

  void main() {
    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
  }
`;

/* -----------------------------------
 *
 * Setup
 *
 * -------------------------------- */

function setupRenderer({ canvas, scene, camera }): WebGLRenderer {
  renderer = new WebGLRenderer({ canvas });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  bloomLayer.set(1);

  const renderPass = new RenderPass(scene, camera);

  bloomPass = new UnrealBloomPass(
    new Vector2(window.innerWidth, window.innerHeight),
    1.5,
    0.4,
    0.85
  );

  bloomPass.threshold = 0;
  bloomPass.strength = 5;
  bloomPass.radius = 0.8;

  bloomComposer = new EffectComposer(renderer);

  bloomComposer.renderToScreen = false;
  bloomComposer.addPass(renderPass);
  bloomComposer.addPass(bloomPass);

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture },
    },
    vertexShader,
    fragmentShader,
    defines: {},
  });

  const shaderPass = new ShaderPass(shaderMaterial, 'baseTexture');

  shaderPass.needsSwap = true;

  finalComposer = new EffectComposer(renderer);

  finalComposer.addPass(renderPass);
  finalComposer.addPass(shaderPass);

  return renderer;
}

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function updateRenderer({ scene }) {
  scene.traverse(darkenMaterial);

  bloomComposer.render();

  scene.traverse(restoreMaterial);

  finalComposer.render();
}

/* -----------------------------------
 *
 * Resize
 *
 * -------------------------------- */

function resizeRenderer() {
  // bloomComposer.setPixelRatio(window.devicePixelRatio);
  // finalComposer.setPixelRatio(window.devicePixelRatio);

  bloomPass.setSize(window.innerWidth, window.innerHeight);
  renderer.setSize(window.innerWidth, window.innerHeight);
}

/* -----------------------------------
 *
 * Darken
 *
 * -------------------------------- */

function darkenMaterial(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material;
    obj.material = darkMaterial;
  }
}

/* -----------------------------------
 *
 * Restore
 *
 * -------------------------------- */

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid];
    delete materials[obj.uuid];
  }
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { setupRenderer, updateRenderer, resizeRenderer };
