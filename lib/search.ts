import type { Report, Insight, IncubatorProgram } from "@/lib/types";
import { reports, insights, incubatorPrograms } from "@/lib/data";

export type SearchResult = {
  type: "report" | "insight" | "program" | "page";
  slug: string;
  title: string;
  excerpt: string;
  href: string;
  meta?: string;
};

const staticPages: SearchResult[] = [
  { type: "page", slug: "advisory", title: "Corporate Advisory", excerpt: "Capital strategy and governance for corporates and family businesses.", href: "/advisory" },
  { type: "page", slug: "bespoke", title: "Bespoke Research", excerpt: "Custom research engagements for institutional decision-makers.", href: "/bespoke" },
  { type: "page", slug: "incubator", title: "Advanced Incubator", excerpt: "Executive education programs for family business owners and startup founders.", href: "/incubator" },
  { type: "page", slug: "about", title: "About Sajid Amit", excerpt: "Biography, publications, and institutional leadership.", href: "/about" },
];

export function searchAll(query: string): SearchResult[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const reportResults: SearchResult[] = reports
    .filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.abstract.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q)) ||
        r.country.toLowerCase().includes(q) ||
        r.industry.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
    )
    .map((r) => ({
      type: "report" as const,
      slug: r.slug,
      title: r.title,
      excerpt: r.abstract,
      href: `/research/${r.slug}`,
      meta: `${r.category} · ${r.country}`,
    }));

  const insightResults: SearchResult[] = insights
    .filter(
      (i) =>
        i.title.toLowerCase().includes(q) ||
        i.excerpt.toLowerCase().includes(q) ||
        i.type.toLowerCase().includes(q)
    )
    .map((i) => ({
      type: "insight" as const,
      slug: i.slug,
      title: i.title,
      excerpt: i.excerpt,
      href: `/insights/${i.slug}`,
      meta: i.type,
    }));

  const programResults: SearchResult[] = incubatorPrograms
    .filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.overview.toLowerCase().includes(q) ||
        p.audience.toLowerCase().includes(q)
    )
    .map((p) => ({
      type: "program" as const,
      slug: p.slug,
      title: p.title,
      excerpt: p.overview,
      href: `/incubator/${p.slug}`,
      meta: p.audience,
    }));

  const pageResults = staticPages.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.excerpt.toLowerCase().includes(q)
  );

  return [...reportResults, ...insightResults, ...programResults, ...pageResults].slice(0, 12);
}

export function getSearchSuggestions(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const titles = [
    ...reports.map((r) => r.title),
    ...reports.flatMap((r) => r.tags),
    ...insights.map((i) => i.title),
    "Corporate Advisory",
    "Bespoke Research",
    "Advanced Incubator",
  ];

  return titles
    .filter((t) => t.toLowerCase().includes(q))
    .slice(0, 5);
}
