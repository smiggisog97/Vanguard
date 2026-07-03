"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") ?? "your email";

  return (
    <div className="mx-auto max-w-[420px] px-6 py-[80px] text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-moss">
        Verification sent
      </p>
      <h1 className="mt-3 font-display text-[32px] text-ink">
        Check your inbox
      </h1>
      <p className="mt-4 text-[15px] text-driftwood">
        We sent a verification link to {email}. Click the link to activate your
        account.
      </p>
      <Link
        href="/dashboard"
        className="btn-action mt-8 inline-flex bg-ink px-6 py-3 text-[15px] text-parchment"
        style={{ borderRadius: "9999px" }}
      >
        Continue to dashboard
      </Link>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<p className="px-6 py-[80px]">Loading...</p>}>
      <VerifyContent />
    </Suspense>
  );
}
