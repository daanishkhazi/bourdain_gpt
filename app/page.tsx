import { AiFillGithub } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import WorldMap from "./WorldMap/page";

export default function Home() {
  return (
    <main className="flex bg-[#FCFDF7] min-h-screen flex-col items-center p-12">
      <header className="w-full max-w-2xl text-3xl  text-center text-gray-900">
        <h1 className="text-6xl font-bold">BourdainGPT</h1>
        <p className="mt-2 text-sm text-gray-900 italic">
          Explore the world&#39;s culinary traditions in detail! Click on the
          map to find out more about the food of that very specific region. Wait
          a couple seconds for the model to generate a response.
        </p>
      </header>

      <WorldMap />

      <>
        <p className="italic text-sm text-center">
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
