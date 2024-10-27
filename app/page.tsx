import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";

// Home Page
export default function Home() {
  return (
    <main className="bg-hero bg-cover bg-bottom h-dvh pt-28 flex flex-col content-center items-center">
      {/* <h1>Hello World</h1> */}
      {/* <Navbar /> */}

      {/* container for texas tech banner */}
      <div className="w-full mt-24 pb-10">
        <Image
          src="/TTU_Word_Mark.png"
          alt="TTU DoubleT"
          width={1000}
          height={1000}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <h1 className="text-5xl text-red-600 font-bold">Red Rater</h1>
      <p className="text-lg font-bold">Professor and Course Evaluation Tool</p>
      <div className="w-96">
        <SearchBar />
      </div>
    </main>
  );
}
