import { Color, DirectionalLight, SphereGeometry } from 'three';

/* -----------------------------------
 *
 * Light
 *
 * -------------------------------- */

const sunLight = new DirectionalLight(new Color('#ffffff').convertSRGBToLinear(), 3.5);

/* -----------------------------------
 *
 * Properties
 *
 * -------------------------------- */

sunLight.position.set(750, 50, -750);
sunLight.castShadow = true;
sunLight.shadow.mapSize.width = 512;
sunLight.shadow.mapSize.height = 512;
sunLight.shadow.camera.near = 0.5;
sunLight.shadow.camera.far = 100;
sunLight.shadow.camera.left = -10;
sunLight.shadow.camera.bottom = -10;
sunLight.shadow.camera.top = 10;
sunLight.shadow.camera.right = 10;

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function updateSunLight() {
  //
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { sunLight, updateSunLight };
