export default function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="mt-3 font-display text-[28px] leading-[1.15] tracking-[-0.56px] text-ink md:text-[36px] md:tracking-[-0.72px]">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-[18px] leading-[1.5] text-driftwood">
          {description}
        </p>
      ) : null}
    </div>
  );
}
