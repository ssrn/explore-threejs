import { createCamera } from "../components/camera";
import { createRenderer } from "../systems/renderer";
import { createScene } from "../components/scene";
import { createControls } from "../systems/controls";
import { createLights } from "../components/lights";
import { loadBirds } from "../components/birds/birds";
import Loop from "../systems/Loop";
import Resizer from "../systems/Resizer";

let camera;
let controls;
let renderer;
let scene;
let loop;

export class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    const { parrot, flamingo, stork } = await loadBirds();

    parrot.scale.set(0.02, 0.02, 0.02);
    flamingo.scale.set(0.02, 0.02, 0.02);
    stork.scale.set(0.02, 0.02, 0.02);

    // move the target to the center of the front bird
    controls.target.copy(parrot.position);

    loop.updatables.push(parrot, flamingo, stork);
    scene.add(parrot, flamingo, stork);
  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}