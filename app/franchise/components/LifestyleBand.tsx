import type { CSSProperties } from "react";
import servingLuxuryBackground from "../../../assets/serving-luxury-background.webp";

/**
 * Lifestyle block — matches c:\Users\Admin\Documents\franchise.txt (Lifestyle Block mock):
 * section.betz-mock-life with layered bg + single .betz-mock-life-lead paragraph (same markup as reference).
 */
export function LifestyleBand() {
  const sectionStyle = {
    "--betz-mock-life-bg": `url(${servingLuxuryBackground.src})`,
  } as CSSProperties;

  return (
    <section className="betz-mock-life" style={sectionStyle}>
      <p className="betz-mock-life-lead">Serving luxury clients and everyday pool owners</p>
    </section>
  );
}
