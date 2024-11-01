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
    <div className="md:flex md:justify-between w-full items-center px-5 md:h-screen">
      <div className="text-lg md:w-[900px] ">
        <h1 className="text-5xl text-center md:flex md:gap-2 pt-10 md:pt-0 mb-10 md:mb-0">
          Welcome to
          <div className="pt-2 md:pt-0 pl-4">
            <p className="bg-gradient-to-r from-violet-500  to-indigo-500 inline-block text-transparent bg-clip-text">
              minddump
            </p>
          </div>
        </h1>
        <p className="text-2xl pt-3">
          A place where you can share your thoughts and worries.
        </p>
        <p className="text-2xl pt-3"> Posts can be private or public.</p>
      </div>
      <div className="mt-20 md:mt-0">
        <LoginButton />
      </div>
    </div>
  );
}
