import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import Image from "next/image";
import profilepicholder from "@/assets/profile-pic-placeholder.png";

export default async function settings() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }
  const user = session.user;

  return (
    <div className="w-screen flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center gap-2">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={user?.image || profilepicholder}
              alt="Profile pic"
              width={100}
              height={100}
            />
          </div>
        </div>
        <button className="btn btn-sm btn-neutral">Change Avatar</button>
        <p className="text-xl">{user.name}</p>
        <div className="flex flex-col gap-1">
          <p className="text-lg">Change Username:</p>
          <input
            type="text"
            placeholder="Type here"
            className="input w-full max-w-xs bg-black input-bordered"
          />
        </div>
        <div className="flex w-full flex-col gap-2 m-0">
          <p className="text-lg">Bio:</p>
          <textarea
            className="textarea textarea-bordered bg-black"
            placeholder="Bio"
          ></textarea>
        </div>
        <button className="btn btn-sm w-16 btn-outline self-end mt-1">
          Submit
        </button>
      </div>
    </div>
  );
}
