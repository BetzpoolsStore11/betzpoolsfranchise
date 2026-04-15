import { Reveal } from "./Reveal";

const territories = [
  "Muskoka",
  "Collingwood",
  "Oakville",
  "Niagara-on-the-Lake",
  "Kitchener",
  "Barrie",
  "Toronto",
  "Windsor",
  "Kingston",
  "Hamilton",
  "London",
  "Ottawa",
  "Sudbury",
  "North Bay",
  "Thunder Bay",
] as const;

export function Territories() {
  return (
    <section id="territories" className="betz-mock-terr">
      <div className="betz-mock-inner">
        <div>
          <Reveal>
            <p className="betz-mock-label">Availability</p>
          </Reveal>
          <Reveal delayMs={45}>
            <h2 className="betz-mock-h2">
              Service Zones
              <br />
              Now Forming
            </h2>
          </Reveal>
          <Reveal delayMs={90}>
            <p className="betz-mock-sub">
              Select your preferred Ontario Designated Serve Area. Early applicants receive
              priority Service Capacity Area selection.
            </p>
          </Reveal>
        </div>
        <Reveal delayMs={140}>
          <div className="betz-mock-pills">
            {territories.map((name) => (
              <span key={name} className="betz-mock-pill">
                {name}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
