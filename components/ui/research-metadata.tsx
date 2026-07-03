import type { Report } from "@/lib/data";
import { Chip } from "@/components/ui/funnel-cta";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function MetaPair({ label, value }: { label: string; value: string }) {
  return (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-wide text-driftwood">
        {label}
      </span>
      <span className="text-[14px] text-ink">{value}</span>
    </span>
  );
}

function Dot() {
  return (
    <span aria-hidden className="select-none text-ash-border">
      ·
    </span>
  );
}

export default function ResearchMetadata({ report }: { report: Report }) {
  const revised = report.updatedAt !== report.date;

  return (
    <aside
      className="border-y border-ash-border py-6"
      aria-label="Research brief details"
    >
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 border-l-2 border-royal pl-5">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-driftwood">
            Research brief
          </p>
          <p className="mt-2 font-display text-[24px] leading-[1.2] text-ink">
            {report.author}
          </p>
          <p className="mt-3 max-w-md text-[15px] leading-[1.55] text-driftwood">
            {report.industry}
            <Dot />
            {report.category}
            <Dot />
            {report.researchType}
            <Dot />
            {report.country}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-start gap-4 lg:items-end lg:pt-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-2 lg:justify-end">
            <MetaPair label="Published" value={formatDate(report.date)} />
            {revised ? (
              <>
                <Dot />
                <MetaPair label="Revised" value={formatDate(report.updatedAt)} />
              </>
            ) : null}
          </div>
          <Chip tone={report.tier === "Free" ? "royal" : "gold"}>
            {report.tier === "Free" ? "Free" : report.price}
          </Chip>
        </div>
      </div>
    </aside>
  );
}
