import { BackSide, BoxGeometry, Mesh, MeshBasicMaterial, TextureLoader } from 'three';

/* -----------------------------------
 *
 * Assets
 *
 * -------------------------------- */

import spaceBoxFront from '@/assets/spaceBox/front.png';
import spaceBoxBack from '@/assets/spaceBox/back.png';
import spaceBoxLeft from '@/assets/spaceBox/left.png';
import spaceBoxRight from '@/assets/spaceBox/right.png';
import spaceBoxTop from '@/assets/spaceBox/top.png';
import spaceBoxBottom from '@/assets/spaceBox/bottom.png';

/* -----------------------------------
 *
 * Geometry
 *
 * -------------------------------- */

const spaceGeometry = new BoxGeometry(2e3, 2e3, 2e3);

/* -----------------------------------
 *
 * Files
 *
 * -------------------------------- */

const textureFiles = [
  spaceBoxFront,
  spaceBoxBack,
  spaceBoxTop,
  spaceBoxBottom,
  spaceBoxLeft,
  spaceBoxRight,
];

/* -----------------------------------
 *
 * Textures
 *
 * -------------------------------- */

const spaceTextures = await Promise.all(
  textureFiles.map((file) => new TextureLoader().loadAsync(file))
);

/* -----------------------------------
 *
 * Material
 *
 * -------------------------------- */

const spaceMaterial = spaceTextures.map(
  (texture) => new MeshBasicMaterial({ map: texture, side: BackSide })
);

/* -----------------------------------
 *
 * Mesh
 *
 * -------------------------------- */

const spaceBox = new Mesh(spaceGeometry, spaceMaterial);

/* -----------------------------------
 *
 * Update
 *
 * -------------------------------- */

function updateSpaceBox() {
  // no-op
}

/* -----------------------------------
 *
 * Export
 *
 * -------------------------------- */

export { spaceBox, updateSpaceBox };
