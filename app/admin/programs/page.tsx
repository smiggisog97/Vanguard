"use client";

import { incubatorPrograms } from "@/lib/data";
import { AdminShell } from "@/components/admin-client";

export default function AdminProgramsPage() {
  return (
    <AdminShell title="Programs">
      <ul className="space-y-4">
        {incubatorPrograms.map((p) => (
          <li
            key={p.slug}
            className="bg-warm-sand p-4"
            style={{ borderRadius: "16px" }}
          >
            <p className="font-display text-[18px] text-ink">{p.title}</p>
            <p className="text-[13px] text-driftwood">
              {p.cohortStatus} · {p.price}
            </p>
          </li>
        ))}
      </ul>
    </AdminShell>
  );
}
