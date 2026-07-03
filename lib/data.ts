import type { Report, Insight, IncubatorProgram } from "@/lib/types";

export type { Report, Insight, IncubatorProgram };

const baseReports: Omit<Report, "researchType" | "industry" | "updatedAt" | "abstract" | "tags" | "popularity">[] = [
  {
    slug: "bangladesh-rmg-2026-outlook",
    title: "Bangladesh RMG Sector: 2026 Outlook and Capital Allocation",
    category: "Sector",
    country: "Bangladesh",
    author: "Sajid Amit",
    date: "2026-05-12",
    tier: "Free",
    summary:
      "An assessment of the readymade garment sector's capital intensity, compliance costs, and the investment case for automation through 2026.",
    insights: [
      "Order volumes from EU buyers stabilize after two years of contraction",
      "Compliance-linked capex is now the largest swing factor in unit margins",
      "Automation payback periods have fallen below three years for mid-sized factories",
    ],
  },
  {
    slug: "south-asia-rate-cycle",
    title: "South Asia Rate Cycle: Divergence Ahead of Fed Pivot",
    category: "Macro",
    country: "Regional",
    author: "Sajid Amit",
    date: "2026-04-28",
    tier: "Paid",
    price: "$45",
    summary:
      "A comparative read on monetary policy paths across Bangladesh, India, and Thailand as global rate cycles diverge.",
    insights: [
      "Central banks in the region are prioritizing currency stability over growth support",
      "Real rates remain restrictive in two of three markets covered",
      "Capital account pressure is the binding constraint on policy easing",
    ],
  },
  {
    slug: "emerging-asia-private-credit",
    title: "Private Credit in Emerging Asia: Mapping the Opportunity",
    category: "Capital Markets",
    country: "Emerging Asia",
    author: "Sajid Amit",
    date: "2026-04-09",
    tier: "Paid",
    price: "$65",
    summary:
      "Private credit is filling the gap left by bank deleveraging across Bangladesh, India, and Southeast Asia, sizing the opportunity for institutional allocators.",
    insights: [
      "Bank credit to mid-market corporates has contracted in three of five markets studied",
      "Private credit spreads remain 300-450bps wide of comparable developed-market deals",
      "Family offices are the fastest-growing source of regional private credit capital",
    ],
  },
  {
    slug: "thailand-fdi-pathways",
    title: "Thailand FDI Pathways: Manufacturing Relocation Post-Tariff",
    category: "Sector",
    country: "Thailand",
    author: "Sajid Amit",
    date: "2026-03-22",
    tier: "Free",
    summary:
      "Tracking the manufacturing relocation wave into Thailand and the policy levers shaping where new capital lands.",
    insights: [
      "Electronics and auto-parts relocation account for the majority of new FDI inquiries",
      "EEC zone incentives remain the single largest pull factor for new entrants",
      "Labor cost advantage is narrowing relative to Vietnam and Bangladesh",
    ],
  },
  {
    slug: "singapore-family-office-trends",
    title: "Singapore Family Office Trends: Allocation Shifts for 2026",
    category: "Capital Markets",
    country: "Singapore",
    author: "Sajid Amit",
    date: "2026-02-14",
    tier: "Paid",
    price: "$55",
    summary:
      "How single and multi-family offices domiciled in Singapore are rebalancing allocations toward regional private markets.",
    insights: [
      "Direct deal allocation has grown faster than fund commitments for the third straight year",
      "South and Southeast Asian exposure is increasing at the expense of developed-market equities",
      "Governance and succession planning are now front-of-mind for first-generation principals",
    ],
  },
  {
    slug: "india-capital-markets-pathways",
    title: "India Capital Markets Pathways for Mid-Market Issuers",
    category: "Macro",
    country: "India",
    author: "Sajid Amit",
    date: "2026-01-30",
    tier: "Free",
    summary:
      "A practical map of listing, private placement, and structured debt pathways available to mid-market Indian issuers.",
    insights: [
      "SME exchange listings have tripled in volume over the past three years",
      "Structured debt issuance is increasingly used as a bridge to public listing",
      "Investor readiness gaps remain the top reason for failed raises",
    ],
  },
];

const extraReports: Omit<Report, "researchType" | "industry" | "updatedAt" | "abstract" | "tags" | "popularity">[] = [
  {
    slug: "bangladesh-banking-sector-stress",
    title: "Bangladesh Banking Sector: Stress Testing and Capital Flows",
    category: "Sector",
    country: "Bangladesh",
    author: "Sajid Amit",
    date: "2026-05-01",
    tier: "Paid",
    price: "$50",
    summary: "A sector-wide assessment of asset quality, liquidity buffers, and the transmission of global funding conditions into local credit markets.",
    insights: ["NPL ratios remain elevated in three of the largest private banks", "Deposit growth is outpacing credit expansion for the first time in five years", "Foreign currency liquidity is the primary constraint on trade finance"],
  },
  {
    slug: "vietnam-manufacturing-competitiveness",
    title: "Vietnam Manufacturing Competitiveness: 2026 Benchmark",
    category: "Sector",
    country: "Vietnam",
    author: "Sajid Amit",
    date: "2026-04-15",
    tier: "Free",
    summary: "Benchmarking Vietnam's manufacturing cost structure, FDI inflows, and export competitiveness against regional peers.",
    insights: ["Electronics assembly remains the fastest-growing export segment", "Labor costs have risen 12% year-on-year in key industrial zones", "Infrastructure gaps in power and logistics are the top investor concern"],
  },
  {
    slug: "regional-currency-outlook",
    title: "Regional Currency Outlook: Pressure Points for 2026",
    category: "Macro",
    country: "Regional",
    author: "Sajid Amit",
    date: "2026-03-10",
    tier: "Paid",
    price: "$40",
    summary: "Tracking currency pressure across Bangladesh, India, Thailand, and Vietnam as trade balances and capital flows diverge.",
    insights: ["Reserve adequacy varies sharply across the four markets covered", "Current account deficits are widening in two of four economies", "FX intervention strategies are becoming more divergent"],
  },
  {
    slug: "family-business-succession-asia",
    title: "Family Business Succession in Emerging Asia",
    category: "Capital Markets",
    country: "Emerging Asia",
    author: "Sajid Amit",
    date: "2026-02-28",
    tier: "Paid",
    price: "$60",
    summary: "How family businesses across the region are structuring succession, governance, and capital access for the next generation.",
    insights: ["Only 30% of family businesses have a documented succession plan", "Governance reform is the top prerequisite for institutional capital", "Next-generation leaders are prioritizing digital transformation"],
  },
  {
    slug: "sri-lanka-debt-restructuring",
    title: "Sri Lanka Debt Restructuring: Implications for Regional Markets",
    category: "Macro",
    country: "Sri Lanka",
    author: "Sajid Amit",
    date: "2026-01-15",
    tier: "Free",
    summary: "Assessing the progress of Sri Lanka's debt restructuring and the spillover effects on regional sovereign risk pricing.",
    insights: ["Bondholder recovery rates are shaping regional restructuring precedents", "Tourism recovery is outpacing IMF baseline projections", "Capital controls remain the binding constraint on FDI recovery"],
  },
  {
    slug: "asean-green-finance",
    title: "ASEAN Green Finance: Market Structure and Allocator Guide",
    category: "Capital Markets",
    country: "Emerging Asia",
    author: "Sajid Amit",
    date: "2025-12-20",
    tier: "Paid",
    price: "$55",
    summary: "Mapping the green bond, sustainability-linked loan, and transition finance landscape across ASEAN markets for institutional allocators.",
    insights: ["Green bond issuance grew 40% year-on-year across ASEAN", "Transition finance frameworks remain underdeveloped in three markets", "Family offices are emerging as anchor investors in regional green funds"],
  },
];

function enrichReport(
  r: (typeof baseReports)[0],
  meta: { researchType: Report["researchType"]; industry: string; tags: string[]; popularity: number; updatedAt?: string }
): Report {
  return {
    ...r,
    researchType: meta.researchType,
    industry: meta.industry,
    abstract: r.summary,
    tags: meta.tags,
    popularity: meta.popularity,
    updatedAt: meta.updatedAt ?? r.date,
  };
}

const metaMap: Record<string, { researchType: Report["researchType"]; industry: string; tags: string[]; popularity: number; updatedAt?: string }> = {
  "bangladesh-rmg-2026-outlook": { researchType: "Sector Brief", industry: "Manufacturing & RMG", tags: ["RMG", "Bangladesh", "Automation", "Compliance"], popularity: 92, updatedAt: "2026-05-15" },
  "south-asia-rate-cycle": { researchType: "Macro Outlook", industry: "Financial Services", tags: ["Rates", "Monetary Policy", "South Asia"], popularity: 88 },
  "emerging-asia-private-credit": { researchType: "Capital Markets", industry: "Financial Services", tags: ["Private Credit", "Allocators", "Emerging Asia"], popularity: 95 },
  "thailand-fdi-pathways": { researchType: "Country Note", industry: "Manufacturing", tags: ["FDI", "Thailand", "Manufacturing"], popularity: 76 },
  "singapore-family-office-trends": { researchType: "Capital Markets", industry: "Family Office", tags: ["Family Office", "Singapore", "Allocations"], popularity: 84 },
  "india-capital-markets-pathways": { researchType: "Policy Brief", industry: "Capital Markets", tags: ["India", "Listing", "Mid-Market"], popularity: 80 },
  "bangladesh-banking-sector-stress": { researchType: "Sector Brief", industry: "Banking", tags: ["Banking", "Bangladesh", "Credit"], popularity: 71 },
  "vietnam-manufacturing-competitiveness": { researchType: "Country Note", industry: "Manufacturing", tags: ["Vietnam", "Manufacturing", "FDI"], popularity: 68 },
  "regional-currency-outlook": { researchType: "Macro Outlook", industry: "Financial Services", tags: ["FX", "Currencies", "Regional"], popularity: 82 },
  "family-business-succession-asia": { researchType: "Capital Markets", industry: "Family Business", tags: ["Succession", "Governance", "Family Business"], popularity: 79 },
  "sri-lanka-debt-restructuring": { researchType: "Country Note", industry: "Sovereign", tags: ["Sri Lanka", "Debt", "Sovereign"], popularity: 65 },
  "asean-green-finance": { researchType: "Capital Markets", industry: "Sustainable Finance", tags: ["Green Finance", "ASEAN", "ESG"], popularity: 73 },
};

export const reports: Report[] = [...baseReports, ...extraReports].map((r) =>
  enrichReport(r, metaMap[r.slug])
);

export const advisoryServices = [
  { title: "Capital Strategy", description: "Capital structure design, raise sequencing, and investor targeting for corporates preparing to scale.", deliverables: ["Capital structure assessment", "Raise sequencing roadmap", "Investor targeting list"] },
  { title: "Investor Readiness", description: "Data room construction, governance remediation, and narrative development ahead of institutional capital raises.", deliverables: ["Data room blueprint", "Governance gap analysis", "Investor narrative deck"] },
  { title: "Valuation", description: "Independent valuation for fundraising, succession, and transaction negotiation across listed and private entities.", deliverables: ["Valuation report", "Comparable analysis", "Sensitivity scenarios"] },
  { title: "Governance", description: "Board structuring, family-business governance frameworks, and institutional-grade reporting design.", deliverables: ["Governance framework", "Board charter", "Reporting templates"] },
  { title: "Capital Markets Pathways", description: "Listing readiness, structured debt access, and pathway sequencing across regional exchanges.", deliverables: ["Pathway assessment", "Listing readiness checklist", "Structured debt options map"] },
];

export const advisoryIndustries = [
  "Financial Institutions", "Family Businesses", "Manufacturing & RMG", "Technology & Startups", "Development Finance", "Real Estate", "Healthcare",
];

export const advisoryProcess = [
  { step: "Diagnose", description: "Assess capital position, governance maturity, and readiness gaps.", timeline: "Week 1-2" },
  { step: "Design", description: "Build the capital strategy and governance roadmap.", timeline: "Week 3-4" },
  { step: "Position", description: "Prepare materials and narrative for investor or board engagement.", timeline: "Week 5-8" },
  { step: "Execute", description: "Run the raise, restructuring, or governance transition with our team embedded.", timeline: "Week 9-14" },
  { step: "Sustain", description: "Institutionalize reporting and governance for long-term capital access.", timeline: "Ongoing" },
];

export const advisoryFaqs = [
  { q: "Who is advisory designed for?", a: "Corporates, family businesses, and institutional investors preparing for capital events across emerging Asia." },
  { q: "How long does a typical engagement run?", a: "Most mandates run 8-16 weeks depending on scope, with sustain-phase support available on retainer." },
  { q: "How does research inform advisory?", a: "Every advisory engagement is grounded in Vanguard's published research and proprietary market intelligence." },
];

export const bespokeProcess = [
  { step: "Discovery", description: "Scoping call to define the research question and decision it must inform." },
  { step: "Scope", description: "A defined research brief, timeline, and deliverable format." },
  { step: "Proposal", description: "Fixed-fee proposal covering methodology, sources, and confidentiality terms." },
  { step: "Research", description: "Primary and secondary research executed by our analyst team." },
  { step: "Review", description: "Draft review with your team to refine findings and recommendations." },
  { step: "Delivery", description: "Confidential report delivered in your preferred format." },
  { step: "Presentation", description: "Findings presented live to your board, investment committee, or leadership team." },
];

export const incubatorPrograms: IncubatorProgram[] = [
  {
    slug: "driving-profit-through-ai",
    title: "Driving Profit through AI",
    audience: "Family Business Owners",
    overview: "A cohort-based program for family business owners to identify and capture margin-expanding AI use cases across operations, finance, and customer-facing functions.",
    curriculum: ["AI opportunity mapping for legacy operating models", "Build vs. buy decisions for AI tooling", "Margin capture case studies from regional family businesses", "Implementation roadmap and vendor evaluation", "Change management for family-led organizations"],
    outcomes: ["A prioritized AI implementation roadmap specific to your business", "Vendor shortlist and build-vs-buy recommendation", "Peer network of regional family business owners"],
    duration: "6 weeks, cohort-based",
    schedule: "Weekly live sessions · Tuesdays 7:00 PM SGT",
    cohortStatus: "Open",
    facilitators: ["Sajid Amit", "Vanguard AI Practice Lead"],
    testimonials: [
      { quote: "The cohort format forced us to commit to an AI roadmap instead of endlessly evaluating vendors.", attribution: "Family Business Owner, Dhaka" },
      { quote: "We identified three margin-expanding use cases within the first two weeks.", attribution: "Family Business Owner, Singapore" },
    ],
    price: "$2,500",
  },
  {
    slug: "unlocking-productivity-through-ai",
    title: "Unlocking Productivity through AI",
    audience: "Startup Founders",
    overview: "A workshop series for startup founders to embed AI-driven productivity gains into early-stage operating systems before headcount scales.",
    curriculum: ["AI-native operating workflows for lean teams", "Productivity benchmarking against regional peers", "Tooling stack design for a 10-person to 50-person scale-up", "Investor narrative: positioning AI-driven efficiency to investors", "Automation playbooks for ops, finance, and customer success"],
    outcomes: ["An AI-native operating workflow ready to implement", "A productivity benchmark against comparable regional startups", "Investor-ready narrative on operating efficiency"],
    duration: "4 weeks, workshop-based",
    schedule: "Bi-weekly workshops · Thursdays 6:30 PM SGT",
    cohortStatus: "Waitlist",
    facilitators: ["Sajid Amit", "Vanguard Venture Advisor"],
    testimonials: [
      { quote: "Vanguard's benchmarking data gave us the investor narrative we were missing on operating efficiency.", attribution: "Startup Founder, Singapore" },
      { quote: "We cut our ops overhead by 30% using the workflows from week two.", attribution: "Startup Founder, Bangkok" },
    ],
    price: "$1,800",
  },
];

export const insights: Insight[] = [
  { slug: "frontier-macro-local-implications", type: "Article", category: "Research", title: "Why Frontier Macro Research Needs Local Market Translation", date: "2026-06-02", excerpt: "Global macro calls rarely translate cleanly into emerging Asia balance sheets. Here is the translation layer we apply.", author: "Sajid Amit" },
  { slug: "ces-podcast-ep-42", type: "Podcast", category: "Podcast", title: "CES Markets and Economy, Ep. 42: Rate Divergence in South Asia", date: "2026-05-20", excerpt: "Sajid Amit breaks down the policy divergence shaping South Asian capital flows.", author: "Sajid Amit" },
  { slug: "governance-gap-family-business", type: "Article", category: "Articles", title: "The Governance Gap Holding Back Family Business Capital Raises", date: "2026-05-04", excerpt: "Most failed institutional raises trace back to governance, not valuation. A look at the most common gaps.", author: "Sajid Amit" },
  { slug: "business-standard-column-may", type: "Column", category: "Columns", title: "Capital Markets Access in a Fragmented World", date: "2026-04-18", excerpt: "Monthly column for The Business Standard on how regional issuers should think about capital access.", author: "Sajid Amit" },
  { slug: "world-bank-panel-recap", type: "Media", category: "Media", title: "World Bank Panel: Emerging Asia Private Markets", date: "2026-03-30", excerpt: "Recap of Sajid Amit's remarks on private credit and family office capital in emerging Asia.", author: "Sajid Amit" },
  { slug: "private-credit-research-brief", type: "Research", category: "Research", title: "Research Brief: Private Credit Spread Dynamics", date: "2026-03-12", excerpt: "A condensed research brief on private credit spread compression across five emerging Asian markets.", author: "Sajid Amit" },
];

export const insightCategories = ["All", "Research", "Articles", "Podcast", "Media", "Columns"] as const;

export const founderBio = {
  name: "Sajid Amit",
  title: "Founder & Managing Director",
  biography: "Sajid Amit is the founder of Vanguard, bringing over 15 years of executive leadership across research, advisory, and executive education in emerging Asia. His work bridges frontier macro research with practical capital strategy for corporates, family businesses, and institutional allocators.",
  education: ["PhD, Economics — London School of Economics", "MBA — INSEAD", "BSc, Economics — University of Dhaka"],
  publications: { count: "100+", outlets: ["Business Standard", "CES Markets and Economy Podcast", "Emerging Asia Review", "South Asia Capital Quarterly"] },
  speaking: ["World Bank Emerging Markets Forum", "INSEAD Family Business Summit", "Singapore Family Office Conference", "Dhaka Capital Markets Forum"],
  media: ["The Business Standard", "Channel i", "CES Podcast Network", "Emerging Asia Review"],
  institutionalRoles: ["Adjunct Faculty, INSEAD", "Board Advisor, South Asia Capital Forum", "Research Fellow, Emerging Asia Institute"],
  mission: "Vanguard exists to convert frontier macro and capital-markets research into advisory mandates and executive education, helping decision-makers across emerging Asia navigate capital, governance, and growth.",
};

export const careerTimeline = [
  { year: "2024", title: "Founded Vanguard", description: "Launched Vanguard as an integrated research, advisory, and executive education platform." },
  { year: "2020", title: "Family Office Advisory Practice", description: "Built advisory practice serving family offices across Singapore and Hong Kong." },
  { year: "2016", title: "Capital Markets Research Lead", description: "Led capital markets research coverage across South and Southeast Asia." },
  { year: "2012", title: "Academic & Policy Work", description: "Published extensively on emerging market macro and capital flows." },
  { year: "2008", title: "Early Career — Financial Institutions", description: "Began career in financial institutions research and strategy." },
];

export const trustLogos = [
  { name: "Water.org", image: "/logos/water-org.svg", variant: "wordmark" as const },
  { name: "The Business Standard", image: "/logos/business-standard.svg", variant: "lockup" as const },
  { name: "South Asia", image: "/logos/south-asia.svg", variant: "wordmark" as const },
  { name: "Emerging Asia", image: "/logos/emerging-asia.svg", variant: "wordmark" as const },
];

export const metrics = [
  { value: "100+", label: "Published research papers" },
  { value: "12", label: "Markets covered across emerging Asia" },
  { value: "15+", label: "Years of executive leadership experience" },
];

export const funnelLinks = {
  researchToAdvisory: { href: "/advisory", label: "Explore Corporate Advisory" },
  advisoryToResearch: { href: "/research", label: "Browse Research Library" },
  programToAdvisory: { href: "/advisory", label: "Discuss Advisory Support" },
  researchToProgram: { href: "/incubator", label: "Explore Advanced Incubator" },
};
