"use server";
import prisma from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

export default async function getUser() {
  const session = await getServerSession(options);
  const user = await prisma.user.findUnique({
    where: {
      id: session?.user.id,
    },
  });
  return user;
}
