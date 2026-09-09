"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryFormValues } from "@/lib/supabase/validations"
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryFormValues>({
    resolver: zodResolver(enquirySchema),
  });

  async function onSubmit() {
    setStatus("submitting");
    try {
      // NOTE: no backend endpoint is wired up yet — this is where a
      // Supabase insert or email API call will go in a later phase.
      await new Promise((resolve) => setTimeout(resolve, 600));
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md space-y-5">
      <div>
        <label htmlFor="name" className="text-sm">
          Name
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {errors.name && (
          <p className="mt-1 text-xs text-red-700">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="text-sm">
          Email
        </label>
        <input
          id="email"
          type="email"
          {...register("email")}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-700">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="text-sm">
          Message
        </label>
        <textarea
          id="message"
          rows={4}
          {...register("message")}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
        {errors.message && (
          <p className="mt-1 text-xs text-red-700">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending..." : "Send Enquiry"}
      </Button>

      {status === "success" && (
        <p className="text-sm text-green-700">
          Thank you — your enquiry has been received.
        </p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">
          Something went wrong. Please try again.
        </p>
      )}
    </form>
  );
}