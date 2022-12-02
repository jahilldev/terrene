import { Mesh, SphereGeometry, TextureLoader, MeshPhysicalMaterial, Color } from 'three';

/* -----------------------------------
 *
 * Assets
 *
 * -------------------------------- */

import plentBumpAsset from '../assets/planetBump.jpg';
import plentMapAsset from '../assets/planetMap.jpg';
import plentSpecAsset from '../assets/planetSpec.jpg';
import plentMaskAsset from '../assets/planetMask.png';

/* -----------------------------------
 *
 * Geometry
 *
 * -------------------------------- */

const planetGeometry = new SphereGeometry(10, 70, 70);

/* -----------------------------------
 *
 * Textures
 *
 * -------------------------------- */

const planetTextures = {
  bump: await new TextureLoader().loadAsync(plentBumpAsset),
  map: await new TextureLoader().loadAsync(plentMapAsset),
  spec: await new TextureLoader().loadAsync(plentSpecAsset),
  planeTrailMask: await new TextureLoader().loadAsync(plentMaskAsset),
};

console.log(plentMapAsset);

/* -----------------------------------
 *
 * Material
 *
 * -------------------------------- */

const planetMaterial = new MeshPhysicalMaterial({
  map: planetTextures.map,
  roughnessMap: planetTextures.spec,
  bumpMap: planetTextures.bump,
  bumpScale: 0.05,
  envMapIntensity: 0.4,
  sheen: 1,
  sheenRoughness: 0.75,
  sheenColor: new Color('#ff8a00').convertSRGBToLinear(),
  clearcoat: 0.5,
});

/* -----------------------------------
 *
 * Mesh
 *
 * -------------------------------- */

const spinningPlanet = new Mesh(planetGeometry, planetMaterial);

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function updateSpinningPlanet() {
  //   spinningPlanet.rotation.y += Math.PI * 1.25;
  spinningPlanet.receiveShadow = true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { spinningPlanet, updateSpinningPlanet };
