export type ResearchType =
  | "Sector Brief"
  | "Macro Outlook"
  | "Capital Markets"
  | "Country Note"
  | "Policy Brief";

export type ReportCategory = "Sector" | "Macro" | "Capital Markets";

export type Report = {
  slug: string;
  title: string;
  category: ReportCategory;
  researchType: ResearchType;
  industry: string;
  country: string;
  author: string;
  date: string;
  updatedAt: string;
  tier: "Free" | "Paid";
  price?: string;
  summary: string;
  abstract: string;
  insights: string[];
  tags: string[];
  popularity: number;
};

export type UserProfile = {
  firstName: string;
  email: string;
  company?: string;
  role?: string;
};

export type Order = {
  id: string;
  slug: string;
  title: string;
  amount: string;
  status: "completed" | "pending" | "failed";
  date: string;
  type: "research" | "program";
};

export type InsightType = "Article" | "Podcast" | "Media" | "Column" | "Research";

export type Insight = {
  slug: string;
  type: InsightType;
  category: string;
  title: string;
  date: string;
  excerpt: string;
  author?: string;
};

export type IncubatorProgram = {
  slug: string;
  title: string;
  audience: string;
  overview: string;
  curriculum: string[];
  outcomes: string[];
  duration: string;
  schedule: string;
  cohortStatus: "Open" | "Closed" | "Waitlist";
  facilitators: string[];
  testimonials: { quote: string; attribution: string }[];
  price: string;
};

export type PaymentGateway = "stripe" | "sslcommerz" | "bkash" | "nagad" | "2checkout";

export type CrmPipeline =
  | "newsletter"
  | "research-download"
  | "inquiry"
  | "checkout"
  | "enrollment"
  | "waitlist";
