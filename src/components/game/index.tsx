import { useRef } from "react";
import { usePhaser } from "src/lib/phaser/usePhaser";
import style from "./style.module.css";

export default function Game() {
  const ref = useRef<HTMLDivElement>(null);
  usePhaser({ ref });
  return <div ref={ref} className={style.container} />;
}
