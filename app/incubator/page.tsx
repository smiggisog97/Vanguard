import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import InquiryForm from "@/components/inquiry-form";
import Button from "@/components/ui/button";
import FunnelCta from "@/components/ui/funnel-cta";
import { incubatorPrograms, funnelLinks } from "@/lib/data";

export const metadata = { title: "Advanced Incubator | Vanguard" };

const faqs = [
  {
    q: "Who should apply?",
    a: "Family business owners and startup founders across emerging Asia looking to capture AI-driven margin or productivity gains.",
  },
  {
    q: "Is this delivered in-person or online?",
    a: "Both. Cohorts run hybrid, with live workshops and asynchronous coursework between sessions.",
  },
  {
    q: "How are cohorts sized?",
    a: "Cohorts are capped at 20 participants to keep peer discussion and advisor access high-touch.",
  },
];

export default function IncubatorPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="Advanced Incubator"
          title="Driving profit and productivity through AI"
          description="Two cohort-based programs, each built for a distinct audience: family business owners and startup founders across emerging Asia."
        />
      </section>

      <section className="reveal-section mt-12">
        <div className="reveal-stagger space-y-6">
          {incubatorPrograms.map((p) => (
            <div
              key={p.slug}
              className="bg-warm-sand p-[31px]"
              style={{ borderRadius: "16px" }}
            >
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
                    {p.audience}
                  </p>
                  <h2 className="mt-2 font-display text-[30px] text-ink">
                    {p.title}
                  </h2>
                </div>
                <span
                  className={`font-mono text-xs font-semibold uppercase tracking-wide ${p.cohortStatus === "Open" ? "text-moss" : p.cohortStatus === "Waitlist" ? "text-gold" : "text-driftwood"}`}
                >
                  {p.cohortStatus} · {p.duration}
                </span>
              </div>
              <p className="mt-4 max-w-2xl text-[16px] leading-[1.5] text-driftwood">
                {p.overview}
              </p>
              <div className="mt-6 flex flex-wrap gap-4">
                <Button href={`/incubator/${p.slug}`} variant="dark">
                  View program
                </Button>
                <span className="self-center text-[14px] text-driftwood">
                  {p.price}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <FunnelCta
          href={funnelLinks.programToAdvisory.href}
          label={funnelLinks.programToAdvisory.label}
          description="Connect program learnings to a capital strategy engagement."
        />
      </section>

      <section className="reveal-section mt-16">
        <h2 className="font-display text-[24px] text-ink">FAQ</h2>
        <div className="reveal-stagger mt-6 space-y-4">
          {faqs.map((f) => (
            <div key={f.q} className="pb-4">
              <p className="font-display text-[18px] text-ink">{f.q}</p>
              <p className="mt-2 text-[15px] text-driftwood">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-16 max-w-xl">
        <InquiryForm
          title="Apply to the Advanced Incubator"
          submitLabel="Apply Now"
          pipeline="enrollment"
        />
      </section>
    </div>
  );
}
