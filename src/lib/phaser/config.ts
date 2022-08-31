import { MainScene } from "./scenes/main";
import { Types } from "phaser";

export const defaultPhaserConfig: Types.Core.GameConfig = {
  width: "100%",
  height: "100%",
  type: Phaser.AUTO,

  scene: MainScene,
  scale: {
    mode: Phaser.Scale.WIDTH_CONTROLS_HEIGHT,
  },
};
