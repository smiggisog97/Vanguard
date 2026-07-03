import Link from "next/link";
import Button from "@/components/ui/button";
import SectionHeader from "@/components/ui/section-header";
import ResearchCard from "@/components/ui/research-card";
import MetricCard from "@/components/ui/metric-card";
import CTABanner from "@/components/ui/cta-banner";
import Newsletter from "@/components/ui/newsletter";
import LogoMarquee from "@/components/ui/logo-marquee";
import SoftBlurIn from "@/components/ui/soft-blur-in";
import { PillarIcon, type PillarIconName } from "@/components/ui/pillar-icons";
import { FeatureCard, getAdvisoryServiceIcon } from "@/components/ui/feature-card";
import { reports, metrics, insights, advisoryServices } from "@/lib/data";

const pillars: {
  title: string;
  description: string;
  href: string;
  icon: PillarIconName;
}[] = [
  {
    title: "Business Research",
    description:
      "Sector, macro, and capital-markets briefs: free for lead capture, paid for depth.",
    href: "/research",
    icon: "research",
  },
  {
    title: "Bespoke Research",
    description:
      "Commissioned, confidential research for institutions, corporates, and investors.",
    href: "/bespoke",
    icon: "bespoke",
  },
  {
    title: "Corporate Advisory",
    description:
      "Capital strategy, investor readiness, valuation, and governance for corporates.",
    href: "/advisory",
    icon: "advisory",
  },
  {
    title: "Advanced Incubator",
    description:
      "AI-driven cohorts for family business owners and startup founders.",
    href: "/incubator",
    icon: "incubator",
  },
];

export default function Home() {
  const featured = reports.slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="mx-auto max-w-[1200px] px-6 pt-[80px] pb-[60px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[1.4fr_1fr]">
          <SoftBlurIn
            text="Frontier research that converts into capital and counsel for enterprise in emerging Asia."
            className="font-display text-[40px] leading-[1.08] tracking-[-0.96px] text-ink md:text-[48px]"
          />
          <div className="reveal-section flex flex-col justify-between gap-6">
            <p className="text-[16px] leading-[1.5] text-driftwood">
              Vanguard turns published sector, macro, and capital-markets
              research into bespoke research, corporate advisory, and executive
              education for founders, family businesses, corporates, and
              investors across Bangladesh, India, Thailand, Singapore, and the
              wider region.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button href="/research" variant="dark">
                Explore Research
              </Button>
              <Button href="/contact" variant="ghost">
                Book Advisory Call
              </Button>
            </div>
          </div>
        </div>
      </section>

      <LogoMarquee />

      {/* Featured Research */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 py-[61px]">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeader
            eyebrow="Latest Research"
            title="Research that establishes credibility"
            description="Free and paid briefs across sector, macro, and capital-markets coverage: the visible front door of the platform."
          />
          <Link href="/research" className="text-[15px] text-ink">
            View all research →
          </Link>
        </div>
        <div className="reveal-stagger mt-10 grid grid-cols-1 gap-1 md:grid-cols-3">
          {featured.map((report) => (
            <ResearchCard key={report.slug} report={report} />
          ))}
        </div>
      </section>

      {/* Four Product Pillars */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 py-[61px]">
        <SectionHeader
          eyebrow="The Platform"
          title="From research discovery to advisory mandate"
          description="Every product line moves a visitor deeper into a single funnel, not four disconnected services."
        />
        <div className="reveal-stagger mt-10 grid grid-cols-1 gap-1 md:grid-cols-2">
          {pillars.map((p) => (
            <Link
              key={p.title}
              href={p.href}
              className="card-lift pressable group bg-warm-sand p-[31px] transition-colors"
              style={{ borderRadius: "16px" }}
            >
              <PillarIcon name={p.icon} />
              <h3 className="mt-4 font-display text-[24px] text-ink group-hover:text-hover">
                {p.title}
              </h3>
              <p className="mt-3 text-[15px] leading-[1.5] text-driftwood">
                {p.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Vanguard */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 py-[61px]">
        <SectionHeader
          eyebrow="Why Vanguard"
          title="Built on research credibility, led by practitioners"
        />
        <div className="reveal-stagger mt-10 grid grid-cols-1 gap-1 md:grid-cols-3">
          {metrics.map((m) => (
            <MetricCard key={m.label} value={m.value} label={m.label} />
          ))}
        </div>
      </section>

      {/* Corporate Advisory */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 py-[61px]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
          <SectionHeader
            eyebrow="Corporate Advisory"
            title="Capital strategy and governance for corporates and family businesses"
            description="Five service lines that move clients from research credibility to institutional capital readiness."
          />
          <div className="reveal-stagger grid grid-cols-1 gap-1 md:grid-cols-2">
            {advisoryServices.slice(0, 4).map((s) => (
              <FeatureCard
                key={s.title}
                icon={getAdvisoryServiceIcon(s.title)}
                title={s.title}
                description={s.description}
                titleClassName="font-display text-[18px] text-ink"
                descriptionClassName="mt-2 text-[14px] leading-[1.4] text-driftwood"
              />
            ))}
          </div>
        </div>
        <div className="mt-8">
          <Button href="/advisory" variant="dark">
            Explore Corporate Advisory
          </Button>
        </div>
      </section>

      {/* AI Programs */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 py-[61px]">
        <CTABanner
          eyebrow="Advanced Incubator"
          title="Driving profit and productivity through AI"
          description="Cohort-based programs for family business owners and startup founders across emerging Asia."
          primary={{ href: "/incubator", label: "Explore the Incubator" }}
          secondary={{ href: "/contact", label: "Talk to our team" }}
        />
      </section>

      {/* Latest Insights */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 py-[61px]">
        <SectionHeader
          eyebrow="Insights"
          title="Articles, podcast, and media"
        />
        <div className="reveal-stagger mt-10 grid grid-cols-1 gap-1 md:grid-cols-3">
          {insights.map((i) => (
            <Link
              key={i.slug}
              href="/insights"
              className="card-lift pressable bg-warm-sand p-[31px] transition-colors"
              style={{ borderRadius: "16px" }}
            >
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-hover">
                {i.type} · {i.date}
              </p>
              <p className="mt-3 font-display text-[20px] text-ink">
                {i.title}
              </p>
              <p className="mt-2 text-[15px] leading-[1.5] text-driftwood">
                {i.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="reveal-section mx-auto max-w-[1200px] px-6 pb-[61px]">
        <Newsletter />
      </section>
    </div>
  );
}
