import Image from "next/image";
import { getServerSession } from "next-auth";
import profilepicplaceholder from "@/assets/profile-pic-placeholder.png";
import { options } from "@/app/api/auth/[...nextauth]/options";
import DeleteButton from "./DeleteButton";
import { Messages } from "@prisma/client";
import avatarFetch from "@/lib/avatar";

type messages = {
  user: {
    profileName: string | null;
    image: string | null;
  } | null;
} & Messages;

interface MessageCardProps {
  message: messages;
  pub: boolean;
}

export default async function MessageCard({ message, pub }: MessageCardProps) {
  const session = await getServerSession(options);
  const user = session?.user;
  const name = message.user?.profileName;
  const link = avatarFetch(name);
  return (
    <div className="card w-96 bg-gray-500 m-auto">
      <div className="card-body flex gap-4">
        <div className="flex gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-gray-400">
              <Image
                src={link || profilepicplaceholder}
                alt="Profile pic"
                width={100}
                height={100}
              />
            </div>
          </div>
          <h2 className="card-title">{message.user?.profileName}</h2>
        </div>
        <div>
          <p className="text-lg px-2 py-5">{message.content}</p>
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
