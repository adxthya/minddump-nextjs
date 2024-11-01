"use client";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useForm } from "react-hook-form";
import Image from "next/image";
import profilepicholder from "@/assets/profile-pic-placeholder.png";
import { updateUser, validateForm } from "@/components/updateUser";
import { useEffect, useState } from "react";

type FormDataValues = {
  username: string;
};

export default function settings() {
  const { data: session } = useSession();
  if (!session) {
    redirect("/login");
  }

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful, isDirty },
    reset,
  } = useForm<FormDataValues>({
    defaultValues: {
      username: "",
    },
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
      setIsSubmitted(true);
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="w-screen flex flex-col justify-center items-center gap-2 pt-24">
      <div className="flex flex-col justify-center items-center gap-6">
        <div className="avatar">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <Image
              src={profilepicholder}
              alt="Profile pic"
              width={100}
              height={100}
            />
          </div>
        </div>
        <button
          className="btn btn-sm btn-neutral"
          onClick={() => alert("Haven't fixed that yet :(")}
        >
          Change Avatar
        </button>
        <form
          onSubmit={handleSubmit((data) => updateUser(data))}
          noValidate
        >
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="text-lg">Change Username:</p>
              <input
                type="text"
                placeholder="Type here"
                {...register("username", {
                  minLength: {
                    value: 5,
                    message: "Invalid Format",
                  },
                  required: {
                    value: true,
                    message: "Username is required",
                  },
                  validate: {
                    isNotValid: (fieldValue) => {
                      return (
                        /^[a-zA-Z]$/i.test(fieldValue.charAt(0)) ||
                        " Username must start with a letter"
                      );
                    },
                    isNotUnique: async (fieldValue) => {
                      return (
                        (await validateForm(fieldValue)) || "Username Taken"
                      );
                    },
                  },
                })}
                className="input w-full max-w-xs bg-black input-bordered"
              />
              <p className="text-red-700 text-left">
                {errors.username?.message}
              </p>
              {isSubmitted && !isDirty && !errors.username && (
                <p className="text-green-600">Username Changed</p>
              )}
            </div>
            <div className="flex gap-1 self-end">
              {isSubmitting && (
                <span className="loading loading-spinner text-error"></span>
              )}
              <button
                type="submit"
                className="btn btn-sm w-16 btn-neutral mt-1"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
