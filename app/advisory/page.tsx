import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Timeline from "@/components/ui/timeline";
import InquiryForm from "@/components/inquiry-form";
import Button from "@/components/ui/button";
import ResearchCard from "@/components/ui/research-card";
import FunnelCta from "@/components/ui/funnel-cta";
import {
  advisoryServices,
  advisoryProcess,
  advisoryIndustries,
  advisoryFaqs,
  reports,
  funnelLinks,
} from "@/lib/data";

export const metadata = {
  title: "Corporate Advisory | Vanguard",
  description:
    "Capital strategy, investor readiness, valuation, governance, and capital markets advisory.",
};

export default function AdvisoryPage() {
  const relatedResearch = reports.slice(0, 3);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="Corporate Advisory"
          title="Capital strategy and governance for corporates and family businesses"
          description="Professional advisory built on the credibility of our published research, for corporates and family businesses preparing for institutional capital."
        />
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Problems We Solve</h2>
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {advisoryServices.map((s) => (
            <div
              key={s.title}
              className="bg-warm-sand p-[31px]"
              style={{ borderRadius: "16px" }}
            >
              <p className="font-display text-[20px] text-ink">{s.title}</p>
              <p className="mt-2 text-[15px] leading-[1.5] text-driftwood">
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">
          Services & Deliverables
        </h2>
        <div className="reveal-stagger mt-6 space-y-4">
          {advisoryServices.map((s) => (
            <div
              key={s.title}
              className="bg-warm-sand p-6"
              style={{ borderRadius: "16px" }}
            >
              <p className="font-display text-[18px] text-ink">{s.title}</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.deliverables.map((d) => (
                  <li
                    key={d}
                    className="bg-parchment px-3 py-1 text-[13px] text-driftwood"
                    style={{ borderRadius: "9999px" }}
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Industries</h2>
        <div className="reveal-stagger mt-4 flex flex-wrap gap-3">
          {advisoryIndustries.map((i) => (
            <span
              key={i}
              className="bg-warm-sand px-4 py-2 text-[14px] text-ink"
              style={{ borderRadius: "16px" }}
            >
              {i}
            </span>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">
          Engagement Process
        </h2>
        <p className="mt-2 text-[15px] text-driftwood">
          Typical engagement timeline: 8-16 weeks depending on scope.
        </p>
        <div className="mt-6">
          <Timeline
            steps={advisoryProcess.map((p) => ({
              step: p.step,
              description: `${p.description} (${p.timeline})`,
            }))}
          />
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">FAQ</h2>
        <div className="mt-6 space-y-4">
          {advisoryFaqs.map((f) => (
            <div key={f.q} className="pb-4">
              <p className="font-display text-[18px] text-ink">{f.q}</p>
              <p className="mt-2 text-[15px] text-driftwood">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Related Research</h2>
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {relatedResearch.map((r) => (
            <ResearchCard key={r.slug} report={r} />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <FunnelCta
          href={funnelLinks.advisoryToResearch.href}
          label={funnelLinks.advisoryToResearch.label}
          description="Ground your advisory engagement in Vanguard's published research."
        />
      </section>

      <section className="reveal-section mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
        <div>
          <h2 className="font-display text-[24px] text-ink">
            Book a consultation
          </h2>
          <p className="mt-2 max-w-md text-[15px] text-driftwood">
            Talk to our advisory team about your capital strategy, governance,
            or investor-readiness needs.
          </p>
          <div className="mt-6">
            <Button href="/contact" variant="dark">
              Book Consultation Call
            </Button>
          </div>
        </div>
        <InquiryForm
          title="Request an advisory proposal"
          submitLabel="Request proposal"
        />
      </section>
    </div>
  );
}
