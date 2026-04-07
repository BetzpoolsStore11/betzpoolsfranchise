import { Reveal } from "./Reveal";

const features = [
  "Pre-engineered Weekly Service Plans",
  "Standardized Open-Close Procedures",
  "Retail Store Hub Designs",
  "Full ERP/CRM Systems",
  "Verified Supplier Network",
  "Training Academy & Support",
] as const;

export function FranchiseJourney() {
  return (
    <section id="system" className="betz-mock-system">
      <div>
        <div className="betz-mock-sys-inner">
          <Reveal>
            <p className="betz-mock-label">The System</p>
          </Reveal>
          <Reveal delayMs={45}>
            <h2 className="betz-mock-h2">
              We&apos;ve Already Built
              <br />
              the System
            </h2>
          </Reveal>
          <div className="betz-mock-grid">
            {features.map((text, i) => (
              <Reveal key={text} delayMs={80 + i * 20}>
                <div className="betz-mock-feat">
                  <span className="betz-mock-feat-num">{String(i + 1).padStart(2, "0")}</span>
                  <span className="betz-mock-feat-txt">{text}</span>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delayMs={200}>
            <p className="betz-mock-quote">You don&apos;t figure it out — you step into it.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
