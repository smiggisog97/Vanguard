"use client";

import type { Report } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";
import { LucideIcon } from "@/components/ui/lucide-icon";

export default function BookmarkButton({ slug }: { slug: string }) {
  const { session, isBookmarked, toggleBookmark } = useAuth();
  const active = session ? isBookmarked(slug) : false;

  return (
    <button
      type="button"
      onClick={() => session && toggleBookmark(slug)}
      disabled={!session}
      aria-label={active ? "Remove bookmark" : "Bookmark report"}
      aria-pressed={active}
      className="btn-action inline-flex items-center gap-2 bg-warm-sand px-4 py-2 text-[14px] text-ink disabled:opacity-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      style={{ borderRadius: "9999px" }}
      title={session ? undefined : "Log in to bookmark"}
    >
      <LucideIcon
        name={active ? "bookmark-check" : "bookmark"}
        size={16}
        className={active ? "text-ink" : undefined}
      />
      {active ? "Bookmarked" : "Bookmark"}
    </button>
  );
}

export function ShareButton({ report }: { report: Report }) {
  const share = async () => {
    const url = `${window.location.origin}/research/${report.slug}`;
    if (navigator.share) {
      await navigator.share({ title: report.title, url });
    } else {
      await navigator.clipboard.writeText(url);
    }
  };

  return (
    <button
      type="button"
      onClick={share}
      aria-label="Share report"
      className="btn-action inline-flex items-center gap-2 bg-warm-sand px-4 py-2 text-[14px] text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
      style={{ borderRadius: "9999px" }}
    >
      <LucideIcon name="share-2" size={16} />
      Share
    </button>
  );
}
