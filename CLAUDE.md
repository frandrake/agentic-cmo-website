# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Inherits the global rules in `/root/CLAUDE.md` (tone, autonomy, stack defaults). This file covers
> only what's specific to this project. Deeper context lives in `README.md`, `PRODUCT.md` (strategy
> and brand voice), and `DESIGN.md` (the visual system).

## What this is

Static marketing site for ***The Agentic CMO* (2nd edition)** by Francesco Federico. Astro 5 with
React 18 islands, deployed as static assets to **Cloudflare Pages** (project `the-agentic-cmo`).
Repo: `github.com/frandrake/agentic-cmo-website`. Two non-negotiable framings: **design *is* the
product** (the site sells the book, the free *Cited* PDF sample, and the *Chronicles of Change*
newsletter), and it is **SEO/LLM-first** (structured data + an explicit AI-crawler allowlist).

## Commands

```bash
npm install
npm run dev        # astro dev — http://localhost:4321
npm run build      # astro build → dist/  (postbuild runs scripts/indexnow.mjs for IndexNow ping)
npm run preview    # serve the built dist/ locally
```

No `astro check` / test script — `npm run build` is the only gate.

## Architecture

- **Output is `static`, no adapter.** Astro prerenders everything to `dist/`; Pages serves it.
  Site language is `en-GB`.
- `src/pages/*` — routes: `index`, `about`, `cited`, `faq`, `prompts`, `privacy`, `404`.
- `src/components/` — three React islands: `CitedForm.tsx` (PDF gate), `PromptList.tsx` (filterable
  prompts), `NewsletterInline.tsx`; the rest are presentational `.astro` (Nav, Footer, BookCover,
  AwardBadge, Eyebrow, MonoNum, Rule, ContactRow, Logo, SchemaScript).
- `src/data/*.ts` — content as typed data, the single source for page copy and JSON-LD: `book.ts`,
  `cited.ts`, `faq.ts`, `prompts.ts` (the 24 prompts). **Edit copy here, not inline in pages.**
- `src/lib/schema.ts` — JSON-LD builders (Book / Person / FAQPage / CollectionPage / ProfilePage).
- `src/styles/global.css` — **the source of truth for design tokens** (semantic tokens over a small
  raw palette); `DESIGN.md` documents their intent. Fonts self-hosted in `public/fonts/` as **WOFF2**
  (TTF fallback, `font-display: swap`): Crimson Pro (display serif) + Inter (body); numbers/labels
  use a **JetBrains Mono** stack (`--font-mono`).

### The PDF gate (the one piece of server logic)

`functions/api/cited-request.ts` is a **Cloudflare Pages Function** (`POST /api/cited-request`),
*not* an Astro route. It validates the form, stores the capture in **KV namespace `CITED_REQUESTS`**,
**rate-limits 5 requests / IP / day**, and emails the PDF via **Resend** (`RESEND_API_KEY` secret;
`PDF_URL` / `FROM_EMAIL` are public vars). Bindings live in `wrangler.toml`. Resend needs a verified
sending domain.

## Design & copy — read PRODUCT.md + DESIGN.md before touching UI or copy

The "Milanese Futurist" system is documented in `DESIGN.md`; strategy, audience, and voice in
`PRODUCT.md`. UI/design work should go through the bundled **`impeccable` skill**
(`/impeccable <command>`, `.claude/skills/impeccable/SKILL.md`) — it loads those two docs as context.
The hard guardrails (the site must never read as "AI made that"):

- **Anti-references:** no SaaS/AI-startup landing-page look — no gradient heroes, cream/sand palettes,
  pill badges, hero-metric blocks, identical icon-card grids, an uppercase eyebrow above every
  section, or `01/02/03` section numbering; no countdown timers, testimonial walls, or hard-sell CTAs.
- **One accent, used with conviction:** vermillion `#E63946` for display/large text + primary button
  fills only; body-size links use the darker `#C22A36` so all text clears **WCAG AA** (4.5:1).
  Background is cool white `#F8F9FA` — **never pure white**.
- **Copy:** declarative, specific, editorial. No marketing buzzwords (streamline / supercharge /
  leverage / seamless / …), **no em dashes** (nor `--`), and avoid the aphoristic "statement, then
  punchy negation" cadence. Button labels are verb+object; link text must stand alone.
- **A11y & motion (enforced since the 2026-06 pass):** AA contrast, global `:focus-visible`, labelled
  inputs with `aria-live` status, and a `prefers-reduced-motion` alternative for every animation.

## Deploy

Cloudflare Pages, project `the-agentic-cmo`, build output `dist/`, KV bound — **builds on push to
`main`**. `wrangler.toml` is the source of truth for vars/secrets/bindings.

## Gotchas

- `public/robots.txt` **deliberately allowlists AI crawlers** (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, …) and `public/llms.txt` / `llms-full.txt` exist — preserve them; they're
  the point of an LLM-first site.
