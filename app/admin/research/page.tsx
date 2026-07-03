"use client";

import { reports } from "@/lib/data";
import { AdminShell } from "@/components/admin-client";

export default function AdminResearchPage() {
  return (
    <AdminShell title="Research Assets">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[700px] text-left text-[14px]">
          <thead>
            <tr className="text-driftwood">
              <th className="py-3 pr-4 font-mono text-xs uppercase">Title</th>
              <th className="py-3 pr-4 font-mono text-xs uppercase">Type</th>
              <th className="py-3 pr-4 font-mono text-xs uppercase">Tier</th>
              <th className="py-3 pr-4 font-mono text-xs uppercase">Price</th>
              <th className="py-3 font-mono text-xs uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.slug} className="">
                <td className="py-3 pr-4 text-ink">{r.title}</td>
                <td className="py-3 pr-4">{r.researchType}</td>
                <td className="py-3 pr-4">{r.tier}</td>
                <td className="py-3 pr-4">{r.price ?? "—"}</td>
                <td className="py-3 text-moss">Published</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button
        type="button"
        className="btn-action mt-6 bg-ink px-5 py-2 text-[14px] text-parchment"
        style={{ borderRadius: "9999px" }}
      >
        Upload PDF (placeholder)
      </button>
    </AdminShell>
  );
}
