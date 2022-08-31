import React, { useEffect, useRef } from "react";
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
  const game = useRef<Game | undefined>();
  useEffect(() => {
    if (!ref?.current) return;
    game.current = new Game({ ...config, parent: ref.current });
    return () => {
      game.current?.destroy(true);
    };
  }, [config, ref]);

  return game.current;
}
