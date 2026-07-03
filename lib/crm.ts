import type { CrmPipeline } from "@/lib/types";

export const crmPipelines: Record<
  CrmPipeline,
  { label: string; description: string }
> = {
  newsletter: {
    label: "Newsletter",
    description: "Subscribers enter the editorial nurture sequence.",
  },
  "research-download": {
    label: "Research Unlock",
    description: "Free report leads are routed to research nurture.",
  },
  inquiry: {
    label: "Advisory Inquiry",
    description: "Qualified leads enter the advisory sales pipeline.",
  },
  checkout: {
    label: "Checkout",
    description: "Paid research buyers enter the customer pipeline.",
  },
  enrollment: {
    label: "Program Enrollment",
    description: "Incubator applicants enter the education pipeline.",
  },
  waitlist: {
    label: "Waitlist",
    description: "Waitlist signups enter the program re-engagement pipeline.",
  },
};
