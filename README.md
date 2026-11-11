<p align="center">
  <img src="assets/logo/nabla-square-lockup-tagline.svg" alt="Nabla Square — AI Consultancy" width="320">
</p>

<h1 align="center">nabla2ai.github.io</h1>

<p align="center">
  The website for <strong>Nabla Square</strong> — practical AI consultancy, workshops and training.<br>
  Static HTML, CSS and vanilla JavaScript. No build step, no dependencies, no tracking.
</p>

---

## What's here

A single-page marketing site covering the five things Nabla Square does:

1. **AI tools, chosen and set up properly** — tool selection, pilots, rollout, data rules
2. **Understanding where productivity goes** — workflow mapping, automation review, before/after measurement
3. **Coding and debugging know-how** — scripting, reading code, fixing what breaks
4. **Seminars and workshops** — briefings, hands-on sessions, clinics
5. **Skill development programmes** — Foundation → Practitioner → Advanced

Plus the brand assets: a full logo set in SVG, PNG exports, favicons and a social card.

## Features

- Responsive from 320px up, with no horizontal scroll
- Light and dark themes — follows the OS by default, remembered per visitor
- Accessible: skip link, labelled fields, visible focus rings, `prefers-reduced-motion` respected
- SEO: Open Graph and Twitter cards, JSON-LD `ProfessionalService` schema, sitemap, robots
- Installable as a PWA-style app via `site.webmanifest`
- Contact form works with no backend (composes an email), and can be pointed at a form service in one line

## Project structure

```
.
├── index.html                  # the entire page
├── favicon.ico
├── site.webmanifest
├── robots.txt
├── sitemap.xml
├── .nojekyll                   # serve files as-is, skip Jekyll
├── assets/
│   ├── css/styles.css          # design tokens + all components
│   ├── js/main.js              # theme, nav, reveal, scroll spy, form
│   ├── img/og-image.png        # 1200×630 social card
│   └── logo/
│       ├── nabla-square-icon.svg               # the mark, on its own
│       ├── nabla-square-icon-mono-dark.svg
│       ├── nabla-square-icon-mono-light.svg
│       ├── nabla-square-lockup.svg             # mark + wordmark, light bg
│       ├── nabla-square-lockup-dark.svg        # mark + wordmark, dark bg
│       ├── nabla-square-lockup-tagline.svg
│       ├── nabla-square-lockup-tagline-dark.svg
│       ├── nabla-square-lockup-mono-dark.svg
│       ├── nabla-square-lockup-mono-light.svg
│       ├── nabla-square-stacked.svg            # vertical lockup
│       ├── nabla-square-stacked-dark.svg
│       ├── favicon.svg
│       ├── alt/                                # the ∇² alternate mark
│       └── png/                                # 1024, 512, 192, apple-touch, favicons
└── .github/workflows/pages.yml # deploy to GitHub Pages on push to main
```

All wordmark text is converted to outlines, so the logo files render identically
everywhere and need no font installed.

## Running it locally

There is nothing to install. Any static server will do:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` straight from the file system also works, though the
manifest and a few relative paths behave better over HTTP.

## Deploying

The repository is named `nabla2ai.github.io`, so GitHub Pages serves it at
**https://nabla2ai.github.io** from the root of `main`.

Two ways to publish — pick one:

**A. Deploy from a branch (simplest)**
Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.

**B. Deploy via Actions**
Settings → Pages → Source: *GitHub Actions*. The included
`.github/workflows/pages.yml` then publishes on every push to `main`.

### Using a custom domain

1. Add a file called `CNAME` at the repo root containing just your domain, e.g. `nablasquare.co.uk`
2. Point a `CNAME` DNS record at `nabla2ai.github.io` (or `A` records at GitHub's IPs for an apex domain)
3. Settings → Pages → Custom domain, then tick **Enforce HTTPS**
4. Update the absolute URLs listed in the checklist below

## Before you go live — checklist

These are placeholders. Search and replace each one.

| Placeholder | Where | Replace with |
|---|---|---|
| `hello@nablasquare.co.uk` | `index.html` (contact, footer, JSON-LD), `assets/js/main.js` (`INBOX`) | Your real enquiries address |
| `https://nabla2ai.github.io/` | `index.html` (canonical + Open Graph), `sitemap.xml`, `robots.txt` | Your live URL, if you add a custom domain |
| Session counts and group sizes | `index.html` → Training section | Your actual programme shapes |
| "reply within two working days" | `index.html` → Contact | Whatever you can actually commit to |
| `lastmod` date | `sitemap.xml` | The date you publish |

Everything else — claims, credentials, client names, statistics — was deliberately
left out rather than invented. Add them once they are true.

### Pointing the form at a real inbox service

The form composes a `mailto:` link by default, which needs no backend but does
depend on the visitor having an email client. To use a form service instead, give
the form an `action` (and `method`) — the JavaScript handler stands down
automatically when it sees one:

```html
<form class="form" id="contactForm" action="https://formspree.io/f/YOUR_ID" method="POST">
```

## Editing the site

- **Colours, spacing, radii, type** — the `:root` block at the top of `assets/css/styles.css`. Dark theme values live in the `:root[data-theme="dark"]` block directly below.
- **Copy** — all of it is in `index.html`, in the order it appears on the page.
- **Sections** — each is a `<section>` with an `id`; the nav, scroll spy and footer links all key off those ids, so renaming one means updating the `href`s too.

See [BRAND.md](BRAND.md) for logo usage, colour values and type.

## Browser support

Current versions of Chrome, Edge, Firefox and Safari, plus iOS and Android.
Uses `color-mix()`, `backdrop-filter`, CSS grid and `IntersectionObserver`;
older browsers get a plainer but fully readable page.

## Licence

Source code is released under the [MIT Licence](LICENSE).

The **Nabla Square name, logo and brand assets** in `assets/logo/` and
`assets/img/` are excluded from that licence and remain the property of
Nabla Square. Please don't reuse them for anything other than Nabla Square.
