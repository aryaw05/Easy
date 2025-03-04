"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

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
    <div className="flex h-screen flex-col items-center justify-center">
      {isError && <p className="text-red-500">Email or password is wrong </p>}
      <div>Halaman Register</div>
      <form
        action=""
        className="flex flex-col items-center justify-center gap-5 rounded-2xl border p-10"
        onSubmit={(e) => SubmitLogin(e)}
      >
        <input type="email" placeholder="johndoe@gmail.com" name="email" />
        <input type="password" placeholder="********" name="password" />
        <button
          disabled={isLoading}
          type="submit"
          className="w-full rounded-xl bg-blue-300 p-3"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
        <button
          className="mt-5 w-full rounded-lg border p-2"
          type="button"
          onClick={() => signIn("google", { callbackUrl, redirect: false })}
        >
          Login With Google
        </button>
      </form>
    </div>
  );
}
