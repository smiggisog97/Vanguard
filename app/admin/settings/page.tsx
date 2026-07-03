"use client";

import { AdminShell } from "@/components/admin-client";

export default function AdminSettingsPage() {
  return (
    <AdminShell title="Settings">
      <p className="text-driftwood">
        Single-admin configuration. Payment gateway credentials, CRM
        integrations, and publish controls would be managed here.
      </p>
      <ul className="mt-6 space-y-2 text-[14px] text-ink">
        <li>Stripe · Not connected</li>
        <li>SSLCommerz · Not connected</li>
        <li>CRM webhook · Not configured</li>
      </ul>
    </AdminShell>
  );
}
