"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type ParallaxImageProps = {
  src: string;
  alt: string;
  priority?: boolean;
  unoptimized?: boolean;
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "auto" | "async" | "sync";
  className?: string;
  style?: React.CSSProperties;
  /** How many px the image travels over the full scroll range. Default 48. */
  strength?: number;
};

/**
 * Drop-in replacement for a fill-mode next/image that adds a subtle parallax
 * effect on scroll. Place it inside a `position: relative; overflow: hidden`
 * container. The wrapper expands ±strength px so there are never blank edges.
 */
export default function ParallaxImage({
  src,
  alt,
  priority,
  unoptimized,
  fetchPriority,
  decoding = "async",
  className = "object-cover",
  style,
  strength = 48,
}: ParallaxImageProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;

    const update = () => {
      const container = wrapper.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const viewH = window.innerHeight;
      // progress: +1 when fully below viewport, -1 when fully above
      const progress =
        (rect.top + rect.height / 2 - viewH / 2) /
        (viewH / 2 + rect.height / 2);
      const clamped = Math.max(-1, Math.min(1, progress));
      wrapper.style.transform = `translateY(${clamped * strength}px)`;
    };

    update();

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [strength]);

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "absolute",
        top: -strength,
        bottom: -strength,
        left: 0,
        right: 0,
      }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        unoptimized={unoptimized}
        fetchPriority={fetchPriority}
        decoding={decoding}
        className={className}
        style={style}
      />
    </div>
  );
}
