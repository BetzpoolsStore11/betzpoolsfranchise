import { Reveal } from "./Reveal";

const steps = [
  {
    num: "01",
    title: "Retail Credibility",
    body: "A permanent storefront gives the Betz name local weight. Customers see a real operator with product knowledge, water-care guidance, and year-round visibility.",
  },
  {
    num: "02",
    title: "Weekly Service Engine",
    body: "The store functions as a command center for route planning, field coordination, water testing, and recurring customer relationships.",
  },
  {
    num: "03",
    title: "Supply + Accessory Sales",
    body: "Chemicals, parts, equipment, and seasonal purchases create additional transaction volume while reinforcing the Betz relationship.",
  },
] as const;

export function RetailOperatingModel() {
  return (
    <section id="retail-model" className="betz-mock-retail">
      <div className="betz-mock-inner">
        <Reveal>
          <p className="betz-mock-label">Operating Model</p>
        </Reveal>
        <Reveal delayMs={45}>
          <h2 className="betz-mock-h2">A Storefront That Powers Recurring Revenue</h2>
        </Reveal>
        <Reveal delayMs={80}>
          <div className="betz-mock-stack">
            {steps.map((s) => (
              <div key={s.num}>
                <span className="betz-mock-step">{s.num}</span>
                <div className="betz-mock-step-body">
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
