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
    <article className="group relative w-full min-w-[28rem] max-w-2xl mx-auto">
      {/* Main card container */}
      <div className="relative bg-gray-800 rounded-2xl shadow-sm border border-gray-700 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 hover:border-gray-600">
        {/* Header section with avatar and name */}
        <div className="flex items-center gap-4 px-6 pt-6 pb-4">
          <div className="relative">
            <div className="w-14 h-14 rounded-full ring-2 ring-offset-2 ring-offset-black ring-gray-800 overflow-hidden transition-all duration-300 group-hover:ring-blue-500">
              <Image
                src={link || profilepicplaceholder}
                alt={`${message.user?.profileName}'s profile picture`}
                width={56}
                height={56}
                className="object-cover w-full h-full"
              />
            </div>
            {/* Online indicator (optional) */}
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-gray-800"></div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-gray-100 truncate">
              {message.user?.profileName || "Anonymous"}
            </h3>
            <p className="text-sm text-gray-400">
              {message.createdAt
                ? new Date(message.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })
                : "Date unknown"}
            </p>
          </div>

          {/* Privacy badge */}
          {message.isPrivate && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-900 text-white text-xs font-medium rounded-full">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              Private
            </div>
          )}
        </div>

        {/* Message content */}
        <div className="px-6 pb-6">
          <p className="text-gray-300 leading-relaxed text-base whitespace-pre-wrap break-words">
            {message.content}
          </p>
        </div>

        {/* Footer with actions */}
        {!pub && (
          <div className="px-6 pb-5 flex justify-end border-t border-gray-700 pt-4">
            <DeleteButton message={message} />
          </div>
        )}

        {/* Decorative gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
      </div>
    </article>
  );
}
