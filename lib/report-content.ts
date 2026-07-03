import type { Report } from "@/lib/data";

export const PREVIEW_PAGE_COUNT = 3;
export const FULL_PAGE_COUNT = 12;

export type ReportSection = {
  id: string;
  title: string;
  body: string;
};

export function getReportSections(report: Report): ReportSection[] {
  const insightBlock = report.insights.map((item) => `· ${item}`).join("\n");

  return [
    {
      id: "summary",
      title: "Executive Summary",
      body: report.summary,
    },
    {
      id: "insights",
      title: "Key Insights",
      body: insightBlock,
    },
    {
      id: "context",
      title: "Market Context",
      body: `This brief situates ${report.country} within the wider ${report.category.toLowerCase()} landscape across emerging Asia. Vanguard's desk view integrates local balance-sheet dynamics with cross-border capital flows, policy signals, and sector-specific operating data gathered through our regional coverage network.`,
    },
    {
      id: "analysis",
      title: "Analysis & Outlook",
      body: `Our base case assumes policy and liquidity conditions remain the primary transmission channel through the next two quarters. ${report.insights[0]} ${report.insights[1] ?? ""}`.trim(),
    },
    {
      id: "implications",
      title: "Implications for Allocators",
      body: `Institutional investors, family offices, and corporate treasury teams should treat this report as a decision-support layer for capital allocation, not a trading signal. The highest-conviction takeaway: position sizing should reflect local policy divergence rather than a single regional beta.`,
    },
    {
      id: "methodology",
      title: "Methodology",
      body: "Vanguard research combines published macro data, issuer interviews, market pricing, and proprietary survey work across Bangladesh, India, Thailand, Singapore, and adjacent markets. All forecasts represent the authors' base case unless otherwise stated.",
    },
  ];
}
