"use client";

import Link from "next/link";
import { incubatorPrograms } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { DashboardShell } from "@/components/dashboard-client";

export default function ProgramsPage() {
  const { access } = useAuth();
  const enrolled = incubatorPrograms.filter((p) =>
    access.enrollments.includes(p.slug),
  );

  return (
    <DashboardShell title="Program Enrollments">
      {enrolled.length === 0 ? (
        <p className="text-driftwood">
          No enrollments yet.{" "}
          <Link href="/incubator" className="text-ink underline">
            Explore programs
          </Link>
        </p>
      ) : (
        <ul className="space-y-4">
          {enrolled.map((p) => (
            <li
              key={p.slug}
              className="bg-warm-sand p-4"
              style={{ borderRadius: "16px" }}
            >
              <p className="font-display text-[18px] text-ink">{p.title}</p>
              <p className="text-[13px] text-driftwood">
                {p.audience} · {p.duration}
              </p>
              <Link
                href={`/incubator/${p.slug}`}
                className="mt-2 inline-block text-[14px] text-ink"
              >
                View program →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </DashboardShell>
  );
}
