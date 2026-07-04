"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import CrmPipelineBadge from "@/components/ui/crm-pipeline-badge";

type State = "form" | "success" | "already";

export default function Newsletter() {
  const { subscribeNewsletter, isNewsletterSubscribed } = useAuth();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<State>("form");

  return (
    <div
      className="bg-warm-sand px-[31px] py-[60px]"
      style={{ borderRadius: "24px" }}
    >
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <div
          className="newsletter-orb mb-6 h-12 w-12 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, var(--color-royal), var(--color-gold))",
          }}
          aria-hidden
        />
        {state === "success" ? (
          <>
            <h2 className="font-display text-[36px] leading-[1.1] text-ink">
              You&apos;re subscribed
            </h2>
            <p className="mt-3 text-[15px] text-driftwood">
              Monthly briefing on macro, capital markets, and sector research
              across emerging Asia.
            </p>
          </>
        ) : state === "already" ? (
          <>
            <h2 className="font-display text-[36px] leading-[1.1] text-ink">
              Already subscribed
            </h2>
            <p className="mt-3 text-[15px] text-driftwood">
              This email is already on our list. Check your inbox for the latest
              briefing.
            </p>
          </>
        ) : (
          <>
            <h2 className="font-display text-[36px] leading-[1.1] text-ink">
              Get research before your competitors do
            </h2>
            <p className="mt-3 text-[15px] text-driftwood">
              Monthly briefing on macro, capital markets, and sector research
              across emerging Asia.
            </p>
            <form
              className="mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                if (isNewsletterSubscribed(email)) setState("already");
                else {
                  subscribeNewsletter(email);
                  setState("success");
                }
              }}
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email for newsletter"
                className="w-full bg-parchment px-5 py-3 text-[15px] text-ink placeholder:text-driftwood focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
                style={{ borderRadius: "9999px" }}
              />
              <button
                type="submit"
                className="btn-action bg-ink px-6 py-3 text-[15px] font-medium text-parchment hover:text-parchment"
                style={{ borderRadius: "9999px" }}
              >
                Subscribe
              </button>
            </form>
            <CrmPipelineBadge pipeline="newsletter" />
          </>
        )}
      </div>
    </div>
  );
}
