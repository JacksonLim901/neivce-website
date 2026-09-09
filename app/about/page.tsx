import { LinkButton } from "@/components/ui/Button";
import { getServices, getSiteSettings } from "@/lib/supabase/queries";

// Always fetch fresh data so admin edits show up immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return (
    <div>
      {/* 1. Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm uppercase tracking-widest text-muted">
            {settings.company_name}
          </p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Practical technology, delivered with care.
          </h1>
          <p className="mt-6 max-w-xl text-muted">{settings.introduction}</p>
          <div className="mt-8 flex gap-4">
            <LinkButton href="/services">Explore Services</LinkButton>
            <LinkButton href="/contact" variant="ghost">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </section>

      {/* Homepage announcement, only shown if one is set */}
      {settings.announcement && (
        <section className="border-b border-line bg-line/30">
          <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-ink">
            {settings.announcement}
          </div>
        </section>
      )}

      {/* 2 & 3. Introduction + business highlights */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl">What we do</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {services.map((service, i) => (
            <div key={service.id} className="border border-line p-6">
              <span className="text-sm text-muted">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg">{service.title}</h3>
              <p className="mt-2 text-sm text-muted">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why choose NEIVCE */}
      <section className="border-t border-line bg-ink text-paper">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className="font-display text-2xl">Why choose NEIVCE</h2>
          <p className="mt-4 max-w-xl text-paper/70">
            [PLACEHOLDER — value proposition content to be finalised without
            fabricated statistics, awards, or client claims.]
          </p>
        </div>
      </section>

      {/* 6. Trust / company info */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl">Visit or reach us</h2>
        <p className="mt-4 text-muted">{settings.address}</p>
        <p className="text-muted">{settings.phone}</p>
        <div className="mt-6">
          <LinkButton href="/contact" variant="ghost">
            Get in touch
          </LinkButton>
        </div>
      </section>
    </div>
  );
}