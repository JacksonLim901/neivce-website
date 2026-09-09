import { AdminShell } from "@/components/admin/AdminShell";
import { getServices, getSiteSettings } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  const lastUpdated = new Date(settings.updated_at).toLocaleString();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl">Dashboard</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        <div className="border border-line p-6">
          <p className="text-sm text-muted">Website status</p>
          <p className="mt-2 font-display text-lg">Online</p>
        </div>
        <div className="border border-line p-6">
          <p className="text-sm text-muted">Services</p>
          <p className="mt-2 font-display text-lg">{services.length} listed</p>
        </div>
        <div className="border border-line p-6">
          <p className="text-sm text-muted">Last content update</p>
          <p className="mt-2 font-display text-lg">{lastUpdated}</p>
        </div>
      </div>
    </AdminShell>
  );
}
