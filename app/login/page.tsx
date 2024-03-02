import LoginButton from "@/components/LoginButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { options } from "../api/auth/[...nextauth]/options";

export default async function Login() {
  const session = await getServerSession(options);
  if (session) {
    redirect("/");
  }

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
      <LoginButton />
    </div>
  );
}
