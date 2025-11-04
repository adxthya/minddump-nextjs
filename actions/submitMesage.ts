"use server";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db/db";

type ActionState = {
  error?: string;
  success?: string;
};

export default async function submitMessage(
  prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const session = await getServerSession(options);
  const message = formData.get("message")?.toString();
  const checkPrivate = formData.get("private")?.toString();
  const isPrivate = checkPrivate === "true";

  if (!message?.trim()) {
    return { error: "Message cannot be empty." };
  }
  await prisma?.messages.create({
    data: {
      userId: session?.user.id,
      content: message,
      isPrivate: isPrivate,
    },
  });
  revalidatePath("/");
  return { success: "Message Submitted!" };
}
