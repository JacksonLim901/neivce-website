import { AdminShell } from "@/components/admin/AdminShell";
import { EnquiryCard } from "@/components/admin/EnquiryCard";
import { getEnquiries } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function AdminEnquiriesPage() {
  const enquiries = await getEnquiries();

  return (
    <AdminShell>
      <h1 className="font-display text-2xl">Enquiries</h1>
      <p className="mt-2 text-sm text-muted">
        Messages submitted through the public Contact form.
      </p>

      <div className="mt-8 space-y-4">
        {enquiries.length === 0 ? (
          <p className="text-sm text-muted">No enquiries yet.</p>
        ) : (
          enquiries.map((enquiry) => (
            <EnquiryCard key={enquiry.id} enquiry={enquiry} />
          ))
        )}
      </div>
    </AdminShell>
  );
}
