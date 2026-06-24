import { readFileSync } from "node:fs";
import { join } from "node:path";

import { Resend } from "resend";
import type { CreateEmailOptions } from "resend";

import type {
  WaitlistEmailAttachment,
  WaitlistEmailClient,
  WaitlistEmailEnvironment,
  WaitlistEmailEnvironmentResult,
  WaitlistEmailOptions,
  WaitlistPayload,
} from "../models/waitlist.model";

const franchise_deck_page_path = "/franchise-platform-overview-8q4m2x9v";

const default_site_base_url = "https://betzpoolsfranchise.com";

const franchise_deck_file_path = join(
  process.cwd(),
  "assets",
  "Betz Pools Franchise Deck - draft 20260512.pdf"
);

const franchise_deck_attachment_name = "Betz Pools Franchise Platform Overview.pdf";

const betz_pools_logo_url =
  "https://betzpools.com/wp-content/uploads/2023/06/BetzPools-Primary_Logo.png";

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
        attachments: emailOptions.attachments,
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
 * Purpose: Loads the franchise platform PDF as an applicant email attachment.
 * Parameters: None.
 */
export function createFranchiseDeckAttachment(): WaitlistEmailAttachment {
  return {
    content: readFileSync(franchise_deck_file_path),
    filename: franchise_deck_attachment_name,
    contentType: "application/pdf",
  };
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
 * Parameters: None.
 */
function createAutoResponseText(): string {
  return `Thank you for your interest in owning a Betz Pools Designated Service Area.

We’ve received your application and have included you in our initial review group.

We are currently preparing for the launch of our first franchise areas this September — a meaningful step in expanding the Betz platform across new markets. This is not a broad rollout. Our focus is on building a small group of strong operators who can establish and lead their Designated Service Area with the level of service and professionalism the Betz brand has been known for since 1945.

The opportunity is structured around a fully integrated model — combining retail, weekly service, and supply — designed to create long-term, recurring revenue within each area. As markets develop, the goal is to build density, strengthen customer relationships, and create a scalable local business supported by centralized systems.

We are reviewing all applications carefully and in sequence as we move toward our first allocations.

Attached is an overview of the Betz Pools platform, which provides additional detail on how the model is structured and how markets are developed over time.

We will be in touch shortly with next steps.`;
}

/**
 * Purpose: Builds a branded HTML autoresponse email for franchise applicants.
 * Parameters: None.
 */
function createAutoResponseHtml(): string {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      @media only screen and (max-width: 700px) {
        .email-shell { width: 100% !important; max-width: 100% !important; }
        .email-header { padding: 24px !important; }
        .email-logo-cell { width: 88px !important; padding-right: 18px !important; }
        .email-logo-image { width: 88px !important; }
        .email-title { font-size: 23px !important; }
        .email-body { padding: 30px 24px !important; }
      }
    </style>
  </head>
  <body style="margin:0;background:#f5f8f9;padding:0;font-family:Arial,Helvetica,sans-serif;color:#1e293b;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;background:#f5f8f9;margin:0;">
      <tr>
        <td align="center" style="padding:32px 0;">
          <div style="width:100%;max-width:680px;margin:0 auto;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" class="email-shell" style="width:100%;table-layout:fixed;background:#ffffff;border:1px solid #d8e3e7;border-radius:10px;overflow:hidden;">
            <tr>
              <td class="email-header" style="padding:28px 36px;background:#ffffff;border-bottom:4px solid #0096d6;overflow-wrap:break-word;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="width:100%;table-layout:fixed;">
                  <tr>
                    <td class="email-logo-cell" width="112" valign="middle" style="width:112px;padding:0 24px 0 0;">
                      <img class="email-logo-image" src="${betz_pools_logo_url}" width="112" alt="Betz Pools" style="display:block;width:112px;max-width:100%;height:auto;border:0;" />
                    </td>
                    <td valign="middle" style="overflow-wrap:break-word;">
                      <p style="margin:0 0 8px;color:#087da9;font-size:11px;line-height:1.4;font-weight:700;letter-spacing:2px;text-transform:uppercase;">Franchise Application</p>
                      <h1 class="email-title" style="margin:0;color:#0a1f2c;font-size:27px;line-height:1.2;font-weight:700;">Designated Service Area Application</h1>
                      <p style="margin:12px 0 0;color:#475569;font-size:14px;line-height:1.55;">Your application has been received for our initial Designated Service Area review group.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td class="email-body" style="padding:36px;overflow-wrap:break-word;">
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">Thank you for your interest in owning a Betz Pools Designated Service Area.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">We&rsquo;ve received your application and have included you in our initial review group.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">We are currently preparing for the launch of our first franchise areas this September &mdash; a meaningful step in expanding the Betz platform across new markets. This is not a broad rollout. Our focus is on building a small group of strong operators who can establish and lead their Designated Service Area with the level of service and professionalism the Betz brand has been known for since 1945.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">The opportunity is structured around a fully integrated model &mdash; combining retail, weekly service, and supply &mdash; designed to create long-term, recurring revenue within each area. As markets develop, the goal is to build density, strengthen customer relationships, and create a scalable local business supported by centralized systems.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">We are reviewing all applications carefully and in sequence as we move toward our first allocations.</p>
                <p style="margin:0 0 18px;font-size:16px;line-height:1.68;color:#334155;">Attached is an overview of the Betz Pools platform, which provides additional detail on how the model is structured and how markets are developed over time.</p>
                <p style="margin:0;font-size:16px;line-height:1.68;color:#334155;">We will be in touch shortly with next steps.</p>
              </td>
            </tr>
          </table>
          </div>
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
  const text = createAutoResponseText();
  const emailOptions: WaitlistEmailOptions = {
    from: environment.resendFromEmail,
    to: payload.email,
    subject: autoResponseSubject,
    text,
    html: createAutoResponseHtml(),
    attachments: [createFranchiseDeckAttachment()],
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
