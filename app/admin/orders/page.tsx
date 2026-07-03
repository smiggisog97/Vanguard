"use client";

import { AdminShell } from "@/components/admin-client";

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Orders & Revenue">
      <p className="text-driftwood">
        Order and revenue data syncs from checkout pipelines. Demo data shown in
        user dashboards.
      </p>
      <div className="mt-6 bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
        <p className="font-mono text-xs uppercase text-driftwood">
          Revenue (MTD)
        </p>
        <p className="mt-2 font-display text-[32px] text-ink">$12,450</p>
      </div>
    </AdminShell>
  );
}
