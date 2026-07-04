"use client";

import { useState } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/section-header";
import Newsletter from "@/components/ui/newsletter";
import PodcastCard from "@/components/ui/podcast-card";
import { Chip } from "@/components/ui/funnel-cta";
import { insights, insightCategories } from "@/lib/data";

export default function InsightsPage() {
  const [category, setCategory] = useState<string>("All");
  const filtered =
    category === "All"
      ? insights
      : insights.filter((i) => i.category === category);

  return (
    <div className="mx-auto max-w-[1200px] px-6 py-[61px]">
      <section className="reveal-section">
        <SectionHeader
          eyebrow="Insights"
          title="Editorial hub for research, articles, and media"
          description="Analysis, commentary, podcasts, and columns from Vanguard and Sajid Amit."
        />
      </section>

      <section className="reveal-section mt-8">
        <div
          className="flex flex-wrap gap-2"
          role="tablist"
          aria-label="Insight categories"
        >
          {insightCategories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={`px-4 py-2 text-[13px] ${category === c ? "bg-ink text-parchment" : "bg-warm-sand text-ink"}`}
              style={{ borderRadius: "9999px" }}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      <section className="reveal-section mt-10">
        <div className="reveal-stagger grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) =>
            item.type === "Podcast" ? (
              <PodcastCard
                key={item.slug}
                title={item.title}
                date={item.date}
                excerpt={item.excerpt}
                href={`/insights/${item.slug}`}
              />
            ) : (
              <Link
                key={item.slug}
                href={`/insights/${item.slug}`}
                className="card-lift bg-warm-sand p-[31px] transition-colors"
                style={{ borderRadius: "16px" }}
              >
                <Chip>{`${item.type} · ${item.date}`}</Chip>
                <h3 className="mt-3 font-display text-[22px] leading-[1.3] text-ink">
                  {item.title}
                </h3>
                <p className="mt-3 text-[15px] leading-[1.5] text-driftwood line-clamp-3">
                  {item.excerpt}
                </p>
              </Link>
            ),
          )}
        </div>
      </section>

      <section className="reveal-section mt-16">
        <Newsletter />
      </section>
    </div>
  );
}
