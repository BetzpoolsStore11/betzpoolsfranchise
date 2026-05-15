import {
  JsonObject,
  JsonValue,
  WaitlistPayload,
  WaitlistValidationResult,
} from "../models/waitlist.model";

const maxLengths = {
  name: 100,
  email: 255,
  phone: 20,
  territory: 100,
  opportunity: 40,
  investment: 40,
  trade: 200,
  vision: 1000,
} as const;

/**
 * Purpose: Determines whether JSON input is a plain object.
 * Parameters: value - parsed JSON value from the request body.
 */
function isJsonObject(value: JsonValue): value is JsonObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

/**
 * Purpose: Converts a possibly missing JSON field into a trimmed bounded string.
 * Parameters: value - submitted JSON field value; maxLength - maximum allowed characters.
 */
function normalizeValue(value: JsonValue | undefined, maxLength: number): string {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().slice(0, maxLength);
}

/**
 * Purpose: Normalizes raw waitlist JSON into the typed payload used by validation and email.
 * Parameters: rawPayload - parsed JSON request body.
 */
export function normalizeWaitlistPayload(rawPayload: JsonValue): WaitlistPayload {
  const body = isJsonObject(rawPayload) ? rawPayload : {};

  return {
    name: normalizeValue(body.name ?? body.full_name, maxLengths.name),
    email: normalizeValue(body.email, maxLengths.email).toLowerCase(),
    phone: normalizeValue(body.phone, maxLengths.phone),
    territory: normalizeValue(body.territory, maxLengths.territory),
    opportunity: normalizeValue(body.opportunity, maxLengths.opportunity),
    investment: normalizeValue(body.investment, maxLengths.investment),
    trade: normalizeValue(body.trade, maxLengths.trade),
    vision: normalizeValue(body.vision, maxLengths.vision),
  };
}

/**
 * Purpose: Validates whether an email address has a usable basic format.
 * Parameters: email - normalized submitted email address.
 */
export function isValidEmailAddress(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/**
 * Purpose: Validates required waitlist fields and email format on the server.
 * Parameters: payload - normalized waitlist payload.
 */
export function validateWaitlistPayload(payload: WaitlistPayload): WaitlistValidationResult {
  const requiredValues = [
    payload.name,
    payload.email,
    payload.phone,
    payload.territory,
    payload.opportunity,
    payload.investment,
    payload.trade,
    payload.vision,
  ];

  if (requiredValues.some((fieldValue) => !fieldValue)) {
    return { isValid: false, errorMessage: "Please fill in all required fields." };
  }

  if (!isValidEmailAddress(payload.email)) {
    return { isValid: false, errorMessage: "Please provide a valid email address." };
  }

  return { isValid: true };
}
