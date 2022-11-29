import { Mesh, PlaneBufferGeometry, MeshBasicMaterial } from 'three';

/* -----------------------------------
 *
 * Geometry
 *
 * -------------------------------- */

var terrainGeometry = new PlaneBufferGeometry(10, 10, 10, 10);

/* -----------------------------------
 *
 * Material
 *
 * -------------------------------- */

const terrainMaterial = new MeshBasicMaterial({ color: 0xff0000, wireframe: true });

/* -----------------------------------
 *
 * Mesh
 *
 * -------------------------------- */

const fluidTerrain = new Mesh(terrainGeometry, terrainMaterial);

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { fluidTerrain };
