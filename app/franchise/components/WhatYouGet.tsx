import Image from "next/image";
import storeInterior from "../../../assets/store-interior.webp";
import truckWrap from "../../../assets/truck-wrap.webp";
import { Reveal } from "./Reveal";

const items = [
  {
    title: "Betz University",
    body: "Comprehensive training covering operations, sales, and service delivery.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M22 10v6" />
        <path d="M2 10l10-5 10 5-10 5z" />
        <path d="M6 12v5c0 1.5 2.5 3 6 3s6-1.5 6-3v-5" />
      </svg>
    ),
  },
  {
    title: "Branded Chemicals",
    body: "Private-label product lines with full supply chain support.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8z" />
        <path d="M3.27 6.96 12 12.01l8.73-5.05" />
        <path d="M12 22.08V12" />
      </svg>
    ),
  },
  {
    title: "Fleet & Logistics",
    body: "Vehicle wraps, routing software, and logistics planning.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </svg>
    ),
  },
  {
    title: "Retail Store Design",
    body: "Turnkey layouts with flexible formats for any market.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 10h18V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v4z" />
        <path d="M3 10v9a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-9" />
        <path d="M10 14h4" />
      </svg>
    ),
  },
  {
    title: "Business Systems",
    body: "ERP, CRM, and management tools configured and ready.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 3v18h18" />
        <path d="m19 9-5 5-4-4-3 3" />
      </svg>
    ),
  },
  {
    title: "Ongoing Support",
    body: "Continuous operational support from HQ throughout your journey.",
    svg: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
        <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7zM9 3h2a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zM19 9h1a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2z" />
      </svg>
    ),
  },
] as const;

export function WhatYouGet() {
  return (
    <section id="what-you-get" className="betz-mock-wyg">
      <Reveal delayMs={0}>
        <div className="betz-mock-strip">
          <div className="betz-mock-strip-cell">
            <Image
              src={storeInterior}
              alt="Betz Pools retail store interior"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover"
              priority={false}
            />
          </div>
          <div className="betz-mock-strip-cell betz-mock-strip-truck">
            <Image
              src={truckWrap}
              alt="Betz Pools branded service truck"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              priority={false}
            />
          </div>
        </div>
      </Reveal>
      <div className="betz-mock-inner">
        <div className="betz-mock-head">
          <div>
            <Reveal delayMs={45}>
              <p className="betz-mock-label">What You Get</p>
            </Reveal>
            <Reveal delayMs={90}>
              <h2 className="betz-mock-h2">Built for Your Success</h2>
            </Reveal>
          </div>
        </div>
        <div className="betz-mock-bento">
          {items.map((item, i) => (
            <Reveal key={item.title} delayMs={100 + i * 20}>
              <article className="betz-mock-card">
                <div className="betz-mock-card-deco" aria-hidden />
                <div className="betz-mock-card-body">
                  {item.svg}
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
