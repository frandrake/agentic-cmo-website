# DESIGN.md

> Visual system of record for the-agentic-cmo.com, generated from the codebase
> (`src/styles/global.css`, layout, and components). Follows the Google Stitch DESIGN.md format.
> Source of truth for tokens is `src/styles/global.css`; this file documents intent.

## Visual theme

**"The Milanese Futurist" — Italian design heritage meets AI precision.** Light, editorial, and
typographic: a cool off-white page, charcoal text, slate-blue serif headlines, and a single
vermillion accent. Hairline rules and generous vertical rhythm over cards and shadows. The mood is a
modernist print magazine, not a software dashboard. Light mode only (no dark theme).

## Color palette

Defined as semantic tokens over a small raw palette in `src/styles/global.css`.

| Role | Token | Value | Notes |
|------|-------|-------|-------|
| Page background | `--bg` | `#F8F9FA` (cool white) | |
| Inverse background | `--bg-inverse` | `#4A5E7C` (slate blue) | |
| Sunken / hover surface | `--surface-sunken` / `--surface-hover` | `#F1F2F4` (mist) | placeholders + card hover |
| Body text | `--fg` | `#2B2D30` (charcoal) | 13.1:1 on bg |
| Muted text | `--fg-muted` | `#5A5C60` | 6.36:1 on bg |
| Display / headings | `--fg-display` | `#4A5E7C` (slate blue) | 6.26:1 on bg |
| Accent | `--fg-accent` | `#E63946` (vermillion) | display/large + button fills |
| Secondary/label text | `--ff-steel-blue` | `#586A7E` | small eyebrows, labels, mono-nums — 5.27:1 (AA) |
| Link / inline emphasis | `--link` | `#C22A36` (vermillion-d) | 5.42:1 (AA) for body-size text |
| Border | `--border` / `--border-strong` | `#D8D9DA` / charcoal | |

**Accent discipline:** bright vermillion `#E63946` is reserved for large/display text, primary
button fills, and `::selection` (where AA passes at ≥3:1). Body-size links and small kickers use the
darker `#C22A36` so all text clears WCAG AA 4.5:1.

## Typography

- **Display / headings:** `Crimson Pro` (variable serif, 200–900), via `--font-serif`. Fallbacks:
  Libre Baskerville, Georgia.
- **Body / UI:** `Inter` (variable, 100–900), via `--font-sans`. Fallbacks: Lexend, system.
- **Mono / data:** `JetBrains Mono` stack, via `--font-mono` — used for numbers, labels, `MonoNum`.
- Pairing is on a **contrast axis** (serif display + sans body), not two lookalike sans-serifs.
- Fonts are self-hosted and shipped as **WOFF2** (TTF fallback), `font-display: swap`; Crimson Pro
  and Inter upright are preloaded.

**Type scale** (`--fs-*`): h1 48 / h2 36 / h3 24 / h4 20 / body 16 / small 14 / eyebrow 12 px.
Hero/display headings are set larger inline (up to 72px) with tight tracking (`-0.025em`), within
Impeccable's display ceiling. Line-height: tight 1.1 (headings), body 1.6. `text-wrap: balance` on
headings, `pretty` on prose. Measure capped at `--measure: 68ch`.

## Components

- **Nav** — sticky top bar, logo + horizontal links, vermillion active/accent state; collapses to a
  toggle + serif mobile menu under 880px.
- **Eyebrow** — small tracked-uppercase kicker (steel-blue / charcoal / vermillion-d variants). Used
  deliberately, not above every section.
- **Buttons** (`.btn`) — charcoal default, `--accent` (vermillion), `--secondary`, `--ghost`; 2px
  border, 2px radius, `--lg` / `--sm` sizes.
- **BookCover, AwardBadge, MonoNum, Rule, ContactRow, Logo** — small presentational pieces over the
  token system.
- **React islands:** `CitedForm` (email → PDF gate, with `:focus-visible` rings and `aria-live`
  status), `PromptList` (filterable prompts), `NewsletterInline`.

## Layout

- Centered shell `.site`: max-width `--container` 1280px, side padding 48px (24px on mobile).
- Section rhythm via a recurring asymmetric grid: `5fr 7fr`, `4fr 8fr`, `7fr 5fr` (sticky label
  column + content column), collapsing to a single column under 880px.
- **Spacing** on an 8px grid: `--space-1..6` = 8 / 16 / 32 / 64 / 96 / 128px.
- **Radii/borders:** `--radius` 2px, hairline 1px / strong 2px borders. Minimal, sharp.
- **Z-index:** small semantic values (skip-link 100, sticky header 50, nav 50).

## Motion

Restrained: 0.2s/0.3s ease transitions on color/background/border; an 0.18s page-fade on `<main>`.
No layout-property animation as a rule. A global `@media (prefers-reduced-motion: reduce)` block
neutralizes smooth scroll, the page-fade, and transitions.

## Accessibility baseline

WCAG AA contrast across body and small text; skip link; `:focus-visible` outlines globally and on
form controls; labelled inputs; `aria-live` form status; `prefers-reduced-motion` honored; print
styles. Language `en-GB`.
