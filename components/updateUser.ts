"use server";
import { options } from "@/app/api/auth/[...nextauth]/options";
import prisma from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";

type FormDataValues = {
  username: string;
};

export async function updateUser(data: FormDataValues) {
  const session = await getServerSession(options);
  const user = session?.user;
  await prisma.user.update({
    where: {
      id: user?.id,
    },
    data: {
      profileName: data.username,
    },
  });
}

export async function validateForm(username: string) {
  const user = await prisma.user.findUnique({
    where: {
      profileName: username,
    },
  });
  if (user) return false;
  return true;
}
