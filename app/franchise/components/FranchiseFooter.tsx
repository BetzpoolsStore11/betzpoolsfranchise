import Image from "next/image";
import { franchiseImages } from "../lib/images";
import styles from "../franchise.module.css";

const base = "https://www.betzpools.com";

const exploreLinks = [
  { label: "Careers", href: `${base}/careers/` },
  { label: "Contact", href: `${base}/contact-our-team/` },
  { label: "Blog", href: `${base}/blog/` },
  { label: "Pool Services in Burlington", href: `${base}/pool-services-in-burlington/` },
  { label: "Pool Services in Collingwood", href: `${base}/pool-services-in-collingwood/` },
  { label: "Pool Services in Mississauga", href: `${base}/pool-services-in-mississauga/` },
  { label: "Pool Services in Muskoka", href: `${base}/pool-services-in-muskoka/` },
  { label: "Pool Services in Oakville", href: `${base}/pool-services-in-oakville/` },
  { label: "Pool Services in Toronto", href: `${base}/pool-services-in-toronto/` },
] as const;

const resourceLinks = [
  { label: "Pool Maintenance Guide", href: `${base}/pool-maintenance/` },
  { label: "Pool Equipment Guide", href: `${base}/pool-equipment/` },
  { label: "Custom Pool Design", href: `${base}/custom-pool-design/` },
] as const;

const extraResourceLinks = [
  { label: "Vinyl vs Concrete Pools", href: `${base}/vinyl-vs-concrete-pools-guide/` },
  { label: "Pool Sanitizers: A Comprehensive Guide", href: `${base}/pool-sanitizers/` },
  { label: "Troubleshooting Tips", href: "https://betzpools.com/pool-troubleshooting-guide/" },
] as const;

/** Social targets — align with main site; update if marketing changes handles. */
const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/betzpools/",
    icon: "facebook",
  },
  {
    label: "Houzz",
    href: "https://www.houzz.com/pro/betzpools/betz-pools-limited",
    icon: "houzz",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/betzpools/",
    icon: "instagram",
  },
  {
    label: "Pinterest",
    href: "https://www.pinterest.com/betzpools/",
    icon: "pinterest",
  },
  { label: "X", href: "https://x.com/betzpools", icon: "x" },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@betzpools",
    icon: "youtube",
  },
] as const;

function SocialIcon({ name }: { name: (typeof socialLinks)[number]["icon"] }) {
  const common = { width: 22, height: 22, fill: "currentColor", "aria-hidden": true as const };
  switch (name) {
    case "facebook":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M14 13.5h2.5l1-3H14v-1.5c0-.9.3-1.5 1.6-1.5H18V4.2C17.4 4.1 16.1 4 14.7 4 11.8 4 9.8 5.7 9.8 8.8V10.5H7v3h2.8V20H14v-6.5z" />
        </svg>
      );
    case "houzz":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M5.5 10.5h4V19h5v-8.5h4L12 4.5 5.5 10.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M7 4h10a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7a3 3 0 0 1-3-3V7a3 3 0 0 1 3-3zm0 2a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H7zm5 2.5a4.5 4.5 0 1 1 0 9 4.5 4.5 0 0 1 0-9zm0 2a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm5.25-3.25a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
        </svg>
      );
    case "pinterest":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M12 4a8 8 0 0 0-2.9 15.4c-.1-1.3-.3-3.3.4-4.7.4-1 2.6-6.8 2.6-6.8s-.7-1.3-.7-3.2c0-3 1.7-5.2 3.9-5.2 1.8 0 2.7 1.4 2.7 3 0 1.8-1.1 4.5-1.7 7-.5 2.1 1 3.8 3 3.8 3.6 0 6.4-3.8 6.4-9.3C22 7.8 18.3 4 12.7 4 8.2 4 5 7.1 5 10.8c0 1.2.5 2.5 1.1 3.2.1.1.1.2.1.3l-.4 1.7c-.1.4-.3.5-.6.3-2.2-1-3.6-4.2-3.6-6.7 0-5.5 4-10.4 11.5-10.4 6 0 10.7 4.3 10.7 10 0 5.9-3.7 10.6-8.9 10.6-1.7 0-3.4-.9-4-2l-1.1 4.2c-.4 1.5-1.5 3.4-2.2 4.5a8 8 0 1 0 1.1-15.9z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M4 4l7.5 10.3L4 20h1.7l6.6-7.1L17.8 20H20l-7.9-10.7L19.5 4h-1.7l-6 6.5L6.2 4H4z" />
        </svg>
      );
    case "youtube":
      return (
        <svg {...common} viewBox="0 0 24 24">
          <path d="M21.8 8.2s-.2-1.4-.8-2c-.7-.8-1.5-.8-1.9-.8C16.5 5 12 5 12 5s-4.5 0-7.1.4c-.4 0-1.2 0-1.9.8-.6.6-.8 2-.8 2S2 9.9 2 11.6v1.7c0 1.7.2 3.4.2 3.4s.2 1.4.8 2c.7.8 1.6.8 2 .9 1.5.1 6.2.4 6.2.4s4.5 0 7.1-.4c.4 0 1.2 0 1.9-.8.6-.6.8-2 .8-2s.2-1.7.2-3.4v-1.7c0-1.7-.2-3.4-.2-3.4zM10 14.5v-5l5 2.5-5 2.5z" />
        </svg>
      );
    default:
      return null;
  }
}

export function FranchiseFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.franFooter}>
      <div className={styles.franFooterInner}>
        <div className={styles.franFooterCol}>
          <Image
            src={franchiseImages.logo}
            alt="Betz Pools"
            width={140}
            height={126}
            className={styles.franFooterLogo}
          />
          <div className={styles.franFooterHeadOffice}>
            <p className={styles.franFooterHeading}>Head Office</p>
            <p>
              Monday–Friday: 9:00 am – 5:00 pm
              <br />
              Saturday–Sunday: Closed
            </p>
            <p>
              5688 Main Street, Stouffville, ON L4A 7Z9
            </p>
            <p className={styles.franFooterPhones}>
              Toronto{" "}
              <a href="tel:+14167987955">416-798-7955</a>
              <br />
              Stouffville <a href="tel:+19056401424">905-640-1424</a>
              <br />
              Oakville <a href="tel:+19058255551">905-825-5551</a>
            </p>
          </div>
        </div>

        <div className={styles.franFooterCol}>
          <p className={styles.franFooterHeading}>Explore</p>
          <ul className={styles.franFooterList}>
            {exploreLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.franFooterCol}>
          <p className={styles.franFooterHeading}>Resources</p>
          <ul className={styles.franFooterList}>
            {resourceLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.franFooterCol}>
          <ul className={styles.franFooterList}>
            {extraResourceLinks.map((item) => (
              <li key={item.href}>
                <a href={item.href} target="_blank" rel="noopener noreferrer">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={styles.franFooterBar}>
        <div className={styles.franFooterBarLeft}>
          <p className={styles.franFooterCopyright}>
            Copyright © {year} Betz Pools. All rights reserved. | Designed by{" "}
            <a href="https://intrigueme.ca/" target="_blank" rel="noopener noreferrer">
              Intrigue
            </a>
            .
          </p>
          <p className={styles.franFooterLegal}>
            <a href={`${base}/sitemap`} target="_blank" rel="noopener noreferrer">
              Sitemap
            </a>
            <span className={styles.franFooterSep} aria-hidden>
              |
            </span>
            <a href={`${base}/privacy`} target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>
            <span className={styles.franFooterSep} aria-hidden>
              |
            </span>
            <a
              href="https://betzpools.com/accessibility-policy-and-multi-year-accessibility-plan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Accessibility Policy
            </a>
          </p>
        </div>
        <ul className={styles.franFooterSocial}>
          {socialLinks.map((s) => (
            <li key={s.href}>
              <a
                href={s.href}
                className={styles.franFooterSocialLink}
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SocialIcon name={s.icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
