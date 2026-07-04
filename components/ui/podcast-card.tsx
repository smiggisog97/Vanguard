import Link from "next/link";
import { Chip } from "@/components/ui/funnel-cta";

export default function PodcastCard({
  title,
  date,
  excerpt,
  href,
}: {
  title: string;
  date: string;
  excerpt: string;
  href?: string;
}) {
  const content = (
    <>
      <Chip>{`Podcast · ${date}`}</Chip>
      <h3 className="mt-3 font-display text-[22px] leading-[1.3] text-ink">
        {title}
      </h3>
      <p className="mt-3 text-[15px] leading-[1.5] text-driftwood line-clamp-3">
        {excerpt}
      </p>
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="card-lift bg-warm-sand p-[31px] transition-colors"
        style={{ borderRadius: "16px" }}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-warm-sand p-[31px]" style={{ borderRadius: "16px" }}>
      {content}
    </div>
  );
}
