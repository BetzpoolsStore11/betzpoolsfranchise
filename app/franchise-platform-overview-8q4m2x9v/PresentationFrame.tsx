"use client";

import { useState } from "react";

import styles from "./presentation.module.css";

type PresentationFrameProps = {
  sourceUrl: string;
};

/**
 * Purpose: Renders the SharePoint presentation iframe with a branded loading state.
 * Parameters: sourceUrl - SharePoint embed-view URL used as the iframe source.
 */
export function PresentationFrame({ sourceUrl }: PresentationFrameProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={styles.viewerPanel}>
      {!isLoaded && (
        <div className={styles.viewerLoading} aria-live="polite">
          <div className={styles.viewerLoadingMark} aria-hidden />
          <p className={styles.viewerLoadingTitle}>Loading presentation</p>
          <p className={styles.viewerLoadingText}>
            The secure PowerPoint viewer is opening from SharePoint.
          </p>
        </div>
      )}
      <iframe
        src={sourceUrl}
        width="100%"
        height="720"
        frameBorder="0"
        title="Betz Pools Franchise Deck"
        className={styles.viewerFrame}
        referrerPolicy="no-referrer-when-downgrade"
        sandbox="allow-downloads allow-forms allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
        loading="eager"
        allowFullScreen
        onLoad={() => setIsLoaded(true)}
      >
        This is an embedded Microsoft Office presentation.
      </iframe>
    </div>
  );
}
