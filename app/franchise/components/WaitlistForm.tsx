"use client";

import { FormEvent, useState } from "react";

const FORMSPREE_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT ?? "https://formspree.io/f/xnjowvew";

const initial = {
  name: "",
  email: "",
  phone: "",
  territory: "",
  opportunity: "",
  investment: "",
  trade: "",
  vision: "",
};

export function WaitlistForm() {
  const [values, setValues] = useState(initial);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (isSubmitting) return;
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as
          | { error?: string; errors?: { message?: string }[] }
          | null;
        const providerError = payload?.errors?.[0]?.message ?? payload?.error;
        setErrorMessage(providerError ?? "Unable to submit right now. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setErrorMessage("Unable to submit right now. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="apply" className="betz-mock-apply">
      <div className="betz-mock-inner">
        <div className="betz-mock-head">
          <p className="betz-mock-label">Apply Now</p>
          <h2 className="betz-mock-h2">Join Our Franchise Waiting List</h2>
          <p className="betz-mock-intro">
            Take the next step towards scaling your business with Ontario&apos;s premier pool
            company.
          </p>
        </div>

        {submitted ? (
          <div className="betz-mock-success" role="status">
            <h3>Application Received</h3>
            <p>Thank you. Our team will review and contact you shortly.</p>
          </div>
        ) : (
          <form
            className="betz-mock-form-grid"
            action={FORMSPREE_ENDPOINT}
            method="POST"
            onSubmit={onSubmit}
            noValidate
          >
            <div className="betz-mock-field">
              <label htmlFor="fran-name">Full Name</label>
              <input
                id="fran-name"
                name="full_name"
                type="text"
                maxLength={100}
                autoComplete="name"
                required
                placeholder="John D. Smith"
                value={values.name}
                onChange={(e) => setValues((v) => ({ ...v, name: e.target.value }))}
              />
            </div>
            <div className="betz-mock-field">
              <label htmlFor="fran-email">Email</label>
              <input
                id="fran-email"
                name="email"
                type="email"
                maxLength={255}
                autoComplete="email"
                required
                placeholder="jsmith@business.com"
                value={values.email}
                onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
              />
            </div>
            <div className="betz-mock-field">
              <label htmlFor="fran-phone">Phone</label>
              <input
                id="fran-phone"
                name="phone"
                type="tel"
                maxLength={20}
                autoComplete="tel"
                required
                placeholder="(416) 555-0100"
                value={values.phone}
                onChange={(e) => setValues((v) => ({ ...v, phone: e.target.value }))}
              />
            </div>
            <div className="betz-mock-field">
              <label htmlFor="fran-territory">Location / Designated Serve Area</label>
              <input
                id="fran-territory"
                name="territory"
                type="text"
                maxLength={100}
                required
                placeholder="Toronto, ON"
                value={values.territory}
                onChange={(e) => setValues((v) => ({ ...v, territory: e.target.value }))}
              />
            </div>
            <div className="betz-mock-field">
              <label htmlFor="fran-opportunity">Opportunity Type</label>
              <div className="betz-mock-select-wrap">
                <select
                  id="fran-opportunity"
                  name="opportunity"
                  required
                  value={values.opportunity}
                  onChange={(e) => setValues((v) => ({ ...v, opportunity: e.target.value }))}
                >
                  <option value="">Select...</option>
                  <option value="retail">Retail Pool Supply</option>
                  <option value="service">Weekly Service Route</option>
                  <option value="both">Both</option>
                </select>
              </div>
            </div>
            <div className="betz-mock-field">
              <label htmlFor="fran-investment">Expected Investment</label>
              <div className="betz-mock-select-wrap">
                <select
                  id="fran-investment"
                  name="investment"
                  required
                  value={values.investment}
                  onChange={(e) => setValues((v) => ({ ...v, investment: e.target.value }))}
                >
                  <option value="">Select range...</option>
                  <option value="under100">Under $100,000</option>
                  <option value="100-250">$100,000 – $250,000</option>
                  <option value="250-500">$250,000 – $500,000</option>
                  <option value="500plus">$500,000+</option>
                </select>
              </div>
            </div>
            <div className="betz-mock-field betz-mock-field-span">
              <label htmlFor="fran-trade">Current Trade / Experience</label>
              <input
                id="fran-trade"
                name="trade"
                type="text"
                maxLength={200}
                required
                placeholder="Landscape Architect"
                value={values.trade}
                onChange={(e) => setValues((v) => ({ ...v, trade: e.target.value }))}
              />
            </div>
            <div className="betz-mock-field betz-mock-field-span">
              <label htmlFor="fran-vision">Your Business Vision</label>
              <textarea
                id="fran-vision"
                name="vision"
                maxLength={1000}
                required
                rows={3}
                placeholder="A brief description of what you'd like to build..."
                value={values.vision}
                onChange={(e) => setValues((v) => ({ ...v, vision: e.target.value }))}
              />
            </div>
            <div className="betz-mock-field betz-mock-field-span">
              <button type="submit" className="betz-mock-submit" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            </div>
            {errorMessage ? (
              <p className="betz-mock-footnote betz-mock-field-span" role="alert">
                {errorMessage}
              </p>
            ) : null}
            <p className="betz-mock-footnote betz-mock-field-span">
              All information is strictly confidential and used for pre-qualification only.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
