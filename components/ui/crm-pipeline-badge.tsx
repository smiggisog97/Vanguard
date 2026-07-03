import type { CrmPipeline } from "@/lib/types";
import { crmPipelines } from "@/lib/crm";

export default function CrmPipelineBadge({
  pipeline,
}: {
  pipeline: CrmPipeline;
}) {
  const info = crmPipelines[pipeline];
  return (
    <p
      className="mt-3 flex items-start gap-2 text-[12px] leading-[1.4] text-driftwood"
      role="note"
    >
      <span
        className="mt-0.5 shrink-0 font-mono text-[10px] font-semibold uppercase tracking-wide text-moss"
        aria-hidden
      >
        CRM
      </span>
      <span>
        <span className="sr-only">CRM pipeline: </span>
        {info.label}: {info.description}
      </span>
    </p>
  );
}
