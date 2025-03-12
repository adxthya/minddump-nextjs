import UserMenuButton from "@/components/UserMenuButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import prisma from "@/lib/db/db";
import { options } from "./api/auth/[...nextauth]/options";

export default async function NavBar() {
  const session = await getServerSession(options);
  const user = await prisma.user.findFirst({
    where: {
      id: session?.user.id,
    },
  });
  const name = user?.profileName;
  return (
    <div className="navbar bg-black absolute z-10">
      <div className="flex-1">
        <p className="text-xl px-1">
          <Link href="/">MindDump</Link>
        </p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 lg:text-lg">
          <li>
            <Link
              className="text-white active:text-blue-500 transition-colors ease-in-out delay-75"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-white transition-colors ease-in-out delay-75"
              href="/messages"
            >
              Messages
            </Link>
          </li>
        </ul>
        <UserMenuButton
          session={session}
          name={name}
        />
      </div>
    </div>
  );
}
