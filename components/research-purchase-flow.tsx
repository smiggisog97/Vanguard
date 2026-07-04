"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import type { Report } from "@/lib/data";
import { calculateTotal } from "@/lib/payment";
import type { PaymentGateway } from "@/lib/types";
import { FULL_PAGE_COUNT } from "@/lib/report-content";
import { useAuth } from "@/components/auth-provider";
import { LucideIcon } from "@/components/ui/lucide-icon";
import { BackButton } from "@/components/ui/back-link";

type PurchaseStep = "review" | "details" | "payment" | "processing" | "success";

type Props = {
  report: Report;
  open: boolean;
  initialStep?: PurchaseStep;
  onClose: () => void;
  onComplete: () => void;
  onViewReport: () => void;
};

const steps: { id: PurchaseStep; label: string }[] = [
  { id: "review", label: "Review" },
  { id: "details", label: "Details" },
  { id: "payment", label: "Payment" },
];

// Rough BDT conversion rate
const BDT_RATE = 110;

function formatBDT(usd: number) {
  return `৳${Math.round(usd * BDT_RATE).toLocaleString("en-BD")}`;
}

function StepIndicator({ current }: { current: PurchaseStep }) {
  const index = steps.findIndex((s) => s.id === current);
  const active = index >= 0 ? index : steps.length;

  return (
    <ol className="flex items-center gap-2" aria-label="Checkout progress">
      {steps.map((step, i) => (
        <li key={step.id} className="flex items-center gap-2">
          <span
            className={`flex h-7 w-7 items-center justify-center font-mono text-[11px] ${
              i <= active ? "bg-ink text-parchment" : "bg-warm-sand text-driftwood"
            }`}
            style={{ borderRadius: "9999px" }}
          >
            {i + 1}
          </span>
          <span
            className={`hidden text-[12px] sm:inline ${i <= active ? "text-ink" : "text-driftwood"}`}
          >
            {step.label}
          </span>
          {i < steps.length - 1 ? (
            <span
              className="mx-1 hidden h-px w-6 bg-ash-border sm:block"
              aria-hidden
            />
          ) : null}
        </li>
      ))}
    </ol>
  );
}

// ─── Payment method tiles ────────────────────────────────────────────────────

type Method = "card" | "bkash" | "nagad";

const BKASH_MERCHANT = "01779-VANGUARD";
const NAGAD_MERCHANT = "01783-VANGUARD";

function CardIcon() {
  return (
    <span className="flex items-center gap-1">
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none" aria-hidden>
        <rect width="26" height="16" rx="3" fill="#1A1F71" />
        <rect y="4" width="26" height="4" fill="#F7B600" opacity=".9" />
        <rect
          x="2"
          y="10"
          width="5"
          height="2"
          rx="1"
          fill="white"
          opacity=".7"
        />
      </svg>
      <svg width="26" height="16" viewBox="0 0 26 16" fill="none" aria-hidden>
        <rect width="26" height="16" rx="3" fill="#EB001B" />
        <circle cx="9" cy="8" r="6" fill="#EB001B" />
        <circle cx="17" cy="8" r="6" fill="#F79E1B" />
        <path d="M13 3.8a6 6 0 0 1 0 8.4A6 6 0 0 1 13 3.8z" fill="#FF5F00" />
      </svg>
    </span>
  );
}

function BkashLogo() {
  return (
    <span
      className="inline-flex items-center justify-center px-2 py-1 text-[11px] font-bold text-white"
      style={{
        borderRadius: "6px",
        background: "#E2136E",
        letterSpacing: "0.02em",
      }}
    >
      bKash
    </span>
  );
}

function NagadLogo() {
  return (
    <span
      className="inline-flex items-center justify-center px-2 py-1 text-[11px] font-bold text-white"
      style={{
        borderRadius: "6px",
        background: "#F15A22",
        letterSpacing: "0.02em",
      }}
    >
      Nagad
    </span>
  );
}

interface PaymentMethodTileProps {
  id: Method;
  selected: boolean;
  onSelect: () => void;
  label: string;
  sub: string;
  logo: React.ReactNode;
  children: React.ReactNode;
}

function PaymentMethodTile({
  id,
  selected,
  onSelect,
  label,
  sub,
  logo,
  children,
}: PaymentMethodTileProps) {
  return (
    <div
      className={`overflow-hidden transition-colors ${selected ? "bg-warm-sand" : "bg-parchment"}`}
      style={{ borderRadius: "10px" }}
    >
      <button
        type="button"
        onClick={onSelect}
        className={`flex w-full items-center justify-between px-4 py-3.5 ${selected ? "bg-warm-sand" : "bg-parchment hover:bg-warm-sand/50"}`}
        aria-pressed={selected}
      >
        <div className="flex items-center gap-3">
          <span
            className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full transition-colors ${selected ? "bg-ink" : "bg-warm-sand"}`}
          >
            {selected && <span className="h-2 w-2 rounded-full bg-parchment" />}
          </span>
          <div className="text-left">
            <p className="text-[14px] font-medium text-ink">{label}</p>
            <p className="text-[12px] text-driftwood">{sub}</p>
          </div>
        </div>
        <div>{logo}</div>
      </button>
      {selected && (
        <div className="bg-warm-sand px-4 pb-4 pt-3">{children}</div>
      )}
    </div>
  );
}

// ─── Main component ─────────────────────────────────────────────────────────

export default function ResearchPurchaseFlow({
  report,
  open,
  initialStep = "review",
  onClose,
  onComplete,
  onViewReport,
}: Props) {
  const { session, login, purchase } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState<PurchaseStep>("review");

  // Details step
  const [firstName, setFirstName] = useState(session?.firstName ?? "");
  const [email, setEmail] = useState(session?.email ?? "");

  // Payment step
  const [method, setMethod] = useState<Method>("card");
  const [card, setCard] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardName, setCardName] = useState("");
  const [mobileRef, setMobileRef] = useState("");

  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState("");

  const price = report.price ?? "$0";
  const totals = calculateTotal([
    { slug: report.slug, title: report.title, price, type: "research" },
  ]);
  const bdtTotal = formatBDT(totals.total);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setStep("review");
      setError("");
    } else if (initialStep === "success") {
      setStep("success");
    }
  }, [open, initialStep]);

  useEffect(() => {
    if (session?.firstName) setFirstName(session.firstName);
    if (session?.email) setEmail(session.email);
  }, [session]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Format card number with spaces
  const handleCardInput = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 16);
    setCard(digits.replace(/(.{4})/g, "$1").trim());
  };

  // Format expiry MM/YY
  const handleExpiryInput = (v: string) => {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3)
      setExpiry(digits.slice(0, 2) + "/" + digits.slice(2));
    else setExpiry(digits);
  };

  const gateway: PaymentGateway =
    method === "bkash" ? "bkash" : method === "nagad" ? "nagad" : "stripe";

  const validatePayment = () => {
    if (method === "card") {
      if (card.replace(/\s/g, "").length < 12)
        return "Enter a valid card number.";
      if (expiry.length < 5) return "Enter card expiry (MM/YY).";
      if (cvc.length < 3) return "Enter your CVC.";
      if (!cardName.trim()) return "Enter the name on your card.";
    } else {
      if (mobileRef.replace(/\D/g, "").length < 8)
        return "Enter the transaction reference from your mobile app.";
    }
    return "";
  };

  const completePurchase = () => {
    login({ email, firstName });
    setStep("processing");
    const id = `VG-${Date.now().toString(36).toUpperCase()}`;
    setOrderId(id);
    window.setTimeout(() => {
      purchase(report.slug, report.title, price, email, gateway);
      onComplete();
      setStep("success");
    }, 1800);
  };

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className="purchase-flow fixed inset-0 z-[100] flex items-center justify-center px-4 py-6 sm:px-6"
      role="dialog"
      aria-modal="true"
      aria-label="Purchase report"
    >
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-ink/50 backdrop-blur-[3px]"
        onClick={step === "processing" ? undefined : onClose}
      />

      <div
        className="purchase-flow__panel relative z-10 flex max-h-[92vh] w-full max-w-[520px] flex-col overflow-hidden bg-parchment shadow-elevated"
        style={{ borderRadius: "16px" }}
      >
        {/* Header */}
        {step !== "processing" && step !== "success" ? (
          <div className="flex shrink-0 items-center justify-between px-6 py-4">
            <StepIndicator current={step} />
            <button
              type="button"
              onClick={onClose}
              className="text-[13px] text-driftwood hover:text-ink"
              aria-label="Close"
            >
              Close
            </button>
          </div>
        ) : null}

        {/* Scrollable body */}
        <div className="overflow-y-auto px-6 py-6 sm:px-8 sm:py-7">
          {/* ── REVIEW ── */}
          {step === "review" ? (
            <>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
                Research purchase
              </p>
              <h2 className="mt-2 font-display text-[26px] leading-[1.15] text-ink">
                Review your order
              </h2>
              <div
                className="mt-5 overflow-hidden bg-warm-sand"
                style={{ borderRadius: "16px" }}
              >
                <div className="relative aspect-[16/6] w-full">
                  <Image
                    src={`https://picsum.photos/seed/${report.slug}-cover/640/240`}
                    alt=""
                    fill
                    className="object-cover"
                    style={{ filter: "grayscale(1)" }}
                    unoptimized
                    decoding="async"
                  />
                </div>
                <div className="p-5">
                  <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                    {report.researchType} · {report.country}
                  </p>
                  <p className="mt-1.5 font-display text-[19px] leading-[1.3] text-ink">
                    {report.title}
                  </p>
                  <p className="mt-1.5 line-clamp-2 text-[13px] text-driftwood">
                    {report.abstract}
                  </p>
                </div>
              </div>
              <ul className="mt-4 space-y-1.5">
                {[
                  `${FULL_PAGE_COUNT} pages · full analysis`,
                  "On-site secure viewer",
                  "Permanent access from your account",
                ].map((item) => (
                  <li key={item} className="flex gap-2 text-[14px] text-ink">
                    <span className="text-moss">·</span>
                    {item}
                  </li>
                ))}
              </ul>
              <dl className="mt-5 flex items-center justify-between pt-4">
                <dt className="font-display text-[17px] text-ink">Total</dt>
                <dd className="font-display text-[24px] text-ink">
                  ${totals.total.toFixed(2)}
                </dd>
              </dl>
              <button
                type="button"
                onClick={() => setStep("details")}
                className="btn-action mt-5 w-full bg-ink px-6 py-3.5 text-[15px] font-medium text-parchment"
                style={{ borderRadius: "9999px" }}
              >
                Continue
              </button>
            </>
          ) : null}

          {/* ── DETAILS ── */}
          {step === "details" ? (
            <>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
                Step 2 of 3
              </p>
              <h2 className="mt-2 font-display text-[26px] text-ink">
                Your details
              </h2>
              <p className="mt-1.5 text-[14px] text-driftwood">
                Receipt and access will be linked to this email.
              </p>
              <div className="mt-5 space-y-3">
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wide text-driftwood">
                    First name
                  </label>
                  <input
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="e.g. Muhidul"
                    className="purchase-flow__input w-full bg-warm-sand px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block font-mono text-[11px] font-semibold uppercase tracking-wide text-driftwood">
                    Work email
                  </label>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="purchase-flow__input w-full bg-warm-sand px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                  />
                </div>
              </div>
              {error ? (
                <p className="mt-3 text-[13px] text-royal">{error}</p>
              ) : null}
              <div className="mt-6 flex gap-3">
                <BackButton
                  onClick={() => setStep("review")}
                  className="flex-1 px-6 py-3 text-[15px] text-ink"
                  style={{ borderRadius: "9999px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!firstName.trim() || !email.trim()) {
                      setError("Enter your name and email.");
                      return;
                    }
                    setError("");
                    setStep("payment");
                  }}
                  className="btn-action flex-1 bg-ink px-6 py-3 text-[15px] font-medium text-parchment"
                  style={{ borderRadius: "9999px" }}
                >
                  Continue
                </button>
              </div>
            </>
          ) : null}

          {/* ── PAYMENT ── */}
          {step === "payment" ? (
            <>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
                Step 3 of 3
              </p>
              <h2 className="mt-2 font-display text-[26px] text-ink">
                Payment
              </h2>

              {/* Order summary pill */}
              <div className="mt-3 flex items-center justify-between rounded-lg bg-warm-sand px-4 py-2.5">
                <p className="text-[13px] text-driftwood truncate pr-3">
                  {report.title}
                </p>
                <p className="shrink-0 font-mono text-[13px] font-medium text-ink">
                  ${totals.total.toFixed(2)}
                </p>
              </div>

              {/* Method selection */}
              <p className="mt-5 mb-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-driftwood">
                Choose payment method
              </p>
              <div className="space-y-2.5">
                {/* Card / International */}
                <PaymentMethodTile
                  id="card"
                  selected={method === "card"}
                  onSelect={() => setMethod("card")}
                  label="Card / International"
                  sub={`USD $${totals.total.toFixed(2)} · Visa, Mastercard`}
                  logo={<CardIcon />}
                >
                  <div className="space-y-2.5">
                    <div>
                      <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                        Card number
                      </label>
                      <input
                        value={card}
                        onChange={(e) => handleCardInput(e.target.value)}
                        placeholder="0000 0000 0000 0000"
                        inputMode="numeric"
                        autoComplete="cc-number"
                        className="purchase-flow__input w-full bg-parchment px-3.5 py-2.5 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2.5">
                      <div>
                        <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                          Expiry
                        </label>
                        <input
                          value={expiry}
                          onChange={(e) => handleExpiryInput(e.target.value)}
                          placeholder="MM / YY"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          className="purchase-flow__input w-full bg-parchment px-3.5 py-2.5 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                        />
                      </div>
                      <div>
                        <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                          CVC
                        </label>
                        <input
                          value={cvc}
                          onChange={(e) =>
                            setCvc(
                              e.target.value.replace(/\D/g, "").slice(0, 4),
                            )
                          }
                          placeholder="123"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          className="purchase-flow__input w-full bg-parchment px-3.5 py-2.5 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                        Name on card
                      </label>
                      <input
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="As it appears on the card"
                        autoComplete="cc-name"
                        className="purchase-flow__input w-full bg-parchment px-3.5 py-2.5 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                      />
                    </div>
                  </div>
                </PaymentMethodTile>

                {/* bKash */}
                <PaymentMethodTile
                  id="bkash"
                  selected={method === "bkash"}
                  onSelect={() => setMethod("bkash")}
                  label="bKash"
                  sub={`BDT ${bdtTotal} · Mobile wallet`}
                  logo={<BkashLogo />}
                >
                  <div className="space-y-3">
                    <div className="rounded-lg bg-parchment p-3.5">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                        How to pay
                      </p>
                      <ol className="mt-2 space-y-1 text-[13px] text-ink">
                        <li>1. Open your bKash app → Send Money</li>
                        <li>
                          2. Enter merchant number:{" "}
                          <span className="font-mono font-medium">
                            {BKASH_MERCHANT}
                          </span>
                        </li>
                        <li>
                          3. Amount:{" "}
                          <span className="font-medium">{bdtTotal}</span>
                        </li>
                        <li>4. Copy the TrxID and paste below</li>
                      </ol>
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                        bKash TrxID
                      </label>
                      <input
                        value={mobileRef}
                        onChange={(e) => setMobileRef(e.target.value)}
                        placeholder="e.g. 8N7K3A2B1D"
                        className="purchase-flow__input w-full bg-parchment px-3.5 py-2.5 font-mono text-[14px] uppercase tracking-wide focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                      />
                    </div>
                  </div>
                </PaymentMethodTile>

                {/* Nagad */}
                <PaymentMethodTile
                  id="nagad"
                  selected={method === "nagad"}
                  onSelect={() => setMethod("nagad")}
                  label="Nagad"
                  sub={`BDT ${bdtTotal} · Mobile financial`}
                  logo={<NagadLogo />}
                >
                  <div className="space-y-3">
                    <div className="rounded-lg bg-parchment p-3.5">
                      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                        How to pay
                      </p>
                      <ol className="mt-2 space-y-1 text-[13px] text-ink">
                        <li>1. Open your Nagad app → Send Money</li>
                        <li>
                          2. Enter merchant number:{" "}
                          <span className="font-mono font-medium">
                            {NAGAD_MERCHANT}
                          </span>
                        </li>
                        <li>
                          3. Amount:{" "}
                          <span className="font-medium">{bdtTotal}</span>
                        </li>
                        <li>4. Copy the TrxID and paste below</li>
                      </ol>
                    </div>
                    <div>
                      <label className="mb-1 block font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                        Nagad TrxID
                      </label>
                      <input
                        value={mobileRef}
                        onChange={(e) => setMobileRef(e.target.value)}
                        placeholder="e.g. NG-8N7K3A2B1D"
                        className="purchase-flow__input w-full bg-parchment px-3.5 py-2.5 font-mono text-[14px] uppercase tracking-wide focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                      />
                    </div>
                  </div>
                </PaymentMethodTile>
              </div>

              {error ? (
                <p className="mt-3 text-[13px] text-royal">{error}</p>
              ) : null}

              {/* CTA row */}
              <div className="mt-5 flex gap-3">
                <BackButton
                  onClick={() => setStep("details")}
                  className="px-5 py-3 text-[15px] text-ink"
                  style={{ borderRadius: "9999px" }}
                />
                <button
                  type="button"
                  onClick={() => {
                    const err = validatePayment();
                    if (err) {
                      setError(err);
                      return;
                    }
                    setError("");
                    completePurchase();
                  }}
                  className="btn-action flex-1 bg-ink px-6 py-3 text-[15px] font-medium text-parchment"
                  style={{ borderRadius: "9999px" }}
                >
                  {method === "card"
                    ? `Pay $${totals.total.toFixed(2)}`
                    : `Confirm ${bdtTotal} payment`}
                </button>
              </div>
              <p className="mt-3 text-center font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                Encrypted · Instant access on confirmation
              </p>
            </>
          ) : null}

          {/* ── PROCESSING ── */}
          {step === "processing" ? (
            <div className="purchase-flow__processing py-12 text-center">
              <div
                className="mx-auto h-12 w-12 animate-spin rounded-full border-2 border-t-ink"
                aria-hidden
              />
              <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                Verifying payment
              </p>
              <p className="mt-2 font-display text-[22px] text-ink">
                Securing your access
              </p>
              <p className="mt-2 text-[14px] text-driftwood">
                This takes just a moment.
              </p>
            </div>
          ) : null}

          {/* ── SUCCESS ── */}
          {step === "success" ? (
            <div className="purchase-flow__success text-center">
              {/* Animated checkmark */}
              <div
                className="purchase-success__card mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-ink"
                aria-hidden
              >
                <LucideIcon
                  name="check"
                  size={28}
                  style={{ color: "#f7f7f4" }}
                />
              </div>
              <p className="mt-5 font-mono text-xs font-semibold uppercase tracking-wide text-moss">
                Purchase complete
              </p>
              <h2 className="mt-2 font-display text-[28px] leading-[1.15] text-ink">
                You&apos;re in.
              </h2>
              <p className="mt-2 text-[15px] leading-[1.55] text-driftwood">
                <span className="font-medium text-ink">{report.title}</span> is
                now unlocked on your account.
              </p>
              {orderId ? (
                <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-wide text-driftwood">
                  Reference · {orderId}
                </p>
              ) : null}
              <div
                className="mt-5 bg-warm-sand p-4 text-left"
                style={{ borderRadius: "10px" }}
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                  What you now have
                </p>
                <ul className="mt-2 space-y-1.5">
                  {[
                    `Full ${FULL_PAGE_COUNT}-page report, on-site`,
                    "Secure viewer with permanent access",
                    "Available any time from your dashboard",
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-[14px] text-ink"
                    >
                      <LucideIcon
                        name="circle-check"
                        size={14}
                        className="mt-0.5 shrink-0 text-moss"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewReport();
                  }}
                  className="btn-action w-full bg-ink px-6 py-3.5 text-[15px] font-medium text-parchment"
                  style={{ borderRadius: "9999px" }}
                >
                  Read full report now
                </button>
                <Link
                  href="/dashboard/purchases"
                  onClick={onClose}
                  className="block w-full bg-parchment px-6 py-3 text-center text-[15px] text-ink"
                  style={{ borderRadius: "9999px" }}
                >
                  View in my library
                </Link>
              </div>
              <p className="mt-5 text-[13px] text-driftwood">
                Want to apply this research?{""}
                <Link
                  href="/advisory"
                  onClick={onClose}
                  className="text-ink underline underline-offset-2"
                >
                  Explore advisory
                </Link>
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>,
    document.body,
  );
}
