"use client";

import { reports } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import ResearchCard from "@/components/ui/research-card";
import { DashboardShell } from "@/components/dashboard-client";

export default function BookmarksPage() {
  const { access } = useAuth();
  const bookmarked = reports.filter((r) => access.bookmarks.includes(r.slug));

  return (
    <DashboardShell title="Bookmarks">
      {bookmarked.length === 0 ? (
        <p className="text-driftwood">
          No bookmarks yet. Bookmark reports from any research detail page.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {bookmarked.map((r) => (
            <ResearchCard key={r.slug} report={r} />
          ))}
        </div>
      )}
    </DashboardShell>
  );
}
