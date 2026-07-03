import { IconBox } from "@/components/ui/icon-box";

/** Lucide icons via Iconify — https://icon-sets.iconify.design/lucide/ */
const icons: Record<string, string> = {
  "Capital Strategy": "lucide:trending-up",
  "Investor Readiness": "lucide:clipboard-check",
  Valuation: "lucide:scale",
  Governance: "lucide:landmark",
};

export function AdvisoryServiceIcon({ title }: { title: string }) {
  return <IconBox icon={icons[title] ?? "lucide:trending-up"} />;
}
