import React, { useEffect } from "react";
import { Game, Types } from "phaser";
import { defaultPhaserConfig } from "./config";

interface usePhaser {
  config?: Types.Core.GameConfig;
  ref: React.RefObject<HTMLElement>;
}

export function usePhaser({
  config: _config,
  ref,
}: usePhaser): Game | undefined {
  const config = _config || defaultPhaserConfig;
  let game: Game | undefined;
  useEffect(() => {
    if (!ref?.current) return;
    game = new Game({ ...config, parent: ref.current });
    return () => {
      game?.destroy(true);
    };
  }, [config, ref]);

  return game;
}
