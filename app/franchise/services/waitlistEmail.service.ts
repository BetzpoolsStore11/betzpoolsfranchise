import { Resend } from "resend";
import type { CreateEmailOptions } from "resend";

import type {
  WaitlistEmailClient,
  WaitlistEmailEnvironment,
  WaitlistEmailEnvironmentResult,
  WaitlistEmailOptions,
  WaitlistPayload,
} from "../models/waitlist.model";

const franchise_deck_page_path = "/franchise-platform-overview-8q4m2x9v";

const default_site_base_url = "https://betzpoolsfranchise.com";

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
  const configuredSiteBaseUrl =
    environmentVariables.BETZ_FRANCHISE_BASE_URL?.trim() ??
    environmentVariables.NEXT_PUBLIC_SITE_URL?.trim() ??
    "";

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
      siteBaseUrl: configuredSiteBaseUrl || default_site_base_url,
    },
  };
}

/**
 * Purpose: Builds the absolute applicant deck URL used in waitlist autoresponse emails.
 * Parameters: siteBaseUrl - public website origin where the franchise site is deployed.
 */
export function createFranchiseDeckUrl(siteBaseUrl: string): string {
  const normalizedBaseUrl = siteBaseUrl.replace(/\/+$/, "");

  return `${normalizedBaseUrl}${franchise_deck_page_path}`;
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
function createAutoResponseText(name: string, deckUrl: string): string {
  return `Hi ${name},

Thank you for your interest in owning a Betz Pools Designated Service Area.

We've received your application and have included you in our initial review group.

We are currently preparing for the launch of our first franchise areas this September - a meaningful step in expanding the Betz platform across new markets. This is not a broad rollout. Our focus is on building a small group of strong operators who can establish and lead their Designated Service Area with the level of service and professionalism the Betz brand has been known for since 1945.

The opportunity is structured around a fully integrated model - combining retail, weekly service, and supply - designed to create long-term, recurring revenue within each area. As markets develop, the goal is to build density, strengthen customer relationships, and create a scalable local business supported by centralized systems.

We are reviewing all applications carefully and in sequence as we move toward our first allocations.

The Betz Pools platform overview is available here:
${deckUrl}

We will be in touch shortly with next steps.

Best regards,
Betz Pools Franchise Team`;
}

/**
 * Purpose: Builds a branded HTML autoresponse email for franchise applicants.
 * Parameters: name - normalized applicant name; deckUrl - absolute URL for the platform overview page.
 */
function createAutoResponseHtml(name: string, deckUrl: string): string {
  const safeName = escapeHtml(name);
  const safeDeckUrl = escapeHtml(deckUrl);

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#e8f4fc;padding:0;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#e8f4fc;margin:0;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;background:#ffffff;border:1px solid #d7e7f0;border-radius:8px;overflow:hidden;box-shadow:0 18px 44px rgba(10,22,40,0.08);">
            <tr>
              <td style="background:#0a1628;padding:32px 36px 30px;border-bottom:4px solid #c9a227;">
                <p style="margin:0 0 10px;color:#e8d48a;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Betz Pools Franchise</p>
                <h1 style="margin:0;color:#ffffff;font-size:30px;line-height:1.16;font-weight:700;">Designated Service Area Application</h1>
                <p style="margin:14px 0 0;color:rgba(255,255,255,0.78);font-size:15px;line-height:1.6;">Your application has been received for our initial Designated Service Area review group.</p>
              </td>
            </tr>
            <tr>
              <td style="padding:36px;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#0a1628;">Hi ${safeName},</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">Thank you for your interest in owning a Betz Pools Designated Service Area.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">We&rsquo;ve received your application and have included you in our initial review group.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">We are currently preparing for the launch of our first franchise areas this September &mdash; a meaningful step in expanding the Betz platform across new markets. This is not a broad rollout. Our focus is on building a small group of strong operators who can establish and lead their Designated Service Area with the level of service and professionalism the Betz brand has been known for since 1945.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">The opportunity is structured around a fully integrated model &mdash; combining retail, weekly service, and supply &mdash; designed to create long-term, recurring revenue within each area. As markets develop, the goal is to build density, strengthen customer relationships, and create a scalable local business supported by centralized systems.</p>
                <p style="margin:0 0 26px;font-size:16px;line-height:1.68;color:#334155;">We are reviewing all applications carefully and in sequence as we move toward our first allocations.</p>
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin:0 0 28px;background:#f7fbfd;border:1px solid #d7e7f0;border-radius:8px;">
                  <tr>
                    <td style="padding:24px 24px 26px;border-left:4px solid #c9a227;">
                      <p style="margin:0 0 16px;color:#c9a227;font-size:12px;line-height:1.4;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;">Platform Overview</p>
                      <p style="margin:0 0 18px;font-size:16px;line-height:1.62;color:#1e293b;">The Betz Pools platform overview provides additional detail on how the model is structured and how markets are developed over time.</p>
                      <a href="${safeDeckUrl}" style="display:inline-block;background:#0096d6;color:#ffffff;text-decoration:none;font-size:13px;line-height:1.2;font-weight:700;letter-spacing:0.04em;text-transform:uppercase;padding:14px 18px;border-radius:8px;">View Platform Overview</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.68;color:#334155;">We will be in touch shortly with next steps.</p>
                <p style="margin:0;font-size:16px;line-height:1.68;color:#0a1628;">Best regards,<br />Betz Pools Franchise Team</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
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
  const deckUrl = createFranchiseDeckUrl(environment.siteBaseUrl);
  const text = createAutoResponseText(payload.name, deckUrl);
  const emailOptions: WaitlistEmailOptions = {
    from: environment.resendFromEmail,
    to: payload.email,
    subject: autoResponseSubject,
    text,
    html: createAutoResponseHtml(payload.name, deckUrl),
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
