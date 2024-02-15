import { options } from "@/app/api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";
import prisma from "@/lib/db/db";
import { revalidatePath } from "next/cache";
import FormSubmit from "./FormSubmit";
import profilepicholder from "@/assets/profile-pic-placeholder.png";
import Image from "next/image";

async function submitMessage(formData: FormData) {
  "use server";
  const session = await getServerSession(options);
  const message = formData.get("message")?.toString();
  const checkPrivate = formData.get("private")?.toString();
  const isPrivate = checkPrivate === "true";

  if (!message) {
    throw Error("Missing required fields");
  }
  await prisma?.messages.create({
    data: {
      userId: session?.user.id,
      content: message,
      isPrivate: isPrivate,
    },
  });
  revalidatePath("/");
}

export default async function ProfileCard() {
  const session = await getServerSession(options);
  const user = session?.user;
  return (
    <div className="m-auto flex justify-center items-center flex-col gap-3">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-black ring-offset-base-100 ring-offset-2">
          <Image
            src={user?.image || profilepicholder}
            alt="Profile pic"
            width={100}
            height={100}
          />
        </div>
      </div>
      <div>
        <p className="text-xl">{user?.name}</p>
      </div>
      <form action={submitMessage}>
        <textarea
          className="textarea border border-white bg-black text-white h-[148px] w-[300px]"
          placeholder="Message"
          name="message"
        ></textarea>
        <div className="flex w-full pt-2 flex-col items-end gap-2">
          <div className="flex gap-2">
            <p>Private</p>
            <input
              name="private"
              type="checkbox"
              className="toggle"
              value="true"
            />
          </div>
          <FormSubmit>Submit</FormSubmit>
        </div>
      </form>
    </div>
  );
}
