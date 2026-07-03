"use client";

import Link from "next/link";
import { reports, incubatorPrograms } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const adminNav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/research", label: "Research Assets" },
  { href: "/admin/leads", label: "Leads" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/programs", label: "Programs" },
  { href: "/admin/analytics", label: "Analytics" },
  { href: "/admin/settings", label: "Settings" },
];

const ADMIN_EMAIL = "admin@vanguard.com";

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { session, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && (!session || session.email !== ADMIN_EMAIL))
      router.replace("/login?returnTo=/admin");
  }, [ready, session, router]);

  if (!ready || !session)
    return <p className="px-6 py-[61px] text-driftwood">Loading admin...</p>;

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
        Admin
      </p>
      <h1 className="mt-2 font-display text-[36px] text-ink">{title}</h1>
      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[200px_1fr]">
        <nav
          className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1"
          aria-label="Admin"
        >
          {adminNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 py-2 text-[14px] text-ink hover:text-driftwood"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Published Reports", value: reports.length },
          { label: "Programs", value: incubatorPrograms.length },
          { label: "Revenue (demo)", value: "$12,450" },
          { label: "Leads (demo)", value: "84" },
        ].map((s) => (
          <div
            key={s.label}
            className="bg-warm-sand p-6"
            style={{ borderRadius: "16px" }}
          >
            <p className="font-mono text-xs uppercase text-driftwood">
              {s.label}
            </p>
            <p className="mt-2 font-display text-[28px] text-ink">{s.value}</p>
          </div>
        ))}
      </div>
      <p className="mt-8 text-[14px] text-driftwood">
        Demo admin. Log in as admin@vanguard.com to access.
      </p>
    </AdminShell>
  );
}
