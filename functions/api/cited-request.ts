// Cloudflare Pages Function — POST /api/cited-request
// Validates form data, stores in KV, sends the PDF via Resend.
// Required env vars (set in Cloudflare Pages dashboard or wrangler.toml):
//   - RESEND_API_KEY: Resend API key (re_...)
//   - FROM_EMAIL: e.g. "Cited <cited@the-agentic-cmo.com>"
//   - PDF_URL: e.g. "https://the-agentic-cmo.com/pdfs/cited.pdf"
//   - HMAC_SECRET: random string used for double-submit cookie / honeypot
// Optional bindings:
//   - CITED_REQUESTS: KV namespace for storing request records

interface Env {
  RESEND_API_KEY: string;
  FROM_EMAIL: string;
  PDF_URL: string;
  HMAC_SECRET?: string;
  CITED_REQUESTS?: KVNamespace;
}

interface RequestBody {
  email?: string;
  role?: string;
  problem?: string;
  // Honeypot — bots will fill this; humans won't see it.
  website?: string;
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let body: RequestBody;
  try {
    body = (await request.json()) as RequestBody;
  } catch {
    return json({ error: 'Invalid request body.' }, 400);
  }

  // Honeypot — silently 200 so the bot thinks it succeeded.
  if (body.website) return json({ ok: true }, 200);

  const email = (body.email ?? '').trim().toLowerCase();
  const role = (body.role ?? '').trim().slice(0, 200);
  const problem = (body.problem ?? '').trim().slice(0, 200);

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Please provide a valid email address.' }, 400);
  }

  // Rate-limit by IP if KV bound — soft, single-day cap of 5 requests per IP.
  if (env.CITED_REQUESTS) {
    const ip = request.headers.get('cf-connecting-ip') || 'unknown';
    const key = `rl:${ip}:${new Date().toISOString().slice(0, 10)}`;
    const count = parseInt((await env.CITED_REQUESTS.get(key)) || '0', 10);
    if (count >= 5) {
      return json({ error: 'Too many requests today. Try again tomorrow.' }, 429);
    }
    await env.CITED_REQUESTS.put(key, String(count + 1), { expirationTtl: 60 * 60 * 24 * 2 });
  }

  // Persist record (12-month TTL) — for analytics and follow-up cadence.
  if (env.CITED_REQUESTS) {
    const id = crypto.randomUUID();
    const record = {
      id,
      email,
      role,
      problem,
      createdAt: new Date().toISOString(),
      ip: request.headers.get('cf-connecting-ip') || null,
      userAgent: request.headers.get('user-agent') || null,
      country: request.headers.get('cf-ipcountry') || null,
    };
    await env.CITED_REQUESTS.put(`req:${id}`, JSON.stringify(record), {
      expirationTtl: 60 * 60 * 24 * 365,
      metadata: { email },
    });
    // Also index by email so we can dedupe / look up
    await env.CITED_REQUESTS.put(`email:${email}`, id, {
      expirationTtl: 60 * 60 * 24 * 365,
    });
  }

  // Send the PDF link via Resend
  const subject = 'Cited. — your free copy';
  const html = renderEmailHtml(env.PDF_URL);
  const text = renderEmailText(env.PDF_URL);

  const resp = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env.FROM_EMAIL,
      to: [email],
      subject,
      html,
      text,
      reply_to: 'francesco@the-agentic-cmo.com',
      tags: [{ name: 'category', value: 'cited-pdf' }],
    }),
  });

  if (!resp.ok) {
    const errText = await resp.text().catch(() => '');
    console.error('Resend error', resp.status, errText);
    return json({ error: 'Could not send the manual right now. Please try again or email francesco@the-agentic-cmo.com.' }, 502);
  }

  return json({ ok: true }, 200);
};

function json(data: unknown, status: number) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      'Access-Control-Allow-Origin': 'https://the-agentic-cmo.com',
    },
  });
}

function renderEmailHtml(pdfUrl: string) {
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>Cited.</title></head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif; color: #2B2D30; line-height: 1.6; max-width: 560px; margin: 0 auto; padding: 32px 24px;">
  <p style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: #E63946; font-weight: 500;">A field manual from The Agentic CMO</p>
  <h1 style="font-family: Georgia, 'Times New Roman', serif; font-size: 36px; color: #4A5E7C; margin: 16px 0 24px; font-weight: 700;">Cited.</h1>
  <p>Thank you for requesting Cited.</p>
  <p>You'll find the PDF here:</p>
  <p style="margin: 24px 0;">
    <a href="${pdfUrl}" style="display: inline-block; background: #E63946; color: #F8F9FA; padding: 14px 28px; text-decoration: none; font-weight: 500; border: 2px solid #E63946;">Download Cited (PDF) →</a>
  </p>
  <p style="font-size: 14px; color: #5A5C60;">Cited is redistributable within your organisation. If you find it useful, the full argument is in <a href="https://the-agentic-cmo.com/" style="color: #E63946;">The Agentic CMO</a>, published June 2026.</p>
  <hr style="border: 0; border-top: 1px solid #D8D9DA; margin: 32px 0;">
  <p style="font-size: 12px; color: #5A5C60;">Francesco Federico · Global CMO, S&amp;P Global · <a href="https://the-agentic-cmo.com/" style="color: #5A5C60;">the-agentic-cmo.com</a></p>
</body></html>`;
}

function renderEmailText(pdfUrl: string) {
  return `Thank you for requesting Cited.

You'll find the PDF here:
${pdfUrl}

Cited is redistributable within your organisation. If you find it useful, the full argument is in The Agentic CMO, published June 2026: https://the-agentic-cmo.com/

Francesco Federico
Global Chief Marketing Officer
https://the-agentic-cmo.com/`;
}
