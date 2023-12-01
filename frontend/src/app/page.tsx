import Image from "next/image";
import Link from "next/link";
import bar from "./components/bar";
import Bar from "./components/bar";

export default function Home() {
  return (
    <>
      <header className="text-3xl"> Dashboard Boticário</header>
      <div className="flex flex-col border-orange-300 border-4  container h-[90vh] max-h-[2000px] max-w-[90vw] mt-5">
        <div className="container flex w-[1920px] ">
          <Bar>children</Bar>

          <div>
            <h1>Hello There</h1>
          </div>
        </div>
      </div>
    </>
  );
}
