import type { Metadata } from "next";
import Link from "next/link";

import { PresentationFrame } from "./PresentationFrame";
import styles from "./presentation.module.css";

const sharepoint_deck_embed_url =
  "https://betzpools-my.sharepoint.com/personal/rfuertes_betzpools_com/_layouts/15/Doc.aspx?sourcedoc=%7B5bc51e9e-6f80-43c5-b34d-e385804cdcea%7D&action=embedview&wdAr=1.7777777777777777";

export const metadata: Metadata = {
  title: "Betz Pools Franchise Platform Overview",
  description: "Applicant-only overview of the Betz Pools franchise platform.",
  robots: {
    index: false,
    follow: false,
  },
};

/**
 * Purpose: Renders the applicant-only franchise deck page with an embedded SharePoint presentation.
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

        <PresentationFrame sourceUrl={sharepoint_deck_embed_url} />
      </section>
    </main>
  );
}
