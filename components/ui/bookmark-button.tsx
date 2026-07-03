"use client";

import type { Report } from "@/lib/data";
import { useAuth } from "@/components/auth-provider";

function BookmarkIcon({ filled }: { filled?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M4 2.5h8a.5.5 0 0 1 .5.5v10.3L8 11.2 3.5 13.3V3a.5.5 0 0 1 .5-.5Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ShareIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <path
        d="M8 9.5V3M8 3 5.5 5.5M8 3l2.5 2.5M4 6.5v6h8v-6"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

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
      <BookmarkIcon filled={active} />
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
      <ShareIcon />
      Share
    </button>
  );
}
