import Link from "next/link";
import { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "dark";
  className?: string;
};

const variants = {
  dark: "bg-ink text-parchment hover:text-parchment",
  primary: "bg-transparent text-ink hover:bg-warm-sand hover:text-ink",
  ghost: "bg-transparent text-ink border-none px-3 hover:text-ink",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: Props) {
  return (
    <Link
      href={href}
      className={`btn-action inline-block rounded-full px-4 py-2 text-[15px] font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
