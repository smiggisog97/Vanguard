import Link from "next/link";
import CtaBannerVideo from "@/components/ui/cta-banner-video";

export default function CTABanner({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  videoSrc,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
  videoSrc?: string;
}) {
  return (
    <div
      className="cta-banner relative overflow-hidden bg-ink px-[31px] py-10 md:px-[48px] md:py-12"
      style={{ borderRadius: "12px" }}
    >
      {videoSrc ? <CtaBannerVideo src={videoSrc} /> : null}

      <div className="relative z-[1] flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
        <div className="max-w-2xl text-left">
          {eyebrow ? (
            <p className="font-mono text-xs font-semibold uppercase tracking-wide text-royal">
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
            className="cta-banner__primary btn-action inline-flex items-center justify-center rounded-full bg-parchment px-5 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-white hover:text-ink"
          >
            {primary.label}
          </Link>
          {secondary ? (
            <Link
              href={secondary.href}
              className="cta-banner__secondary btn-action inline-flex items-center justify-center rounded-full px-5 py-3 text-[15px] font-medium text-parchment"
            >
              {secondary.label}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
