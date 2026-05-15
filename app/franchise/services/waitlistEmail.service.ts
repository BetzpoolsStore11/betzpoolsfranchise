import { Resend } from "resend";
import type { CreateEmailOptions } from "resend";

import type {
  WaitlistEmailClient,
  WaitlistEmailEnvironment,
  WaitlistEmailEnvironmentResult,
  WaitlistEmailOptions,
  WaitlistPayload,
} from "../models/waitlist.model";

const autoResponseSubject =
  "Thank you for your interest in owning a Betz Pools Designated Service Area.";

const opportunityLabels: Record<string, string> = {
  retail: "Retail Pool Supply",
  service: "Weekly Service Route",
  both: "Both",
};

const investmentLabels: Record<string, string> = {
  under100: "Under $100,000",
  "100-250": "$100,000 - $250,000",
  "250-500": "$250,000 - $500,000",
  "500plus": "$500,000+",
};

/**
 * Purpose: Reads and validates server-only email configuration for waitlist submissions.
 * Parameters: environmentVariables - process environment variables available on the server.
 */
export function getWaitlistEmailEnvironment(
  environmentVariables: NodeJS.ProcessEnv
): WaitlistEmailEnvironmentResult {
  const resendApiKey = environmentVariables.RESEND_API_KEY?.trim() ?? "";
  const resendFromEmail = environmentVariables.RESEND_FROM_EMAIL?.trim() ?? "";
  const adminEmail = environmentVariables.ADMIN_EMAIL?.trim() ?? "";
  const autoResponseBccEmails = environmentVariables.AUTO_RESPONSE_BCC_EMAILS?.trim() ?? "";

  if (!resendApiKey || !resendFromEmail || !adminEmail) {
    return {
      isValid: false,
      errorMessage: "Waitlist email service is not configured.",
    };
  }

  return {
    isValid: true,
    environment: {
      resendApiKey,
      resendFromEmail,
      adminEmail,
      autoResponseBccEmails,
    },
  };
}

/**
 * Purpose: Creates the Resend-backed email client used only by the server API route.
 * Parameters: resendApiKey - private Resend API key from RESEND_API_KEY.
 */
export function createResendWaitlistEmailClient(resendApiKey: string): WaitlistEmailClient {
  // Resend is configured server-side so RESEND_API_KEY never reaches the browser bundle.
  const resend = new Resend(resendApiKey);

  return {
    /**
     * Purpose: Sends one waitlist email through Resend.
     * Parameters: emailOptions - normalized email options created by the waitlist service.
     */
    async sendEmail(emailOptions: WaitlistEmailOptions): Promise<void> {
      const payload: CreateEmailOptions = {
        from: emailOptions.from,
        to: emailOptions.to,
        subject: emailOptions.subject,
        text: emailOptions.text,
        html: emailOptions.html,
        replyTo: emailOptions.replyTo,
        bcc: emailOptions.bcc,
      };

      const response = await resend.emails.send(payload);

      if (response.error) {
        throw new Error(response.error.message);
      }
    },
  };
}

/**
 * Purpose: Converts a comma-separated BCC config value into Resend recipients.
 * Parameters: emailList - AUTO_RESPONSE_BCC_EMAILS environment value.
 */
export function parseBccEmails(emailList: string): string[] {
  return emailList
    .split(",")
    .map((emailAddress) => emailAddress.trim())
    .filter(Boolean);
}

/**
 * Purpose: Escapes text values before placing them in email HTML.
 * Parameters: value - submitted field or generated email text.
 */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Purpose: Returns the user-facing label for a submitted select value.
 * Parameters: value - raw submitted select value; labels - known UI select labels.
 */
function getSelectLabel(value: string, labels: Record<string, string>): string {
  return labels[value] ?? value;
}

/**
 * Purpose: Builds the display fields included in the admin notification.
 * Parameters: payload - normalized waitlist payload.
 */
function getAdminFieldRows(payload: WaitlistPayload): [string, string][] {
  return [
    ["Name", payload.name],
    ["Email", payload.email],
    ["Phone", payload.phone],
    ["Location / Territory", payload.territory],
    ["Opportunity Type", getSelectLabel(payload.opportunity, opportunityLabels)],
    ["Expected Investment", getSelectLabel(payload.investment, investmentLabels)],
    ["Current Trade / Experience", payload.trade],
    ["Business Vision / Message", payload.vision],
  ];
}

/**
 * Purpose: Creates the admin notification email options for a waitlist submission.
 * Parameters: payload - normalized waitlist payload; environment - server email configuration.
 */
export function createAdminEmailOptions(
  payload: WaitlistPayload,
  environment: WaitlistEmailEnvironment
): WaitlistEmailOptions {
  const fieldRows = getAdminFieldRows(payload);
  const text = [
    "New Franchise Waiting List Submission",
    "",
    ...fieldRows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");
  const htmlFields = fieldRows
    .map(
      ([label, value]) =>
        `<p><strong>${escapeHtml(label)}:</strong> ${escapeHtml(value).replace(/\n/g, "<br />")}</p>`
    )
    .join("");

  return {
    from: environment.resendFromEmail,
    to: environment.adminEmail,
    replyTo: payload.email,
    subject: "New Franchise Waiting List Submission",
    text,
    html: `<h1>New Franchise Waiting List Submission</h1>${htmlFields}`,
  };
}

/**
 * Purpose: Builds the plain-text autoresponse body sent to the applicant.
 * Parameters: name - normalized applicant name.
 */
function createAutoResponseText(name: string): string {
  return `Hi ${name},

We've received your application and have included you in our initial review group.

We are currently preparing for the launch of our first franchise areas this September, a meaningful step in expanding the Betz platform across new markets. This is not a broad rollout. Our focus is on building a small group of strong operators who can establish and lead their Designated Service Area with the level of service and professionalism the Betz brand has been known for since 1945.

The opportunity is structured around a fully integrated model, combining retail, weekly service, and supply, designed to create long-term, recurring revenue within each area. As markets develop, the goal is to build density, strengthen customer relationships, and create a scalable local business supported by centralized systems.

We are reviewing all applications carefully and in sequence as we move toward our first allocations.

We will be in touch shortly with next steps.

Best regards,
Betz Pools Franchise Team`;
}

/**
 * Purpose: Converts plain text paragraphs into simple email HTML.
 * Parameters: text - autoresponse plain text body.
 */
function convertTextToHtml(text: string): string {
  return text
    .split("\n\n")
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br />")}</p>`)
    .join("");
}

/**
 * Purpose: Creates the user autoresponse email options for a waitlist submission.
 * Parameters: payload - normalized waitlist payload; environment - server email configuration.
 */
export function createAutoResponseEmailOptions(
  payload: WaitlistPayload,
  environment: WaitlistEmailEnvironment
): WaitlistEmailOptions {
  const bcc = parseBccEmails(environment.autoResponseBccEmails);
  const text = createAutoResponseText(payload.name);
  const emailOptions: WaitlistEmailOptions = {
    from: environment.resendFromEmail,
    to: payload.email,
    subject: autoResponseSubject,
    text,
    html: convertTextToHtml(text),
  };

  if (bcc.length > 0) {
    emailOptions.bcc = bcc;
  }

  return emailOptions;
}

/**
 * Purpose: Sends both waitlist emails using the provided email client.
 * Parameters: payload - normalized waitlist payload; environment - server email configuration; emailClient - Resend or mocked email client.
 */
export async function sendWaitlistEmails(
  payload: WaitlistPayload,
  environment: WaitlistEmailEnvironment,
  emailClient: WaitlistEmailClient
): Promise<void> {
  await Promise.all([
    emailClient.sendEmail(createAdminEmailOptions(payload, environment)),
    emailClient.sendEmail(createAutoResponseEmailOptions(payload, environment)),
  ]);
}
