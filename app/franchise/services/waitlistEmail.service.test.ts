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
    expect(emailOptions.text).toContain("Hi Jane Smith,");
    expect(emailOptions.text).toContain("Betz Pools Franchise Team");
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
