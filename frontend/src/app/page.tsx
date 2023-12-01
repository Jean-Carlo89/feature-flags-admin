import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <header className="text-3xl"> Dashboard Boticario</header>{" "}
      <div className="flex flex-col border-slate-50 border-8 container h-[90vh]  mt-10">
        <h1>Hello There</h1>
        <Link href="/new">New</Link>
      </div>
    </>
  );
}
