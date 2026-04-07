import type { CSSProperties } from "react";
import heroBg from "../../../assets/hero-bg.webp";
import "../betz-mock-hero.css";

/**
 * FranchiseHero renders the full-viewport mock hero from franchise.txt (betz-mock-*).
 * Background uses local hero-bg.webp via CSS variable --betz-mock-hero-bg.
 */
export function FranchiseHero() {
  const sectionStyle = {
    "--betz-mock-hero-bg": `url(${heroBg.src})`,
  } as CSSProperties;

  return (
    <section
      className="betz-mock-hero-section"
      style={sectionStyle}
      aria-labelledby="betz-mock-hero-title"
    >
      <div className="betz-mock-hero-outer" aria-label="Hero">
        <div className="betz-mock-hero-shell" id="top">
          <div className="betz-mock-hero-grid">
            <div className="betz-mock-hero-copy">
              <h1 id="betz-mock-hero-title" className="betz-mock-hero-title">
                <span className="betz-mock-hero-line">Build a Legacy With</span>
                <span className="betz-mock-hero-line">Ontario&apos;s Premier Pool Company</span>
              </h1>
              <div className="betz-mock-hero-body">
                <p>
                  Partner with Ontario&apos;s premier pool company. Leverage 80 years of proven
                  service excellence to scale your business. Betz Pools provides the system and
                  branding for elite pool professionals.
                </p>
                <p>
                  Now accepting entrepreneurs for our waiting list. Franchises offered in Fall.
                </p>
              </div>
              <div className="betz-mock-hero-ctas">
                <a className="betz-mock-btn-primary" href="#apply">
                  Join the Priority Waitlist
                </a>
                <a className="betz-mock-btn-outline" href="#opportunity">
                  Explore the Opportunity
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
