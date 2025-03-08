import { signIn, signOut, useSession } from "next-auth/react";
import { Anton } from "next/font/google";

const anton = Anton({ weight: "400", subsets: ["latin"] });
export default function Navbar() {
  const { status } = useSession();

  return (
    <nav className="w-full bg-black p-5">
      <div>
        <h1
          className={`${anton.className} text-center font-[Anton] text-3xl text-white`}
        >
          EASY
        </h1>
        {status === "authenticated" ? (
          <button
            className="rounded-lg px-4 py-2 text-white"
            onClick={() => signOut()}
          >
            Logout
          </button>
        ) : (
          <button
            className="rounded-lg px-4 py-2 text-white"
            onClick={() => signIn()}
          >
            Login
          </button>
        )}
        {/* <Link href={"/blog-write"}>Tulis Blog</Link> */}
      </div>
    </nav>
  );
}
