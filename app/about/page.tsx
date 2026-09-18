import { Reveal } from "@/components/ui/Reveal";
import Image from "next/image";

const pillars = [
  {
    number: "01",
    title: "What We Do",
    body: "NEIVCE Trading PLT operates across three business activities: e-commerce, computer programming services, and computer training.",
  },
  {
    number: "02",
    title: "Mission",
    body: "To make practical technology accessible — helping businesses trade online, building software that solves real problems, and teaching the computer skills people need to use it all with confidence.",
  },
  {
    number: "03",
    title: "Vision",
    body: "A future where every business we work with, and every person we train, is equipped to use technology on their own terms — capable and no longer dependent on us for the basics.",
  },
  {
    number: "04",
    title: "Values",
    body: "Practicality over hype, clarity in how we communicate, and long-term thinking — we build systems and teach skills that hold up well after the project ends.",
  },
];

export default function AboutPage() {
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
            <p className="text-eyebrow text-muted">About Us</p>
            <h1 className="text-h1 mt-4 font-display">Company Overview</h1>
            <p className="mt-6 max-w-2xl text-muted">
              [PLACEHOLDER — company background content will be pulled from
              the admin panel once connected to the database.]
            </p>
          </Reveal>
        </div>
      </section>

      {/* Timeline-style layout instead of a 2x2 grid */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="mt-20 border-t border-line">
          {pillars.map((pillar, i) => (
            <Reveal key={pillar.number} delay={i * 0.05}>
              <div className="grid gap-2 border-b border-line py-10 md:grid-cols-[100px_180px_1fr] md:items-baseline md:gap-8">
                <span className="font-display text-sm text-muted">
                  {pillar.number}
                </span>
                <h2 className="font-display text-xl">{pillar.title}</h2>
                <p className="max-w-xl text-sm text-muted">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
