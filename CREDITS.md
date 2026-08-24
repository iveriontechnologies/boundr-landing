# Credits and licences — Boundr Landing

Everything bundled with this template, and what you are allowed to do with it.

Every third-party file in the download is listed here. If something is not on
this page, it was made for this template and is covered by `LICENSE.txt`.

---

## Fonts

Three families, self-hosted as WOFF2 in `assets/fonts/`. All three are Google
Fonts released under the **SIL Open Font License 1.1**, which permits
commercial use, self-hosting and redistribution inside a template. The full
licence text for each travels with the files in
`assets/fonts/licences/`, as the OFL requires.

| Family | Designer | Licence | Used for |
|---|---|---|---|
| Poppins | Indian Type Foundry, Jonny Pinhorn | SIL OFL 1.1 | Headings, buttons, plan names |
| Plus Jakarta Sans | Tokotype (Gumpita Rahayu) | SIL OFL 1.1 | Body copy |
| IBM Plex Mono | Mike Abbink, Bold Monday | SIL OFL 1.1 | Figures, dates, uppercase labels |

### What the OFL means for you

You may use these fonts on commercial sites, modify them, and pass them on
inside a site you build. The two restrictions that matter:

1. **You may not sell the font files on their own.** Bundled inside a website
   is fine; a "font pack" for sale is not.
2. **The licence text must travel with the files.** If you copy
   `assets/fonts/` into another project, copy `assets/fonts/licences/` too.

If you swap in a font from anywhere other than Google Fonts, check that its
licence permits **self-hosting and redistribution**. Many commercial font
licences allow neither, and a webfont subscription almost never does.

### Font files

```
poppins-400/500/600/700-latin.woff2            + latin-ext
plus-jakarta-sans-400/500/600/700-latin.woff2  + latin-ext
ibm-plex-mono-400/500/600-latin.woff2          + latin-ext
```

22 files, latin and latin-ext subsets. For Vietnamese, Cyrillic or Greek,
fetch the extra blocks from `fonts.googleapis.com/css2`, drop the files in
`assets/fonts/` and paste the `@font-face` blocks into
`assets/css/themes/boundr-fonts.css`.

---

## Photographs

**None.** This template ships no photographs and no raster images of any kind.

Every illustration on the page — the Slack-style message, the flag popup, the
concentric rings and radial glow, the file dropzone, the channel chips, the
progress meters, the status pills, the logo mark, the feature icons — is built
from HTML elements and CSS. There is nothing here to credit and nothing whose
licence could lapse.

The one image file in the download is `assets/img/favicon.svg`, drawn for this
template.

---

## Icons

**None bundled.** The small coloured squares in the features grid are CSS
boxes, not icons.

If you want real icons, three sets are MIT-licensed and safe to ship inside a
template: [Lucide](https://lucide.dev), [Feather](https://feathericons.com) and
[Heroicons](https://heroicons.com). Paste the SVG inline where the
`bd-feature__icon` span sits.

**Brand marks are a separate question.** The two footer links use the letters
`X` and `in` as plain text rather than logos, deliberately. Social and payment
logos are registered trademarks: an MIT icon set's licence covers the drawing,
not the trademark, so redistributing them inside a template is not something
that licence can authorise. If you want the real marks on your own site, get
them from each company's brand page and follow their usage rules.

---

## JavaScript

**No libraries.** `assets/js/boundr.js` is written for this template. No
jQuery, no framework, no polyfill, no analytics, no tracker, nothing fetched at
runtime.

---

## The design

The layout and visual direction were built for this template. The colour
palette originates in a Claude Design source file; four of its colours were
changed on the way in because they failed WCAG contrast, and each change is
marked `FIXED` in `assets/css/themes/boundr.css` with the measurement that
prompted it.

---

## The demo content

Invented for the demo, and none of it describes anything real:

- **Boundr** is not a real product or company.
- **Ava Whitfield** and **Mara Ellis** are not real people.
- The three testimonials, and the founder story behind the `data-proof="founder"`
  variant, are fiction. They are not paraphrased from real customers.
- The clients named in the dashboard — Northline Co., Ferro Studio, Maple &
  Vine, Hallam Bros. — are invented, as are every figure, date and percentage
  shown.
- The pricing tiers describe a product that does not exist.

All of it is placeholder text. See CUSTOMISATION.md, "What must change before
you launch".

---

Questions about any of this: iveriontechnologies@gmail.com
