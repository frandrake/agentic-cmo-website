# Impeccable Design Audit — the-agentic-cmo.com

**Date:** 2026-06-04
**Tool:** [Impeccable](https://github.com/pbakaus/impeccable) v3.5.0 (`audit` lens + deterministic detector)
**Scope:** All 7 pages, the shared layout, design tokens, components, and React islands.
**Method:** Impeccable's deterministic detector (`detect.mjs`) run over the production build (`dist/`),
plus a manual design review against the skill's anti-pattern rules, WCAG contrast math, and the
`audit` rubric (5 dimensions, scored 0–4).

> This is an **audit only** — no site source was changed. Findings are documented for follow-up
> `/impeccable` passes (see *Recommended Actions*).

---

## Audit Health Score

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | **2/4** | `--ff-steel-blue` text (eyebrows, labels, mono-nums) is 3.2:1 — fails WCAG AA |
| 2 | Performance | **3/4** | Fonts shipped as raw `.ttf`, not `.woff2`; one layout-property transition |
| 3 | Responsive Design | **3/4** | Solid breakpoints; a few sub-44px touch targets and fragile `!important` overrides |
| 4 | Theming | **3/4** | Strong token system, but page markup leans on hard-coded inline px values |
| 5 | Anti-Patterns | **3/4** | Avoids the big AI tells; subtle ones remain (em-dashes, eyebrow-on-every-section) |
| **Total** | | **14/20** | **Good — address the weak dimension (accessibility) first** |

**Rating band:** 14–17 = *Good (address weak dimensions)*. The foundation is genuinely strong;
the gap is concentrated in accessibility, and most of it is a handful of token-level fixes.

---

## Anti-Patterns Verdict

**Does this look AI-generated? Mostly no — and that's a real achievement.**

This site actively avoids the 2026 AI-slop signatures:

- **No "AI cream / sand / SaaS" palette.** It commits to a real identity — vermillion `#E63946`,
  slate blue `#4A5E7C`, charcoal `#2B2D30` on a cool off-white. This is the single biggest thing
  most AI designs get wrong, and this site gets it right.
- **No gradient text, no glassmorphism, no hero-metric template, no identical icon-card grids.**
- **Correct font pairing on a contrast axis:** Crimson Pro (serif display) + Inter (sans body),
  not two lookalike sans-serifs.
- **Contrast discipline on body copy:** the muted body color `#5A5C60` is 6.36:1, not the washed-out
  light-gray that plagues AI output.

The remaining tells are subtle, not structural:

1. **Em-dash overuse (the dominant tell).** The detector counts **64 em-dashes in rendered body
   copy** across the site (prompts: 26, faq: 13, about: 8, cited: 6, privacy: 6, index: 5). Impeccable
   treats `—` as an absolute-ban cadence marker. Pervasive, and the clearest "an LLM wrote this" signal.
2. **Eyebrow above nearly every section.** The homepage stacks a tracked-uppercase `<Eyebrow>` over
   *What's inside*, *From thinking to doing*, *About the author*, *Awards*, *Buy the book*, and
   *Keep reading*. One named kicker is voice; an eyebrow on every section is the AI editorial scaffold.
3. **Inter as the body face.** Inter is on Impeccable's "overused, no longer distinctive" list. The
   *pairing strategy* is right; only the specific body face is ubiquitous.

**Verdict: passes the "AI made that" test on structure and color; trips on copy cadence (em-dashes)
and section scaffolding (eyebrows). Both are cheap to fix.**

---

## Executive Summary

- **Audit Health Score: 14/20 (Good).**
- **Issues by severity:** P0: 0 · P1: 3 · P2: 5 · P3: 4
- **Top issues:**
  1. **[P1]** Low-contrast `--ff-steel-blue` text (3.2:1) on eyebrows, form labels, and mono-numbers — fails WCAG AA, and it's everywhere.
  2. **[P1]** Vermillion link/body text at 3.95:1 — just under the 4.5:1 AA threshold for body-size text.
  3. **[P1]** Form inputs strip the focus outline and signal focus by color alone; success/error states aren't announced to screen readers.
  4. **[P2]** No `prefers-reduced-motion` anywhere (page-fade + `scroll-behavior: smooth` ignore the preference).
  5. **[P2]** Em-dash overuse across all body copy (anti-pattern / brand-voice tell).
- **Recommended first move:** `/impeccable colorize` to lift the steel-blue and vermillion text
  tokens past 4.5:1 — one token change fixes the most widespread issue site-wide.

---

## Detailed Findings by Severity

### P1 — Major (fix before next release)

**[P1] Low-contrast secondary text (`--ff-steel-blue`, 3.2:1)**
- **Location:** `src/styles/global.css:46` (`--ff-steel-blue: #7D8E9E`), consumed by `.eyebrow` /
  `small` (`:162`), `.eyebrow-block` (`:258`), `.mono-num` (`:267`), `--fg-data` (`:58`); also the
  form field labels in `src/components/CitedForm.tsx:101` and `FORM № 01` at `:52`.
- **Category:** Accessibility.
- **Impact:** `#7D8E9E` on `#F8F9FA` is **3.2:1**. These are 11–12px (small) elements, which need
  **4.5:1**. Eyebrows, mono-numbers, and form labels are hard to read for low-vision users and fail
  WCAG 2.1 AA (1.4.3). Because the token feeds the eyebrow that sits above almost every section, the
  failure repeats across the whole site.
- **Recommendation:** Darken the role used for *text* (vs. decoration). A blue-gray around
  `#5E6E80`–`#52627A` clears 4.5:1 while staying on-hue. Keep `#7D8E9E` only for non-text strokes.
- **Suggested command:** `/impeccable colorize`

**[P1] Vermillion text/links below AA (3.95:1)**
- **Location:** `--link: var(--ff-vermillion)` (`src/styles/global.css:62`); inline vermillion links
  e.g. `src/pages/index.astro:85` (`/prompts`), `src/components/CitedForm.tsx:82` (privacy link).
- **Category:** Accessibility.
- **Impact:** `#E63946` on `#F8F9FA` is **3.95:1** — under 4.5:1 for body-size text. Links and inline
  emphasis set in vermillion at 15–16px fail AA. (Vermillion on large display headings is fine.)
- **Recommendation:** Use the darker `--ff-vermillion-d` (`#C22A36`) for *text-size* links/emphasis,
  or nudge the link token darker; reserve bright vermillion for ≥18px / bold display use.
- **Suggested command:** `/impeccable colorize`

**[P1] Form focus + status not accessible**
- **Location:** `src/components/CitedForm.tsx` — `FormInput` sets `outline: 'none'` and swaps
  `borderColor` on focus (`:118–121`); error `<p>` (`:76–78`) and the success block (`:33–45`) have
  no `aria-live` / `role`; `FormSelect` has no focus style at all (inconsistent with the inputs).
- **Category:** Accessibility.
- **Impact:** Keyboard focus is communicated by **color alone** (charcoal→vermillion border), which
  fails users who can't perceive the change and is inconsistent across controls. Screen-reader users
  get no announcement when the request succeeds or errors (WCAG 4.1.3 Status Messages).
- **Recommendation:** Keep a visible focus ring (reuse the global `:focus-visible` outline instead of
  `outline: none`); add `role="alert"` / `aria-live="assertive"` to the error, `role="status"` /
  `aria-live="polite"` to the success state; give the select the same focus treatment as inputs.
- **Suggested command:** `/impeccable harden`

### P2 — Minor (fix in next pass)

**[P2] No `prefers-reduced-motion` support**
- **Location:** `src/styles/global.css:115` (`scroll-behavior: smooth`), `:216–220` (`.page-fade`
  / `@keyframes fadeIn`), plus inline `transition` declarations throughout.
- **Category:** Accessibility / Motion. Impeccable treats reduced-motion as non-optional.
- **Recommendation:** Add a global `@media (prefers-reduced-motion: reduce)` block that neutralizes
  `scroll-behavior`, the page-fade, and transitions (instant/crossfade fallback).
- **Suggested command:** `/impeccable animate`

**[P2] Em-dash overuse in body copy**
- **Location:** Copy in `src/data/*.ts` (`faq.ts`, `book.ts`, `cited.ts`) and page bodies; 64
  occurrences in rendered text (detector). Highest density: `src/pages/prompts.astro` / `data/prompts.ts`.
- **Category:** Anti-Pattern / UX writing.
- **Impact:** Recognizable AI cadence; dilutes an otherwise specific, confident voice.
- **Recommendation:** Replace `—` with commas, colons, periods, or parentheses. This is editorial,
  so review per-sentence rather than blanket-replacing; some may be intentional brand voice.
- **Suggested command:** `/impeccable clarify`

**[P2] Fonts shipped as `.ttf`, not `.woff2`**
- **Location:** `src/styles/global.css:6–37` (`@font-face` → `.ttf`), preloads in
  `src/layouts/BaseLayout.astro:71–72`.
- **Category:** Performance.
- **Impact:** Variable TTFs are ~40% larger than WOFF2 and are render-critical (preloaded). Slower
  first paint, especially on mobile (Casey persona).
- **Recommendation:** Convert the four variable fonts to WOFF2 (optionally subset to Latin); update
  `@font-face` and the preloads. Drop the redundant duplicate `src` URL pointing at the same `.ttf`.
- **Suggested command:** `/impeccable optimize`

**[P2] Hard-coded inline values bypass the token system**
- **Location:** Page markup throughout — e.g. `src/pages/index.astro` uses inline `font-size: 72px`
  (`:28`), `40px` (`:50, :76, :182`), `22px`, `15px`; a raw hex `#F1F2F4` in inline JS hover
  (`:159–160, :193–194, :206–207`).
- **Category:** Theming / Consistency.
- **Impact:** The strong `--fs-*` type scale and color tokens in `global.css` are partly bypassed at
  the page layer, so the scale isn't the single source of truth and the hover hex isn't themeable.
- **Recommendation:** Promote recurring inline values to tokens/utility classes; add the hover gray
  to the palette (e.g. `--surface-hover`) and drive it via CSS `:hover` instead of inline `onmouseover`.
- **Suggested command:** `/impeccable layout`

**[P2] Sub-44px touch targets in navigation**
- **Location:** `src/components/Nav.astro:40–45` (desktop nav links, 14px + 4px padding) and the
  mobile menu links `:67–71`.
- **Category:** Responsive.
- **Impact:** Tap targets fall short of the 44×44 guideline on touch devices.
- **Recommendation:** Add vertical padding / min-height to the tappable links (especially mobile menu).
- **Suggested command:** `/impeccable adapt`

### P3 — Polish (nice to fix)

- **[P3] Eyebrow above nearly every section** — `src/pages/index.astro` (`Eyebrow` on 6 sections).
  Vary the section cadence so the kicker is deliberate, not reflexive. → `/impeccable typeset`
- **[P3] Layout-property transition** — detector flags `transition: margin-top` rendered on
  `/cited` (animates layout, not `transform`). Prefer `transform`/`opacity`. → `/impeccable optimize`
- **[P3] Inter as body face** — distinctive enough via the serif, but a less ubiquitous body sans
  would lift originality. Low priority. → `/impeccable typeset`
- **[P3] `single-font` detector warnings (false positive)** — flagged on 404/about/faq/privacy
  because those text-light pages only declare `var(--font-serif)` inline; body still inherits Inter
  from `global.css`. No action needed beyond reducing inline font declarations.

---

## Patterns & Systemic Issues

1. **One low-contrast token, repeated everywhere.** The single biggest accessibility win is editing
   *one* color role (`--ff-steel-blue` as text) — it cascades to every eyebrow, label, and mono-number.
2. **Inline styling at the page layer.** A robust token system exists in `global.css`, but pages
   re-declare sizes/colors inline. Pulling these back into tokens/classes would make the design system
   the real source of truth and shrink the markup.
3. **Motion shipped without the reduced-motion counterpart.** Small, but it's a blanket gap rather
   than a one-off.

---

## Positive Findings (keep these)

- **Committed brand identity** — vermillion / slate-blue / charcoal on cool-white. No AI-default palette.
- **Excellent base-text contrast** — body 13.1:1, muted body 6.36:1, headings 6.26:1. Well clear of AA.
- **Correct type pairing** — serif display + sans body on a real contrast axis; hero at 72px with
  `-0.025em` tracking sits inside Impeccable's display ceilings.
- **Real a11y scaffolding already present** — skip link, `lang="en-GB"`, `:focus-visible` outlines,
  labels wrapping inputs, `aria-expanded`/`aria-controls` on the mobile toggle, print styles.
- **Lean, fast architecture** — static Astro, two small React islands, lazy/`async`-decoded images.
- **Specific, jargon-light copy** — largely free of the streamline/empower/supercharge buzzword family.

---

## Recommended Actions (priority order)

1. **[P1] `/impeccable colorize`** — lift `--ff-steel-blue` (text use) and the vermillion link token
   past 4.5:1. Single highest-impact change; fixes the most widespread issue site-wide.
2. **[P1] `/impeccable harden`** — restore visible focus rings on form controls and add `aria-live`
   to the Cited form's success/error states.
3. **[P2] `/impeccable animate`** — add a `prefers-reduced-motion` fallback for page-fade, smooth
   scroll, and transitions.
4. **[P2] `/impeccable clarify`** — reduce em-dash density in the marketing copy and data files.
5. **[P2] `/impeccable optimize`** — convert fonts to WOFF2, drop the duplicate `@font-face` src,
   replace the `margin-top` transition with `transform`.
6. **[P2] `/impeccable layout`** — promote hard-coded inline px/hex into tokens and utility classes.
7. **[P3] `/impeccable typeset`** — vary the per-section eyebrow cadence; reconsider the body face.
8. **`/impeccable polish`** — final pass once the above land.

> Run these one at a time or in any order. Re-run `/impeccable audit` after fixes to watch the score
> climb (the accessibility dimension should jump from 2 → 4 after steps 1–3 alone).

### Note on setup
This run was done without `PRODUCT.md` / `DESIGN.md`. Running **`/impeccable init`** once would let
future commands load brand/audience context and generate project-specific critique personas, making
the `critique` and `polish` passes sharper.
