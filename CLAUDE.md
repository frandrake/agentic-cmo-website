# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Inherits the global rules in `/root/CLAUDE.md` (tone, autonomy, stack defaults). This file covers
> only what's specific to this project. Complements `README.md`.

## What this is

Static marketing site for ***The Agentic CMO* (2nd edition)**. Astro 5 with React 18 interactive
islands, deployed as static assets to **Cloudflare Pages** (project `the-agentic-cmo`). Repo:
`github.com/frandrake/agentic-cmo-website`. It is an **SEO/LLM-first** site — keep that intact.

## Commands

```bash
npm install
npm run dev        # astro dev — http://localhost:4321
npm run build      # astro build → dist/  (postbuild runs scripts/indexnow.mjs for IndexNow ping)
npm run preview    # serve the built dist/ locally
```

There is **no `astro check` and no test script** here. `npm run build` is the only gate.

## Architecture

- **Output is `static`, no adapter.** Astro prerenders everything to `dist/`; Pages serves it.
- `src/pages/*` — routes: `index`, `about`, `cited`, `faq`, `prompts`, `privacy`, `404`.
- `src/components/` — React islands `CitedForm.tsx` (PDF gate form) and `PromptList.tsx`
  (filterable prompt list); the rest are `.astro` (Nav, Footer, BookCover, SchemaScript, …).
- `src/data/*.ts` — content as typed data, the single source for page copy and JSON-LD:
  `book.ts`, `cited.ts`, `faq.ts`, `prompts.ts` (the 24 prompts).
- `src/lib/schema.ts` — JSON-LD builders (Book / Person / FAQPage / CollectionPage / ProfilePage).
- `src/styles/global.css` — brand tokens (Slate Blue `#4A5E7C`, Cool White `#F8F9FA`,
  Charcoal `#2B2D30`, Vermillion `#E63946`); display **Crimson Pro**, body **Inter** (self-hosted
  in `public/fonts/`).

### The PDF gate (the one piece of server logic)

`functions/api/cited-request.ts` is a **Cloudflare Pages Function** (`POST /api/cited-request`),
*not* an Astro route. It validates the form, stores the capture in **KV namespace
`CITED_REQUESTS`**, **rate-limits 5 requests / IP / day**, and emails the PDF via **Resend**
(`RESEND_API_KEY` secret; `PDF_URL` / `FROM_EMAIL` are public vars). Bindings are declared in
`wrangler.toml`. Resend needs a verified sending domain.

## Deploy

Cloudflare Pages, project `the-agentic-cmo`, build output `dist/`, KV bound — **builds on push to
`main`**. `wrangler.toml` is the source of truth for vars/secrets/bindings.

## Conventions / gotchas

- `public/robots.txt` **deliberately allowlists AI crawlers** (GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, CCBot, …) and `public/llms.txt` / `llms-full.txt` exist — preserve them; they
  are the point of the site.
- Edit copy/data in `src/data/*.ts`, not inline in pages.
