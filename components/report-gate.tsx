"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import type { Report } from "@/lib/data";
import { calculateTotal } from "@/lib/payment";
import { FULL_PAGE_COUNT } from "@/lib/report-content";
import { useAuth } from "@/components/auth-provider";
import UnlockModal, { type UnlockFormData } from "@/components/ui/unlock-modal";
import ResearchPurchaseFlow from "@/components/research-purchase-flow";

type Step = "idle" | "processing" | "unlock-modal";

type Props = {
  report: Report;
  onUnlocked: () => void;
  onViewReport: () => void;
  purchaseOpen?: boolean;
  onPurchaseOpenChange?: (open: boolean) => void;
};

export default function ReportGate({
  report,
  onUnlocked,
  onViewReport,
  purchaseOpen: purchaseOpenProp,
  onPurchaseOpenChange,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { session, login, unlockFree, canAccessReport } = useAuth();
  const [step, setStep] = useState<Step>("idle");
  const [modalState, setModalState] = useState<"form" | "success">("form");
  const [purchaseOpenInternal, setPurchaseOpenInternal] = useState(false);
  const [openAtSuccess, setOpenAtSuccess] = useState(false);

  const purchaseOpen = purchaseOpenProp ?? purchaseOpenInternal;
  const setPurchaseOpen = onPurchaseOpenChange ?? setPurchaseOpenInternal;

  const unlocked = canAccessReport(report.slug, report.tier);
  const price = report.price ?? "$0";
  const totals = calculateTotal([
    { slug: report.slug, title: report.title, price, type: "research" },
  ]);

  useEffect(() => {
    if (
      searchParams.get("purchased") === "1" &&
      unlocked &&
      report.tier === "Paid"
    ) {
      setOpenAtSuccess(true);
      setPurchaseOpen(true);
      router.replace(`/research/${report.slug}`, { scroll: false });
    }
  }, [searchParams, unlocked, report.slug, report.tier, router]);

  const handleFreeUnlock = (data: UnlockFormData) => {
    if (report.tier !== "Free") return;
    login({
      email: data.email,
      firstName: data.firstName,
      company: data.company,
      role: data.role,
    });
    setStep("processing");
    window.setTimeout(() => {
      unlockFree(report.slug, data.email);
      onUnlocked();
      setModalState("success");
      setStep("unlock-modal");
    }, 800);
  };

  if (unlocked) {
    return null;
  }

  return (
    <>
      {report.tier === "Paid" ? (
        <ResearchPurchaseFlow
          report={report}
          open={purchaseOpen}
          initialStep={openAtSuccess ? "success" : "review"}
          onClose={() => {
            setPurchaseOpen(false);
            setOpenAtSuccess(false);
          }}
          onComplete={onUnlocked}
          onViewReport={onViewReport}
        />
      ) : null}

      {step === "unlock-modal" && report.tier === "Free" ? (
        <UnlockModal
          report={report}
          state={modalState}
          onClose={() => setStep("idle")}
          onSubmit={handleFreeUnlock}
        />
      ) : null}

      <div className="bg-warm-sand p-[31px]" style={{ borderRadius: "16px" }}>
        {report.tier === "Free" ? (
          <>
            <p className="font-display text-[20px] text-ink">
              Unlock this report
            </p>
            <p className="mt-2 text-[14px] text-driftwood">
              Free research. Enter your details for instant on-site access.
            </p>
            {!session ? (
              <p className="mt-3 text-[13px] text-driftwood">
                Already have an account?{""}
                <Link
                  href={`/login?returnTo=/research/${report.slug}`}
                  className="text-ink underline-offset-2 hover:underline"
                >
                  Log in
                </Link>
              </p>
            ) : null}
            <button
              type="button"
              disabled={step === "processing"}
              onClick={() => {
                setModalState("form");
                setStep("unlock-modal");
              }}
              className="btn-action mt-4 w-full bg-ink px-6 py-3 text-[15px] font-medium text-parchment disabled:opacity-60"
              style={{ borderRadius: "9999px" }}
            >
              {step === "processing" ? "Processing..." : "Unlock full report"}
            </button>
          </>
        ) : (
          <>
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-gold">
              Paid research
            </p>
            <p className="mt-2 font-display text-[28px] text-ink">{price}</p>
            <p className="mt-2 text-[14px] leading-[1.5] text-driftwood">
              One-time purchase. Full {FULL_PAGE_COUNT}-page report with on-site
              secure access.
            </p>
            <ul className="mt-4 space-y-2 pt-4">
              {[
                "Complete analysis & data",
                "Secure on-site viewer",
                "Lifetime account access",
              ].map((item) => (
                <li key={item} className="flex gap-2 text-[13px] text-ink">
                  <span className="text-moss">·</span>
                  {item}
                </li>
              ))}
            </ul>
            {!session ? (
              <p className="mt-4 text-[13px] text-driftwood">
                Already purchased?{""}
                <Link
                  href={`/login?returnTo=/research/${report.slug}`}
                  className="text-ink underline-offset-2 hover:underline"
                >
                  Log in
                </Link>
              </p>
            ) : null}
            <button
              type="button"
              onClick={() => setPurchaseOpen(true)}
              className="btn-action mt-5 w-full bg-ink px-6 py-3.5 text-[15px] font-medium text-parchment"
              style={{ borderRadius: "9999px" }}
            >
              Purchase report · ${totals.total.toFixed(2)}
            </button>
            <p className="mt-3 text-center font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
              Secure checkout
            </p>
          </>
        )}
      </div>
    </>
  );
}
