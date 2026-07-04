import SectionHeader from "@/components/ui/section-header";
import Timeline from "@/components/ui/timeline";
import MetricCard from "@/components/ui/metric-card";
import Newsletter from "@/components/ui/newsletter";
import FunnelCta from "@/components/ui/funnel-cta";
import { founderBio, careerTimeline, metrics, funnelLinks } from "@/lib/data";

export const metadata = {
  title: "About | Vanguard",
  description:
    "Biography, publications, and leadership of Sajid Amit, founder of Vanguard.",
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="About"
          title={founderBio.name}
          description={founderBio.title}
        />
      </section>

      {/* 2-col grid: sidebar sticky alongside bio sections only */}
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_300px]">
        {/* Left: bio sections */}
        <div className="space-y-12">
          <section className="reveal-section">
            <h2 className="font-display text-[24px] text-ink">Biography</h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-driftwood">
              {founderBio.biography}
            </p>
          </section>

          <section className="reveal-section">
            <h2 className="font-display text-[24px] text-ink">Mission</h2>
            <p className="mt-4 text-[16px] leading-[1.65] text-driftwood">
              {founderBio.mission}
            </p>
          </section>

          <section className="reveal-section">
            <h2 className="font-display text-[24px] text-ink">Education</h2>
            <ul className="mt-4 space-y-2">
              {founderBio.education.map((e) => (
                <li key={e} className="text-[15px] text-ink">{e}</li>
              ))}
            </ul>
          </section>

          <section className="reveal-section">
            <h2 className="font-display text-[24px] text-ink">
              Publications ({founderBio.publications.count})
            </h2>
            <ul className="mt-4 space-y-2">
              {founderBio.publications.outlets.map((o) => (
                <li key={o} className="text-[15px] text-ink">{o}</li>
              ))}
            </ul>
          </section>

          <section className="reveal-section">
            <h2 className="font-display text-[24px] text-ink">Speaking & Media</h2>
            <div className="mt-4 grid grid-cols-1 gap-1 md:grid-cols-2">
              <div>
                <p className="font-mono text-xs uppercase text-driftwood">Speaking</p>
                <ul className="mt-2 space-y-1">
                  {founderBio.speaking.map((s) => (
                    <li key={s} className="text-[15px] text-ink">{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-xs uppercase text-driftwood">Media</p>
                <ul className="mt-2 space-y-1">
                  {founderBio.media.map((m) => (
                    <li key={m} className="text-[15px] text-ink">{m}</li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          <section className="reveal-section">
            <h2 className="font-display text-[24px] text-ink">Institutional Roles</h2>
            <ul className="mt-4 space-y-2">
              {founderBio.institutionalRoles.map((r) => (
                <li key={r} className="text-[15px] text-ink">{r}</li>
              ))}
            </ul>
          </section>
        </div>

        {/* Right: sticky profile card */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="bg-warm-sand p-8 text-center"
            style={{ borderRadius: "16px" }}
          >
            <div
              className="mx-auto flex h-32 w-32 items-center justify-center rounded-full bg-ash-border font-display text-[48px] text-driftwood"
              aria-hidden
            >
              SA
            </div>
            <p className="mt-4 font-display text-[20px] text-ink">
              {founderBio.name}
            </p>
            <p className="text-[14px] text-driftwood">{founderBio.title}</p>
          </div>
        </div>
      </div>

      {/* Full-width sections from Career Timeline onwards */}
      <section className="reveal-section mt-12">
        <h2 className="font-display text-[24px] text-ink">Career Timeline</h2>
        <div className="mt-6">
          <Timeline
            steps={careerTimeline.map((t) => ({
              step: t.year,
              description: `${t.title}: ${t.description}`,
            }))}
          />
        </div>
      </section>

      <section className="reveal-section mt-12">
        <div className="grid grid-cols-1 gap-1 md:grid-cols-3">
          {metrics.map((m) => (
            <MetricCard key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </section>

      <section className="reveal-section mt-12">
        <FunnelCta
          href={funnelLinks.advisoryToResearch.href}
          label="Browse research library"
          description="Explore the research behind Vanguard's advisory and education work."
        />
      </section>

      <section className="reveal-section mt-16">
        <Newsletter />
      </section>
    </div>
  );
}
