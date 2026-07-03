export default function PodcastCard({
  title,
  date,
  excerpt,
}: {
  title: string;
  date: string;
  excerpt: string;
}) {
  return (
    <div className="bg-warm-sand p-[31px]" style={{ borderRadius: "16px" }}>
      <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
        Podcast · {date}
      </p>
      <p className="mt-3 font-display text-[20px] text-ink">{title}</p>
      <p className="mt-2 text-[15px] leading-[1.5] text-driftwood">{excerpt}</p>
      <p className="mt-4 text-[15px] text-ink">Listen now →</p>
    </div>
  );
}
