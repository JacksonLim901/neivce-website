"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types";

type Status = "idle" | "saving" | "success" | "error";

export function CompanyEditorForm({ initial }: { initial: SiteSettings }) {
  const router = useRouter();
  const [introduction, setIntroduction] = useState(initial.introduction);
  const [announcement, setAnnouncement] = useState(initial.announcement);
  const [phone, setPhone] = useState(initial.phone);
  const [address, setAddress] = useState(initial.address);
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("saving");

    const supabase = createClient();
    const { error } = await supabase
      .from("site_settings")
      .update({ introduction, announcement, phone, address })
      .eq("id", initial.id);

    if (error) {
      setStatus("error");
      return;
    }

    setStatus("success");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <p className="text-sm text-muted">Company name (fixed)</p>
        <p className="mt-1 font-display text-lg">{initial.company_name}</p>
      </div>

      <div>
        <label htmlFor="introduction" className="text-sm">
          Company introduction
        </label>
        <textarea
          id="introduction"
          rows={3}
          value={introduction}
          onChange={(e) => setIntroduction(e.target.value)}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="announcement" className="text-sm">
          Homepage announcement
        </label>
        <textarea
          id="announcement"
          rows={2}
          value={announcement}
          onChange={(e) => setAnnouncement(e.target.value)}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="phone" className="text-sm">
          Phone
        </label>
        <input
          id="phone"
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <div>
        <label htmlFor="address" className="text-sm">
          Address
        </label>
        <textarea
          id="address"
          rows={2}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="mt-1 w-full border border-line bg-transparent px-3 py-2 text-sm outline-none focus:border-accent"
        />
      </div>

      <Button type="submit" disabled={status === "saving"}>
        {status === "saving" ? "Saving..." : "Save changes"}
      </Button>

      {status === "success" && (
        <p className="text-sm text-green-700">Saved — the public site now shows this content.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-700">Something went wrong. Please try again.</p>
      )}
    </form>
  );
}
