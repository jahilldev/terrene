import { Mesh, SphereGeometry, TextureLoader, MeshPhysicalMaterial, Color } from 'three';

/* -----------------------------------
 *
 * Assets
 *
 * -------------------------------- */

import planetBumpAsset from '@/assets/planetBump.jpg';
import planetMapAsset from '@/assets/planetMap.jpg';
import planetSpecAsset from '@/assets/planetSpec.jpg';
import planetMaskAsset from '@/assets/planetMask.png';

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
  bump: await new TextureLoader().loadAsync(planetBumpAsset),
  map: await new TextureLoader().loadAsync(planetMapAsset),
  spec: await new TextureLoader().loadAsync(planetSpecAsset),
  planeTrailMask: await new TextureLoader().loadAsync(planetMaskAsset),
};

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

function updateSpinningPlanet({ delta }) {
  spinningPlanet.rotation.y += delta * 0.05;
  spinningPlanet.receiveShadow = true;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { spinningPlanet, updateSpinningPlanet };
