import { IconBox } from "@/components/ui/icon-box";

type PillarIconName = "research" | "bespoke" | "advisory" | "incubator";

/** Lucide icons via Iconify — https://icon-sets.iconify.design/lucide/ */
const icons: Record<PillarIconName, string> = {
  research: "chart-no-axes-combined",
  bespoke: "compass",
  advisory: "briefcase",
  incubator: "graduation-cap",
};

export function PillarIcon({ name }: { name: PillarIconName }) {
  return <IconBox icon={icons[name]} hover />;
}

export type { PillarIconName };
