"use client";

import { useState } from "react";
import { useAuth } from "@/components/auth-provider";
import { DashboardShell } from "@/components/dashboard-client";

export default function SettingsPage() {
  const { session, login } = useAuth();
  const [firstName, setFirstName] = useState(session?.firstName ?? "");
  const [company, setCompany] = useState(session?.company ?? "");
  const [role, setRole] = useState(session?.role ?? "");
  const [saved, setSaved] = useState(false);

  return (
    <DashboardShell title="Settings">
      <form
        className="max-w-md space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (session) login({ ...session, firstName, company, role });
          setSaved(true);
        }}
      >
        <div>
          <label
            htmlFor="email"
            className="font-mono text-xs uppercase text-driftwood"
          >
            Email
          </label>
          <input
            id="email"
            disabled
            value={session?.email ?? ""}
            className="mt-2 w-full bg-warm-sand px-4 py-3 text-[15px] text-driftwood"
            style={{ borderRadius: "4px" }}
          />
        </div>
        <div>
          <label
            htmlFor="firstName"
            className="font-mono text-xs uppercase text-driftwood"
          >
            First name
          </label>
          <input
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mt-2 w-full bg-parchment px-4 py-3 text-[15px]"
            style={{ borderRadius: "4px" }}
          />
        </div>
        <div>
          <label
            htmlFor="company"
            className="font-mono text-xs uppercase text-driftwood"
          >
            Company
          </label>
          <input
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="mt-2 w-full bg-parchment px-4 py-3 text-[15px]"
            style={{ borderRadius: "4px" }}
          />
        </div>
        <div>
          <label
            htmlFor="role"
            className="font-mono text-xs uppercase text-driftwood"
          >
            Role
          </label>
          <input
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-2 w-full bg-parchment px-4 py-3 text-[15px]"
            style={{ borderRadius: "4px" }}
          />
        </div>
        <button
          type="submit"
          className="btn-action bg-ink px-6 py-3 text-[15px] text-parchment"
          style={{ borderRadius: "9999px" }}
        >
          Save profile
        </button>
        {saved ? (
          <p className="text-[13px] text-moss">Profile updated.</p>
        ) : null}
      </form>
    </DashboardShell>
  );
}
