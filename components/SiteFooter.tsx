import BrandLockup from "./BrandLockup";
import { SITE } from "../lib/positioning";

/**
 * The site footer, shared by the homepage and secondary pages. `homeHref`
 * is "#top" on the homepage (back to top) and "/" elsewhere.
 */
export default function SiteFooter({ homeHref = "#top" }: { homeHref?: string }) {
  return (
    <footer>
      <a className="brand footer-brand" href={homeHref} aria-label={homeHref === "#top" ? "Back to top" : "NXTektal Systems home"}>
        <BrandLockup />
      </a>
      <p>INSITE + ROBOTS FOR OUTDOOR OPERATIONS · STARTING WITH GOLF</p>
      <div>
        <a href={`https://${SITE.domain}`}>{SITE.domain}</a>
        <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
        <span>© 2026 {SITE.brand}</span>
      </div>
    </footer>
  );
}
