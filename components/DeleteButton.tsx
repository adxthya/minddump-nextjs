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
  const [pending, setPending] = useState(false);
  return (
    <button
      className="btn bg-white flex"
      onClick={() => {
        setPending(true);
        deleteMessage(message);
        router.refresh();
      }}
    >
      {pending ? (
        <span className="loading loading-spinner text-neutral"></span>
      ) : (
        <Image src={deleteLogo} width={25} height={30} alt="Delete logo" />
      )}
      Delete
    </button>
  );
}
