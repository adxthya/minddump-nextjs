"use client";

import { useFormState } from "react-dom";
import submitMessage from "@/actions/submitMesage";
import FormSubmit from "./FormSubmit";

type ActionState = {
  error?: string;
  success?: string;
};

const initialState: ActionState = {
  error: "",
  success: "",
};

export default function ClientForm() {
  const [state, formAction] = useFormState(submitMessage, {
    error: "",
    success: "",
  });

  return (
    <form
      action={formAction}
      className="space-y-4"
    >
      <textarea
        name="message"
        rows={5}
        placeholder="Write a message..."
        className="w-[22rem] md:w-[500px] px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500"
      />

      {state.error && <p className="text-red-500 text-sm">{state.error}</p>}
      {state.success && (
        <p className="text-green-500 text-sm">{state.success}</p>
      )}

      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer text-sm text-gray-300">
          <input
            name="private"
            type="checkbox"
            className="toggle"
            value="true"
          />
          Private
        </label>

        <FormSubmit>Submit</FormSubmit>
      </div>
    </form>
  );
}
