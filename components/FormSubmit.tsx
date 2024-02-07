"use client";
import React, { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type FormSubmitProps = {
  children: React.ReactNode;
  className?: string;
} & ComponentProps<"button">;

const FormSubmit = ({ children, className, ...props }: FormSubmitProps) => {
  const { pending } = useFormStatus();
  return (
    <button
      {...props}
      className={`btn btn-primary btn-sm ${className}`}
      type="submit"
    >
      {pending && <span className="loading loading-spinner" />}
      {children}
    </button>
  );
};

export default FormSubmit;
