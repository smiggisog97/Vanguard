"use client";

import { useCallback, useRef } from "react";

type ChipLayout = {
  top: string;
  left: string;
  rotate: number;
};

const MAGNET_STRENGTH = 0.52;
const MAX_SHIFT = 22;
const HOVER_SCALE = 1.05;

function clamp(value: number, max: number) {
  return Math.max(-max, Math.min(max, value));
}

export function MagnetChip({
  label,
  layout,
}: {
  label: string;
  layout: ChipLayout;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  const setTransform = useCallback(
    (x: number, y: number, scale = 1) => {
      const el = ref.current;
      if (!el) return;
      el.style.transform = `rotate(${layout.rotate}deg) translate(${x}px, ${y}px) scale(${scale})`;
    },
    [layout.rotate]
  );

  const onMouseMove = (event: React.MouseEvent<HTMLSpanElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const offsetX = event.clientX - (rect.left + rect.width / 2);
    const offsetY = event.clientY - (rect.top + rect.height / 2);

    setTransform(
      clamp(offsetX * MAGNET_STRENGTH, MAX_SHIFT),
      clamp(offsetY * MAGNET_STRENGTH, MAX_SHIFT),
      HOVER_SCALE
    );
  };

  const onMouseEnter = () => {
    const el = ref.current;
    if (!el) return;
    el.style.zIndex = "10";
    setTransform(0, 0, HOVER_SCALE);
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.zIndex = "";
    setTransform(0, 0, 1);
  };

  return (
    <span
      ref={ref}
      role="listitem"
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute inline-flex max-w-[calc(100%-1rem)] cursor-default border border-fog/60 bg-white px-4 py-2.5 font-display text-[14px] leading-snug text-ink shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-transform duration-500 ease-out will-change-transform motion-reduce:transition-none sm:text-[15px]"
      style={{
        top: layout.top,
        left: layout.left,
        borderRadius: "9999px",
        transform: `rotate(${layout.rotate}deg)`,
      }}
    >
      {label}
    </span>
  );
}
