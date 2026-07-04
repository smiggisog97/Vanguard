import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import InquiryForm from "@/components/inquiry-form";
import FunnelCta from "@/components/ui/funnel-cta";
import FaqSection from "@/components/ui/faq-section";
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
        <div className="reveal-stagger grid grid-cols-1 gap-1 md:grid-cols-2">
          {incubatorPrograms.map((p) => (
            <div
              key={p.slug}
              className="flex flex-col justify-between bg-warm-sand p-[31px]"
              style={{ borderRadius: "16px" }}
            >
              {/* Top */}
              <div>
                <div className="flex items-start justify-between gap-4">
                  <span className="font-mono text-[11px] font-semibold uppercase tracking-wide text-driftwood">
                    {p.audience}
                  </span>
                  <span
                    className={`font-mono text-[11px] font-semibold uppercase tracking-wide ${
                      p.cohortStatus === "Open"
                        ? "text-moss"
                        : p.cohortStatus === "Waitlist"
                          ? "text-gold"
                          : "text-driftwood"
                    }`}
                  >
                    {p.cohortStatus}
                  </span>
                </div>

                <h2 className="mt-2 font-display text-[28px] leading-[1.1] text-ink md:text-[32px]">
                  {p.title}
                </h2>
                <p className="mt-4 text-[15px] leading-[1.55] text-driftwood">
                  {p.overview}
                </p>
              </div>

              {/* Bottom */}
              <div className="mt-8 border-t border-fog/40 pt-6">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="space-y-1">
                    <p className="font-mono text-[11px] uppercase tracking-wide text-driftwood">
                      {p.duration}
                    </p>
                    <p className="font-display text-[22px] text-ink">
                      {p.price}
                    </p>
                  </div>
                  <Link
                    href={`/incubator/${p.slug}`}
                    className="btn-action inline-flex items-center justify-center rounded-full bg-ink px-5 py-2 text-[14px] font-medium text-parchment transition-colors hover:bg-hover hover:text-parchment"
                  >
                    View program
                  </Link>
                </div>
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

      <FaqSection items={faqs} className="reveal-section mt-16" stagger />

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
