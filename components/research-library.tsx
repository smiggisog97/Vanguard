"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ResearchCard from "@/components/ui/research-card";
import { LucideIcon } from "@/components/ui/lucide-icon";
import type { Report } from "@/lib/data";

const categories = ["All", "Sector", "Macro", "Capital Markets"] as const;
const tiers = ["All", "Free", "Paid"] as const;
const researchTypes = [
  "All",
  "Sector Brief",
  "Macro Outlook",
  "Capital Markets",
  "Country Note",
  "Policy Brief",
] as const;
const sortOptions = ["newest", "popular", "updated"] as const;

type ViewMode = "grid" | "list";

export default function ResearchLibrary({ reports }: { reports: Report[] }) {
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  const [category, setCategory] = useState<(typeof categories)[number]>(
    (searchParams.get("category") as (typeof categories)[number]) ?? "All",
  );
  const [tier, setTier] = useState<(typeof tiers)[number]>(
    (searchParams.get("tier") as (typeof tiers)[number]) ?? "All",
  );
  const [country, setCountry] = useState(searchParams.get("country") ?? "All");
  const [industry, setIndustry] = useState(
    searchParams.get("industry") ?? "All",
  );
  const [researchType, setResearchType] = useState<
    (typeof researchTypes)[number]
  >((searchParams.get("type") as (typeof researchTypes)[number]) ?? "All");
  const [sort, setSort] = useState<(typeof sortOptions)[number]>(
    (searchParams.get("sort") as (typeof sortOptions)[number]) ?? "newest",
  );
  const [view, setView] = useState<ViewMode>("grid");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const countries = useMemo(
    () => ["All", ...Array.from(new Set(reports.map((r) => r.country)))],
    [reports],
  );
  const industries = useMemo(
    () => ["All", ...Array.from(new Set(reports.map((r) => r.industry)))],
    [reports],
  );

  const filtered = useMemo(() => {
    let results = reports.filter((r) => {
      if (category !== "All" && r.category !== category) return false;
      if (tier !== "All" && r.tier !== tier) return false;
      if (country !== "All" && r.country !== country) return false;
      if (industry !== "All" && r.industry !== industry) return false;
      if (researchType !== "All" && r.researchType !== researchType)
        return false;
      if (query) {
        const q = query.toLowerCase();
        if (
          !r.title.toLowerCase().includes(q) &&
          !r.abstract.toLowerCase().includes(q) &&
          !r.tags.some((t) => t.toLowerCase().includes(q))
        )
          return false;
      }
      return true;
    });

    if (sort === "newest")
      results = [...results].sort((a, b) => b.date.localeCompare(a.date));
    else if (sort === "popular")
      results = [...results].sort((a, b) => b.popularity - a.popularity);
    else
      results = [...results].sort((a, b) =>
        b.updatedAt.localeCompare(a.updatedAt),
      );

    return results;
  }, [reports, category, tier, country, industry, researchType, query, sort]);

  const FilterControls = useCallback(
    () => (
      <div className="space-y-4">
        <input
          type="search"
          placeholder="Search title, abstract, tags..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search research"
          className="w-full bg-parchment px-4 py-2 text-[15px] text-ink placeholder:text-driftwood focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
          style={{ borderRadius: "4px" }}
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as typeof category)}
          aria-label="Filter by sector"
          className="filter-select w-full bg-parchment pl-3 py-2 text-[14px] text-ink focus:outline-none"
          style={{ borderRadius: "4px" }}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All sectors" : c}
            </option>
          ))}
        </select>
        <select
          value={industry}
          onChange={(e) => setIndustry(e.target.value)}
          aria-label="Filter by industry"
          className="filter-select w-full bg-parchment pl-3 py-2 text-[14px] text-ink focus:outline-none"
          style={{ borderRadius: "4px" }}
        >
          {industries.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All industries" : c}
            </option>
          ))}
        </select>
        <select
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          aria-label="Filter by country"
          className="filter-select w-full bg-parchment pl-3 py-2 text-[14px] text-ink focus:outline-none"
          style={{ borderRadius: "4px" }}
        >
          {countries.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All countries" : c}
            </option>
          ))}
        </select>
        <select
          value={researchType}
          onChange={(e) =>
            setResearchType(e.target.value as typeof researchType)
          }
          aria-label="Filter by research type"
          className="filter-select w-full bg-parchment pl-3 py-2 text-[14px] text-ink focus:outline-none"
          style={{ borderRadius: "4px" }}
        >
          {researchTypes.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "All types" : t}
            </option>
          ))}
        </select>
        <select
          value={tier}
          onChange={(e) => setTier(e.target.value as typeof tier)}
          aria-label="Filter by access"
          className="filter-select w-full bg-parchment pl-3 py-2 text-[14px] text-ink focus:outline-none"
          style={{ borderRadius: "4px" }}
        >
          {tiers.map((t) => (
            <option key={t} value={t}>
              {t === "All" ? "Free & Paid" : t}
            </option>
          ))}
        </select>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as typeof sort)}
          aria-label="Sort research"
          className="filter-select w-full bg-parchment pl-3 py-2 text-[14px] text-ink focus:outline-none"
          style={{ borderRadius: "4px" }}
        >
          <option value="newest">Newest</option>
          <option value="popular">Most Popular</option>
          <option value="updated">Recently Updated</option>
        </select>
      </div>
    ),
    [
      query,
      category,
      industry,
      country,
      researchType,
      tier,
      sort,
      countries,
      industries,
    ],
  );

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[260px_1fr]">
      <aside className="hidden lg:block">
        <div
          className="sticky top-24 bg-warm-sand p-5"
          style={{ borderRadius: "16px" }}
        >
          <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
            Filters
          </p>
          <div className="mt-4">
            <FilterControls />
          </div>
        </div>
      </aside>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-1">
          <p className="text-[14px] text-driftwood">
            {filtered.length} reports
          </p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setMobileFiltersOpen(true)}
              className="bg-warm-sand px-3 py-2 text-[13px] text-ink lg:hidden"
              style={{ borderRadius: "4px" }}
              aria-label="Open filters"
            >
              Filters
            </button>
            <div
              className="flex"
              style={{ borderRadius: "4px" }}
              role="group"
              aria-label="View mode"
            >
              <button
                type="button"
                onClick={() => setView("grid")}
                aria-pressed={view === "grid"}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-[13px] ${view === "grid" ? "bg-ink text-parchment" : "bg-parchment text-ink"}`}
              >
                <LucideIcon name="layout-grid" size={14} />
                Grid
              </button>
              <button
                type="button"
                onClick={() => setView("list")}
                aria-pressed={view === "list"}
                className={`inline-flex items-center gap-1.5 px-3 py-2 text-[13px] ${view === "list" ? "bg-ink text-parchment" : "bg-parchment text-ink"}`}
              >
                <LucideIcon name="list" size={14} />
                List
              </button>
            </div>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div
            className="mt-8 bg-warm-sand p-10 text-center"
            style={{ borderRadius: "16px" }}
          >
            <p className="font-display text-[20px] text-ink">
              No reports found
            </p>
            <p className="mt-2 text-[14px] text-driftwood">
              Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          <div
            className={`reveal-stagger mt-4 ${view === "grid" ? "grid grid-cols-1 gap-1 md:grid-cols-2 xl:grid-cols-3" : "flex flex-col gap-1"}`}
          >
            {filtered.map((report) => (
              <ResearchCard key={report.slug} report={report} variant={view} />
            ))}
          </div>
        )}
      </div>

      {mobileFiltersOpen ? (
        <div
          className="fixed inset-0 z-[90] lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          <button
            type="button"
            className="absolute inset-0 bg-ink/40"
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
          />
          <div
            className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-parchment p-6"
            style={{ borderRadius: "16px 16px 0 0" }}
          >
            <div className="mb-4 flex items-center justify-between">
              <p className="font-display text-[18px] text-ink">Filters</p>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(false)}
                className="text-[14px] text-ink"
              >
                Close
              </button>
            </div>
            <FilterControls />
          </div>
        </div>
      ) : null}
    </div>
  );
}
