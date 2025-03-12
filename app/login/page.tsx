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
    <div className="flex flex-col justify-center h-[100dvh] px-5 text-center w-full items-center">
      <div>
        <h1 className="text-5xl md:text-7xl text-center md:flex md:gap-2 mb-8 md:mb-5 font-extrabold justify-center">
          Welcome to
          <div className="pt-2 md:pt-0 pl-4 md:pl-2">
            <p className="bg-gradient-to-r from-violet-500 to-indigo-500 inline-block text-transparent bg-clip-text">
              MindDump
            </p>
          </div>
        </h1>
        <p className="md:text-3xl text-xl">
          A place where you can share your{" "}
          <span className="font-bold">thoughts</span> and{" "}
          <span className="font-bold">worries</span>.
        </p>
        <p className="md:text-2xl text-lg pt-3">
          {" "}
          Posts can be private or public.
        </p>
      </div>
      <div className="mt-10">
        <LoginButton />
      </div>
    </div>
  );
}
