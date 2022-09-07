import { MainScene } from "./scenes/main";
import { Types } from "phaser";

export const defaultPhaserConfig: Types.Core.GameConfig = {
  type: Phaser.AUTO,
  scene: MainScene,
  scale: {
    mode: Phaser.Scale.NONE,
    width: 640,
    height: 960,
  },
};
