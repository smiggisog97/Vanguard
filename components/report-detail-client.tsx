"use client";

import Link from "next/link";
import ParallaxImage from "@/components/ui/parallax-image";
import { Suspense, useRef, useState } from "react";
import type { Report } from "@/lib/data";
import { funnelLinks } from "@/lib/data";
import { getReportSections } from "@/lib/report-content";
import AuthorCard from "@/components/ui/author-card";
import Button from "@/components/ui/button";
import ResearchCard from "@/components/ui/research-card";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import FunnelCta, { TagChips } from "@/components/ui/funnel-cta";
import BookmarkButton, { ShareButton } from "@/components/ui/bookmark-button";
import ReportDocument from "@/components/report-document";
import ReportGate from "@/components/report-gate";
import { BackLink } from "@/components/ui/back-link";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { useAuth } from "@/components/auth-provider";

function ReportDetailInner({
  report,
  related,
}: {
  report: Report;
  related: Report[];
}) {
  const { canAccessReport, ready } = useAuth();
  const documentRef = useRef<HTMLDivElement>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [purchaseOpen, setPurchaseOpen] = useState(false);
  const sections = getReportSections(report);
  const unlocked = ready && canAccessReport(report.slug, report.tier);
  const price = report.price ?? "$0";

  const scrollToReport = () => {
    documentRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <Breadcrumbs
        items={[
          { label: "Research", href: "/research" },
          { label: report.title },
        ]}
      />

      <div
        className="relative mt-6 aspect-[21/9] w-full overflow-hidden"
        style={{ borderRadius: "16px" }}
      >
        <ParallaxImage
          src={`https://picsum.photos/seed/${report.slug}-cover/1400/600`}
          alt=""
          className="object-cover"
          style={{ filter: "grayscale(1)" }}
          priority
          unoptimized
          fetchPriority="high"
          decoding="async"
        />
      </div>

      <section className="mt-10">
        <TagChips
          tags={[
            report.category,
            report.researchType,
            report.country,
            {
              label: report.tier,
              tone: report.tier === "Free" ? "royal" : "gold",
            },
            ...(unlocked ? [{ label: "Unlocked", tone: "moss" as const }] : []),
          ]}
        />
        <h1 className="mt-4 max-w-3xl font-display text-[36px] leading-[1.15] text-ink md:text-[53px] md:tracking-[-2.12px]">
          {report.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[18px] leading-[1.5] text-driftwood">
          {report.summary}
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-[13px] font-normal text-driftwood" style={{ fontFamily: "var(--font-intertight)" }}>
          <LucideIcon name="user" size={13} />
          {report.author} · {new Date(`${report.date}T00:00:00`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <BookmarkButton slug={report.slug} />
          <ShareButton report={report} />
          {!unlocked && report.tier === "Paid" ? (
            <button
              type="button"
              onClick={() => setPurchaseOpen(true)}
              className="btn-action bg-ink px-5 py-2 text-[14px] font-medium text-parchment"
              style={{ borderRadius: "9999px" }}
            >
              Purchase report · {price}
            </button>
          ) : null}
        </div>
      </section>

      {/* Executive Summary — pure typography, no container */}
      <section className="mt-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
          Executive Summary
        </p>
        <p className="mt-4 max-w-3xl font-display text-[26px] leading-[1.4] text-ink md:text-[30px]">
          {report.summary}
        </p>
      </section>

      {/* Key Takeaways — individual cards */}
      <section className="mt-10">
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
          Key Takeaways
        </p>
        <div className="mt-4 grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
          {report.insights.map((item, i) => (
            <div
              key={item}
              className="bg-warm-sand px-5 py-6"
              style={{ borderRadius: "12px" }}
            >
              <span className="font-mono text-[10px] font-semibold text-driftwood">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mt-3 text-[14px] leading-[1.6] text-ink">{item}</p>
            </div>
          ))}
        </div>
      </section>

      <section className={`mt-10 grid grid-cols-1 gap-12 ${unlocked ? "lg:grid-cols-[220px_1fr]" : "lg:grid-cols-[220px_1fr_380px]"}`}>
        <nav
          aria-label="Table of contents"
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div
            className="bg-warm-sand p-5"
            style={{ borderRadius: "16px" }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
              Contents
            </p>
            <ol className="mt-3 space-y-2">
              {sections.map((s, i) => (
                <li key={s.id}>
                  <a
                    href={`#section-${s.id}`}
                    className="text-[14px] text-ink hover:text-driftwood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  >
                    {i + 1}. {s.title}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div ref={documentRef}>
          <ReportDocument
            key={refreshKey}
            report={report}
            unlocked={unlocked}
          />
          <h2 className="mt-10 font-display text-[24px] text-ink">Author</h2>
          <div className="mt-4">
            <AuthorCard />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <ReportGate
            report={report}
            purchaseOpen={purchaseOpen}
            onPurchaseOpenChange={setPurchaseOpen}
            onUnlocked={() => setRefreshKey((k) => k + 1)}
            onViewReport={scrollToReport}
          />
        </aside>
      </section>

      <section className="mt-12">
        <TagChips tags={report.tags} />
      </section>

      {related.length > 0 ? (
        <section className="mt-16 pt-12">
          <h2 className="font-display text-[24px] text-ink">
            Related Research
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-1 md:grid-cols-3">
            {related.map((r) => (
              <ResearchCard key={r.slug} report={r} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mt-12 grid grid-cols-1 gap-1 md:grid-cols-2">
        <FunnelCta
          href={funnelLinks.researchToAdvisory.href}
          label={funnelLinks.researchToAdvisory.label}
          description="Turn research insights into a capital strategy engagement with our advisory team."
        />
        <FunnelCta
          href={funnelLinks.researchToProgram.href}
          label={funnelLinks.researchToProgram.label}
          description="Apply AI-driven productivity and margin frameworks through our executive education programs."
        />
      </section>

      <section className="mt-10">
        <BackLink href="/research">Back to Research Library</BackLink>
      </section>
    </div>
  );
}

export default function ReportDetailClient({
  report,
  related,
}: {
  report: Report;
  related: Report[];
}) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-[61px] text-driftwood">Loading report...</p>
      }
    >
      <ReportDetailInner report={report} related={related} />
    </Suspense>
  );
}
