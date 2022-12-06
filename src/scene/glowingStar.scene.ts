import { Mesh, MeshBasicMaterial, SphereGeometry } from 'three';

/* -----------------------------------
 *
 * Geometry
 *
 * -------------------------------- */

const starGeometry = new SphereGeometry(10, 70, 70);

/* -----------------------------------
 *
 * Material
 *
 * -------------------------------- */

const starMaterial = new MeshBasicMaterial({
  color: 0xffffff,
});

/* -----------------------------------
 *
 * Mesh
 *
 * -------------------------------- */

const glowingStar = new Mesh(starGeometry, starMaterial);

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
