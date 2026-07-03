"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { searchAll } from "@/lib/search";
import SectionHeader from "@/components/ui/section-header";

function SearchResults() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") ?? "";
  const results = useMemo(() => searchAll(q), [q]);

  return (
    <>
      <p className="mt-6 text-[14px] text-driftwood">
        {results.length} results for &ldquo;{q}&rdquo;
      </p>
      {results.length === 0 ? (
        <div
          className="mt-8 bg-warm-sand p-10 text-center"
          style={{ borderRadius: "16px" }}
        >
          <p className="font-display text-[20px] text-ink">No results found</p>
          <p className="mt-2 text-driftwood">
            Try different keywords or browse the{" "}
            <Link href="/research" className="text-ink underline">
              research library
            </Link>
            .
          </p>
        </div>
      ) : (
        <ul className="mt-6 space-y-4">
          {results.map((r) => (
            <li key={`${r.type}-${r.slug}`}>
              <Link
                href={r.href}
                className="block bg-warm-sand p-5 transition-colors"
                style={{ borderRadius: "16px" }}
              >
                <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-driftwood">
                  {r.type} · {r.meta}
                </p>
                <p className="mt-2 font-display text-[20px] text-ink">
                  {r.title}
                </p>
                <p className="mt-2 text-[14px] text-driftwood">{r.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <SectionHeader
        eyebrow="Search"
        title="Search the platform"
        description="Find research, insights, programs, and services across Vanguard."
      />
      <Suspense fallback={<p className="mt-6 text-driftwood">Searching...</p>}>
        <SearchResults />
      </Suspense>
    </div>
  );
}
