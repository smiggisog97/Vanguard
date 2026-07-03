import Image from "next/image";
import { trustLogos } from "@/lib/data";

const logoStyles = {
  wordmark:
    "logo-marquee__logo h-8 w-auto max-w-[150px] object-contain md:h-9 md:max-w-[170px]",
  lockup:
    "logo-marquee__logo logo-marquee__logo--lockup h-8 w-auto max-w-[88px] object-contain md:h-9 md:max-w-[100px]",
};

const REPEAT = 4;

function LogoGroup({ ariaHidden = false }: { ariaHidden?: boolean }) {
  const sequence = Array.from({ length: REPEAT }, () => trustLogos).flat();

  return (
    <div
      className="logo-marquee__group flex shrink-0 items-center"
      aria-hidden={ariaHidden || undefined}
    >
      {sequence.map((logo, i) => (
        <div
          key={`${logo.name}-${i}`}
          className="logo-marquee__item flex shrink-0 items-center px-10"
        >
          <Image
            src={logo.image}
            alt={ariaHidden ? "" : logo.name}
            width={logo.variant === "lockup" ? 100 : 170}
            height={logo.variant === "lockup" ? 50 : 36}
            unoptimized={logo.image.endsWith(".svg")}
            className={logoStyles[logo.variant]}
          />
        </div>
      ))}
    </div>
  );
}

export default function LogoMarquee() {
  return (
    <section
      className="logo-marquee py-6"
      aria-label="Affiliations and research coverage"
    >
      <div className="mx-auto max-w-[1200px] px-6">
        <div className="logo-marquee__mask relative overflow-hidden">
          <div className="logo-marquee__track flex w-max items-center">
            <LogoGroup />
            <LogoGroup ariaHidden />
          </div>
        </div>
      </div>
    </section>
  );
}
