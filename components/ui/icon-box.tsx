import { LucideIcon } from "@/components/ui/lucide-icon";

export function IconBox({
  icon,
  hover = false,
}: {
  icon: string;
  hover?: boolean;
}) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center border border-fog text-ink ${
        hover
          ? "transition-colors group-hover:border-hover group-hover:text-hover"
          : ""
      }`}
      style={{ borderRadius: "12px" }}
      aria-hidden
    >
      <LucideIcon name={icon} size={22} />
    </div>
  );
}
