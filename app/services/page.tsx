import { Reveal } from "@/components/ui/Reveal";
import { getServices } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
      <Reveal>
        <p className="text-eyebrow text-muted">Services</p>
        <h1 className="text-h1 mt-4 font-display">What we offer</h1>
      </Reveal>

      <div className="mt-16 divide-y divide-line border-t border-line">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.05}>
            <div
              className={`grid gap-6 py-12 md:grid-cols-[100px_1fr] ${
                i % 2 === 1 ? "md:[&>div:last-child]:order-first" : ""
              }`}
            >
              <span className="font-display text-3xl text-muted">
                0{i + 1}
              </span>
              <div>
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
  );
}
