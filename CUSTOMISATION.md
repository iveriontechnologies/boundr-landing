# Customising Boundr Landing

Written for someone who can edit a text file. No terminal, no build step, no
prior CSS knowledge assumed — where something needs explaining, it is
explained.

**Work in a copy.** Duplicate the folder before you start. When you break
something — everyone does — you want the original to compare against.

**Refresh is all it takes.** Save the file, switch to the browser, press
<kbd>Ctrl</kbd>+<kbd>R</kbd> (<kbd>Cmd</kbd>+<kbd>R</kbd> on a Mac). If a
change does not show up, hold <kbd>Shift</kbd> while you refresh — the browser
is showing you a cached copy of the stylesheet.

---

## Contents

1. [The five-minute version](#1-the-five-minute-version)
2. [Colour](#2-colour)
3. [Type](#3-type)
4. [Roundness, shadow and spacing](#4-roundness-shadow-and-spacing)
5. [The four switches](#5-the-four-switches)
6. [Editing each section](#6-editing-each-section)
7. [Deleting a section](#7-deleting-a-section)
8. [What must change before you launch](#8-what-must-change-before-you-launch)
9. [Making the buttons do something](#9-making-the-buttons-do-something)
10. [The layout, and why there are no media queries](#10-the-layout-and-why-there-are-no-media-queries)
11. [Putting it online](#11-putting-it-online)
12. [Troubleshooting](#12-troubleshooting)

---

## 1. The five-minute version

Four edits turn this into your landing page. Everything else is refinement.

| # | What | Where |
|---|---|---|
| 1 | Your name instead of "Boundr" | `index.html` — search for `Boundr`, 8 places |
| 2 | Your brand colour | `assets/css/themes/boundr.css` — `--color-accent` |
| 3 | Your headline and sub | `index.html` — the `bd-hero__title` and `bd-hero__lede` near the top |
| 4 | Your page title and description | `index.html` — the `<title>` and `<meta name="description">` in the `<head>` |

---

## 2. Colour

Open `assets/css/themes/boundr.css`. Every colour on the page is in there, and
nowhere else. Change a value, refresh, done.

### The three that matter

```css
--color-accent:  #3A24AE;   /* the violet: buttons, links, the hero panel */
--color-surface: #FBF7F0;   /* the warm cream page background */
--color-text:    #171429;   /* the near-black everything is written in */
```

Changing `--color-accent` alone re-brands the page. Two more move with it:

```css
--color-accent-hover: #2E1B8A;   /* the same colour, darker, for hover */
--color-accent-on-dark: #816FE1; /* the same colour, lighter, for the footer */
```

### Check your colour before you commit to it

Text has to be readable. The rule that matters is **4.5:1** contrast for normal
text and **3:1** for large text and for the outline of a button. Paste your
background and text colours into any free contrast checker and read the number.

If your accent is a light or mid colour — orange, yellow, lime, sky blue —
white text on it will fail. Two options: darken the accent until white passes,
or set `--color-text-on-accent` to a dark colour instead.

Four colours in this file are marked **FIXED** with a comment. Those are values
from the original design that failed the contrast rule, along with the
measurement and the corrected value. If you copy the design's palette from
somewhere else, you will hit the same four.

### The rest of the palette

Grouped by job, with a comment on each:

- **Surfaces** — `--color-surface-raised` (cards, the nav), `--color-surface-sunken`
  (the demo band), `--color-surface-accent` (the tinted wash behind chips)
- **Text** — `--color-text-secondary` (body copy), `--color-text-strong`
  (denser), `--color-text-muted` (captions and dates)
- **States** — `--color-positive` (agreed, in scope) and `--color-flagged`
  (needs a decision). Deliberately amber rather than red: red says you did
  something wrong, amber says there is a decision waiting.
- **Decoration** — `--color-glow-warm`, `--color-ring-amber` and friends draw
  the rings on the violet panels. They carry no text, so no contrast rule
  applies to them and you can pick whatever you like.

---

## 3. Type

Three families, three jobs, all at the top of the theme file:

```css
--font-display: 'Poppins', ...;            /* headings and buttons */
--font-body:    'Plus Jakarta Sans', ...;  /* everything you read */
--font-mono:    'IBM Plex Mono', ...;      /* figures and small caps labels */
```

### Using a font you already have

If you want a system font — no download, instant render:

```css
--font-display: 'Segoe UI', system-ui, -apple-system, sans-serif;
```

Then delete the `<link>` to `themes/boundr-fonts.css` from `index.html` and the
`assets/fonts/` folder. That is 460 KB gone.

### Using a different Google font

1. Download the WOFF2 files and put them in `assets/fonts/`.
2. Open `assets/css/themes/boundr-fonts.css` and copy one of the existing
   `@font-face` blocks, changing the family name and the file name.
3. Change `--font-display` (or `--font-body`) in the theme file.
4. Put the font's licence file in `assets/fonts/licences/`. If you cannot find
   one, you do not have permission to self-host it — use it from the foundry's
   CDN instead, or pick another.

### Sizes

The display scale in `tokens.css` runs `--text-display-2xs` to
`--text-display-7xl`, plus two responsive ones the theme overrides:

```css
--text-display-hero:    clamp(38px, 5.2vw, 62px);   /* the h1 */
--text-display-section: clamp(30px, 3.6vw, 44px);   /* every h2 */
```

`clamp(min, preferred, max)` means: never smaller than the first, never bigger
than the third, and scale with the window in between. Change the first number
to change how it looks on a phone and the last to change the desktop.

> If you swap Poppins for a **condensed** face, put these back up — condensed
> letters are narrower, so the same pixel size reads smaller. If you swap it
> for something **wide**, bring them down or the headline will wrap awkwardly.

---

## 4. Roundness, shadow and spacing

### Roundness

```css
--radius-chip:    9px;    /* small controls, pills, avatars */
--radius-control: 11px;   /* buttons and inputs */
--radius-media:   14px;   /* cards */
--radius-card:    20px;   /* the dashboard */
--radius-panel:   22px;   /* the hero and CTA panels */
```

Set all five to `0` for a square design; double them for a soft one. Keep them
in proportion — a 22px panel containing 0px buttons looks like a mistake.

### Shadow

```css
--shadow-sm:     0 6px 16px  rgba(23, 20, 41, .08);
--shadow-md:     0 12px 28px rgba(23, 20, 41, .16);
--shadow-lg:     0 24px 56px rgba(23, 20, 41, .10);
--shadow-accent: 0 10px 24px rgba(58, 36, 174, .26);   /* under a primary button */
--shadow-hero:   0 30px 70px rgba(23, 20, 41, .22);
```

Set them all to `none` for a flat design. The colours are tinted with the ink
rather than pure black, which is why the elevation stays warm against the
cream instead of turning grey.

### Spacing

`--space-1` through `--space-26`, on a 4px step, in `tokens.css`. You will
rarely need to touch these; the two worth knowing are:

```css
--section-pad: clamp(64px, 7vw, 104px);   /* the gap above and below each section */
--pad:         24px;                       /* the left and right page gutter */
```

---

## 5. The four switches

Four attributes on the `<html>` tag at the very top of `index.html`:

```html
<html lang="en-GB" data-motion="full" data-decor="on">
```

### `data-motion` — how much animation

| Value | What happens |
|---|---|
| `full` | Everything: the rings drift, the flag pings, sections fade in as you scroll, the KPI counts up |
| `subtle` | The endless ambient loops stop. Everything that responds to you still moves. |
| `off` | No animation, no transitions, anywhere |

Whatever you pick, a visitor who has asked their operating system for reduced
motion gets `off`. Their setting always wins over yours; that is not something
you should override, and there is deliberately no way to.

### `data-decor` — the rings and glow

`on` or `off`. Setting it to `off` removes the concentric rings, the radial
glow and the pulsing dot from the hero, the feature panel and the final CTA.
The panels stay; only the decoration goes. Useful if you want a plainer page,
or if your brand colour makes the glow look muddy.

### Which dashboard tab opens first

On the tab strip in the product-demo section:

```html
<div class="bd-tabs" role="tablist" aria-label="Boundr views" data-tablist data-default-tab="scope">
```

`flagged` (the default), `scope`, or `client`.

### Testimonials or the founder story

The social-proof section ships both. One is hidden:

```html
<div data-proof="testimonials">        ← showing
<div class="bd-founder" data-proof="founder" hidden>   ← hidden
```

Move the word `hidden` from one opening tag to the other to swap them. Both are
complete; neither needs anything else changed.

---

## 6. Editing each section

Every section in `index.html` starts with a comment banner:

```html
<!-- ================================================== SECTION: pricing -->
```

Search for the one you want.

### Hero

- `bd-hero__title` — the `<em>` around "priced before" is what makes it violet.
  Move it or delete it.
- `<br>` — where line one breaks. Delete it and the headline flows naturally.
- `bd-hero__lede`, `bd-hero__trust` — sub and the small print under the buttons.
- The whole card on the right is `bd-hero__card`. The Slack-style message, the
  flag popup, the estimate and the two buttons are all plain HTML — edit the
  names, the channel, the time, the figure. Nothing is an image.

### Problem

Three `bd-scenario` blocks. Copy one to add a fourth; the grid re-flows on its
own. The big violet line is `bd-scenario__quote`.

### How it works

Three `bd-step` items in an `<ol>`. Each has a number, a title, a paragraph and
a small illustration — a dropzone, three channel chips, two outcome rows. If
you add a fourth step, renumber the `bd-step__no` spans by hand: they are
written out rather than generated so a screen reader reads them in order.

### Features

Six `bd-feature` cards. The first one has `bd-feature--hero` and spans the full
width — that is the cell for the one thing you actually differentiate on. Move
that class to a different card to promote it instead.

The little coloured squares are `bd-feature__icon`, in `--violet` and `--amber`.
To use real icons, replace the `<span>` with an inline SVG. Lucide, Feather and
Heroicons are all MIT-licensed and free to ship.

### Product demo

Three panels behind the tab strip. Each is a `role="tabpanel"` div:

- `#panel-flagged` — the table. Rows are plain `<tr>`; copy one and edit it.
  The table is 860px wide and scrolls sideways inside its own box on a phone,
  which is why the "Swipe for estimates" hint appears there and not on desktop.
- `#panel-scope` — the clause list and three progress meters. A meter's fill is
  `style="--fill: 78%"` on the `bd-meter__fill` span. Change the percentage and
  the number beside it; they are not linked, so change both.
- `#panel-client` — a single card.

The two figures in the violet band count up when the section scrolls into view:

```html
<span data-count-to="1305">1,305</span>
```

The text inside the span is what is displayed at the end — the attribute is
only the target the animation climbs to. Change both. `data-count-decimals="1"`
keeps one decimal place while it counts.

### Social proof

See [the four switches](#5-the-four-switches) for swapping the two variants.
Three `bd-quote` figures; the large violet line is `bd-quote__figure` and works
best as a number or a very short phrase.

### Pricing

Three `bd-plan` blocks. **The featured one is first in the file on purpose** —
that way it is the first plan read on a phone and the first one reached by
keyboard. It is moved into the middle visually on wide screens by
`--plan-order`, which is presentational only. If you reorder them, keep the
plan you most want chosen at the top of the file.

Each price and note carries both billing periods:

```html
<p class="bd-plan__price" data-monthly="$39" data-annual="$31">$39</p>
```

The visible text is the monthly one, so it is what shows if the script never
runs. Change all three: the attribute, the other attribute, and the text.

To drop the toggle entirely, delete the `bd-billing` div and the two
`data-monthly` / `data-annual` attributes from each price and note.

### FAQ

Seven `bd-faq__item` blocks. To add one, copy a whole item and change **both**
ids so they still match:

```html
<button ... aria-controls="faq-a7">Your question<span class="bd-faq__sign"></span></button>
<div class="bd-faq__a" id="faq-a7"><p>Your answer.</p></div>
```

If those two ids disagree, the accordion will not open and a screen reader will
not know which answer belongs to the question. The `+` and `–` are drawn by CSS
from the button's own state, so there is nothing to keep in sync there.

### Final CTA

`bd-cta__card`. Headline, one line of sub, two buttons, one line of small
print.

---

## 7. Deleting a section

Delete from the `<!-- SECTION: -->` comment down to the matching `</section>`.
Nothing else breaks — no section depends on another.

Two things to tidy up afterwards:

1. **The nav and footer links.** If you delete the pricing section, remove the
   `#pricing` links from the header, the drawer and the footer, or they will
   scroll to nothing.
2. **The `id`.** Sections other links point at are `#how`, `#features`,
   `#pricing`, `#faq`, `#signup` and `#top`.

---

## 8. What must change before you launch

### The fictional content

**The three testimonials are invented.** So is the founder story, including the
name Ava Whitfield and the "11 hours in a month I'd worked 34" line. They were
written to demonstrate the layout. Publishing them as real is a false claim
about customers who do not exist — replace them with real quotes or delete the
section.

**Every figure in the dashboard is invented.** The clients, the amounts, the
dates, the percentages, the KPI totals.

**Boundr is not a real company.** The pricing tiers, the feature list and the
FAQ answers all describe a product that does not exist.

### The `<head>`

Near the top of `index.html`:

```html
<title>...</title>
<meta name="description" content="...">
<link rel="canonical" href="https://example.com/index.html">
<meta property="og:image" content="https://example.com/assets/img/og-cover.png">
```

Replace **every** `https://example.com` with your real domain. The canonical
and Open Graph URLs must be absolute — a relative one breaks the link preview
when someone shares the page.

`og-cover.png` should be 1200×630. Anything else gets cropped by the social
platform, usually across your headline.

### The favicon

`assets/img/favicon.svg` is the Boundr mark: a violet tile, two brackets and a
dot. Replace it with your own SVG at the same path, or change the path in the
`<head>`. Keep it simple — it is rendered at 16 pixels.

### The footer

- The two social links go to `#top`. Point them at your real accounts, and edit
  the hidden text inside each one (`Boundr on X`) to match.
- "Privacy Policy" and "Terms" go nowhere. Either write those pages and link
  them, or delete the links. A footer link to a page that does not exist is
  worse than no link.
- The credit line at the bottom is yours to remove. Attribution is not required
  by the licence.

---

## 9. Making the buttons do something

Every button on the page is a link or an inert element right now. What you
connect them to is up to you, but the two common cases:

### A signup form

Replace the two hero buttons with a form pointing at whatever collects your
emails — ConvertKit, Mailchimp, Buttondown, Formspree all give you an endpoint:

```html
<form class="bd-hero__ctas" action="https://your-provider.example/subscribe" method="post">
  <label class="bd-visually-hidden" for="email">Email address</label>
  <input class="bd-field" id="email" name="email" type="email" required
         autocomplete="email" placeholder="you@company.com">
  <button class="bd-btn bd-btn--primary" type="submit">Start free</button>
</form>
```

The `<label>` is not optional. A placeholder is not a label: it disappears the
moment someone types, and a screen reader may not announce it at all.

There is no `.bd-field` style in the template — it ships no forms — so add one
to `assets/css/boundr.css` using the same tokens the buttons use.

### An external signup page

Simplest of all. Change the `href`:

```html
<a class="bd-btn bd-btn--primary" href="https://app.yourproduct.com/signup">Start free</a>
```

Remove `data-scroll-to` from any button you point off-page, or the script will
intercept the click and try to scroll to a section that is not there.

---

## 10. The layout, and why there are no media queries

Almost every stylesheet you have seen scatters `@media` rules through the file
— a bit of mobile layout here, a desktop override 400 lines later. Changing how
something behaves on a phone means finding all of them.

This one has none in `boundr.css`. Instead, layout decisions are custom
properties with a mobile value, and the wider-screen values are grouped in
three blocks at the bottom of `tokens.css`.

For example, the nav:

```css
:root {
  --nav-links:  none;   /* phone: no link row */
  --nav-burger: flex;   /* phone: show the burger */
}
@media (min-width: 861px) {
  :root {
    --nav-links:  flex;
    --nav-burger: none;
  }
}
```

And in `boundr.css`, one rule that never changes:

```css
.bd-nav__links { display: var(--nav-links); }
```

To move the point where the nav switches to a burger, change `861px` in one
place. To keep the burger at every width, delete the two lines from the media
query.

The switches that work this way: `--nav-links`, `--nav-burger`, `--hero-cols`,
`--connector`, `--msg-width`, `--flag-offset`, `--feature-span`,
`--plan-order`, `--swipe`.

The three breakpoints are 861px, 941px and 1101px. They are the kit's, shared
with the other templates, which is why they are odd numbers.

---

## 11. Putting it online

There is no build step. Upload the folder.

- **Netlify** — drag the folder onto the drop zone at app.netlify.com/drop.
- **Vercel, Cloudflare Pages, GitHub Pages** — point them at the folder, no
  build command, no output directory.
- **Ordinary hosting** — upload by FTP to `public_html` or `www`.

Before you upload, open `index.html` from your own disk with the network
disconnected. Everything should render. If a font is missing, a path is wrong,
and it will be wrong on the server too.

---

## 12. Troubleshooting

**My change did not appear.** Hard refresh: <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>
(<kbd>Cmd</kbd>+<kbd>Shift</kbd>+<kbd>R</kbd>). The browser is showing you a
cached stylesheet.

**Everything lost its styling.** A missing `}` or `;` in the CSS. The browser
stops applying the file from the error onward, so the damage usually starts
right at your edit.

**The fonts fell back to Arial.** The `assets/fonts/` folder did not come along,
or you renamed the folder without updating `boundr-fonts.css`.

**An accordion stopped opening.** The `aria-controls` on the button and the
`id` on the answer no longer match. They must be identical.

**The page scrolls sideways.** Something is wider than the screen. Open the
browser's dev tools (<kbd>F12</kbd>), pick the Elements panel, and hover down
the list — the culprit highlights past the right edge. The usual causes are a
pasted-in image with no `max-width: 100%`, or a very long unbroken word.

**The tabs disappeared.** They are hidden until the script loads. If they never
appear, `assets/js/boundr.js` is not being found — check the path in the
`<head>` and look at the browser console (<kbd>F12</kbd>) for a 404.

**Something animates that I turned off.** `data-motion` is on the `<html>` tag,
not `<body>`. Check you edited the right line.

---

Anything not covered here: iveriontechnologies@gmail.com

Boundr Landing v1.0.0 — © 2026 Iverion Technologies
