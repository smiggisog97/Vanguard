"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Report } from "@/lib/data";
import { LucideIcon } from "@/components/ui/lucide-icon";

type Props = {
  report: Report;
  mode?: "free" | "purchase";
  onViewReport: () => void;
  onClose: () => void;
};

export default function PurchaseSuccess({
  report,
  mode = "purchase",
  onViewReport,
  onClose,
}: Props) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div className="purchase-success fixed inset-0 z-[100] flex items-center justify-center px-6">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <div
        className="purchase-success__card relative z-10 w-full max-w-[480px] bg-parchment p-8 md:p-10"
        style={{ borderRadius: "16px" }}
      >
        <div
          className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-ink"
          aria-hidden
        >
          <LucideIcon
            name="check"
            size={24}
            style={{ color: "#f7f7f4" }}
          />
        </div>
        <p className="mt-6 text-center font-mono text-xs font-semibold uppercase tracking-wide text-royal">
          {mode === "purchase" ? "Purchase complete" : "Access unlocked"}
        </p>
        <h2 className="mt-3 text-center font-display text-[28px] leading-[1.15] text-ink">
          {mode === "purchase"
            ? "You now have full access"
            : "Full report ready"}
        </h2>
        <p className="mt-3 text-center text-[15px] leading-[1.5] text-driftwood">
          {report.title} is unlocked. Read the full report on this site anytime
          from your account.
        </p>
        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={onViewReport}
            className="btn-action w-full bg-ink px-6 py-3 text-[15px] font-medium text-parchment hover:text-parchment"
            style={{ borderRadius: "9999px" }}
          >
            View full report
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
