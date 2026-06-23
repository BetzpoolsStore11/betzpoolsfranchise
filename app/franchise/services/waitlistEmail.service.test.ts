import { describe, expect, it } from "vitest";

import type {
  JsonObject,
  WaitlistEmailEnvironment,
  WaitlistEmailOptions,
  WaitlistPayload,
} from "../models/waitlist.model";
import {
  createAdminEmailOptions,
  createAutoResponseEmailOptions,
  createFranchiseDeckUrl,
  getWaitlistEmailEnvironment,
  sendWaitlistEmails,
} from "./waitlistEmail.service";
import {
  normalizeWaitlistPayload,
  validateWaitlistPayload,
} from "../utils/waitlistValidation.util";

const validRawPayload: JsonObject = {
  name: "  Jane Smith  ",
  email: "  JANE@EXAMPLE.COM  ",
  phone: "  (416) 555-0100  ",
  territory: "  Toronto, ON  ",
  opportunity: "retail",
  investment: "100-250",
  trade: "Pool service operator",
  vision: "Build a dense service route with a strong retail base.",
};

const validPayload: WaitlistPayload = {
  name: "Jane Smith",
  email: "jane@example.com",
  phone: "(416) 555-0100",
  territory: "Toronto, ON",
  opportunity: "retail",
  investment: "100-250",
  trade: "Pool service operator",
  vision: "Build a dense service route with a strong retail base.",
};

const validEnvironment: WaitlistEmailEnvironment = {
  resendApiKey: "re_test_key",
  resendFromEmail: "Betz Pools Franchise <noreply@betzpoolsfranchise.com>",
  adminEmail: "admin@example.com",
  autoResponseBccEmails: "owner@example.com, manager@example.com",
  siteBaseUrl: "https://example.com/",
};

describe("waitlist submission helpers", () => {
  it("normalizes a happy-path payload", () => {
    expect(normalizeWaitlistPayload(validRawPayload)).toEqual(validPayload);
  });

  it("validates a happy-path payload", () => {
    expect(validateWaitlistPayload(validPayload)).toEqual({ isValid: true });
  });

  it("creates happy-path admin email options", () => {
    const emailOptions = createAdminEmailOptions(validPayload, validEnvironment);

    expect(emailOptions).toMatchObject({
      from: validEnvironment.resendFromEmail,
      to: validEnvironment.adminEmail,
      replyTo: validPayload.email,
      subject: "New Franchise Waiting List Submission",
    });
    expect(emailOptions.text).toContain("Name: Jane Smith");
    expect(emailOptions.text).toContain("Opportunity Type: Retail Pool Supply");
    expect(emailOptions.text).toContain("Expected Investment: $100,000 - $250,000");
  });

  it("creates happy-path autoresponse email options", () => {
    const emailOptions = createAutoResponseEmailOptions(validPayload, validEnvironment);

    expect(emailOptions).toMatchObject({
      from: validEnvironment.resendFromEmail,
      to: validPayload.email,
      subject: "Thank you for your interest in owning a Betz Pools Designated Service Area.",
      bcc: ["owner@example.com", "manager@example.com"],
    });
    expect(emailOptions.text).toContain(
      "Thank you for your interest in owning a Betz Pools Designated Service Area."
    );
    expect(emailOptions.text).toContain(
      "Attached is an overview of the Betz Pools platform, which provides additional detail on how the model is structured and how markets are developed over time."
    );
    expect(emailOptions.text).toContain(
      "https://betzpoolsfranchise.com/franchise-platform-overview-8q4m2x9v"
    );
    expect(emailOptions.html).toContain(
      'href="https://betzpoolsfranchise.com/franchise-platform-overview-8q4m2x9v"'
    );
    expect(emailOptions.html).toContain("View Platform Overview");
    expect(emailOptions.text).not.toContain("Betz Pools Franchise Team");
  });

  it("creates a happy-path franchise deck URL", () => {
    expect(createFranchiseDeckUrl("https://example.com/")).toBe(
      "https://example.com/franchise-platform-overview-8q4m2x9v"
    );
  });

  it("uses the canonical happy-path site URL when only Vercel URL is present", () => {
    const environmentResult = getWaitlistEmailEnvironment({
      RESEND_API_KEY: "re_test_key",
      RESEND_FROM_EMAIL: "Betz Pools Franchise <noreply@betzpoolsfranchise.com>",
      ADMIN_EMAIL: "admin@example.com",
      VERCEL_URL: "betzpoolsfranchise-kpva4wud3-betz-pools-limited.vercel.app",
    });

    expect(environmentResult).toEqual({
      isValid: true,
      environment: {
        resendApiKey: "re_test_key",
        resendFromEmail: "Betz Pools Franchise <noreply@betzpoolsfranchise.com>",
        adminEmail: "admin@example.com",
        autoResponseBccEmails: "",
        siteBaseUrl: "https://betzpoolsfranchise.com",
      },
    });
  });

  it("sends both happy-path emails with a mocked email client", async () => {
    const sentEmails: WaitlistEmailOptions[] = [];
    const emailClient = {
      /**
       * Purpose: Captures email options in memory for the sendWaitlistEmails happy path.
       * Parameters: emailOptions - generated waitlist email options.
       */
      async sendEmail(emailOptions: WaitlistEmailOptions): Promise<void> {
        sentEmails.push(emailOptions);
      },
    };

    await sendWaitlistEmails(validPayload, validEnvironment, emailClient);

    expect(sentEmails).toHaveLength(2);
    expect(sentEmails[0].subject).toBe("New Franchise Waiting List Submission");
    expect(sentEmails[1].subject).toBe(
      "Thank you for your interest in owning a Betz Pools Designated Service Area."
    );
  });
});
