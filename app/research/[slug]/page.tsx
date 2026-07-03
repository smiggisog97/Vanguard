import { notFound } from "next/navigation";
import { reports } from "@/lib/data";
import ReportDetailClient from "@/components/report-detail-client";

export function generateStaticParams() {
  return reports.map((r) => ({ slug: r.slug }));
}

export default async function ReportDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const report = reports.find((r) => r.slug === slug);
  if (!report) notFound();

  const related = reports
    .filter((r) => r.slug !== report.slug && r.category === report.category)
    .slice(0, 3);

  return <ReportDetailClient report={report} related={related} />;
}
