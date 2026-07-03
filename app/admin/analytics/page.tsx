"use client";

import { AdminShell } from "@/components/admin-client";

export default function AdminAnalyticsPage() {
  const funnel = [
    { stage: "Visitors", value: 12400 },
    { stage: "Research Views", value: 4200 },
    { stage: "Email Captures", value: 840 },
    { stage: "Purchases", value: 126 },
    { stage: "Advisory Inquiries", value: 34 },
  ];

  return (
    <AdminShell title="Analytics">
      <h2 className="font-display text-[20px] text-ink">Conversion Funnel</h2>
      <div className="mt-4 space-y-3">
        {funnel.map((f) => (
          <div key={f.stage}>
            <div className="flex justify-between text-[14px]">
              <span>{f.stage}</span>
              <span>{f.value.toLocaleString()}</span>
            </div>
            <div
              className="mt-1 h-2 bg-ash-border"
              style={{ borderRadius: "4px" }}
            >
              <div
                className="h-2 bg-ink"
                style={{
                  borderRadius: "4px",
                  width: `${(f.value / funnel[0].value) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-10 grid grid-cols-1 gap-1 md:grid-cols-2">
        <div className="bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
          <p className="font-mono text-xs uppercase text-driftwood">
            Top Reports
          </p>
          <ul className="mt-3 space-y-1 text-[14px]">
            <li>South Asia Rate Cycle</li>
            <li>Private Credit in Emerging Asia</li>
            <li>Bangladesh RMG 2026 Outlook</li>
          </ul>
        </div>
        <div className="bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
          <p className="font-mono text-xs uppercase text-driftwood">
            Lead Sources
          </p>
          <ul className="mt-3 space-y-1 text-[14px]">
            <li>Organic search · 42%</li>
            <li>Direct · 28%</li>
            <li>Referral · 18%</li>
            <li>Newsletter · 12%</li>
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
