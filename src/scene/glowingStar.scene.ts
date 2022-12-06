import { Mesh, SphereGeometry } from 'three';

/* -----------------------------------
 *
 * Geometry
 *
 * -------------------------------- */

const starGeometry = new SphereGeometry(10, 70, 70);

/* -----------------------------------
 *
 * Mesh
 *
 * -------------------------------- */

const glowingStar = new Mesh(starGeometry);

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function updateGlowingStar() {
  glowingStar.layers.enable(1); // bloom
  glowingStar.position.set(750, 50, -750);
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { glowingStar, updateGlowingStar };
