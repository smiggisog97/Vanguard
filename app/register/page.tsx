"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useAuth } from "@/components/auth-provider";
import CrmPipelineBadge from "@/components/ui/crm-pipeline-badge";

function RegisterForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const returnTo = searchParams.get("returnTo") ?? "/verify-email";

  return (
    <div className="mx-auto max-w-[420px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
        Account
      </p>
      <h1 className="mt-3 font-display text-[36px] text-ink">Create account</h1>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          login({ email, firstName, verified: false });
          router.push(`${returnTo}?email=${encodeURIComponent(email)}`);
        }}
      >
        <input
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          aria-label="First name"
          className="w-full bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
          style={{ borderRadius: "4px" }}
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Work email"
          aria-label="Email"
          className="w-full bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
          style={{ borderRadius: "4px" }}
        />
        <input
          required
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          className="w-full bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
          style={{ borderRadius: "4px" }}
        />
        <button
          type="submit"
          className="btn-action w-full bg-ink px-6 py-3 text-[15px] text-parchment"
          style={{ borderRadius: "9999px" }}
        >
          Create account
        </button>
      </form>
      <p className="mt-4 text-[14px] text-driftwood">
        Already have an account?{" "}
        <Link href="/login" className="text-ink underline">
          Log in
        </Link>
      </p>
      <CrmPipelineBadge pipeline="inquiry" />
    </div>
  );
}

export default function RegisterPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[80px]">
      <Suspense fallback={<p>Loading...</p>}>
        <RegisterForm />
      </Suspense>
    </div>
  );
}
