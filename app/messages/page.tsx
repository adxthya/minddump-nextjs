import MessageCard from "@/components/MessageCard";
import prisma from "@/lib/db/db";

export default async function Messages() {
  const messages = await prisma.messages.findMany({
    where: {
      isPrivate: false,
    },
    include: {
      user: {
        select: {
          profileName: true,
          image: true,
        },
      },
    },
  });

  return (
    <div className="flex flex-col gap-10 py-20 items-center">
      <p className="text-4xl">Public Messages!</p>
      <div className="flex flex-col gap-10">
        {messages.map((message) => (
          <MessageCard
            message={message}
            pub={true}
            key={message.id}
          />
        ))}
      </div>
    </div>
  );
}
