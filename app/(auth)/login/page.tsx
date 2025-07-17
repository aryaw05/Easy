"use client";

import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { anton, figtree } from "@/components/elements/fonts/page";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

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
      <div className="flex flex-col items-center justify-center md:w-1/3">
        <div>
          <h1 className={`${anton.className} text- center text-5xl`}>LOGIN</h1>
          {isError && (
            <p className="text-red-500">Email or password is wrong </p>
          )}
        </div>
        <form
          action=""
          className={`${figtree.className} flex w-full flex-col items-center justify-center gap-7`}
          onSubmit={(e) => SubmitLogin(e)}
        >
          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              className="w-full p-5 after:appearance-none focus:outline-none active:border-0"
            />
            <hr className="w-full border-2 border-black" />
          </div>
          <div className="w-full">
            <label htmlFor="" className="font-bold">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              name="password"
              className="w-full appearance-none p-5 focus:outline-none active:border-0"
            />
            <hr className="w-full border-2 border-black" />
          </div>
          <div className="flex w-full flex-col gap-3">
            <button
              disabled={isLoading}
              type="submit"
              className="w-full bg-black p-3 text-white"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <h2>
              Dont have an account ?{" "}
              <Link href={"/register"} className="font-bold">
                {" "}
                Sign Up!
              </Link>
            </h2>
            <button
              className="mt-4 w-full border-2 border-black p-2"
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
            >
              <FontAwesomeIcon icon={faGoogle} className="mr-2" />
              Login With Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
