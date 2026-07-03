"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { reports, incubatorPrograms } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import ResearchCard from "@/components/ui/research-card";

const nav = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/purchases", label: "Purchased Reports" },
  { href: "/dashboard/downloads", label: "Unlocked Reports" },
  { href: "/dashboard/orders", label: "Order History" },
  { href: "/dashboard/programs", label: "Programs" },
  { href: "/dashboard/bookmarks", label: "Bookmarks" },
  { href: "/dashboard/settings", label: "Settings" },
];

export function DashboardShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { session, ready } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (ready && !session) router.replace("/login?returnTo=/dashboard");
  }, [ready, session, router]);

  if (!ready || !session) {
    return <p className="px-6 py-[61px] text-driftwood">Loading account...</p>;
  }

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
        Account
      </p>
      <h1 className="mt-2 font-display text-[36px] text-ink">{title}</h1>
      <p className="mt-2 text-[14px] text-driftwood">
        Signed in as {session.email}
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-[220px_1fr]">
        <nav
          aria-label="Dashboard"
          className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:gap-1"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="shrink-0 rounded-full px-4 py-2 text-[14px] text-ink hover:bg-warm-sand lg:rounded-none lg:border-0 lg:px-0 lg:py-2"
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

export function DashboardOverview() {
  const { session, access } = useAuth();
  const purchasedReports = reports.filter((r) =>
    access.purchased.includes(r.slug),
  );
  const enrolledPrograms = incubatorPrograms.filter((p) =>
    access.enrollments.includes(p.slug),
  );
  const bookmarked = reports.filter((r) => access.bookmarks.includes(r.slug));

  return (
    <DashboardShell
      title={`Welcome${session?.firstName ? `, ${session.firstName}` : ""}`}
    >
      <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
        {[
          { label: "Purchased", value: access.purchased.length },
          {
            label: "Unlocked",
            value: access.free.length + access.purchased.length,
          },
          { label: "Bookmarks", value: access.bookmarks.length },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-warm-sand p-6"
            style={{ borderRadius: "16px" }}
          >
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
              {stat.label}
            </p>
            <p className="mt-2 font-display text-[32px] text-ink">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {purchasedReports.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-[20px] text-ink">
            Recent purchases
          </h2>
          <div className="mt-4 grid grid-cols-1 gap-1 md:grid-cols-2">
            {purchasedReports.slice(0, 2).map((r) => (
              <ResearchCard key={r.slug} report={r} />
            ))}
          </div>
        </section>
      ) : null}

      {enrolledPrograms.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-[20px] text-ink">
            Program enrollments
          </h2>
          <ul className="mt-4 space-y-2">
            {enrolledPrograms.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/incubator/${p.slug}`}
                  className="text-[15px] text-ink hover:underline"
                >
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {bookmarked.length > 0 ? (
        <section className="mt-10">
          <h2 className="font-display text-[20px] text-ink">Bookmarked</h2>
          <div className="mt-4 grid grid-cols-1 gap-1 md:grid-cols-2">
            {bookmarked.slice(0, 2).map((r) => (
              <ResearchCard key={r.slug} report={r} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="mt-10">
        <Link href="/research" className="text-[15px] text-ink">
          Browse research library →
        </Link>
      </div>
    </DashboardShell>
  );
}
