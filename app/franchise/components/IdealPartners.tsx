import Image from "next/image";
import caFlag from "../../../assets/flag.svg";
import { Reveal } from "./Reveal";

const youAre = [
  "Established contractor (landscaping, remodeling, home building)",
  "Visionary entrepreneur with business acumen",
  "Company seeking to diversify or vertically integrate",
  "Leader ambitious enough to scale to multi-million revenue",
  "Individual committed to exceptional client experiences",
] as const;

const youWant = [
  "A proven system — not a startup gamble",
  "Protected Designated Serve Area with recurring revenue",
  "Operational support from day one",
  "Premium brand recognition across your Service Capacity Area",
  "Work-life balance with scalable operations",
] as const;

export function IdealPartners() {
  return (
    <section id="ideal-partners" className="betz-mock-who">
      <div className="betz-mock-inner">
        <Reveal>
          <p className="betz-mock-label">Ideal Partners</p>
        </Reveal>
        <Reveal delayMs={45}>
          <h2 className="betz-mock-h2">Who This Is For</h2>
        </Reveal>
        <div className="betz-mock-cols">
          <Reveal delayMs={80}>
            <div>
              <h3>You Are</h3>
              {youAre.map((text, i) => (
                <div key={text} className="betz-mock-row">
                  <span className="betz-mock-row-num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delayMs={120}>
            <div>
              <h3>You Want</h3>
              {youWant.map((text, i) => (
                <div key={text} className="betz-mock-row">
                  <span className="betz-mock-row-num">{String(i + 1).padStart(2, "0")}</span>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
        <Reveal delayMs={160}>
          <div className="betz-mock-who-veterans-wrap">
            <Image
              src={caFlag}
              alt=""
              width={72}
              height={36}
              className="betz-mock-who-flag"
              aria-hidden
              unoptimized
            />
            <p className="betz-mock-who-veterans">
              We proudly offer exclusive franchise fee discounts to Canadian Armed Forces veterans and
              families with an active CF1 card.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
