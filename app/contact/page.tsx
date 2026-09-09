import { ContactForm } from "@/components/sections/ContactForm";
import { getSiteSettings } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm uppercase tracking-widest text-muted">Contact</p>
      <h1 className="mt-4 font-display text-4xl">Get in touch</h1>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <div>
          <h2 className="font-display text-lg">{settings.company_name}</h2>
          <p className="mt-3 whitespace-pre-line text-sm text-muted">
            {settings.address}
          </p>
          <p className="mt-3 text-sm text-muted">{settings.phone}</p>

          {/* Map placeholder — to be replaced with an embedded map */}
          <div className="mt-8 flex h-56 items-center justify-center border border-line text-xs text-muted">
            Map placeholder
          </div>
        </div>

        <div>
          <h2 className="font-display text-lg">Send an enquiry</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}