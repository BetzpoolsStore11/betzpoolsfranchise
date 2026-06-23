import type { Metadata } from "next";
import Link from "next/link";

import { PresentationFrame } from "./PresentationFrame";
import styles from "./presentation.module.css";

const franchise_deck_slide_urls = Array.from(
  { length: 14 },
  (_, index) => `/decks/platform-overview-slides/slide-${String(index + 1).padStart(2, "0")}.png`
);

export const metadata: Metadata = {
  title: "Betz Pools Franchise Platform Overview",
  description: "Applicant-only overview of the Betz Pools franchise platform.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Purpose: Renders the applicant-only franchise deck page with an embedded local presentation PDF.
 * Parameters: None.
 */
export default function FranchisePlatformOverviewPage() {
  return (
    <main className={styles.presentationShell}>
      <section className={styles.presentationInner} aria-labelledby="presentation-title">
        <div className={styles.presentationTop}>
          <div className={styles.presentationHeader}>
            <p className={styles.presentationLabel}>Applicant overview</p>
            <h1 id="presentation-title" className={styles.presentationTitle}>
              Betz Pools Franchise Platform
            </h1>
            <p className={styles.presentationIntro}>
              This presentation outlines the Designated Service Area model, operating structure,
              and market development approach for selected applicants.
            </p>
          </div>

          <Link className={styles.backLink} href="/">
            Back to franchise page
          </Link>
        </div>

        <PresentationFrame slideUrls={franchise_deck_slide_urls} />
      </section>
    </main>
  );
}
