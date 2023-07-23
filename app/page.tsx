import { AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import WorldMap from "./WorldMap/page";

export default function Home() {
  return (
    <main className="flex bg-[#FCFDF7] min-h-screen flex-col items-center p-24">
      <header className="w-full max-w-2xl py-8 text-3xl  text-center text-gray-900">
        <h1 className="text-6xl font-bold">BourdainGPT</h1>
        <p className="mt-2 text-lg text-gray-900">
          Explore the world&#39;s culinary traditions
        </p>
      </header>

      <WorldMap />

      <>
        <p className="italic">
          Note: Using the best open source equirectangular projection I could
          find, please note that several borders may not be accurate{" "}
        </p>
        <Link
          href="https://github.com/daanishkhazi/bourdain_gpt"
          target="_blank"
          rel="noreferrer"
        >
          <AiFillGithub className="text-4xl mt-4 hover:scale-110 transition ease-in-out delay-50" />
        </Link>
      </>
    </main>
  );
}
