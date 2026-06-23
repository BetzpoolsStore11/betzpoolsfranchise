"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./presentation.module.css";

type PresentationFrameProps = {
  slideUrls: string[];
};

/**
 * Purpose: Renders the local presentation deck as a custom slideshow without PDF viewer chrome.
 * Parameters: slideUrls - ordered slide image URLs.
 */
export function PresentationFrame({ slideUrls }: PresentationFrameProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const slideCount = slideUrls.length;
  const currentSlideUrl = slideUrls[currentSlideIndex];

  if (slideCount === 0) {
    return null;
  }

  return (
    <div className={styles.viewerBlock}>
      <div className={styles.viewerPanel}>
        <div className={styles.slideStage}>
          <Image
            src={currentSlideUrl}
            alt={`Betz Pools platform overview slide ${currentSlideIndex + 1} of ${slideCount}`}
            className={styles.slideImage}
            fill
            priority={currentSlideIndex === 0}
            sizes="(max-width: 720px) calc(100vw - 32px), min(1040px, 100vw)"
          />
        </div>
        <div className={styles.slideControls} aria-label="Presentation controls">
          <button
            className={styles.slideControlButton}
            type="button"
            onClick={() =>
              setCurrentSlideIndex((previousIndex) =>
                previousIndex === 0 ? slideCount - 1 : previousIndex - 1
              )
            }
          >
            Previous
          </button>
          <p className={styles.slideCounter} aria-live="polite">
            Slide {currentSlideIndex + 1} of {slideCount}
          </p>
          <button
            className={styles.slideControlButton}
            type="button"
            onClick={() =>
              setCurrentSlideIndex((previousIndex) =>
                previousIndex === slideCount - 1 ? 0 : previousIndex + 1
              )
            }
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
