/** Base URL for main Betz Pools marketing site (header mirrors live primary nav). */
export const betzPoolsSiteBase = "https://www.betzpools.com";

export type FranchiseHeaderNavItem = {
  label: string;
  href: string;
  /** Show dropdown caret (visual; links to section landing). */
  hasCaret: boolean;
};

/**
 * Primary nav labels and targets — franchise landing page sections with anchor links for smooth scrolling.
 */
export const franchiseHeaderNavItems: readonly FranchiseHeaderNavItem[] = [
  { label: "Opportunity", href: "#opportunity", hasCaret: false },
  { label: "System", href: "#system", hasCaret: false },
  { label: "What You Get", href: "#what-you-get", hasCaret: false },
  { label: "Betz Story", href: "#heritage", hasCaret: false },
  { label: "Model", href: "#the-model", hasCaret: false },
  { label: "Service Zones", href: "#territories", hasCaret: false },
  { label: "Ideal Partner", href: "#ideal-partners", hasCaret: false },
] as const;

/** CTA — service request entry point on main site. */
export const franchiseHeaderServiceUrl = `${betzPoolsSiteBase}/contact-our-team/`;
