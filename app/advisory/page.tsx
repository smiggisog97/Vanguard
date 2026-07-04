import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import {
  FeatureCard,
  getAdvisoryServiceIcon,
} from "@/components/ui/feature-card";
import ServiceDeliverablesIndex from "@/components/ui/service-deliverables-index";
import IndustryCoverage from "@/components/ui/industry-coverage";
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
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-1">
          {advisoryServices.map((s, i) => (
            <FeatureCard
              key={s.title}
              icon={getAdvisoryServiceIcon(s.title)}
              title={s.title}
              description={s.description}
              className={`bg-warm-sand p-[31px]${i === advisoryServices.length - 1 && advisoryServices.length % 2 !== 0 ? " md:col-span-2" : ""}`}
            />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">
          Services & Deliverables
        </h2>
        <ServiceDeliverablesIndex services={advisoryServices} />
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Industries</h2>
        <IndustryCoverage industries={advisoryIndustries} />
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
            icons={[
              "scan-search",
              "pen-line",
              "target",
              "play",
              "refresh-cw",
            ]}
          />
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">FAQ</h2>
        <div className="mt-6 divide-y divide-fog/40">
          {advisoryFaqs.map((f) => (
            <div key={f.q} className="py-5">
              <p className="font-display text-[18px] text-ink">{f.q}</p>
              <p className="mt-2 text-[15px] text-driftwood">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Related Research</h2>
        <div className="reveal-stagger mt-6 grid grid-cols-1 gap-1 md:grid-cols-3">
          {relatedResearch.map((r) => (
            <ResearchCard key={r.slug} report={r} />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-16 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_420px]">
        <div className="flex flex-col gap-6">
          <FunnelCta
            href={funnelLinks.advisoryToResearch.href}
            label={funnelLinks.advisoryToResearch.label}
            description="Ground your advisory engagement in Vanguard's published research."
          />
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
        </div>
        <InquiryForm
          title="Request an advisory proposal"
          submitLabel="Request proposal"
        />
      </section>
    </div>
  );
}
