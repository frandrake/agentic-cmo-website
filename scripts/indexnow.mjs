import { readFile, access } from "node:fs/promises";
import { resolve } from "node:path";

const HOST = "the-agentic-cmo.com";
const KEY = "8a1c97a48d214a1db340d863e5a2d022";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = resolve("dist", "sitemap-0.xml");
const ENDPOINT = "https://api.indexnow.org/IndexNow";

async function fileExists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

function extractUrls(xml) {
  const urls = [];
  const re = /<loc>([^<]+)<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    urls.push(m[1].trim());
  }
  return urls;
}

async function main() {
  if (!(await fileExists(SITEMAP_PATH))) {
    console.log(`[indexnow] ${SITEMAP_PATH} not found — skipping submission.`);
    return;
  }

  const xml = await readFile(SITEMAP_PATH, "utf8");
  const urlList = extractUrls(xml);

  if (urlList.length === 0) {
    console.log("[indexnow] No <loc> entries in sitemap — skipping.");
    return;
  }

  const body = { host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList };

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      body: JSON.stringify(body),
    });
    const text = await res.text().catch(() => "");
    console.log(`[indexnow] submitted ${urlList.length} URLs — HTTP ${res.status}${text ? ` — ${text}` : ""}`);
  } catch (err) {
    console.log(`[indexnow] submission failed (non-fatal): ${err?.message ?? err}`);
  }
}

main().catch((err) => {
  console.log(`[indexnow] unexpected error (non-fatal): ${err?.message ?? err}`);
});
