"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { Service } from "@/types";

type Status = "idle" | "saving" | "success" | "error";

export function ServiceEditorRow({ service }: { service: Service }) {
  const router = useRouter();
  const [description, setDescription] = useState(service.description);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSave() {
    setStatus("saving");
    const supabase = createClient();
    const { error } = await supabase
      .from("services")
      .update({ description })
      .eq("id", service.id);

    if (error) {
      setStatus("error");
      return;
    }
    setStatus("success");
    router.refresh();
  }

  return (
    <div className="border border-line p-6">
      <p className="font-display text-lg">{service.title}</p>
      <textarea
        rows={3}
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
          setStatus("idle");
        }}
        className="mt-3 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
      />
      <div className="mt-3 flex items-center gap-4">
        <Button type="button" variant="ghost" onClick={handleSave} disabled={status === "saving"}>
          {status === "saving" ? "Saving..." : "Save"}
        </Button>
        {status === "success" && (
          <span className="text-sm text-green-700">Saved</span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-700">Failed — try again</span>
        )}
      </div>
    </div>
  );
}
