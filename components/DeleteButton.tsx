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
      onClick={() => {
        setPending(true);
        deleteMessage(message);
        router.refresh();
      }}
      disabled={pending}
      className="group/btn relative inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 hover:border-red-500/50 rounded-lg text-red-400 hover:text-red-300 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden"
    >
      {/* Animated background on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-500/0 via-red-500/10 to-red-500/0 translate-x-[-100%] group-hover/btn:translate-x-[100%] transition-transform duration-700"></div>

      {/* Content */}
      <div className="relative flex items-center gap-2">
        {pending ? (
          <svg
            className="animate-spin h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        ) : (
          <svg
            className="w-4 h-4 transition-transform duration-200 group-hover/btn:scale-110"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        )}
        <span>{pending ? "Deleting..." : "Delete"}</span>
      </div>
    </button>
  );
}
