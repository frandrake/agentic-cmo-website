import { readFile, readdir } from "node:fs/promises";
import { extname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const canonicalLinkedIn = "https://www.linkedin.com/in/federicofrancesco/";
const errors = [];

async function read(path) {
  return readFile(join(root, path), "utf8");
}

async function sourceFiles(directory) {
  const entries = await readdir(join(root, directory), { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await sourceFiles(path));
    else if ([".astro", ".ts", ".tsx", ".txt"].includes(extname(entry.name))) files.push(path);
  }
  return files;
}

function assert(condition, message) {
  if (!condition) errors.push(message);
}

const [book, prompts, answers, schema, homepage, about, footer, robots, llms, llmsFull, config] = await Promise.all([
  read("src/data/book.ts"),
  read("src/data/prompts.ts"),
  read("src/data/answers.ts"),
  read("src/lib/schema.ts"),
  read("src/pages/index.astro"),
  read("src/pages/about.astro"),
  read("src/components/Footer.astro"),
  read("public/robots.txt"),
  read("public/llms.txt"),
  read("public/llms-full.txt"),
  read("astro.config.mjs"),
]);

const profilePattern = /https:\/\/(?:www\.)?linkedin\.com\/in\/[^\s"')<]+/gi;
const files = await sourceFiles("src");
files.push("public/llms.txt", "public/llms-full.txt");
for (const path of files) {
  const contents = await read(path);
  for (const match of contents.matchAll(profilePattern)) {
    if (match[0] !== canonicalLinkedIn) errors.push(`${relative(root, join(root, path))} contains non-canonical LinkedIn URL ${match[0]}`);
  }
}

const promptEntries = (prompts.match(/^\s+id:\s*["']/gm) || []).length;
assert(book.includes("chapterCount: 18"), "BOOK.chapterCount must be 18");
assert(book.includes("promptCount: 24"), "BOOK.promptCount must be 24");
assert(promptEntries === 24, `PROMPTS must contain 24 entries; found ${promptEntries}`);
assert(!book.includes("19 ·"), "the stale nineteenth chapter must not return");
assert(schema.includes('"datePublished": "2026-06"'), "second-edition Book.datePublished must be 2026-06");
assert(/eighteen-chapter.*twenty-four AI prompts/i.test(schema), "the public Book schema description must state eighteen chapters and twenty-four prompts");
assert(schema.includes(canonicalLinkedIn), "Person.sameAs must contain the canonical LinkedIn URL");
assert(schema.includes("https://books.google.com/books/about/The_Agentic_CMO.html?id=mskQ0gEACAAJ"), "Book.sameAs must contain Google Books");
assert(schema.includes("https://www.spglobal.com/en/research-insights/special-reports/look-forward"), "Person.subjectOf must contain the S&P Global Look Forward Council page");
assert(homepage.includes('href="/cited/"'), "Cited homepage CTA must point directly to /cited/");
assert(footer.includes('href="/cited/"'), "Cited footer link must point directly to /cited/");
assert(/second edition June 2026/i.test(`${llms}\n${llmsFull}`), "crawler documentation must state the June 2026 second edition");
assert(!/targeting June 2026/i.test(`${llms}\n${llmsFull}`), "crawler documentation must not describe publication as a target");
for (const crawler of ["ChatGPT-User", "Claude-User"]) {
  assert(robots.includes(`User-agent: ${crawler}`), `robots.txt must explicitly allow ${crawler}`);
}
const generatedSlugs = [...answers.matchAll(/^\s+slug:\s*'([^']+)'/gm)].map((match) => match[1]);
for (const slug of generatedSlugs) {
  assert(about.includes(`href="/${slug}/"`), `About must contextually link to /${slug}/`);
}
assert(!config.includes("lastmod: new Date()"), "sitemap config must not assign build-time lastmod");

if (errors.length) {
  console.error(`Entity consistency check failed:\n- ${errors.join("\n- ")}`);
  process.exit(1);
}

console.log("Entity consistency check passed.");
