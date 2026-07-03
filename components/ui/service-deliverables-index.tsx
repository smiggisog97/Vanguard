import { IconBox } from "@/components/ui/icon-box";
import { BulletList } from "@/components/ui/bullet-list";
import { getAdvisoryServiceIcon } from "@/components/ui/feature-card";

type BentoVariant = "tall" | "default";

/** Pathao-style bento: 2 equal top · tall left · stacked right */
const bentoLayout: { className: string; variant: BentoVariant }[] = [
  { className: "md:col-start-1 md:row-start-1", variant: "default" },
  { className: "md:col-start-2 md:row-start-1", variant: "default" },
  {
    className: "md:col-start-1 md:row-start-2 md:row-span-2",
    variant: "tall",
  },
  { className: "md:col-start-2 md:row-start-2", variant: "default" },
  { className: "md:col-start-2 md:row-start-3", variant: "default" },
];

function ServiceBentoCell({
  title,
  deliverables,
  variant,
}: {
  title: string;
  deliverables: string[];
  variant: BentoVariant;
}) {
  const icon = getAdvisoryServiceIcon(title);

  return (
    <>
      <IconBox icon={icon} />
      <h3
        className={`mt-3 font-display leading-snug text-ink ${
          variant === "tall"
            ? "text-[20px] md:text-[22px]"
            : "text-[17px] md:text-[18px]"
        }`}
      >
        {title}
      </h3>
      <BulletList
        items={deliverables}
        className="mt-3 space-y-1.5"
        itemClassName="flex gap-2 text-[13px] leading-[1.4] text-driftwood md:text-[14px]"
      />
    </>
  );
}

export default function ServiceDeliverablesIndex({
  services,
}: {
  services: { title: string; deliverables: string[] }[];
}) {
  return (
    <div className="reveal-stagger mt-6 grid grid-cols-1 gap-1 md:grid-cols-2 md:grid-rows-[auto_auto_auto] md:gap-1">
      {services.map((service, index) => {
        const layout = bentoLayout[index];
        const variant = layout?.variant ?? "default";

        return (
          <article
            key={service.title}
            className={`flex flex-col bg-warm-sand p-5 ${layout?.className ?? ""}`}
            style={{ borderRadius: "16px" }}
          >
            <ServiceBentoCell
              title={service.title}
              deliverables={service.deliverables}
              variant={variant}
            />
          </article>
        );
      })}
    </div>
  );
}
