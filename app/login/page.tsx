"use client";
import Image from "next/image";
import logo from "../../assets/google.svg";
import spinner from "../../assets/spinner.svg";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { redirect } from "next/navigation";

export default function Login() {
  const { data: session } = useSession();
  if (session) {
    redirect("/");
  }

  const [loading, setLoading] = useState(false);
  return (
    <div className="flex justify-between w-full items-center px-2 h-screen pb-44">
      <div className="text-lg w-[900px] max-sm:w-[170px]">
        <h1 className="text-5xl">
          Welcome to <span className="italic">mind</span> dump
        </h1>
        <p className="text-3xl pt-3">
          A place where you can share your thoughts and worries. Posts can be
          private or public.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center lg:w-[500px]">
        <p className="text-4xl text-center">Login</p>
        <button
          className="btn btn-ghost w-fit"
          onClick={() => {
            setLoading(true);
            signIn("google", { callbackUrl: "/" });
          }}
        >
          <div className="flex items-center gap-2">
            <Image
              src={loading ? spinner : logo}
              alt="Google Logo"
              width={30}
              height={40}
            />
            <p className="text-nowrap">Sign in using google</p>
          </div>
        </button>
      </div>
    </div>
  );
}
