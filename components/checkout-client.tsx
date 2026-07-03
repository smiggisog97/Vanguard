"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { reports, incubatorPrograms } from "@/lib/data";
import { paymentGateways, calculateTotal, demoCoupons } from "@/lib/payment";
import type { PaymentGateway } from "@/lib/types";
import { useAuth } from "@/components/auth-provider";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import CrmPipelineBadge from "@/components/ui/crm-pipeline-badge";

function CheckoutInner({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get("type") ?? "research";
  const { session, login, purchase, enroll } = useAuth();

  const item =
    type === "program"
      ? incubatorPrograms.find((p) => p.slug === slug)
      : reports.find((r) => r.slug === slug);

  const [gateway, setGateway] = useState<PaymentGateway>("stripe");
  const [coupon, setCoupon] = useState("");
  const [email, setEmail] = useState(session?.email ?? "");
  const [firstName, setFirstName] = useState(session?.firstName ?? "");
  const [billingName, setBillingName] = useState("");
  const [status, setStatus] = useState<
    "form" | "processing" | "success" | "failed" | "pending"
  >("form");
  const [error, setError] = useState("");

  if (!item) {
    return <p className="px-6 py-[61px] text-driftwood">Item not found.</p>;
  }

  const price =
    type === "program"
      ? (item as (typeof incubatorPrograms)[0]).price
      : ((item as (typeof reports)[0]).price ?? "$0");
  const title = item.title;
  const checkoutItems = [
    { slug, title, price, type: type as "research" | "program" },
  ];
  const appliedCoupon = demoCoupons[coupon.toUpperCase()]
    ? {
        code: coupon.toUpperCase(),
        discountPercent: demoCoupons[coupon.toUpperCase()],
      }
    : undefined;
  const totals = calculateTotal(checkoutItems, appliedCoupon);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !firstName) {
      setError("Enter your name and email.");
      return;
    }
    login({ email, firstName });
    setStatus("processing");
    window.setTimeout(() => {
      if (type === "program") enroll(slug, title, price, email, gateway);
      else purchase(slug, title, price, email, gateway);
      if (type === "research") {
        router.push(`/research/${slug}?purchased=1`);
      } else {
        setStatus("success");
      }
    }, 1200);
  };

  if (status === "success") {
    return (
      <div className="mx-auto max-w-[640px] px-6 py-[80px] text-center">
        <div
          className="purchase-success__card bg-warm-sand p-10"
          style={{ borderRadius: "16px" }}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-moss">
            Payment complete
          </p>
          <h1 className="mt-3 font-display text-[32px] text-ink">Thank you</h1>
          <p className="mt-3 text-[15px] text-driftwood">
            Your receipt for {title} has been sent to {email}.
          </p>
          <div className="mt-8 flex flex-col gap-3">
            <Link
              href={
                type === "program" ? `/incubator/${slug}` : `/research/${slug}`
              }
              className="btn-action bg-ink px-6 py-3 text-[15px] font-medium text-parchment"
              style={{ borderRadius: "9999px" }}
            >
              {type === "program" ? "View program" : "View report"}
            </Link>
            <Link
              href="/dashboard"
              className="btn-action bg-parchment px-6 py-3 text-[15px] font-medium text-ink"
              style={{ borderRadius: "9999px" }}
            >
              Go to dashboard
            </Link>
          </div>
          <CrmPipelineBadge pipeline="checkout" />
        </div>
      </div>
    );
  }

  if (status === "failed") {
    return (
      <div className="mx-auto max-w-[640px] px-6 py-[80px] text-center">
        <p className="font-display text-[24px] text-ink">Payment failed</p>
        <p className="mt-2 text-driftwood">
          Please try again or choose a different payment method.
        </p>
        <button
          type="button"
          onClick={() => setStatus("form")}
          className="btn-action mt-6 bg-ink px-6 py-3 text-[15px] text-parchment"
          style={{ borderRadius: "9999px" }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <Breadcrumbs items={[{ label: "Checkout" }, { label: title }]} />
      <h1 className="font-display text-[36px] text-ink">Checkout</h1>

      <form
        onSubmit={handleSubmit}
        className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[1fr_380px]"
      >
        <div className="space-y-8">
          <section className="bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
            <h2 className="font-display text-[20px] text-ink">
              Billing details
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <input
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "4px" }}
              />
              <input
                required
                value={billingName}
                onChange={(e) => setBillingName(e.target.value)}
                placeholder="Billing name"
                className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "4px" }}
              />
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0 sm:col-span-2"
                style={{ borderRadius: "4px" }}
              />
            </div>
          </section>

          <section className="bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
            <h2 className="font-display text-[20px] text-ink">
              Payment method
            </h2>
            <div
              className="mt-4 space-y-2"
              role="radiogroup"
              aria-label="Payment gateway"
            >
              {paymentGateways.map((g) => (
                <label
                  key={g.id}
                  className={`flex cursor-pointer items-start gap-3 p-4 ${gateway === g.id ? "bg-parchment" : "bg-warm-sand/60"}`}
                  style={{ borderRadius: "16px" }}
                >
                  <input
                    type="radio"
                    name="gateway"
                    value={g.id}
                    checked={gateway === g.id}
                    onChange={() => setGateway(g.id)}
                    className="mt-1"
                  />
                  <div>
                    <p className="text-[15px] font-medium text-ink">{g.name}</p>
                    <p className="text-[13px] text-driftwood">
                      {g.description} · {g.regions.join(",")}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
            <h2 className="font-display text-[20px] text-ink">Order summary</h2>
            <p className="mt-3 text-[15px] text-ink">{title}</p>
            <dl className="mt-4 space-y-2 text-[14px]">
              <div className="flex justify-between">
                <dt className="text-driftwood">Subtotal</dt>
                <dd>{price}</dd>
              </div>
              {appliedCoupon ? (
                <div className="flex justify-between">
                  <dt className="text-driftwood">
                    Discount ({appliedCoupon.code})
                  </dt>
                  <dd>-${totals.discount.toFixed(2)}</dd>
                </div>
              ) : null}
              <div className="flex justify-between">
                <dt className="text-driftwood">Tax (est.)</dt>
                <dd>${totals.tax.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between pt-2 font-medium">
                <dt>Total</dt>
                <dd>${totals.total.toFixed(2)}</dd>
              </div>
            </dl>
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="mt-4 w-full bg-parchment px-4 py-2 text-[14px] focus:outline-none"
              style={{ borderRadius: "4px" }}
            />
            {error ? (
              <p className="mt-3 text-[13px] text-royal">{error}</p>
            ) : null}
            <button
              type="submit"
              disabled={status === "processing"}
              className="btn-action mt-4 w-full bg-ink px-6 py-3 text-[15px] font-medium text-parchment disabled:opacity-60"
              style={{ borderRadius: "9999px" }}
            >
              {status === "processing"
                ? "Processing payment..."
                : `Pay $${totals.total.toFixed(2)}`}
            </button>
            <CrmPipelineBadge pipeline="checkout" />
          </div>
        </aside>
      </form>
    </div>
  );
}

export default function CheckoutClient({ slug }: { slug: string }) {
  return (
    <Suspense
      fallback={
        <p className="px-6 py-[61px] text-driftwood">Loading checkout...</p>
      }
    >
      <CheckoutInner slug={slug} />
    </Suspense>
  );
}
