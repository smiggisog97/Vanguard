import Link from "next/link";

export default function FunnelCta({
  href,
  label,
  description,
}: {
  href: string;
  label: string;
  description?: string;
}) {
  return (
    <div className="bg-warm-sand p-6" style={{ borderRadius: "16px" }}>
      {description ? (
        <p className="text-[14px] leading-[1.5] text-driftwood">
          {description}
        </p>
      ) : null}
      <Link
        href={href}
        className="btn-action mt-3 inline-flex bg-ink px-5 py-2.5 text-[14px] font-medium text-parchment hover:text-parchment focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        style={{ borderRadius: "9999px" }}
      >
        {label}
      </Link>
    </div>
  );
}

type ChipTone = "default" | "gold" | "royal" | "moss";

export type ChipItem = string | { label: string; tone?: ChipTone };

const chipTones: Record<ChipTone, string> = {
  default: "border border-fog text-hover",
  gold: "border border-gold text-gold",
  royal: "border border-royal text-royal",
  moss: "border border-moss text-moss",
};

export function Chip({
  children,
  tone = "default",
}: {
  children: React.ReactNode;
  tone?: ChipTone;
}) {
  return (
    <span
      className={`inline-flex shrink-0 px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide ${chipTones[tone]}`}
      style={{ borderRadius: "9999px" }}
    >
      {children}
    </span>
  );
}

export function TagChips({ tags }: { tags: ChipItem[] }) {
  return (
    <div className="flex flex-wrap gap-3" role="list" aria-label="Tags">
      {tags.map((tag, index) => {
        const label = typeof tag === "string" ? tag : tag.label;
        const tone =
          typeof tag === "string" ? "default" : (tag.tone ?? "default");

        return (
          <Chip key={`${label}-${index}`} tone={tone}>
            {label}
          </Chip>
        );
      })}
    </div>
  );
}
