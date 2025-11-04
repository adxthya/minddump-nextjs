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

export default function Settings() {
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
    <div className="min-h-screen flex flex-col items-center pt-32 px-4">
      <div className="w-full max-w-md space-y-12">
        {/* Avatar Section */}
        <div className="flex flex-col items-center gap-4">
          <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-700">
            <Image
              src={profilepicholder}
              alt="Profile pic"
              width={128}
              height={128}
              className="object-cover w-full h-full"
            />
          </div>

          <button
            onClick={() => alert("Haven't fixed that yet :(")}
            className="text-sm text-gray-400 hover:text-gray-300 underline underline-offset-4"
          >
            Change Avatar
          </button>
        </div>

        {/* Username Form */}
        <form
          onSubmit={handleSubmit((data) => updateUser(data))}
          noValidate
          className="space-y-6"
        >
          <div className="space-y-3">
            <label
              htmlFor="username"
              className="block text-lg text-gray-300"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter new username"
              {...register("username", {
                minLength: {
                  value: 5,
                  message: "Username must be at least 5 characters",
                },
                required: {
                  value: true,
                  message: "Username is required",
                },
                validate: {
                  isNotValid: (fieldValue) => {
                    return (
                      /^[a-zA-Z]$/i.test(fieldValue.charAt(0)) ||
                      "Username must start with a letter"
                    );
                  },
                  isNotUnique: async (fieldValue) => {
                    return (
                      (await validateForm(fieldValue)) ||
                      "Username is already taken"
                    );
                  },
                },
              })}
              className="w-full px-4 py-3 bg-transparent border-b-2 border-gray-700 text-gray-100 placeholder-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
            />

            {errors.username && (
              <p className="text-sm text-red-400">{errors.username.message}</p>
            )}

            {isSubmitted && !isDirty && !errors.username && (
              <p className="text-sm text-green-400">
                Username changed successfully
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 bg-white hover:bg-gray-100 disabled:bg-gray-700 disabled:cursor-not-allowed text-black disabled:text-gray-500 font-medium rounded-lg transition-colors"
          >
            {isSubmitting ? "Saving..." : "Save"}
          </button>
        </form>
      </div>
    </div>
  );
}
