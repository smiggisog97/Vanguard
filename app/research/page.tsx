import { Suspense } from "react";
import SectionHeader from "@/components/ui/section-header";
import ResearchLibrary from "@/components/research-library";
import FunnelCta from "@/components/ui/funnel-cta";
import { reports, funnelLinks } from "@/lib/data";

export const metadata = {
  title: "Research Library | Vanguard",
  description:
    "Search and filter sector, macro, and capital-markets research across emerging Asia.",
};

export default function ResearchPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="Research Library"
          title="Sector, macro, and capital-markets research"
          description="Search and filter free and paid briefs across the region. Free reports require an email. Paid reports require checkout."
        />
      </section>
      <section className="reveal-section mt-10">
        <Suspense
          fallback={<p className="text-driftwood">Loading library...</p>}
        >
          <ResearchLibrary reports={reports} />
        </Suspense>
      </section>
      <section className="reveal-section mt-16 grid grid-cols-1 gap-1 md:grid-cols-2">
        <FunnelCta
          href={funnelLinks.researchToAdvisory.href}
          label={funnelLinks.researchToAdvisory.label}
          description="Turn research insights into a capital strategy engagement."
        />
        <FunnelCta
          href={funnelLinks.researchToProgram.href}
          label={funnelLinks.researchToProgram.label}
          description="Apply frameworks from our research through executive education."
        />
      </section>
    </div>
  );
}
