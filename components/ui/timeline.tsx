import { LucideIcon } from "@/components/ui/lucide-icon";

export default function Timeline({
  steps,
  icons,
}: {
  steps: { step: string; description: string }[];
  icons?: string[];
}) {
  return (
    <ol className="grid grid-cols-1 gap-1 md:grid-cols-3 lg:grid-cols-5">
      {steps.map((s, i) => (
        <li
          key={s.step}
          className="bg-warm-sand p-6"
          style={{ borderRadius: "16px" }}
        >
          {icons?.[i] ? (
            <LucideIcon name={icons[i]} size={22} className="text-ink" />
          ) : null}
          <p
            className={`font-display text-[20px] text-ink ${icons?.[i] ? "mt-4" : ""}`}
          >
            {s.step}
          </p>
          <p className="mt-2 text-[15px] leading-[1.5] text-driftwood">
            {s.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
