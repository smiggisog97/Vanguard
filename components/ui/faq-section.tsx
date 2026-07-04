type FaqItem = {
  q: string;
  a: string;
};

type FaqSectionProps = {
  items: FaqItem[];
  title?: string;
  className?: string;
  stagger?: boolean;
};

export default function FaqSection({
  items,
  title = "FAQ",
  className = "reveal-section mt-12",
  stagger = false,
}: FaqSectionProps) {
  return (
    <section className={className}>
      <h2 className="font-display text-[24px] text-ink">{title}</h2>
      <div
        className={`mt-1 divide-y divide-fog/40${stagger ? " reveal-stagger" : ""}`}
      >
        {items.map((item) => (
          <div key={item.q} className="py-5">
            <p className="font-display text-[18px] text-ink">{item.q}</p>
            <p className="mt-2 text-[15px] text-driftwood">{item.a}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
