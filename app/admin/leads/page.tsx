"use client";

import { AdminShell } from "@/components/admin-client";

const demoLeads = [
  {
    name: "Rahim Khan",
    email: "rahim@textile.com",
    pipeline: "Research Unlock",
    date: "2026-06-28",
  },
  {
    name: "Priya Sharma",
    email: "priya@familyoffice.sg",
    pipeline: "Advisory Inquiry",
    date: "2026-06-27",
  },
  {
    name: "Tan Wei",
    email: "tan@startup.io",
    pipeline: "Program Waitlist",
    date: "2026-06-26",
  },
  {
    name: "Anika Das",
    email: "anika@bank.bd",
    pipeline: "Newsletter",
    date: "2026-06-25",
  },
];

export default function AdminLeadsPage() {
  return (
    <AdminShell title="Leads">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-[14px]">
          <thead>
            <tr className="text-driftwood">
              <th className="py-3 pr-4 font-mono text-xs uppercase">Name</th>
              <th className="py-3 pr-4 font-mono text-xs uppercase">Email</th>
              <th className="py-3 pr-4 font-mono text-xs uppercase">
                Pipeline
              </th>
              <th className="py-3 font-mono text-xs uppercase">Date</th>
            </tr>
          </thead>
          <tbody>
            {demoLeads.map((l) => (
              <tr key={l.email} className="">
                <td className="py-3 pr-4 text-ink">{l.name}</td>
                <td className="py-3 pr-4">{l.email}</td>
                <td className="py-3 pr-4">{l.pipeline}</td>
                <td className="py-3">{l.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
