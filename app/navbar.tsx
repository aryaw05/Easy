"use-client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import { Anton } from "next/font/google";
import { useState } from "react";

const anton = Anton({ weight: "400", subsets: ["latin"] });

const {push} = useRouter();
export default function Navbar() {
  const { status } = useSession();
  const [open, setMenuOpen] = useState("hidden");
  function openMenu() {
    if (open === "hidden") {
      setMenuOpen("");
    } else {
      setMenuOpen("hidden");
    }
  }
  return (
    <nav className="fixed w-full bg-black px-10 py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <button onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} className="text-2xl text-white" />
          </button>
          <h1 className={`${anton.className} font-[Anton] text-3xl text-white`}>
            EASY
          </h1>
        </div>

        {status === "authenticated" ? (
          <button
            className="rounded-lg px-4 py-2 text-white"
            onClick={() => signOut()}
          >
            <FontAwesomeIcon icon={faUser} className="text-white" />
          </button>
        ) : (
          <button
            className="rounded-lg px-4 py-2 text-white"
            onClick={() => signIn()}
          >
            <FontAwesomeIcon icon={faUser} className="text-white" />
          </button>
        )}
        {/* <Link href={"/blog-write"}>Tulis Blog</Link> */}
      </div>
      {/* tampilan Menu */}
      <div className={` ${open} h-96 w-full bg-black py-5 text-white`}>
        <h1 className="text-6xl">Tulis Blog</h1>
        <h1>Dashboard</h1>
        <h1>Home</h1>
      </div>
    </nav>
  );
}
