/** Base URL for main Betz Pools marketing site (header mirrors live primary nav). */
export const betzPoolsSiteBase = "https://www.betzpools.com";

export type FranchiseHeaderNavItem = {
  label: string;
  href: string;
  /** Show dropdown caret (visual; links to section landing). */
  hasCaret: boolean;
};

/**
 * Primary nav labels and targets — aligned with main site structure from design reference.
 * Paths follow common betzpools.com URLs; adjust if slugs change.
 */
export const franchiseHeaderNavItems: readonly FranchiseHeaderNavItem[] = [
  { label: "Home", href: `${betzPoolsSiteBase}/`, hasCaret: false },
  {
    label: "Pool Maintenance Services",
    href: `${betzPoolsSiteBase}/pool-maintenance/`,
    hasCaret: true,
  },
  {
    label: "Pools & Spas",
    href: `${betzPoolsSiteBase}/custom-pool-design/`,
    hasCaret: true,
  },
  {
    label: "Renovations",
    href: `${betzPoolsSiteBase}/pool-renovations/`,
    hasCaret: true,
  },
  {
    label: "Outdoor Living",
    href: `${betzPoolsSiteBase}/outdoor-living/`,
    hasCaret: true,
  },
  { label: "Careers", href: `${betzPoolsSiteBase}/careers/`, hasCaret: false },
  {
    label: "Company",
    href: `${betzPoolsSiteBase}/contact-our-team/`,
    hasCaret: true,
  },
] as const;

/** CTA — service request entry point on main site. */
export const franchiseHeaderServiceUrl = `${betzPoolsSiteBase}/contact-our-team/`;
