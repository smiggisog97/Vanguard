import { IconBox } from "@/components/ui/icon-box";

const icons: Record<string, string> = {
  "driving-profit-through-ai": "sparkles",
  "unlocking-productivity-through-ai": "zap",
};

export function IncubatorProgramIcon({ slug }: { slug: string }) {
  return <IconBox icon={icons[slug] ?? "graduation-cap"} />;
}
