"use client";

import Link from "next/link";
import { reports } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { DashboardShell } from "@/components/dashboard-client";

export default function PurchasesPage() {
  const { access } = useAuth();
  const purchased = reports.filter((r) => access.purchased.includes(r.slug));

  return (
    <DashboardShell title="Purchased Reports">
      {purchased.length === 0 ? (
        <p className="text-driftwood">
          No purchased reports yet.{" "}
          <Link href="/research" className="text-ink underline">
            Browse research
          </Link>
        </p>
      ) : (
        <ul className="space-y-4">
          {purchased.map((r) => (
            <li
              key={r.slug}
              className="flex items-center justify-between bg-warm-sand p-4"
              style={{ borderRadius: "16px" }}
            >
              <div>
                <p className="font-display text-[18px] text-ink">{r.title}</p>
                <p className="text-[13px] text-driftwood">
                  {r.price} · {r.date}
                </p>
              </div>
              <Link
                href={`/research/${r.slug}`}
                className="text-[14px] text-ink"
              >
                View →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DashboardShell>
  );
}
