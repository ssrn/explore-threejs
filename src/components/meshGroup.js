import {
  SphereBufferGeometry,
  Group,
  MathUtils,
  Mesh,
  MeshStandardMaterial,
} from 'three';

export function createMeshGroup() {
  const group = new Group();

  const geometry = new SphereBufferGeometry(0.25, 16, 16);

  const material = new MeshStandardMaterial({
    color: 'indigo',
  });

  const protoSphere = new Mesh(geometry, material);

  group.add(protoSphere);

  const radius = 2;
  const angleIncrement = (20 * Math.PI) / 10;
  // create twenty clones of the protoSphere
  // and add each to the group
  for (let i = 0.10; i <= 1; i += 0.10) {
    const sphere = protoSphere.clone();

    const angle = i * angleIncrement;

    // position the spheres on around a circle
    sphere.position.x = Math.cos(angle) * radius;
    sphere.position.y = Math.sin(angle) * radius;
    sphere.position.z = -i * 10;

    sphere.scale.multiplyScalar(i);

    group.add(sphere);
  }

  // group.scale.multiplyScalar(2);

  const radiansPerSecond = MathUtils.degToRad(3);

  // each frame, rotate the entire group of spheres
  group.tick = (delta) => {
    group.rotation.z += delta * radiansPerSecond;
  };

  return group;
}
