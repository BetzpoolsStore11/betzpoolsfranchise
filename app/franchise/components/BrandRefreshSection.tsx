import Image from "next/image";
import storeInterior2 from "../../../assets/store-interior-2.webp";
import { Reveal } from "./Reveal";

const checkSvg = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

const listItems = [
  "Retail-ready store formats",
  "Accessories + chemicals",
  "Contractors + DIY",
  "Scalable formats for any market",
] as const;

export function BrandRefreshSection() {
  return (
    <section id="brand-refresh" className="betz-mock-brand">
      <div className="betz-mock-brand-grid">
        <div className="betz-mock-brand-media" aria-hidden>
          <Image
            src={storeInterior2}
            alt="Betz Pools retail store"
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="betz-mock-brand-copy">
          <div>
            <Reveal>
              <p className="betz-mock-label">Brand Refresh</p>
            </Reveal>
            <Reveal delayMs={45}>
              <h2 className="betz-mock-h2">
                A Fully Built
                <br />
                Retail Experience
              </h2>
            </Reveal>
            <Reveal delayMs={80}>
              <ul>
                {listItems.map((label) => (
                  <li key={label}>
                    <span className="betz-mock-check" aria-hidden>
                      {checkSvg}
                    </span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
