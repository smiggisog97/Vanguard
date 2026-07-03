import { Icon } from "@iconify/react";

export function LucideIcon({
  name,
  size = 22,
  className,
  style,
}: {
  name: string;
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const icon = name.includes(":") ? name : `lucide:${name}`;

  return (
    <Icon
      icon={icon}
      width={size}
      height={size}
      className={className}
      style={style}
      aria-hidden
    />
  );
}
