import MessageCard from "@/components/MessageCard";
import prisma from "@/lib/db/db";

export default async function Messages() {
  const messages = await prisma.messages.findMany({
    where: {
      isPrivate: false,
    },
  });

  return (
    <div className="flex flex-col gap-10 m-auto items-center">
      <p className="text-4xl">
        Public <span className="italic">Messages</span>
      </p>
      <div className="flex flex-col gap-5">
        {messages.map((message) => (
          <MessageCard message={message} pub={true} key={message.id} />
        ))}
      </div>
    </div>
  );
}
