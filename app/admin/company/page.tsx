import { AdminShell } from "@/components/admin/AdminShell";
import { CompanyEditorForm } from "@/components/admin/CompanyEditorForm";
import { getSiteSettings } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminCompanyPage() {
  const settings = await getSiteSettings();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl">Company Content</h1>
      <div className="mt-8">
        <CompanyEditorForm initial={settings} />
      </div>
    </AdminShell>
  );
}
