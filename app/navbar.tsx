"use-client";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signIn, signOut, useSession } from "next-auth/react";
import { Anton } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const anton = Anton({ weight: "400", subsets: ["latin"] });

export default function Navbar() {
  // const { push } = useRouter();
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
    <nav className="w-full bg-black px-10 py-5">
      <div className="flex justify-between">
        <div className="flex items-center gap-5">
          <button onClick={openMenu}>
            <FontAwesomeIcon icon={faBars} className="text-2xl text-white" />
          </button>
          <Link
            href={"/"}
            className={`${anton.className} font-[Anton] text-3xl text-white`}
          >
            EASY
          </Link>
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
        <div className="flex flex-col gap-10">
          <Link
            href={"/blog-write"}
            className={`${anton.className} font-[Anton] text-5xl text-white`}
          >
            Tulis Blog
          </Link>
          <Link
            href={"/dashboard"}
            className={`${anton.className} font-[Anton] text-5xl text-white`}
          >
            Dashboard
          </Link>
          <Link
            href={"/"}
            className={`${anton.className} font-[Anton] text-5xl text-white`}
          >
            Home
          </Link>
          <h1> Copyright © 2025 Eaasy. All rights reserved.</h1>
        </div>
      </div>
    </nav>
  );
}
