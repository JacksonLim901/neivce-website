import { LinkButton } from "@/components/ui/Button";

const highlights = [
  {
    title: "E-commerce",
    description: "Helping businesses sell online with reliable, easy-to-manage storefronts.",
  },
  {
    title: "Programming Services",
    description: "Custom software and web development built around real business needs.",
  },
  {
    title: "Computer Training",
    description: "Practical computing skills training for individuals and organisations.",
  },
];

export default function HomePage() {
  return (
    <div>
      {/* 1. Hero */}
      <section className="border-b border-line">
        <div className="mx-auto max-w-6xl px-6 py-24">
          <p className="text-sm uppercase tracking-widest text-muted">NEIVCE Trading PLT</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl leading-tight md:text-5xl">
            Practical technology, delivered with care.
          </h1>
          <p className="mt-6 max-w-xl text-muted">
            [PLACEHOLDER — company introduction will be pulled from the admin
            panel once connected to the database.]
          </p>
          <div className="mt-8 flex gap-4">
            <LinkButton href="/services">Explore Services</LinkButton>
            <LinkButton href="/contact" variant="ghost">
              Contact Us
            </LinkButton>
          </div>
        </div>
      </section>

      {/* 2 & 3. Introduction + business highlights */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="font-display text-2xl">What we do</h2>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {highlights.map((item, i) => (
            <div key={item.title} className="border border-line p-6">
              <span className="text-sm text-muted">0{i + 1}</span>
              <h3 className="mt-3 font-display text-lg">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
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
        <p className="mt-4 text-muted">
          B5 - B7, Block B, Jalan TKS 1, Taman Kajang Sentral, 43000 Kajang, Selangor
        </p>
        <p className="text-muted">03-8737 8770</p>
        <div className="mt-6">
          <LinkButton href="/contact" variant="ghost">
            Get in touch
          </LinkButton>
        </div>
      </section>
    </div>
  );
}
