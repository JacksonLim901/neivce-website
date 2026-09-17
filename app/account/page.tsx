import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { CustomerSignOutButton } from "@/components/auth/CustomerSignOutButton";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const memberSince = new Date(user.created_at).toLocaleDateString();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
      <p className="text-eyebrow text-muted">Account</p>
      <h1 className="text-h1 mt-4 font-display">My Account</h1>

      <div className="card mt-10 max-w-md p-6">
        <p className="text-eyebrow text-muted">Email</p>
        <p className="mt-1">{user.email}</p>

        <p className="text-eyebrow mt-6 text-muted">Member since</p>
        <p className="mt-1">{memberSince}</p>
      </div>

      <div className="mt-8">
        <CustomerSignOutButton />
      </div>
    </div>
  );
}
