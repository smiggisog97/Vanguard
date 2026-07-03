import Link from "next/link";

export default function CTABanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div
      className="cta-banner relative overflow-hidden bg-ink px-[31px] py-10 md:px-[48px] md:py-12"
      style={{ borderRadius: "12px" }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        aria-hidden
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 100% 0%, rgba(245, 78, 0, 0.1), transparent 55%)",
        }}
      />

      <div className="relative flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="max-w-2xl text-left">
          {eyebrow ? (
            <p className="font-mono text-[10px] font-semibold uppercase tracking-wide text-royal">
              {eyebrow}
            </p>
          ) : null}
          <h2
            className={`font-display text-[32px] leading-[1.08] text-parchment md:text-[44px] ${eyebrow ? "mt-3" : ""}`}
          >
            {title}
          </h2>
          <p className="mt-4 max-w-lg text-[16px] leading-[1.55] text-driftwood md:text-[17px]">
            {description}
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 border-t border-white/10 pt-6 md:w-auto md:shrink-0 md:border-t-0 md:pt-0">
          <Link
            href={primary.href}
            className="cta-banner__primary btn-action inline-flex items-center justify-center rounded-[12px] bg-parchment px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white hover:text-ink"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="cta-banner__secondary btn-action inline-flex items-center justify-center rounded-[12px] border border-white/20 px-5 py-3 text-[15px] font-medium text-parchment transition-colors hover:border-white/35 hover:bg-white/5 hover:text-parchment"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
