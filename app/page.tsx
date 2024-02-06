import MessageCard from "@/components/MessageCard";
import ProfileCard from "@/components/ProfileCard";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import prisma from "@/lib/db/db";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(options);
  if (!session) {
    redirect("/login");
  }
  const messages = await prisma.messages.findMany({
    where: {
      userId: session?.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-5 m-auto items-center">
      <ProfileCard />
      <p className="text-2xl">Messages!</p>
      <div className="flex flex-col gap-2">
        {messages.map((message) => (
          <MessageCard message={message} key={message.id} pub={false} />
        ))}
      </div>
    </div>
  );
}
