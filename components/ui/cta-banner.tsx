import Button from "./button";

export default function CTABanner({
  title,
  description,
  primary,
  secondary,
}: {
  title: string;
  description: string;
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
}) {
  return (
    <div
      className="bg-ink px-[31px] py-[60px] md:px-[60px]"
      style={{ borderRadius: "24px" }}
    >
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="font-display text-[36px] leading-[1.1] text-parchment md:text-[53px]">
          {title}
        </h2>
        <p className="mt-4 text-[18px] leading-[1.5] text-driftwood">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href={primary.href} variant="primary">
            {primary.label}
          </Button>
          {secondary ? (
            <Button
              href={secondary.href}
              variant="ghost"
              className="! !text-parchment hover:!text-parchment"
            >
              {secondary.label}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
