"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Enquiry } from "@/types";

export function EnquiryCard({ enquiry }: { enquiry: Enquiry }) {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "deleting" | "error">("idle");
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    setStatus("deleting");
    const supabase = createClient();
    const { error } = await supabase
      .from("enquiries")
      .delete()
      .eq("id", enquiry.id);

    if (error) {
      setStatus("error");
      return;
    }
    router.refresh();
  }

  return (
    <div className="card p-6">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <p className="font-display text-lg">{enquiry.name}</p>
        <div className="text-right">
          <p className="text-eyebrow text-muted">
            {new Date(enquiry.created_at).toLocaleString()}
          </p>
          {confirming ? (
            <div className="mt-2 flex items-center justify-end gap-3 text-sm">
              <span className="text-muted">Delete this enquiry?</span>
              <button
                type="button"
                onClick={handleDelete}
                disabled={status === "deleting"}
                className="text-red-700 underline"
              >
                {status === "deleting" ? "Deleting..." : "Yes, delete"}
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="text-muted underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirming(true)}
              className="mt-2 text-sm text-muted underline transition-colors hover:text-red-700"
            >
              Delete
            </button>
          )}
          {status === "error" && (
            <p className="mt-1 text-sm text-red-700">Failed — try again</p>
          )}
        </div>
      </div>
      <p className="mt-1 text-sm text-accent">{enquiry.email}</p>
      <p className="mt-3 whitespace-pre-line text-sm text-ink">
        {enquiry.message}
      </p>
    </div>
  );
}
