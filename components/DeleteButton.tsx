"use client";

import { Messages } from "@prisma/client";
import deleteMessage from "@/actions/deleteMessage";
import Image from "next/image";
import deleteLogo from "../assets/delete.svg";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface DeleteButtonProps {
  message: Messages;
}

export default function DeleteButton({ message }: DeleteButtonProps) {
  const router = useRouter();
  const [pending, isPending] = useState(false);
  return (
    <button
      className="btn bg-white flex"
      onClick={() => {
        isPending(true);
        deleteMessage(message);
        isPending(false);
        router.refresh();
      }}
    >
      <Image src={deleteLogo} width={25} height={30} alt="Delete logo" />
      Delete
    </button>
  );
}
