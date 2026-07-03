import Link from "next/link";
import { LucideIcon } from "@/components/ui/lucide-icon";

export function BackLink({
  href,
  children,
  className = "text-[15px] text-ink",
  underline = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  underline?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-1.5 hover:text-hover ${underline ? "underline underline-offset-2" : ""} ${className}`}
    >
      <LucideIcon name="arrow-left" size={15} />
      {children}
    </Link>
  );
}

export function BackButton({
  children = "Back",
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-1.5 ${className ?? ""}`}
      {...props}
    >
      <LucideIcon name="arrow-left" size={15} />
      {children}
    </button>
  );
}
