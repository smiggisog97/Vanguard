import Link from "next/link";

const columns = [
  {
    title: "Research",
    links: [
      { href: "/research", label: "Research Library" },
      { href: "/research?category=Sector", label: "Sector Briefs" },
      { href: "/research?category=Macro", label: "Macro Briefs" },
      {
        href: "/research?category=Capital+Markets",
        label: "Capital Markets Briefs",
      },
    ],
  },
  {
    title: "Services",
    links: [
      { href: "/advisory", label: "Corporate Advisory" },
      { href: "/bespoke", label: "Bespoke Research" },
      { href: "/incubator", label: "Advanced Incubator" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About Sajid Amit" },
      { href: "/insights", label: "Insights" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export default function Footer() {
  return (
    <footer className="bg-warm-sand">
      <div className="mx-auto max-w-[1200px] px-6 py-16">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div>
            <p className="font-sans text-base font-bold tracking-tight text-ink">
              VANGUARD
            </p>
            <p className="mt-4 max-w-[240px] text-[15px] leading-[1.4] text-driftwood">
              Research, advisory, and executive education for capital and
              enterprise across emerging Asia.
            </p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[15px] text-ink transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-4 pt-8 text-[12px] text-driftwood md:flex-row md:items-center">
          <p>© 2026 Vanguard. All rights reserved.</p>
          <p>Bangladesh · India · Thailand · Singapore · Emerging Asia</p>
        </div>
      </div>
    </footer>
  );
}
