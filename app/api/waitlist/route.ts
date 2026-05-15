import { NextResponse } from "next/server";

import type { JsonValue } from "@/app/franchise/models/waitlist.model";
import {
  createResendWaitlistEmailClient,
  getWaitlistEmailEnvironment,
  sendWaitlistEmails,
} from "@/app/franchise/services/waitlistEmail.service";
import {
  normalizeWaitlistPayload,
  validateWaitlistPayload,
} from "@/app/franchise/utils/waitlistValidation.util";

/**
 * Purpose: Converts form data submissions into the same JSON shape used by client fetch.
 * Parameters: formData - native browser form submission data.
 */
function convertFormDataToJsonObject(formData: FormData): JsonValue {
  const payload: Record<string, JsonValue> = {};

  formData.forEach((value, key) => {
    if (typeof value === "string") {
      payload[key] = value;
    }
  });

  return payload;
}

/**
 * Purpose: Reads either JSON fetch submissions or native form posts from the waitlist route.
 * Parameters: request - incoming local API request from the waitlist form.
 */
async function readRequestPayload(request: Request): Promise<JsonValue> {
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    return (await request.json().catch((): JsonValue => ({}))) as JsonValue;
  }

  return convertFormDataToJsonObject(await request.formData().catch(() => new FormData()));
}

/**
 * Purpose: Handles franchise waitlist submissions and sends Resend email notifications.
 * Parameters: request - incoming local API request from the waitlist form.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const rawPayload = await readRequestPayload(request);
  const payload = normalizeWaitlistPayload(rawPayload);
  const validation = validateWaitlistPayload(payload);

  if (!validation.isValid) {
    return NextResponse.json({ error: validation.errorMessage }, { status: 400 });
  }

  const environmentResult = getWaitlistEmailEnvironment(process.env);

  if (!environmentResult.isValid) {
    return NextResponse.json({ error: environmentResult.errorMessage }, { status: 500 });
  }

  try {
    await sendWaitlistEmails(
      payload,
      environmentResult.environment,
      createResendWaitlistEmailClient(environmentResult.environment.resendApiKey)
    );

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Your application could not be sent. Please try again." },
      { status: 502 }
    );
  }
}
