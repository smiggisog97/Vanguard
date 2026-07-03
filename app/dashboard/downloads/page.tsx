"use client";

import Link from "next/link";
import { reports } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { DashboardShell } from "@/components/dashboard-client";

export default function UnlockedReportsPage() {
  const { access } = useAuth();
  const unlocked = reports.filter(
    (r) => access.free.includes(r.slug) || access.purchased.includes(r.slug),
  );

  return (
    <DashboardShell title="Unlocked Reports">
      {unlocked.length === 0 ? (
        <p className="text-driftwood">
          No unlocked reports yet.{" "}
          <Link href="/research" className="text-ink underline">
            Browse research
          </Link>
        </p>
      ) : (
        <ul className="space-y-4">
          {unlocked.map((r) => (
            <li
              key={r.slug}
              className="flex flex-wrap items-center justify-between gap-3 bg-warm-sand p-4"
              style={{ borderRadius: "16px" }}
            >
              <div>
                <p className="font-display text-[18px] text-ink">{r.title}</p>
                <p className="text-[13px] text-driftwood">
                  {r.tier} · View on site only
                </p>
              </div>
              <Link
                href={`/research/${r.slug}`}
                className="text-[14px] text-ink"
              >
                View report →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DashboardShell>
  );
}
