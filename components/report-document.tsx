"use client";

import Image from "next/image";
import type { Report } from "@/lib/data";
import {
  FULL_PAGE_COUNT,
  PREVIEW_PAGE_COUNT,
  getReportSections,
} from "@/lib/report-content";
import ProtectedViewer from "@/components/ui/protected-viewer";

type Props = { report: Report; unlocked: boolean };

export default function ReportDocument({ report, unlocked }: Props) {
  const pageCount = unlocked ? FULL_PAGE_COUNT : PREVIEW_PAGE_COUNT;
  const sections = getReportSections(report);

  const content = (
    <>
      <div className="flex flex-wrap items-end justify-between gap-1">
        <h2 className="font-display text-[24px] text-ink">
          {unlocked ? "Full Report" : "Preview"}
        </h2>
        {unlocked ? (
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-moss">
            On-site access only
          </p>
        ) : (
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
            {PREVIEW_PAGE_COUNT} of {FULL_PAGE_COUNT} pages
          </p>
        )}
      </div>

      <div className="mt-4 grid grid-cols-2 gap-1 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <div
            key={page}
            className="relative aspect-[3/4] overflow-hidden bg-warm-sand"
            style={{ borderRadius: "16px" }}
          >
            <Image
              src={`https://picsum.photos/seed/${report.slug}-${page}/400/560`}
              alt={`${report.title}, page ${page}`}
              fill
              className="object-cover"
              style={{ filter: "grayscale(1)" }}
            loading="lazy"
            unoptimized
            decoding="async"
            />
            <span className="absolute bottom-2 right-2 bg-parchment px-2 py-0.5 font-mono text-[10px] text-driftwood">
              Page {page}
            </span>
          </div>
        ))}
        {!unlocked
          ? Array.from(
              { length: FULL_PAGE_COUNT - PREVIEW_PAGE_COUNT },
              (_, i) => (
                <div
                  key={`locked-${i}`}
                  className="relative aspect-[3/4] overflow-hidden bg-warm-sand"
                  style={{ borderRadius: "16px" }}
                >
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center">
                    <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                      {report.tier === "Paid"
                        ? "Purchase to unlock"
                        : "Register to unlock"}
                    </p>
                  </div>
                </div>
              ),
            )
          : null}
      </div>

      {unlocked ? (
        <div className="mt-12 space-y-10 pt-10">
          {sections.map((section) => (
            <article key={section.id} id={`section-${section.id}`}>
              <h3 className="font-display text-[22px] text-ink">
                {section.title}
              </h3>
              <p className="mt-3 whitespace-pre-line text-[16px] leading-[1.65] text-driftwood">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      ) : null}
    </>
  );

  return unlocked ? (
    <ProtectedViewer report={report}>{content}</ProtectedViewer>
  ) : (
    <div>{content}</div>
  );
}
