"use client";

import { useState } from "react";
import CrmPipelineBadge from "@/components/ui/crm-pipeline-badge";

export default function InquiryForm({
  title = "Send an inquiry",
  submitLabel = "Submit inquiry",
  pipeline = "inquiry" as const,
}: {
  title?: string;
  submitLabel?: string;
  pipeline?: "inquiry" | "enrollment" | "waitlist";
}) {
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="bg-warm-sand p-[31px]" style={{ borderRadius: "16px" }}>
        <p className="font-display text-[20px] text-ink">Inquiry received</p>
        <p className="mt-2 text-[15px] text-driftwood">
          Our team will respond within two business days to schedule a
          consultation.
        </p>
        <CrmPipelineBadge pipeline={pipeline} />
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="bg-warm-sand p-[31px]"
      style={{ borderRadius: "16px" }}
    >
      <p className="font-display text-[20px] text-ink">{title}</p>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <input
          type="text"
          required
          placeholder="Full name"
          aria-label="Full name"
          className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0 sm:col-span-1"
          style={{ borderRadius: "4px" }}
        />
        <input
          type="text"
          required
          placeholder="Organization"
          aria-label="Organization"
          className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0 sm:col-span-1"
          style={{ borderRadius: "4px" }}
        />
        <input
          type="email"
          required
          placeholder="you@company.com"
          aria-label="Email"
          className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0 sm:col-span-2"
          style={{ borderRadius: "4px" }}
        />
        <textarea
          required
          placeholder="Tell us about your engagement"
          aria-label="Message"
          rows={4}
          className="bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0 sm:col-span-2"
          style={{ borderRadius: "4px" }}
        />
      </div>
      <button
        type="submit"
        className="btn-action mt-4 bg-ink px-6 py-3 text-[15px] font-medium text-parchment hover:text-parchment"
        style={{ borderRadius: "9999px" }}
      >
        {submitLabel}
      </button>
      <CrmPipelineBadge pipeline={pipeline} />
    </form>
  );
}
