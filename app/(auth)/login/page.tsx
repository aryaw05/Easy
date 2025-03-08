"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { anton, figtree } from "@/components/elements/fonts/page";

export default function LoginPage() {
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const { push } = useRouter();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const SubmitLogin = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        email: e.target.email.value,
        password: e.target.password.value,
        callbackUrl,
      });
      if (!res?.error) {
        push(callbackUrl);
        setIsLoading(false);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 2000);
        setIsLoading(false);
      }
    } catch (error) {
      setIsError(true);
      // console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <div className="mx-10 flex h-screen flex-col items-center justify-center gap-10">
      <div>
        <h1 className={`${anton.className} text- center text-5xl`}>LOGIN</h1>
        {isError && <p className="text-red-500">Email or password is wrong </p>}
      </div>
      <form
        action=""
        className={`${figtree.className} flex w-full flex-col items-center justify-center gap-10`}
        onSubmit={(e) => SubmitLogin(e)}
      >
        <div className="w-full">
          <input
            type="email"
            placeholder="johndoe@gmail.com"
            name="email"
            className="w-full p-5 after:appearance-none focus:outline-none active:border-0"
          />
          <hr className="w-full border-2 border-black" />
        </div>
        <div className="w-full">
          <input
            type="password"
            placeholder="********"
            name="password"
            className="w-full appearance-none  p-5 focus:outline-none active:border-0"
          />
          <hr className="w-full border-2 border-black" />
        </div>

        <button
          disabled={isLoading}
          type="submit"
          className="w-full bg-black p-3 text-white"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <button
          className="mt-2 w-full border-2 border-black p-2"
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          Login With Google
        </button>
      </form>
    </div>
  );
}
