import { MeshStandardMaterial } from "three";

export function createMaterials() {
  const body = new MeshStandardMaterial({
    color: '#cbf078',
    flatShading: true,
  });

  const detail = new MeshStandardMaterial({
    color: '#702283',
    flatShading: true,
  });

  return { body, detail };
}