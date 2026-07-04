"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function RevealOnScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const revealAll = () => {
      document
        .querySelectorAll(".reveal-section:not(.is-revealed)")
        .forEach((el) => el.classList.add("is-revealed"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      revealAll();
      return;
    }

    // Immediately reveal anything already in the viewport on mount
    const pending = Array.from(
      document.querySelectorAll<Element>(".reveal-section:not(.is-revealed)"),
    );

    pending.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("is-revealed");
      }
    });

    // Observe the rest — trigger when top edge is 80px inside the viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0,
        rootMargin: "0px 0px -80px 0px",
      },
    );

    pending.forEach((el) => {
      if (!el.classList.contains("is-revealed")) {
        observer.observe(el);
      }
    });

    // Safety fallback: reveal anything still hidden after 2 s
    const fallback = window.setTimeout(revealAll, 2000);

    return () => {
      window.clearTimeout(fallback);
      observer.disconnect();
    };
  }, [pathname]);

  return null;
}
