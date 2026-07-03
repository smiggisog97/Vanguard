import { MagnetChip } from "@/components/ui/industry-chip";

type ChipLayout = {
  top: string;
  left: string;
  rotate: number;
};

const defaultChipLayouts: ChipLayout[] = [
  { top: "6%", left: "4%", rotate: -2.5 },
  { top: "4%", left: "48%", rotate: 3 },
  { top: "32%", left: "18%", rotate: -1.5 },
  { top: "26%", left: "58%", rotate: 2 },
  { top: "56%", left: "2%", rotate: -3 },
  { top: "50%", left: "44%", rotate: 1.5 },
  { top: "74%", left: "24%", rotate: -2 },
];

export default function CoveragePanel({
  eyebrow,
  title,
  description,
  items,
  chipLayouts = defaultChipLayouts,
}: {
  eyebrow: string;
  title: string;
  description: string;
  items: string[];
  chipLayouts?: ChipLayout[];
}) {
  return (
    <div
      className="reveal-stagger mt-6 overflow-hidden border border-ash-border bg-warm-sand"
      style={{ borderRadius: "16px" }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,380px)_1fr]">
        <div className="border-b border-ash-border px-6 py-8 lg:border-b-0 lg:border-r lg:px-10 lg:py-10">
          <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-driftwood">
            {eyebrow}
          </p>
          <p className="mt-3 font-display text-[26px] leading-[1.2] text-ink">
            {title}
          </p>
          <p className="mt-3 text-[14px] leading-[1.55] text-driftwood">
            {description}
          </p>
        </div>

        <div className="relative min-h-[300px] px-4 py-8 sm:min-h-[280px] sm:px-6 lg:min-h-[280px] lg:px-8 lg:py-10">
          <div
            className="relative h-full min-h-[240px] sm:min-h-[220px]"
            role="list"
            aria-label={items.join(", ")}
          >
            {items.map((item, index) => (
              <MagnetChip
                key={item}
                label={item}
                layout={chipLayouts[index % chipLayouts.length]}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
