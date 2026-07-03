"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { Report } from "@/lib/data";
import CrmPipelineBadge from "@/components/ui/crm-pipeline-badge";

export type UnlockFormData = {
  firstName: string;
  email: string;
  company?: string;
  role?: string;
};

type Props = {
  report: Report;
  onSubmit: (data: UnlockFormData) => void;
  onClose: () => void;
  state?: "form" | "success" | "already";
};

/** Email gate for free reports only */
export default function UnlockModal({
  report,
  onSubmit,
  onClose,
  state = "form",
}: Props) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="unlock-modal-title"
    >
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
        {state === "success" ? (
          <>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-moss">
              Access unlocked
            </p>
            <h2
              id="unlock-modal-title"
              className="mt-3 font-display text-[24px] text-ink"
            >
              Thank you, {firstName || "reader"}
            </h2>
            <p className="mt-3 text-[15px] leading-[1.5] text-driftwood">
              {report.title} is now available to read on this site.
            </p>
            <CrmPipelineBadge pipeline="research-download" />
            <button
              type="button"
              onClick={onClose}
              className="btn-action mt-6 w-full bg-ink px-6 py-3 text-[15px] font-medium text-parchment"
              style={{ borderRadius: "9999px" }}
            >
              View full report
            </button>
          </>
        ) : (
          <>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
              Free research
            </p>
            <h2
              id="unlock-modal-title"
              className="mt-3 font-display text-[24px] text-ink"
            >
              Unlock full report
            </h2>
            <p className="mt-2 text-[14px] text-driftwood">
              Enter your details to read {report.title} on this site.
            </p>
            <form
              className="mt-6 space-y-3"
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit({
                  firstName,
                  email,
                  company: company || undefined,
                  role: role || undefined,
                });
              }}
            >
              <input
                type="text"
                required
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full bg-warm-sand px-4 py-3 text-[15px] text-ink focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "4px" }}
              />
              <input
                type="email"
                required
                placeholder="Work email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-warm-sand px-4 py-3 text-[15px] text-ink focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "4px" }}
              />
              <input
                type="text"
                placeholder="Company (optional)"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full bg-warm-sand px-4 py-3 text-[15px] text-ink focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "4px" }}
              />
              <input
                type="text"
                placeholder="Role (optional)"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-warm-sand px-4 py-3 text-[15px] text-ink focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "4px" }}
              />
              <button
                type="submit"
                className="btn-action w-full bg-ink px-6 py-3 text-[15px] font-medium text-parchment"
                style={{ borderRadius: "9999px" }}
              >
                Unlock report
              </button>
            </form>
            <CrmPipelineBadge pipeline="research-download" />
          </>
        )}
      </div>
    </div>,
    document.body,
  );
}
