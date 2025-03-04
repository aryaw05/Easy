"use client";

import { loginWithGoogle } from "@/lib/supabase/auth/service";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const SubmitRegister = async (e: any) => {
    setIsLoading(true);
    e.preventDefault();
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          username: e.target.username.value,
          email: e.target.email.value,
          password: e.target.password.value,
        }),
      },
    );
    if (res.ok) {
      push("/login");
      setIsLoading(false);
      console.log(res);
    } else {
      setIsLoading(false);
      setIsError(true);
    }
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div>Halaman Register</div>
      {isError && <p className="text-red-500">Email already exists</p>}
      <form
        action=""
        className="flex flex-col items-center justify-center gap-5 rounded-2xl border p-10"
        onSubmit={(e) => SubmitRegister(e)}
      >
        <input
          type="text"
          placeholder="Username"
          name="username"
          className=""
        />
        <input type="email" placeholder="johndoe@gmail.com" name="email" />
        <input type="password" placeholder="********" name="password" />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-xl bg-blue-300 p-3"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
