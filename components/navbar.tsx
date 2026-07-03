"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { searchAll, getSearchSuggestions } from "@/lib/search";
import { useAuth } from "@/components/auth-provider";

const primaryLinks = [
  { href: "/research", label: "Research" },
  { href: "/insights", label: "Insights" },
  { href: "/about", label: "About" },
];

const serviceLinks = [
  {
    href: "/advisory",
    label: "Corporate Advisory",
    description: "Capital strategy and governance",
  },
  {
    href: "/bespoke",
    label: "Bespoke Research",
    description: "Custom confidential research",
  },
  {
    href: "/incubator",
    label: "Advanced Incubator",
    description: "Executive education programs",
  },
];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <span
      className="relative flex h-4 w-5 flex-col justify-between"
      aria-hidden
    >
      <span
        className={`block h-[1.5px] w-full origin-center bg-ink transition-transform duration-200 ${open ? "translate-y-[7px] rotate-45" : ""}`}
      />
      <span
        className={`block h-[1.5px] w-full bg-ink transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
      />
      <span
        className={`block h-[1.5px] w-full origin-center bg-ink transition-transform duration-200 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
      />
    </span>
  );
}

function ChevronIcon() {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      aria-hidden
      className="opacity-60"
    >
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M10.5 10.5L13 13"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavDropdown({
  label,
  items,
}: {
  label: string;
  items: {
    href?: string;
    label: string;
    description?: string;
    onClick?: () => void;
  }[];
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimer.current = setTimeout(() => setOpen(false), 80);
  };

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        type="button"
        className="flex items-center gap-1 rounded-full px-3 py-2 text-[14px] text-ink transition-colors hover:text-driftwood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {label}
        <span
          className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          <ChevronIcon />
        </span>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-50 min-w-[240px] pt-2">
          <div
            className="bg-parchment py-2 shadow-elevated"
            style={{ borderRadius: "16px" }}
          >
            {items.map((item) =>
              item.onClick ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => {
                    item.onClick!();
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2.5 text-left transition-colors hover:bg-warm-sand"
                >
                  <span className="block text-[14px] text-ink">
                    {item.label}
                  </span>
                </button>
              ) : item.href ? (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-2.5 transition-colors hover:bg-warm-sand"
                >
                  <span className="block text-[14px] text-ink">
                    {item.label}
                  </span>
                  {item.description ? (
                    <span className="mt-0.5 block text-[12px] text-driftwood">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              ) : null,
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function Navbar() {
  const { session, logout, ready } = useAuth();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLDivElement>(null);

  const results = query.length >= 2 ? searchAll(query) : [];
  const suggestions = query.length >= 1 ? getSearchSuggestions(query) : [];

  const closeMenu = () => setMenuOpen(false);

  const accountItems =
    ready && session
      ? [
          { href: "/dashboard", label: "Dashboard" },
          { href: "/dashboard/purchases", label: "My reports" },
          { href: "/dashboard/settings", label: "Settings" },
          { label: "Log out", onClick: logout },
        ]
      : [
          { href: "/login", label: "Log in" },
          { href: "/register", label: "Create account" },
        ];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen(true);
      }
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 bg-parchment/95 backdrop-blur supports-[backdrop-filter]:bg-parchment/80">
        <div className="mx-auto flex h-[60px] max-w-[1200px] items-center justify-between gap-4 px-6">
          <Link
            href="/"
            className="shrink-0 font-sans text-sm font-bold tracking-[0.05em] text-ink"
          >
            VANGUARD
          </Link>

          {/* Desktop — simplified nav */}
          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 lg:flex"
            aria-label="Main"
          >
            {primaryLinks.slice(0, 1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[14px] text-ink transition-colors hover:text-driftwood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {link.label}
              </Link>
            ))}
            <NavDropdown label="Services" items={serviceLinks} />
            {primaryLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-2 text-[14px] text-ink transition-colors hover:text-driftwood focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden shrink-0 items-center gap-1 lg:flex">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-ink transition-colors hover:bg-warm-sand focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
              aria-label="Search"
              title="Search (⌘K)"
            >
              <SearchIcon />
            </button>
            <NavDropdown
              label={ready && session ? "Account" : "Sign in"}
              items={accountItems}
            />
            <Link
              href="/contact"
              className="btn-action ml-1 rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-parchment hover:text-parchment"
            >
              Book call
            </Link>
          </div>

          {/* Mobile / tablet hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            className="flex h-10 w-10 shrink-0 items-center justify-center bg-parchment lg:hidden"
            style={{ borderRadius: "16px" }}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[90] lg:hidden" role="presentation">
          <button
            type="button"
            className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]"
            aria-label="Close menu"
            onClick={closeMenu}
          />
          <nav
            id="mobile-nav"
            className="absolute right-0 top-0 flex h-full w-full max-w-[320px] flex-col bg-parchment shadow-elevated"
            aria-label="Mobile"
          >
            <div className="flex h-[60px] items-center justify-between px-6">
              <span className="font-mono text-xs font-semibold uppercase tracking-wide text-driftwood">
                Menu
              </span>
              <button
                type="button"
                onClick={closeMenu}
                className="flex h-10 w-10 items-center justify-center"
                style={{ borderRadius: "16px" }}
                aria-label="Close menu"
              >
                <HamburgerIcon open />
              </button>
            </div>
            <div className="h-px shrink-0 bg-ash-border" aria-hidden />
            <div className="flex flex-1 flex-col overflow-y-auto px-6 py-6">
              <div className="space-y-1">
                <Link
                  href="/research"
                  onClick={closeMenu}
                  className="block py-3 text-[16px] text-ink"
                >
                  Research
                </Link>
                <Link
                  href="/insights"
                  onClick={closeMenu}
                  className="block py-3 text-[16px] text-ink"
                >
                  Insights
                </Link>
              </div>

              <div className="my-4 h-px shrink-0 bg-ash-border" aria-hidden />

              <div className="space-y-1">
                <p className="pb-1 font-mono text-[10px] font-semibold uppercase tracking-wide text-driftwood">
                  Services
                </p>
                {serviceLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block py-3 text-[16px] text-ink"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  onClick={closeMenu}
                  className="block py-3 text-[16px] text-ink"
                >
                  About
                </Link>
              </div>

              <div className="my-4 h-px shrink-0 bg-ash-border" aria-hidden />

              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => {
                    closeMenu();
                    setSearchOpen(true);
                  }}
                  className="block w-full py-3 text-left text-[16px] text-ink"
                >
                  Search
                </button>
                {ready && session ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="block py-3 text-[16px] text-ink"
                    >
                      Account
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        logout();
                        closeMenu();
                      }}
                      className="block w-full py-3 text-left text-[16px] text-ink"
                    >
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="block py-3 text-[16px] text-ink"
                  >
                    Log in
                  </Link>
                )}
              </div>

              <div className="mt-auto pt-6">
                <div className="mb-6 h-px shrink-0 bg-ash-border" aria-hidden />
                <Link
                  href="/contact"
                  onClick={closeMenu}
                  className="btn-action block bg-ink px-6 py-3 text-center text-[15px] font-medium text-parchment"
                  style={{ borderRadius: "9999px" }}
                >
                  Book Advisory Call
                </Link>
              </div>
            </div>
          </nav>
        </div>
      ) : null}

      {searchOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-ink/40 px-6 pt-[15vh] backdrop-blur-[2px]"
          role="dialog"
          aria-modal="true"
          aria-label="Search"
        >
          <div
            ref={searchRef}
            className="w-full max-w-[600px] bg-parchment p-4"
            style={{ borderRadius: "12px" }}
          >
            <input
              autoFocus
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search research, insights, programs..."
              aria-label="Search"
              className="w-full bg-warm-sand px-4 py-3 text-[16px] focus:outline-2 focus:outline-ink/10 focus:outline-offset-0"
              style={{ borderRadius: "16px" }}
            />
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="mt-3 text-[13px] text-driftwood"
            >
              Esc to close · ⌘K to open
            </button>
            {suggestions.length > 0 && results.length === 0 ? (
              <ul className="mt-4 space-y-1">
                {suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => setQuery(s)}
                      className="text-[14px] text-ink"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
            {results.length > 0 ? (
              <ul className="mt-4 max-h-[40vh] space-y-2 overflow-y-auto">
                {results.map((r) => (
                  <li key={`${r.type}-${r.slug}`}>
                    <Link
                      href={r.href}
                      onClick={() => setSearchOpen(false)}
                      className="block rounded p-2 hover:bg-warm-sand"
                    >
                      <p className="text-[14px] font-medium text-ink">
                        {r.title}
                      </p>
                      <p className="text-[12px] text-driftwood">
                        {r.meta} · {r.type}
                      </p>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : query.length >= 2 && results.length === 0 ? (
              <p className="mt-4 text-[14px] text-driftwood">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : null}
            {query.length >= 2 ? (
              <button
                type="button"
                onClick={() => {
                  router.push(`/search?q=${encodeURIComponent(query)}`);
                  setSearchOpen(false);
                }}
                className="mt-4 text-[14px] text-ink underline"
              >
                View all results
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </>
  );
}
