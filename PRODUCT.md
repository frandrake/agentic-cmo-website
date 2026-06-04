# PRODUCT.md

> Strategic context for [Impeccable](https://github.com/pbakaus/impeccable) and other design work.
> Inferred from the codebase (README, `src/data/book.ts`, `src/pages/about.astro`) — refine freely;
> the author's intent wins over anything inferred here.

## Register

**Brand.** This is a marketing site for a book — design *is* the product. Every surface exists to
build credibility and convert a reader to buy the book, download the free *Cited* sample, or
subscribe to the *Chronicles of Change* newsletter. Optimize for first impression, trust, and
typographic voice over dense UI affordances.

## Product purpose

The promotional site for **_The Agentic CMO_ (Second Edition)** by Francesco Federico — a field
manual for marketing leaders running organisations that include AI agents on the team. The site:

- Presents the book's thesis and five anchor concepts, and routes to retailers (Amazon, Barnes &
  Noble, Kobo, Apple Books).
- Hosts the free, filterable library of **24 "Activate This" prompts** (`/prompts`).
- Gates a free PDF sample (*Cited*) behind a light email capture (`/cited`), delivered via Resend.
- Carries the author bio and credibility markers (`/about`), plus FAQ and privacy.

Built with **Astro 5** (static) + **React 18** islands, deployed to **Cloudflare Pages** with a
Functions email endpoint and KV for captures/rate-limiting.

## Target users

- **CMOs and senior marketing leaders** evaluating whether the book is worth their time — time-poor,
  credibility-driven, scanning for proof the author operates at their level.
- **Founders and senior consultants** in marketing/AI looking for an operating model, not vendor hype.
- **Practitioners** who arrive for the free prompts or sample chapter and may convert to buyers or
  newsletter subscribers.
- Reached largely via LinkedIn, search, and AI answer engines (the site is GEO-optimized:
  structured data, FAQ written for citation, hreflang, sitemap).

## Brand personality

Three words: **authoritative, precise, Italian-modernist.** The internal codename in the CSS is
*"The Milanese Futurist — Italian design heritage meets AI precision."* The voice is a senior
practitioner's: declarative, specific, confident, unsentimental ("find the constraint, apply
technology, measure the result"). Editorial, not promotional. Serif headlines carry gravitas; the
single vermillion accent carries conviction.

## Anti-references (what this must NOT look like)

- **SaaS / AI-startup landing pages** — gradient heroes, cream/sand "warm minimal" palettes, pill
  badges, hero-metric templates, identical icon-card grids. The book is *about* AI but must not look
  like an AI product.
- **Vendor marketing** — buzzword copy (streamline / supercharge / unleash / seamless). The author
  explicitly positions the book as "not a vendor's roadmap."
- **Generic author/Gumroad book pages** — busy testimonial walls, countdown timers, hard-sell CTAs.

## Strategic design principles

1. **Typography is the brand.** A serif/sans contrast pairing and a strong scale do the heavy
   lifting; restraint over decoration.
2. **One accent, used with conviction.** Vermillion marks the few things that matter (primary CTAs,
   live "voice" moments), never as ambient decoration.
3. **Editorial restraint.** Generous whitespace, hairline rules, a 12-column-feeling grid. Let the
   credibility (roles, awards, results) speak plainly.
4. **Credibility first.** Concrete proof (S&P Global, measured results, named awards) over adjectives.
5. **Accessible by default.** Body text and small labels must clear WCAG AA contrast; motion respects
   `prefers-reduced-motion`; forms announce their status. (Enforced as of the 2026-06 a11y pass.)
