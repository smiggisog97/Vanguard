export function BulletList({
  items,
  className = "mt-3 space-y-2",
  itemClassName = "flex gap-2 text-[14px] leading-[1.4] text-driftwood",
}: {
  items: string[];
  className?: string;
  itemClassName?: string;
}) {
  return (
    <ul className={className}>
      {items.map((item) => (
        <li key={item} className={itemClassName}>
          <span className="shrink-0 text-royal">·</span>
          <span className="min-w-0 flex-1">{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function BulletGrid({
  items,
  className = "reveal-stagger mt-4 grid grid-cols-1 gap-x-8 gap-y-2 sm:grid-cols-2 md:grid-cols-3",
}: {
  items: string[];
  className?: string;
}) {
  return (
    <BulletList
      items={items}
      className={className}
      itemClassName="flex gap-2 text-[14px] leading-[1.4] text-ink"
    />
  );
}
