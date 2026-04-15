import { Reveal } from "./Reveal";

export function OpportunityIntro() {
  return (
    <section id="opportunity" className="betz-mock-opportunity">
      <div className="betz-mock-band-top">
        <div className="betz-mock-band-inner">
          <div className="betz-mock-band-copy">
            <Reveal>
              <p className="betz-mock-label">The Opportunity</p>
            </Reveal>
            <Reveal delayMs={45}>
              <h2 className="betz-mock-h2">
                Take Control
                <br />
                of Your Future
              </h2>
            </Reveal>
            <Reveal delayMs={70}>
              <p className="betz-mock-proof">
                Built on 80+ years of brand trust, retail demand, and recurring service revenue.
              </p>
            </Reveal>
            <Reveal delayMs={80}>
              <div className="betz-mock-proof-chips">
                <span className="betz-mock-proof-chip">80+ Years Legacy</span>
                <span className="betz-mock-proof-chip">Ontario Service Zones</span>
                <span className="betz-mock-proof-chip">Retail + Service Model</span>
              </div>
            </Reveal>
            <Reveal delayMs={90}>
              <p className="betz-mock-lead">
                Launch a protected Designated Serve Area with a model designed for recurring
                service revenue, retail margin, and long-term customer retention.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
      <div className="betz-mock-pillars">
        <div className="betz-mock-pillar-row">
          <span className="betz-mock-pillar-num">01</span>
          <h3 className="betz-mock-pillar-h3">Retail Supply</h3>
          <p className="betz-mock-pillar-desc">
            Branded storefront with full product lines, chemicals, parts, accessories, and
            seasonal essentials.
          </p>
        </div>
        <div className="betz-mock-pillar-row">
          <span className="betz-mock-pillar-num">02</span>
          <h3 className="betz-mock-pillar-h3">Weekly Service</h3>
          <p className="betz-mock-pillar-desc">
            Recurring revenue from route-based pool maintenance operating from your retail hub.
          </p>
        </div>
        <div className="betz-mock-pillar-row">
          <span className="betz-mock-pillar-num">03</span>
          <h3 className="betz-mock-pillar-h3">Both Combined</h3>
          <p className="betz-mock-pillar-desc">
            Maximum Service Capacity Area coverage with full operational support, retail
            credibility plus service density.
          </p>
        </div>
      </div>
    </section>
  );
}
