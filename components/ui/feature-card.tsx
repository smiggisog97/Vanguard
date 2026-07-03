import { IconBox } from "@/components/ui/icon-box";
import { BulletList } from "@/components/ui/bullet-list";

/** Lucide icons via Iconify — https://icon-sets.iconify.design/lucide/ */
const icons: Record<string, string> = {
  "Capital Strategy": "trending-up",
  "Investor Readiness": "clipboard-check",
  Valuation: "scale",
  Governance: "landmark",
  "Capital Markets Pathways": "route",
};

export function getAdvisoryServiceIcon(title: string) {
  return icons[title] ?? "trending-up";
}

export function AdvisoryServiceIcon({ title }: { title: string }) {
  return <IconBox icon={getAdvisoryServiceIcon(title)} />;
}

export function FeatureCard({
  icon,
  title,
  description,
  items,
  children,
  className = "bg-warm-sand p-[31px]",
  titleClassName = "font-display text-[20px] text-ink",
  descriptionClassName = "mt-2 text-[15px] leading-[1.5] text-driftwood",
}: {
  icon?: string;
  title: string;
  description?: string;
  items?: string[];
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className={className} style={{ borderRadius: "16px" }}>
      {icon ? <IconBox icon={icon} /> : null}
      <p className={`${icon ? "mt-4" : ""} ${titleClassName}`}>{title}</p>
      {description ? (
        <p className={descriptionClassName}>{description}</p>
      ) : null}
      {items ? <BulletList items={items} /> : null}
      {children}
    </div>
  );
}
