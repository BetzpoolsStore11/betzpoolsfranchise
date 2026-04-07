import Image from "next/image";
import Link from "next/link";
import {
  franchiseHeaderNavItems,
  franchiseHeaderServiceUrl,
} from "../lib/headerNav";
import { franchiseImages } from "../lib/images";
import styles from "../franchise.module.css";

/**
 * Renders a small chevron used beside nav items that have sub-menus on the main site.
 */
function HeaderNavCaret() {
  return (
    <span className={styles.franHeaderCaret} aria-hidden>
      <svg viewBox="0 0 12 12" fill="none" aria-hidden>
        <path
          d="M3 4.5 6 7.5 9 4.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

/**
 * FranchiseHeader — floating white bar with logo, centered primary links, and Request Service CTA.
 * Purpose: match main betzpools.com header styling on the franchise landing page.
 */
export function FranchiseHeader() {
  return (
    <div className={styles.franHeaderWrap}>
      <header className={styles.franHeader}>
        <Link href="https://www.betzpools.com/" className={styles.franHeaderLogo}>
          <Image
            src={franchiseImages.logo}
            alt="Betz Pools"
            width={160}
            height={144}
            priority
          />
        </Link>
        <nav className={styles.franHeaderNav} aria-label="Primary">
          {franchiseHeaderNavItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={styles.franHeaderNavLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {item.label}
              {item.hasCaret ? <HeaderNavCaret /> : null}
            </a>
          ))}
        </nav>
        <a
          href={franchiseHeaderServiceUrl}
          className={styles.franHeaderCta}
          target="_blank"
          rel="noopener noreferrer"
        >
          Request Service
        </a>
      </header>
    </div>
  );
}
