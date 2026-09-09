import { getServices } from "@/lib/supabase/queries";

export const dynamic = "force-dynamic";

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="mx-auto max-w-5xl px-6 py-20">
      <p className="text-sm uppercase tracking-widest text-muted">Services</p>
      <h1 className="mt-4 font-display text-4xl">What we offer</h1>

      <div className="mt-16 divide-y divide-line border-t border-line">
        {services.map((service, i) => (
          <div
            key={service.id}
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
        ))}
      </div>
    </div>
  );
}