import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceEditorRow } from "@/components/admin/ServiceEditorRow";
import { getServices } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  const services = await getServices();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl">Services Content</h1>
      <div className="mt-8 space-y-6">
        {services.length === 0 ? (
          <p className="text-sm text-muted">
            No services found — check the database seed data.
          </p>
        ) : (
          services.map((service) => (
            <ServiceEditorRow key={service.id} service={service} />
          ))
        )}
      </div>
    </AdminShell>
  );
}
