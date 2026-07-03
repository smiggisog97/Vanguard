import SectionHeader from "@/components/ui/section-header";
import Timeline from "@/components/ui/timeline";
import InquiryForm from "@/components/inquiry-form";
import FunnelCta from "@/components/ui/funnel-cta";
import ResearchCard from "@/components/ui/research-card";
import { FeatureCard } from "@/components/ui/feature-card";
import CoveragePanel from "@/components/ui/coverage-panel";
import { bespokeProcess, reports, funnelLinks } from "@/lib/data";

export const metadata = { title: "Bespoke Research | Vanguard" };

const audiences = [
  "Family Offices",
  "Corporates",
  "Development Finance",
  "Institutional Investors",
];

const characteristics = [
  {
    title: "Confidential deliverables tailored to your decision",
    icon: "shield-check",
  },
  {
    title: "Primary and secondary research across emerging Asia",
    icon: "search",
  },
  {
    title: "Fixed-fee proposals with defined timelines",
    icon: "file-text",
  },
  {
    title: "Live presentation to your board or investment committee",
    icon: "presentation",
  },
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
        <CoveragePanel
          eyebrow="Client profile"
          title="Family offices, corporates, and institutional capital across emerging Asia"
          description="Bespoke engagements are scoped to the specific decision your investment or policy mandate depends on."
          items={audiences}
          chipLayouts={[
            { top: "10%", left: "6%", rotate: -2.5 },
            { top: "8%", left: "50%", rotate: 3 },
            { top: "52%", left: "12%", rotate: -2 },
            { top: "48%", left: "54%", rotate: 1.5 },
          ]}
        />
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">
          Engagement Process
        </h2>
        <div className="mt-6">
          <Timeline
            steps={bespokeProcess}
            icons={[
              "message-circle",
              "file-search",
              "file-signature",
              "microscope",
              "eye",
              "package",
              "users",
            ]}
          />
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">What to expect</h2>
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-1 md:grid-cols-3">
          {characteristics.map((c) => (
            <FeatureCard
              key={c.title}
              icon={c.icon}
              title={c.title}
              titleClassName="font-display text-[16px] leading-[1.4] text-ink"
              descriptionClassName="hidden"
            />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Related Research</h2>
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-1 md:grid-cols-3">
          {reports.slice(0, 3).map((r) => (
            <ResearchCard key={r.slug} report={r} />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12 grid grid-cols-1 gap-1 md:grid-cols-2">
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
