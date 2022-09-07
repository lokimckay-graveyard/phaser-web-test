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

  function onResize() {
    // if (!game?.current) return;
    // const canvas = game.current.canvas;
    // const container = canvas.parentElement;
    // if (!canvas || !container) return;
    // const width = window.innerWidth;
    // const height = window.innerHeight;
    // canvas.style.width = width + "px";
    // canvas.style.width = width + "px";
    // container.style.width = width + "px";
    // container.style.height = height + "px";
    // game.current.scale.resize(width, height);
  }

  // Create new game whenever config or ref changes
  useEffect(() => {
    if (!ref?.current) return;
    game.current = new Game({ ...config, parent: ref.current });
    return () => {
      game.current?.destroy(true);
    };
  }, [config, ref]);

  // Attach resize listeners whenever game ref changes
  useEffect(() => {
    if (!game.current) return;
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [game?.current]);

  return game.current;
}
