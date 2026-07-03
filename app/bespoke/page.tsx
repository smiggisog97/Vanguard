import SectionHeader from "@/components/ui/section-header";
import Timeline from "@/components/ui/timeline";
import InquiryForm from "@/components/inquiry-form";
import FunnelCta from "@/components/ui/funnel-cta";
import ResearchCard from "@/components/ui/research-card";
import { bespokeProcess, reports, funnelLinks } from "@/lib/data";

export const metadata = { title: "Bespoke Research | Vanguard" };

const audiences = [
  "Family Offices",
  "Corporates",
  "Development Finance",
  "Institutional Investors",
];

const characteristics = [
  "Confidential deliverables tailored to your decision",
  "Primary and secondary research across emerging Asia",
  "Fixed-fee proposals with defined timelines",
  "Live presentation to your board or investment committee",
];

export default function BespokePage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="Bespoke Research"
          title="Custom research for institutional decision-makers"
          description="When published research is not enough, Vanguard designs confidential engagements to answer the specific question your capital decision depends on."
        />
      </section>

      <section className="reveal-section mt-10">
        <h2 className="font-display text-[24px] text-ink">Who we work with</h2>
        <div className="reveal-stagger mt-4 flex flex-wrap gap-3">
          {audiences.map((a) => (
            <span
              key={a}
              className="bg-warm-sand px-4 py-2 text-[14px] text-ink"
              style={{ borderRadius: "16px" }}
            >
              {a}
            </span>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">
          Engagement Process
        </h2>
        <div className="mt-6">
          <Timeline steps={bespokeProcess} />
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">What to expect</h2>
        <ul className="mt-4 space-y-2">
          {characteristics.map((c) => (
            <li key={c} className="flex gap-3 text-[15px] text-ink">
              <span className="text-royal">·</span>
              {c}
            </li>
          ))}
        </ul>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Related Research</h2>
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
          {reports.slice(0, 3).map((r) => (
            <ResearchCard key={r.slug} report={r} />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
        <FunnelCta
          href={funnelLinks.advisoryToResearch.href}
          label="Browse published research"
          description="Start with our library before commissioning bespoke work."
        />
        <FunnelCta
          href="/advisory"
          label="Explore Corporate Advisory"
          description="Pair bespoke research with capital strategy advisory."
        />
      </section>

      <section className="reveal-section mt-16 max-w-xl">
        <InquiryForm
          title="Request a bespoke research proposal"
          submitLabel="Request proposal"
        />
      </section>
    </div>
  );
}
