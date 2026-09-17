import { LinkButton } from "@/components/ui/Button";
import { HeroVisual } from "@/components/sections/HeroVisual";
import { Reveal } from "@/components/ui/Reveal";
import { getServices, getSiteSettings } from "@/lib/supabase/queries";
import Image from "next/image";

// Always fetch fresh data so admin edits show up immediately.
export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);

  return (
    <div>
      {/* Hero — asymmetric left text / right visual, with a blurred
          photo backdrop that bleeds up behind the transparent navbar */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-x-0 -top-20 bottom-0">
          <Image
            src="/images/hero-bg.jpg"
            alt=""
            aria-hidden="true"
            fill
            priority
            className="scale-110 object-cover opacity-70 blur-sm"
          />
          <div className="hero-photo-overlay absolute inset-0" />
          <div className="bg-dot-grid absolute inset-0" />
        </div>

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 py-20 md:grid-cols-2 md:py-32">
          <div>
            <p className="text-eyebrow text-muted">{settings.company_name}</p>
            <h1 className="text-display mt-4 font-display">
              Practical technology, delivered with care.
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted">
              {settings.introduction}
            </p>
            <div className="mt-8 flex gap-4">
              <LinkButton href="/services">Explore Services</LinkButton>
              <LinkButton href="/contact" variant="ghost">
                Contact Us
              </LinkButton>
            </div>
          </div>

          <div className="hidden h-[460px] md:block">
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Homepage announcement, only shown if one is set */}
      {settings.announcement && (
        <section className="border-b border-line bg-surface">
          <div className="mx-auto max-w-6xl px-6 py-4 text-sm text-ink">
            {settings.announcement}
          </div>
        </section>
      )}

      {/* Business highlights — horizontal numbered strip, not cards */}
      <Reveal>
        <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
          <h2 className="text-h2 font-display">What we do</h2>
          <div className="mt-12 border-t border-line">
            {services.map((service) => (
              <div
                key={service.id}
                className="group grid gap-2 border-b border-line py-8 pl-0 transition-all duration-200 ease-out hover:bg-surface hover:pl-4 md:grid-cols-[80px_1fr_1.4fr] md:items-baseline md:gap-8"
              >
                <span className="font-display text-sm text-muted transition-colors group-hover:text-accent">
                  {String(service.display_order).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg">{service.title}</h3>
                <p className="text-sm text-muted">{service.description}</p>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Why choose NEIVCE */}
      <Reveal>
        <section className="bg-dot-grid-dark border-t border-line bg-ink text-paper">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <h2 className="text-h2 font-display">Why choose NEIVCE</h2>
            <p className="mt-4 max-w-xl text-paper/70">
              [PLACEHOLDER — value proposition content to be finalised without
              fabricated statistics, awards, or client claims.]
            </p>
          </div>
        </section>
      </Reveal>

      {/* Trust / company info — asymmetric text + card */}
      <Reveal>
        <section className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-[1.2fr_1fr] md:py-28">
          <div>
            <h2 className="text-h2 font-display">Visit or reach us</h2>
            <p className="mt-4 max-w-sm text-muted">
              We&apos;re based in Kajang, Selangor — reach out for enquiries
              about e-commerce, programming, or training.
            </p>
            <div className="mt-6">
              <LinkButton href="/contact" variant="ghost">
                Get in touch
              </LinkButton>
            </div>
          </div>
          <div className="card p-6">
            <p className="text-muted">{settings.address}</p>
            <p className="mt-3 text-muted">{settings.phone}</p>
          </div>
        </section>
      </Reveal>
    </div>
  );
}
