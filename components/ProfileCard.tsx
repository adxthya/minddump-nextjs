// ProfileCard.tsx
import Image from "next/image";
import getUser from "@/actions/getUser";
import avatarFetch from "@/lib/avatar";
import ClientForm from "./ClientForm";
import profilepicholder from "@/assets/profile-pic-placeholder.png";

export default async function ProfileCard() {
  const user = await getUser();
  const name = user?.profileName;
  const link = avatarFetch(name);

  return (
    <div className="m-auto flex justify-center items-center flex-col gap-3">
      <div className="avatar">
        <div className="w-24 rounded-full ring ring-black ring-offset-2">
          <Image
            src={link || profilepicholder}
            alt="Profile pic"
            width={500}
            height={500}
          />
        </div>
      </div>

      <p className="text-xl py-3">{name}</p>

      <ClientForm />
    </div>
  );
}
