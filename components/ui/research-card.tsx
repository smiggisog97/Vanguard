import Link from "next/link";
import Image from "next/image";
import type { Report } from "@/lib/data";
import { Chip } from "@/components/ui/funnel-cta";
import { LucideIcon } from "@/components/ui/lucide-icon";

export default function ResearchCard({
  report,
  variant = "grid",
}: {
  report: Report;
  variant?: "grid" | "list";
}) {
  if (variant === "list") {
    return (
      <Link
        href={`/research/${report.slug}`}
        className="card-lift pressable group flex gap-6 bg-warm-sand p-5 transition-transform duration-[220ms] md:items-center"
        style={{ borderRadius: "16px" }}
      >
        <div
          className="relative hidden h-24 w-36 shrink-0 overflow-hidden sm:block"
          style={{ borderRadius: "4px" }}
        >
          <Image
            src={`https://picsum.photos/seed/${report.slug}-cover/320/180`}
            alt=""
            fill
            className="object-cover"
            style={{ filter: "grayscale(1)" }}
            unoptimized
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <Chip>{report.researchType}</Chip>
            <Chip tone={report.tier === "Free" ? "royal" : "gold"}>
              {report.tier === "Free" ? "Free" : report.price}
            </Chip>
          </div>
          <h3 className="mt-2 font-display text-[20px] leading-[1.3] text-ink group-hover:text-hover">
            {report.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[14px] leading-[1.5] text-driftwood">
            {report.abstract}
          </p>
          <p className="mt-2 text-[13px] text-driftwood">
            {report.author} · {report.date}
          </p>
        </div>
        <span className="hidden shrink-0 items-center gap-1 text-[13px] text-ink md:inline-flex">
          {report.tier === "Free" ? "Unlock" : "Purchase"}
          <LucideIcon name="arrow-right" size={14} />
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={`/research/${report.slug}`}
      className="card-lift pressable group flex flex-col justify-between overflow-hidden bg-warm-sand transition-transform duration-[220ms]"
      style={{ borderRadius: "16px" }}
    >
      <div>
        <div className="relative aspect-[16/9] w-full overflow-hidden">
          <Image
            src={`https://picsum.photos/seed/${report.slug}-cover/640/360`}
            alt=""
            fill
            className="object-cover"
            style={{ filter: "grayscale(1)" }}
            loading="lazy"
            unoptimized
          />
        </div>
        <div className="p-[31px]">
          <div className="flex items-start justify-between gap-3">
            <Chip>{report.researchType}</Chip>
            <Chip tone={report.tier === "Free" ? "royal" : "gold"}>
              {report.tier === "Free" ? "Free" : report.price}
            </Chip>
          </div>
          <h3 className="mt-4 font-display text-[22px] leading-[1.3] text-hover group-hover:text-hover">
            {report.title}
          </h3>
          <p className="mt-3 line-clamp-3 text-[15px] leading-[1.5] text-driftwood">
            {report.abstract}
          </p>
        </div>
      </div>
      <div className="flex items-center justify-between px-[31px] py-4 text-[13px] text-driftwood">
        <span>{report.author}</span>
        <span>{report.date}</span>
      </div>
    </Link>
  );
}
