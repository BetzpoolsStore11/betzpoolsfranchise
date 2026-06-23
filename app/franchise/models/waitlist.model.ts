export type JsonPrimitive = string | number | boolean | null;

export type JsonValue = JsonPrimitive | JsonObject | JsonValue[];

export type JsonObject = {
  [key: string]: JsonValue;
};

export type WaitlistPayload = {
  name: string;
  email: string;
  phone: string;
  territory: string;
  opportunity: string;
  investment: string;
  trade: string;
  vision: string;
};

export type WaitlistValidationResult =
  | {
      isValid: true;
    }
  | {
      isValid: false;
      errorMessage: string;
    };

export type WaitlistEmailEnvironment = {
  resendApiKey: string;
  resendFromEmail: string;
  adminEmail: string;
  autoResponseBccEmails: string;
  siteBaseUrl: string;
};

export type WaitlistEmailEnvironmentResult =
  | {
      isValid: true;
      environment: WaitlistEmailEnvironment;
    }
  | {
      isValid: false;
      errorMessage: string;
    };

export type WaitlistEmailOptions = {
  from: string;
  to: string | string[];
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  bcc?: string[];
};

export type WaitlistEmailClient = {
  sendEmail: (emailOptions: WaitlistEmailOptions) => Promise<void>;
};
