"use client";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";
import spinner from "../assets/spinner.svg";
import logo from "@/assets/google.svg";

export default function LoginButton() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col justify-center items-center lg:w-[500px]">
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
          <p className="text-nowrap text-lg">Sign in using google</p>
        </div>
      </button>
    </div>
  );
}
