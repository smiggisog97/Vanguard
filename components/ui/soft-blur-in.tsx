"use client";

import { useEffect, useRef } from "react";

const ENTER_DURATION_MS = 648;
const ENTER_STAGGER_MS = 18;
const ENTER_EASING = "cubic-bezier(0.22, 1, 0.36, 1)";
const Y_TRAVEL_PX = 16 * 0.58;
const BLUR_FROM_PX = 12;
const LONG_TEXT_THRESHOLD = 40;

type Unit = { part: string; animate: boolean };

function splitText(text: string, target: "per-character" | "per-word"): Unit[] {
  if (target === "per-character") {
    return Array.from(text).map((part) => ({ part, animate: true }));
  }

  return (text.match(/(\S+|\s+)/g) ?? [text]).map((part) => ({
    part,
    animate: !/^\s+$/.test(part),
  }));
}

function materializeFrame(
  opacity: number,
  yPx: number,
  blurPx: number,
): Keyframe {
  return {
    opacity,
    transform: `translate3d(0, ${yPx}px, 0)`,
    filter: blurPx > 0 ? `blur(${blurPx}px)` : "none",
  };
}

function resolveTarget(text: string): "per-character" | "per-word" {
  return text.length > LONG_TEXT_THRESHOLD ? "per-word" : "per-character";
}

type SoftBlurInProps = {
  text: string;
  className?: string;
  target?: "per-character" | "per-word" | "auto";
};

export default function SoftBlurIn({
  text,
  className = "",
  target = "auto",
}: SoftBlurInProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const splitTarget = target === "auto" ? resolveTarget(text) : target;
  const units = splitText(text, splitTarget);

  useEffect(() => {
    const title = titleRef.current;
    if (!title) return;

    const animated = title.querySelectorAll<HTMLElement>(
      ".text-animation-unit[data-animate='true']",
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      animated.forEach((el) => {
        Object.assign(el.style, materializeFrame(1, 0, 0));
      });
      return;
    }

    const animations: Animation[] = [];
    let rank = 0;

    animated.forEach((el) => {
      // Set initial state immediately so there's no flash before the animation begins
      Object.assign(el.style, materializeFrame(0, Y_TRAVEL_PX, BLUR_FROM_PX));

      const animation = el.animate(
        [
          materializeFrame(0, Y_TRAVEL_PX, BLUR_FROM_PX),
          materializeFrame(1, 0, 0),
        ],
        {
          delay: rank * ENTER_STAGGER_MS,
          duration: ENTER_DURATION_MS,
          easing: ENTER_EASING,
          fill: "both",
        },
      );

      rank += 1;
      animations.push(animation);
    });

    void Promise.all(animations.map((animation) => animation.finished)).then(
      () => {
        animated.forEach((el) => {
          // Clear inline styles — CSS/layout takes over cleanly
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.style.removeProperty("filter");
        });
      },
    );

    return () => {
      animations.forEach((animation) => animation.cancel());
    };
  }, [text, splitTarget]);

  return (
    <h1 ref={titleRef} className={`text-animation-title ${className}`.trim()}>
      {units.map((unit, index) => (
        <span
          key={`${index}-${unit.part}`}
          className="text-animation-unit"
          data-animate={unit.animate ? "true" : "false"}
        >
          {unit.part}
        </span>
      ))}
    </h1>
  );
}
