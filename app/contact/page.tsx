import { ContactForm } from "@/components/sections/ContactForm";
import { Reveal } from "@/components/ui/Reveal";
import { getSiteSettings } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ContactPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-eyebrow text-muted">Contact</p>
        <h1 className="text-h1 mt-4 font-display">Get in touch</h1>
      </Reveal>

      <div className="mt-16 grid gap-16 md:grid-cols-2">
        <Reveal>
          <h2 className="font-display text-lg">{settings.company_name}</h2>
          <p className="mt-3 whitespace-pre-line text-sm text-muted">
            {settings.address}
          </p>
          <p className="mt-3 text-sm text-muted">{settings.phone}</p>

          {/* Map placeholder — to be replaced with an embedded map */}
          <div className="mt-8 flex h-56 items-center justify-center border border-line bg-surface text-xs text-muted">
            Map placeholder
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <h2 className="font-display text-lg">Send an enquiry</h2>
          <div className="mt-6">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
