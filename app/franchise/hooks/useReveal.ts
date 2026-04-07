"use client";

import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(options?: {
  rootMargin?: string;
  threshold?: number;
}) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      {
        rootMargin: options?.rootMargin ?? "0px 0px -8% 0px",
        threshold: options?.threshold ?? 0.12,
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [visible, options?.rootMargin, options?.threshold]);

  return { ref, visible };
}
