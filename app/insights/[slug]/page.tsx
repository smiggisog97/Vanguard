import { insights } from "@/lib/data";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return insights
    .filter((i) => i.type !== "Podcast")
    .map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = insights.find((i) => i.slug === slug);
  return {
    title: item ? `${item.title} | Vanguard Insights` : "Insight | Vanguard",
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = insights.find((i) => i.slug === slug);
  if (!item) notFound();

  return (
    <article className="mx-auto max-w-[800px] px-6 py-[61px]">
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
        {item.type} · {item.category}
      </p>
      <h1 className="mt-4 font-display text-[36px] leading-[1.15] text-ink">
        {item.title}
      </h1>
      <p className="mt-3 text-[14px] text-driftwood">
        {item.author} · {item.date}
      </p>
      <p className="mt-8 text-[18px] leading-[1.65] text-driftwood">
        {item.excerpt}
      </p>
      <p className="mt-6 text-[16px] leading-[1.65] text-driftwood">
        This editorial preview connects to Vanguard&apos;s broader research and
        advisory platform. For the full analysis, explore our research library
        or contact our team for bespoke work.
      </p>
      <div className="mt-10 flex flex-wrap gap-4">
        <Link href="/research" className="text-[15px] text-ink underline">
          Browse research
        </Link>
        <Link href="/insights" className="text-[15px] text-ink underline">
          ← Back to insights
        </Link>
      </div>
    </article>
  );
}
