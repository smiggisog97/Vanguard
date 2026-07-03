"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useAuth } from "@/components/auth-provider";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, session } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const returnTo = searchParams.get("returnTo") ?? "/dashboard";

  useEffect(() => {
    if (session) router.replace(returnTo);
  }, [session, returnTo, router]);

  return (
    <div className="mx-auto max-w-[420px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
        Account
      </p>
      <h1 className="mt-3 font-display text-[36px] leading-[1.1] text-ink">
        Log in
      </h1>
      <p className="mt-3 text-[15px] leading-[1.5] text-driftwood">
        Access purchased research and your reading library on this site.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          setError("");
          if (!email || !password) {
            setError("Enter email and password.");
            return;
          }
          login({ email });
          router.push(returnTo);
        }}
      >
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email"
          className="w-full bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
          style={{ borderRadius: "4px" }}
        />
        <input
          id="password"
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
          className="w-full bg-parchment px-4 py-3 text-[15px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
          style={{ borderRadius: "4px" }}
        />
        {error ? <p className="text-[14px] text-royal">{error}</p> : null}
        <button
          type="submit"
          className="btn-action w-full bg-ink px-6 py-3 text-[15px] font-medium text-parchment"
          style={{ borderRadius: "9999px" }}
        >
          Log in
        </button>
      </form>
      <p className="mt-4 text-[14px] text-driftwood">
        <Link
          href={`/forgot-password?returnTo=${encodeURIComponent(returnTo)}`}
          className="text-ink underline-offset-2 hover:underline"
        >
          Forgot password?
        </Link>
        {" ·"}
        <Link
          href={`/register?returnTo=${encodeURIComponent(returnTo)}`}
          className="text-ink underline-offset-2 hover:underline"
        >
          Create account
        </Link>
      </p>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[80px]">
      <Suspense fallback={<p className="text-driftwood">Loading...</p>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
