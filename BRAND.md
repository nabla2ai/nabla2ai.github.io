# Nabla Square — brand guide

## The mark

The logo is the **nabla operator (∇) knocked out of a rounded square** — the name,
drawn. Nabla is the gradient operator: the direction of steepest improvement. That
is the whole proposition in one glyph, and the square is the frame the work happens in.

The triangle is negative space, not a drawn shape. It takes its colour from whatever
sits behind the logo, which is why the mark works on photographs and coloured panels
as well as on white.

### Files

| File | Use |
|---|---|
| `nabla-square-icon.svg` | The mark alone — avatars, app icons, anywhere the name is already present |
| `nabla-square-lockup.svg` | Primary lockup, light backgrounds |
| `nabla-square-lockup-dark.svg` | Primary lockup, dark backgrounds |
| `nabla-square-lockup-tagline.svg` | With "AI Consultancy" — document covers, footers, signatures |
| `nabla-square-lockup-tagline-dark.svg` | As above, dark backgrounds |
| `nabla-square-stacked.svg` | Vertical lockup — square formats, merchandise, title slides |
| `nabla-square-lockup-mono-dark.svg` | One colour, for print or embroidery |
| `nabla-square-lockup-mono-light.svg` | One colour reversed, for dark print |
| `favicon.svg` | Browser tab — a slightly tighter corner radius so it survives 16px |
| `png/` | Raster exports: 1024, 512, 192, apple-touch 180, favicons 48/32/16 |
| `alt/` | The ∇² alternate mark, for places where the maths reference is worth making explicit |

The wordmark is set in **Outfit Bold** and converted to outlines in every SVG, so
nothing depends on a font being installed.

## Rules

**Do**

- Keep clear space around the lockup of at least the height of the mark's corner radius — roughly a quarter of the mark's height on every side
- Use the dark-background variants on anything darker than about 40% grey
- Scale the whole lockup proportionally
- Use the mark on its own once the name is established in context

**Don't**

- Re-colour the gradient, or fill the triangle in
- Rotate, skew, outline or add effects to the mark
- Set the wordmark in a different typeface, or re-space it
- Place the gradient lockup on a busy photograph — use the monochrome variants
- Reproduce the full lockup below 120px wide, or the mark below 16px

## Minimum sizes

| Asset | Minimum |
|---|---|
| Mark alone | 16px (use `favicon.svg` at 16–32px) |
| Horizontal lockup | 120px wide |
| Lockup with tagline | 180px wide |
| Stacked lockup | 90px wide |

## Colour

The brand gradient runs indigo → cyan at 135°.

| Token | Hex | Use |
|---|---|---|
| Indigo Deep | `#4338CA` | Gradient start, primary buttons |
| Indigo | `#4F46E5` | Primary brand colour, links, accents |
| Indigo Lift | `#6366F1` | Hover states |
| Cyan | `#22D3EE` | Gradient end, accents on dark |
| Cyan Ink | `#0E7490` | Cyan dark enough for text on white |
| Ink | `#0B1020` | Body text, dark surfaces |
| Muted | `#5B6478` | Secondary text |
| Line | `#E3E6EF` | Borders, rules |
| Paper | `#FFFFFF` | Light background |

Dark theme substitutes `#818CF8` for Indigo and `#67E8F9` for Cyan Ink so that
text keeps its contrast against dark surfaces. Both palettes clear WCAG AA for
body text.

```css
/* The brand gradient */
background: linear-gradient(135deg, #4338CA 0%, #4F46E5 55%, #22D3EE 100%);
```

## Typography

| Role | Typeface | Weights |
|---|---|---|
| Headings, wordmark, UI labels | **Outfit** | 500, 600, 700 |
| Body, forms, long copy | **Inter** | 400, 500, 600, 700 |
| Code, numerals, small labels | System monospace stack | 400, 600 |

Both are open source (SIL Open Font Licence) and available on Google Fonts.
Headings are tracked slightly tight (`-0.021em`); the eyebrow and tagline labels
run wide (`0.12em`) in uppercase.

## Voice

Plain, specific, and unimpressed by hype. Short sentences. British spelling.
Say what something is and what it costs in effort, not what it could
revolutionise. Where a claim can't be backed, leave it out — an empty space is
more credible than a number nobody can source.
