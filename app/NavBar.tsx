import UserMenuButton from "@/components/UserMenuButton";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "./api/auth/[...nextauth]/options";

export default async function NavBar() {
  const session = await getServerSession(options);
  return (
    <div className="navbar bg-black">
      <div className="flex-1">
        <p className="text-xl px-1">
          <Link href="/">
            mind<span className="italic">Dump</span>
          </Link>
        </p>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 lg:text-lg">
          <li>
            <Link
              className="text-white active:text-gray-700 transition-colors ease-in-out delay-75"
              href="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-white active:text-gray-700 transition-colors ease-in-out delay-75"
              href="/messages"
            >
              Messages
            </Link>
          </li>
        </ul>
        <UserMenuButton session={session} />
      </div>
    </div>
  );
}
