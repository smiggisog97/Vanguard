"use client";

import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <div className="mx-auto max-w-[420px] px-6 py-[80px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
        Account
      </p>
      <h1 className="mt-3 font-display text-[36px] text-ink">Reset password</h1>
      {sent ? (
        <p className="mt-4 text-[15px] text-driftwood">
          If an account exists for {email}, a reset link has been sent.
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <input
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            aria-label="Email"
            className="w-full bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
            style={{ borderRadius: "4px" }}
          />
          <button
            type="submit"
            className="btn-action w-full bg-ink px-6 py-3 text-[15px] text-parchment"
            style={{ borderRadius: "9999px" }}
          >
            Send reset link
          </button>
        </form>
      )}
      <p className="mt-4 text-[14px]">
        <Link href="/login" className="text-ink underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}
