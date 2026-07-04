import type { Report } from "@/lib/data";

export default function ProtectedViewer({
  report,
  children,
}: {
  report: Report;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <div className="protected-viewer relative">
        {children}
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden opacity-[0.04]"
          aria-hidden
        >
          <span className="rotate-[-24deg] select-none font-display text-[48px] text-ink md:text-[72px]">
            {report.author} · Vanguard
          </span>
        </div>
      </div>
      <p className="mt-3 text-[12px] leading-[1.5] text-driftwood">
        This document is provided under signed access on this platform only.
        Reports cannot be downloaded or redistributed. Watermarking and access
        logging help deter misuse.
      </p>
    </div>
  );
}
