import { AnimationMixer } from "three";

export function setupModel(data) {
  const model = data.scene;
  const clip = data.animations[0];

  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();
  model.tick = (delta) => mixer.update(delta);

  return model;
}