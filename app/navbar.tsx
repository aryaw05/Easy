import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status }: { data: any; status: string } = useSession();

  return (
    <nav className="w-full bg-gray-500 p-5">
      <div>
        <h1>{session?.user?.name || "Guest"}</h1>
      </div>
      <div className="text-white">
        <h1>Navbar</h1>
        {status === "authenticated" ? (
          <button className="rounded-lg px-4 py-2" onClick={() => signOut()}>
            Logout
          </button>
        ) : (
          <button className="rounded-lg px-4 py-2" onClick={() => signIn()}>
            Login
          </button>
        )}
        <Link href={"/blog-write"}>Tulis Blog</Link>
      </div>
    </nav>
  );
}
