import { LucideIcon } from "@/components/ui/lucide-icon";
import { getAdvisoryServiceIcon } from "@/components/ui/feature-card";

type Service = {
  title: string;
  deliverables: string[];
};

export default function ServiceDeliverablesLedger({
  services,
}: {
  services: Service[];
}) {
  return (
    <div
      className="reveal-stagger mt-6 divide-y divide-ash-border overflow-hidden border border-ash-border bg-parchment"
      style={{ borderRadius: "16px" }}
    >
      {services.map((service) => (
        <article
          key={service.title}
          className="grid grid-cols-1 gap-6 p-6 md:grid-cols-[minmax(0,240px)_1fr] md:items-start md:gap-10 md:p-8 lg:grid-cols-[minmax(0,280px)_1fr]"
        >
          <div className="flex items-center gap-3">
            <LucideIcon
              name={getAdvisoryServiceIcon(service.title)}
              size={22}
              className="shrink-0 text-ink"
            />
            <h3 className="font-display text-[22px] leading-[1.2] text-ink">
              {service.title}
            </h3>
          </div>

          <ul className="grid grid-cols-1 gap-x-10 gap-y-2 sm:grid-cols-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex gap-2 text-[14px] leading-[1.45] text-driftwood"
              >
                <span className="text-royal">·</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}
