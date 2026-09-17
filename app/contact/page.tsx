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
          <div className="card mt-8 h-64 overflow-hidden">
  <iframe
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3984.4328670399254!2d101.7897472752933!3d2.977289496998815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cdcb8b8d2adf13%3A0xc20c0ed01b1bf4a5!2sNew%20Era%20Institute%20of%20Vocational%20%26%20Continuing%20Education!5e0!3m2!1sen!2smy!4v1789530940951!5m2!1sen!2smy"
    className="h-full w-full grayscale-[20%]"
    style={{ border: 0 }}
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
    title="NEIVCE Trading PLT location"
  />
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
