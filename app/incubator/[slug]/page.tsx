import { incubatorPrograms } from "@/lib/data";
import ProgramDetailClient from "@/components/program-detail-client";

export function generateStaticParams() {
  return incubatorPrograms.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = incubatorPrograms.find((p) => p.slug === slug);
  return {
    title: program ? `${program.title} | Vanguard` : "Program | Vanguard",
  };
}

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ProgramDetailClient slug={slug} />;
}
