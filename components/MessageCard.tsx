import Image from "next/image";
import { getServerSession } from "next-auth";
import profilepicplaceholder from "@/assets/profile-pic-placeholder.png";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { Messages } from "@prisma/client";
import DeleteButton from "./DeleteButton";

interface MessageCardProps {
  message: Messages;
  pub: boolean;
}

export default async function MessageCard({ message, pub }: MessageCardProps) {
  const session = await getServerSession(options);
  const user = session?.user;
  return (
    <div className="card w-96 bg-gray-500 border border-b-2 border-gray-700  shadow-xl m-auto ">
      <div className="card-body flex gap-4">
        <div className="flex gap-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <Image
                src={user?.image || profilepicplaceholder}
                alt="Profile pic"
                width={100}
                height={100}
              />
            </div>
          </div>
          <h2 className="card-title">{user?.name}</h2>
        </div>
        <div>
          <p>{message.content}</p>
          <div className="card-actions flex-col items-end">
            {pub ? null : <DeleteButton message={message} />}
            {message.isPrivate ? (
              <div className="badge text-sm py-3  badge-neutral">private</div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
