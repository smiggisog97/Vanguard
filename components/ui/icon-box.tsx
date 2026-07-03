import { LucideIcon } from "@/components/ui/lucide-icon";

export function IconBox({
  icon,
  hover = false,
}: {
  icon: string;
  hover?: boolean;
}) {
  return (
    <LucideIcon
      name={icon}
      size={22}
      className={`text-ink${hover ? " transition-colors group-hover:text-hover" : ""}`}
    />
  );
}
