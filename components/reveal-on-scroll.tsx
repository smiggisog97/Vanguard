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

    const observeSingle = (observer: IntersectionObserver, el: Element) => {
      const rect = el.getBoundingClientRect();
      // Already in viewport on mount — reveal immediately without animation delay
      if (rect.top < window.innerHeight * 0.92 && rect.bottom > 0) {
        el.classList.add("is-revealed");
      } else {
        observer.observe(el);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: "0px 0px -80px 0px" },
    );

    // Observe elements already in the DOM
    document
      .querySelectorAll<Element>(".reveal-section:not(.is-revealed)")
      .forEach((el) => observeSingle(io, el));

    // Watch for sections added later (client components, Suspense boundaries)
    const mo = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (!(node instanceof Element)) return;
          // The node itself
          if (
            node.classList?.contains("reveal-section") &&
            !node.classList.contains("is-revealed")
          ) {
            observeSingle(io, node);
          }
          // Descendants
          node
            .querySelectorAll?.(".reveal-section:not(.is-revealed)")
            .forEach((el) => observeSingle(io, el));
        });
      });
    });

    mo.observe(document.body, { childList: true, subtree: true });

    // Safety fallback
    const fallback = window.setTimeout(revealAll, 2000);

    return () => {
      window.clearTimeout(fallback);
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  return null;
}
