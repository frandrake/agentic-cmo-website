# the-agentic-cmo.com

The book site for *The Agentic CMO* (Second Edition) by Francesco Federico. Astro 5 + React islands, deployed to Cloudflare Pages with a Functions-based PDF delivery endpoint.

## Stack

- **Astro 5** in static output mode (no adapter; Cloudflare Pages serves `dist/` and runs the `functions/` directory as Pages Functions for the email API)
- **React 18** for two islands: `CitedForm` (PDF gate) and `PromptList` (filtered prompts)
- **Design tokens** in `src/styles/global.css` (CSS custom properties; no Tailwind)
- **Resend** for transactional email delivery of the Cited PDF
- **Cloudflare KV** for storing email captures and rate-limiting

## Local development

```bash
npm install
npm run dev
```

Open http://localhost:4321.

## Build

```bash
npm run build
npm run preview
```

The build output is `dist/`. Cloudflare Pages picks up `dist/` automatically (configured in `wrangler.toml`).

## First-time deploy to Cloudflare Pages

1. **Create a GitHub repo** and push this directory.
2. **Connect the repo to Cloudflare Pages**: dashboard → Workers & Pages → Create → Pages → Connect to Git.
3. **Build settings**:
   - Framework preset: *Astro*
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/` (or `/site` if the repo contains other folders)
4. **Add the custom domain** `the-agentic-cmo.com` (and `www.` if desired) in the Custom Domains tab. Cloudflare sets up the SSL certificate automatically.
5. **Create the KV namespace** for the Cited form:
   ```bash
   npx wrangler kv:namespace create CITED_REQUESTS
   ```
   Update the `id` in `wrangler.toml` with the returned ID.
6. **Set environment variables and secrets** in Pages → Settings → Environment variables (Production):
   - `RESEND_API_KEY` (encrypted) — from https://resend.com/api-keys
   - `FROM_EMAIL` — `Cited <cited@the-agentic-cmo.com>` (must be a verified sending domain on Resend)
   - `PDF_URL` — `https://the-agentic-cmo.com/pdfs/cited.pdf`
7. **Bind the KV namespace** in Pages → Settings → Functions → KV namespace bindings: variable name `CITED_REQUESTS`, namespace = the one created above.
8. **Verify the sending domain on Resend**: add the DNS records they show you (SPF + DKIM + DMARC). Without this, emails go to spam.
9. Deploy. The site builds on every push to `main`.

## Email backend (`/api/cited-request`)

Defined in `functions/api/cited-request.ts`. POST a JSON body:

```json
{
  "email": "you@example.com",
  "role": "Head of Marketing",
  "problem": "Organic traffic is declining"
}
```

Validates, stores in KV (`CITED_REQUESTS`), rate-limits 5 requests per IP per day, then sends the Cited PDF link via Resend.

## Editing content

- **Book metadata**: `src/data/book.ts`
- **24 prompts**: `src/data/prompts.ts` (extracted from the Agentic CMO manuscript; the `body` is a placeholder — replace per-prompt as you finalise)
- **Cited chapters**: `src/data/cited.ts`
- **FAQ**: `src/data/faq.ts`
- **Privacy policy**: `src/pages/privacy.astro`
- **Footer / nav**: `src/components/Footer.astro` and `src/components/Nav.astro`

## SEO / GEO

- JSON-LD per page (Book, Person, FAQPage, CollectionPage, ProfilePage)
- Open Graph + Twitter Card meta on every page
- `public/robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Cohere, Meta-ExternalAgent, Bytespider
- `public/llms.txt` and `public/llms-full.txt` for the llms.txt convention
- Sitemap auto-generated at `/sitemap-index.xml` by `@astrojs/sitemap`
- Canonical URLs on every page

## Brand system

The Milanese Futurist palette and typography are defined in `src/styles/global.css`. The system uses Slate Blue (#4A5E7C), Cool White (#F8F9FA), Charcoal (#2B2D30), and Vermillion (#E63946) as accent. Crimson Pro (display) and Inter (body) are loaded from `/fonts/` as variable fonts.

## Assets

- `/public/assets/book-cover.png`: Agentic CMO cover
- `/public/assets/cited-cover.png`: Cited cover
- `/public/assets/author.jpg`: author portrait (optimised; used by the on-page `<img>` and Person schema)
- `/public/assets/og/`: 1200x630 Open Graph cards (`agentic-cmo`, `cited`, `author`)
- `/public/pdfs/cited.pdf`: the manual delivered by the form
- `/public/fonts/`: Crimson Pro and Inter variable fonts
