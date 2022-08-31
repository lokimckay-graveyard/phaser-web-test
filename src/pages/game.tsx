import dynamic from "next/dynamic";

const GameNoSSR = dynamic(() => import("src/components/game"), {
  ssr: false,
});

const GamePage = () => {
  return <GameNoSSR />;
};

export default GamePage;
