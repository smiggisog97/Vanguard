import { getAdvisoryServiceIcon } from "@/components/ui/feature-card";
import { IconBox } from "@/components/ui/icon-box";

const numbers = ["01", "02", "03", "04", "05"];

export default function ServiceDeliverablesIndex({
  services,
}: {
  services: { title: string; deliverables: string[] }[];
}) {
  return (
    <div className="reveal-stagger mt-6 divide-y divide-fog/40">
      {services.map((service, index) => {
        const icon = getAdvisoryServiceIcon(service.title);
        return (
          <div
            key={service.title}
            className="group grid grid-cols-1 gap-4 py-7 md:grid-cols-[72px_1fr_auto] md:items-start md:gap-8"
          >
            {/* Number */}
            <span className="hidden font-mono text-[13px] font-semibold text-fog md:block">
              {numbers[index]}
            </span>

            {/* Title + icon */}
            <div className="flex items-start gap-4">
              <IconBox icon={icon} />
              <div>
                <h3 className="font-display text-[20px] leading-snug text-ink">
                  {service.title}
                </h3>
                {/* Mobile number */}
                <span className="mt-1 block font-mono text-[11px] font-semibold uppercase tracking-wide text-fog md:hidden">
                  {numbers[index]}
                </span>
              </div>
            </div>

            {/* Deliverables */}
            <ul className="flex flex-wrap gap-2 md:justify-end">
              {service.deliverables.map((d) => (
                <li
                  key={d}
                  className="inline-flex items-center border border-fog px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-wide text-hover"
                  style={{ borderRadius: "9999px" }}
                >
                  {d}
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}
