import type { Report } from "@/lib/data";
import { Chip } from "@/components/ui/funnel-cta";

function formatDate(iso: string) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function StatCell({
  label,
  value,
  chip,
}: {
  label: string;
  value?: string;
  chip?: React.ReactNode;
}) {
  return (
    <div className="flex min-w-0 flex-col gap-1 px-5 first:pl-0 last:pr-0">
      <span className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
        {label}
      </span>
      {chip ?? (
        <span className="truncate text-[14px] font-medium text-ink">
          {value}
        </span>
      )}
    </div>
  );
}

export default function ResearchMetadata({ report }: { report: Report }) {
  const revised = report.updatedAt !== report.date;

  return (
    <aside
      className="rounded-[12px] bg-warm-sand px-6 py-5"
      aria-label="Research brief details"
    >
      <div className="flex flex-wrap items-center divide-x divide-fog/50">
        <StatCell label="Author" value={report.author} />
        <StatCell label="Category" value={report.category} />
        <StatCell label="Type" value={report.researchType} />
        <StatCell label="Country" value={report.country} />
        <StatCell label="Industry" value={report.industry} />
        <StatCell label="Published" value={formatDate(report.date)} />
        {revised ? (
          <StatCell label="Revised" value={formatDate(report.updatedAt)} />
        ) : null}
        <StatCell
          label="Access"
          chip={
            <Chip tone={report.tier === "Free" ? "royal" : "gold"}>
              {report.tier === "Free" ? "Free" : report.price}
            </Chip>
          }
        />
      </div>
    </aside>
  );
}
