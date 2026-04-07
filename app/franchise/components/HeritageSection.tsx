import Image from "next/image";
import heritage1 from "../../../assets/1st.jpg";
import heritage2 from "../../../assets/2nd.jpg";
import heritage3 from "../../../assets/3rd.jpg";
import heritage4 from "../../../assets/4th.webp";
import { Reveal } from "./Reveal";

const circles = [
  { caption: "Luxury pools", src: heritage1, alt: "Luxury pool and outdoor living" },
  { caption: "Family pools", src: heritage2, alt: "Family enjoying a swimming pool" },
  { caption: "Indoor pools", src: heritage3, alt: "Indoor pool and spa" },
  { caption: "Commercial pools", src: heritage4, alt: "Commercial pool project" },
] as const;

export function HeritageSection() {
  return (
    <section id="heritage" className="betz-mock-heritage">
      <div className="betz-mock-heritage-bg betz-mock-heritage-bg--solid" aria-hidden />
      <div className="betz-mock-heritage-bg betz-mock-heritage-bg--gradient" aria-hidden />
      <div className="betz-mock-heritage-inner">
        <Reveal>
          <h2 className="betz-mock-heritage-brand">Betz Pools Limited</h2>
        </Reveal>
        <Reveal delayMs={40}>
          <p className="betz-mock-heritage-est">Est. 1945</p>
        </Reveal>
        <Reveal delayMs={80}>
          <h3 className="betz-mock-heritage-subtitle">Our story, your foundation.</h3>
        </Reveal>
        <Reveal delayMs={120}>
          <p className="betz-mock-heritage-body">
            For over eight decades, Betz Pools has built thousands of iconic luxury pools across
            Ontario and beyond. We&apos;ve built a reputation for legendary service, quality
            craftsmanship, and a platform that helps elite partners scale their service businesses.
          </p>
        </Reveal>
        <div className="betz-mock-heritage-circles">
          {circles.map((c, i) => (
            <Reveal key={c.caption} delayMs={140 + i * 20}>
              <div className="betz-mock-heritage-circle-wrap">
                <div className="betz-mock-heritage-circle">
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="(max-width: 767px) 150px, 190px"
                    className="object-cover object-center"
                  />
                </div>
                <p className="betz-mock-heritage-circle-caption">{c.caption}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={220}>
          <div className="betz-mock-heritage-cta">
            <a className="betz-mock-heritage-btn" href="#apply">
              Join our White Glove service waiting list
            </a>
            <p className="betz-mock-heritage-cta-note">White glove franchise</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
