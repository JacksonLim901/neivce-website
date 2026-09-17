import { Reveal } from "@/components/ui/Reveal";
import { getServices } from "@/lib/supabase/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div>
      {/* Intro — full-width photo backdrop, same premium treatment as
          the Home hero (soft blur, ~50% opacity, readable overlay). */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0">
          <Image
            src="/images/workspace.jpg"
            alt=""
            aria-hidden="true"
            fill
            className="scale-105 object-cover opacity-95 blur-sm"
          />
          <div className="hero-photo-overlay absolute inset-0" />
          <div className="bg-dot-grid absolute inset-0" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <Reveal>
            <p className="text-eyebrow text-muted">Services</p>
            <h1 className="text-h1 mt-4 font-display">What we offer</h1>
          </Reveal>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-6">
        <div className="mt-16 divide-y divide-line border-t border-line">
          {services.map((service, i) => (
            <Reveal key={service.id} delay={i * 0.05}>
                            <div
                className={`flex flex-col gap-4 py-12 md:flex-row md:items-baseline md:gap-8 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <span className="shrink-0 font-display text-3xl text-muted md:w-[100px]">
                  0{i + 1}
                </span>
                <div className="flex-1">
                  <h2 className="font-display text-2xl">{service.title}</h2>
                  <p className="mt-3 max-w-xl text-sm text-muted">
                    {service.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
