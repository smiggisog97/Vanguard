import CoveragePanel from "@/components/ui/coverage-panel";

export default function IndustryCoverage({
  industries,
}: {
  industries: string[];
}) {
  return (
    <CoveragePanel
      eyebrow="Sector coverage"
      title="Institutional and corporate mandates across emerging Asia"
      description="Advisory teams draw on published research and sector desks in each vertical."
      items={industries}
    />
  );
}
