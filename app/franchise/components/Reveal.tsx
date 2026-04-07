"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "../hooks/useReveal";
import styles from "../franchise.module.css";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay in ms (maps to CSS variable). */
  delayMs?: number;
};

export function Reveal({ children, className, delayMs = 0 }: RevealProps) {
  const { ref, visible } = useReveal<HTMLDivElement>();

  const style = {
    "--fran-reveal-delay": `${delayMs}ms`,
  } as CSSProperties;

  return (
    <div
      ref={ref}
      style={style}
      className={`${styles.franReveal} ${visible ? styles.franRevealVisible : ""} ${className ?? ""}`}
    >
      {children}
    </div>
  );
}
