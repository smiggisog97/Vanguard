"use client";

import { useEffect, useRef } from "react";
import type Hls from "hls.js";

type CtaBannerVideoProps = {
  src: string;
};

export default function CtaBannerVideo({ src }: CtaBannerVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let hls: Hls | null = null;
    let cancelled = false;

    const play = async () => {
      try {
        await video.play();
      } catch {
        // Autoplay may be blocked in some browsers
      }
    };

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      void play();
      return;
    }

    void import("hls.js").then(({ default: HlsLib }) => {
      if (cancelled || !video) return;

      if (HlsLib.isSupported()) {
        hls = new HlsLib({ enableWorker: true });
        hls.loadSource(src);
        hls.attachMedia(video);
        hls.on(HlsLib.Events.MANIFEST_PARSED, () => {
          void play();
        });
      }
    });

    return () => {
      cancelled = true;
      hls?.destroy();
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      className="cta-banner__video pointer-events-none absolute inset-0 h-full w-full object-cover"
      aria-hidden
    />
  );
}
