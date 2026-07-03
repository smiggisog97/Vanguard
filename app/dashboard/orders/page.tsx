"use client";

import { useAuth } from "@/components/auth-provider";
import { DashboardShell } from "@/components/dashboard-client";

export default function OrdersPage() {
  const { access } = useAuth();

  return (
    <DashboardShell title="Order History">
      {access.orders.length === 0 ? (
        <p className="text-driftwood">No orders yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-[14px]">
            <thead>
              <tr className="text-driftwood">
                <th className="py-3 pr-4 font-mono text-xs uppercase">Order</th>
                <th className="py-3 pr-4 font-mono text-xs uppercase">Item</th>
                <th className="py-3 pr-4 font-mono text-xs uppercase">
                  Amount
                </th>
                <th className="py-3 pr-4 font-mono text-xs uppercase">
                  Status
                </th>
                <th className="py-3 font-mono text-xs uppercase">Date</th>
              </tr>
            </thead>
            <tbody>
              {access.orders.map((o) => (
                <tr key={o.id} className="">
                  <td className="py-3 pr-4 text-ink">{o.id}</td>
                  <td className="py-3 pr-4 text-ink">{o.title}</td>
                  <td className="py-3 pr-4">{o.amount}</td>
                  <td className="py-3 pr-4 capitalize">{o.status}</td>
                  <td className="py-3">{o.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </DashboardShell>
  );
}
