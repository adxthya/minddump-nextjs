"use server";
import { Messages } from "@prisma/client";
import prisma from "@/lib/db/db";

export default async function deleteMessage(message: Messages) {
  await prisma.messages.delete({
    where: {
      id: message.id,
    },
  });
}
