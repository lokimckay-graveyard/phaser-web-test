import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Phaser Web Test</title>
      </Head>

      <main>
        Site that houses the game
        <Link href="/game">Go to the game</Link>
      </main>
    </div>
  );
};

export default Home;
