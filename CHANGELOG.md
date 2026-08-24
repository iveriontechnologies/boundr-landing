# Changelog — Boundr Landing

All notable changes to this template are recorded here.

Format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).
Versions follow [Semantic Versioning](https://semver.org):

- **Major** (2.0.0) — you will have to redo customisations to upgrade
- **Minor** (1.1.0) — new sections, existing ones unaffected
- **Patch** (1.0.1) — fixes only, drop-in replacement

---

## [1.0.0] — 2026-08-23

First release.

### Included

- **One page, 9 sections** — hero, problem, how it works,
  features, product demo, social proof, pricing, FAQ, final CTA — plus a
  sticky header with a mobile drawer and a four-column footer.
- **296 design tokens** in one file. No literal colour, size,
  spacing, radius or shadow exists anywhere else in the stylesheets. The two
  exceptions are commented where they occur, and both are geometry rather than
  design: the logo's bracket construction and the decorative rings.
- **Dependency-free JavaScript** — one 10 KB file, no libraries, no build step.
  Sticky nav, mobile drawer, reveal-on-scroll, KPI count-up, dashboard tabs,
  FAQ accordion, billing toggle and smooth scrolling.
- **0 photographs.** Every illustration on the page — the Slack
  message, the flag popup, the dropzone, the channel chips, the progress
  meters, the decorative rings — is HTML and CSS. Nothing to license, nothing
  to replace, nothing that goes stale.
- **Three self-hosted typefaces** under the SIL Open Font License: Poppins,
  Plus Jakarta Sans and IBM Plex Mono. No request leaves the folder.

### Accessibility

- WCAG 2.1 AA contrast verified on every rendered text element, with the
  background composited as it actually paints rather than as authored.
- Four colours from the source design were changed because they failed. Each
  is marked `FIXED` in `assets/css/themes/boundr.css` with its measurement.
- WCAG 2.2 SC 2.5.8: every target is at least 24×24 CSS pixels, apart from
  links that are inline inside a sentence, which the criterion exempts.
- A real `role="tablist"` with arrow-key, Home and End navigation.
- `aria-expanded` on every accordion button, and the `+` / `–` glyph drawn from
  that state so the two can never disagree.
- One `h1`, no skipped heading levels, a skip link, and focus rings that stay
  visible on the violet and ink surfaces.
- `prefers-reduced-motion` disables every animation and transition, and
  overrides the template's own `data-motion` setting.

### Works without JavaScript

The markup is the finished page; the script only removes things. With
JavaScript disabled: all seven FAQ answers are open, all three dashboard panels
are stacked and reachable with their own headings, the monthly prices show, the
drawer links are present, and nothing is left invisible. The tab strip is
hidden until the script that drives it has loaded.

### Known placeholders

- The testimonials and the founder story are fictional.
- Every figure in the dashboard is invented.
- `https://example.com` in the canonical and Open Graph tags.
- The two footer social links, "Privacy Policy" and "Terms" point at `#top`.

See CUSTOMISATION.md, "What must change before you launch".
