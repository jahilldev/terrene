import { Mesh, IcosahedronGeometry, MeshBasicMaterial } from 'three';

/* -----------------------------------
 *
 * Geometry
 *
 * -------------------------------- */

const hedronGeometry = new IcosahedronGeometry(2, 1);

/* -----------------------------------
 *
 * Material
 *
 * -------------------------------- */

const hedronMaterial = new MeshBasicMaterial({ color: 0x00ff00, wireframe: true });

/* -----------------------------------
 *
 * Mesh
 *
 * -------------------------------- */

const spinningHedron = new Mesh(hedronGeometry, hedronMaterial);

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function updateSpinningHedron() {
  spinningHedron.rotation.y += 0.008;
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { spinningHedron, updateSpinningHedron };
