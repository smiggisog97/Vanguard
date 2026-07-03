"use client";

import Link from "next/link";
import { Suspense, useState } from "react";
import { incubatorPrograms, funnelLinks } from "@/lib/data";
import Button from "@/components/ui/button";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import FunnelCta from "@/components/ui/funnel-cta";
import CrmPipelineBadge from "@/components/ui/crm-pipeline-badge";

function ProgramDetail({ slug }: { slug: string }) {
  const program = incubatorPrograms.find((p) => p.slug === slug);
  const [waitlisted, setWaitlisted] = useState(false);

  if (!program) {
    return <p className="px-6 py-[61px] text-driftwood">Program not found.</p>;
  }

  const statusColor =
    program.cohortStatus === "Open"
      ? "text-moss"
      : program.cohortStatus === "Waitlist"
        ? "text-gold"
        : "text-driftwood";

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <Breadcrumbs
        items={[
          { label: "Advanced Incubator", href: "/incubator" },
          { label: program.title },
        ]}
      />
      <section className="reveal-section">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
            {program.audience}
          </span>
          <span
            className={`font-mono text-xs font-semibold uppercase tracking-wide ${statusColor}`}
          >
            Cohort {program.cohortStatus}
          </span>
        </div>
        <h1 className="mt-4 max-w-3xl font-display text-[36px] leading-[1.15] text-ink md:text-[48px]">
          {program.title}
        </h1>
        <p className="mt-4 max-w-2xl text-[18px] leading-[1.5] text-driftwood">
          {program.overview}
        </p>
        <p className="mt-3 font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
          {program.duration} · {program.schedule}
        </p>
      </section>

      <section className="reveal-section mt-12 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px]">
        <div className="space-y-10">
          <div>
            <h2 className="font-display text-[24px] text-ink">Curriculum</h2>
            <ul className="mt-4 space-y-2">
              {program.curriculum.map((c) => (
                <li key={c} className="flex gap-3 text-[15px] text-ink">
                  <span className="text-royal">·</span>
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[24px] text-ink">
              Learning Outcomes
            </h2>
            <ul className="mt-4 space-y-2">
              {program.outcomes.map((o) => (
                <li key={o} className="flex gap-3 text-[15px] text-ink">
                  <span className="text-gold">·</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[24px] text-ink">Facilitators</h2>
            <ul className="mt-4 space-y-2">
              {program.facilitators.map((f) => (
                <li key={f} className="text-[15px] text-ink">
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-display text-[24px] text-ink">Testimonials</h2>
            <div className="mt-4 space-y-4">
              {program.testimonials.map((t) => (
                <blockquote
                  key={t.attribution}
                  className="bg-warm-sand p-6"
                  style={{ borderRadius: "16px" }}
                >
                  <p className="text-[16px] leading-[1.5] text-ink">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <footer className="mt-3 text-[14px] text-driftwood">
                    {t.attribution}
                  </footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="bg-warm-sand p-[31px]"
            style={{ borderRadius: "16px" }}
          >
            <p className="font-display text-[20px] text-ink">{program.price}</p>
            <p className="mt-2 text-[14px] text-driftwood">
              {program.cohortStatus === "Open"
                ? "Enrollment open for the next cohort."
                : program.cohortStatus === "Waitlist"
                  ? "Join the waitlist for the next cohort."
                  : "This cohort is closed."}
            </p>
            {program.cohortStatus === "Open" ? (
              <Link
                href={`/checkout/${program.slug}?type=program`}
                className="btn-action mt-4 flex w-full justify-center bg-ink px-6 py-3 text-[15px] text-parchment"
                style={{ borderRadius: "9999px" }}
              >
                Enroll now
              </Link>
            ) : program.cohortStatus === "Waitlist" ? (
              <button
                type="button"
                onClick={() => setWaitlisted(true)}
                className="btn-action mt-4 w-full bg-ink px-6 py-3 text-[15px] text-parchment"
                style={{ borderRadius: "9999px" }}
              >
                {waitlisted ? "On waitlist" : "Join waitlist"}
              </button>
            ) : (
              <Button href="/contact" variant="dark" className="mt-4 w-full">
                Contact us
              </Button>
            )}
            {waitlisted ? (
              <CrmPipelineBadge pipeline="waitlist" />
            ) : program.cohortStatus === "Open" ? (
              <CrmPipelineBadge pipeline="enrollment" />
            ) : null}
          </div>
          <div className="mt-6">
            <FunnelCta
              href={funnelLinks.programToAdvisory.href}
              label={funnelLinks.programToAdvisory.label}
              description="Discuss how this program connects to your capital strategy."
            />
          </div>
        </aside>
      </section>
    </div>
  );
}

export default function ProgramPageClient({ slug }: { slug: string }) {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ProgramDetail slug={slug} />
    </Suspense>
  );
}
