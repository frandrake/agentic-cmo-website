// Canonical book metadata. Edit here, propagates everywhere.
export const BOOK = {
  title: 'The Agentic CMO',
  subtitle: 'How Artificial Intelligence Is Rewriting the Rules of Marketing Leadership',
  edition: 'Second Edition',
  author: 'Francesco Federico',
  authorTitle: 'Global Chief Marketing Officer',
  pubDate: 'June 2026',
  pubDateMachine: '2026-06',
  pubDateOriginal: 'June 2025',
  pubDateOriginalMachine: '2025-06',
  isbnHardcover: '978-1-0676534-3-9',
  isbnPaperback: '978-1-0676534-1-5',
  isbnEbook: '978-1-0676534-4-6',
  chapterCount: 18,
  promptCount: 24,
  thesis: 'The age of marketing automation is ending. The era of marketing autonomy has begun.',
  subThesis:
    'A field manual for marketing leaders running organisations that include AI agents on the team. Written for CMOs, marketing leaders, founders, and senior consultants.',
  shortDescription:
    'A field manual for marketing leaders running organisations that include AI agents on the team. The age of marketing automation is ending; the era of marketing autonomy has begun.',
  url: 'https://the-agentic-cmo.com',
  buyUrl: 'https://www.amazon.co.uk/dp/B0D9H67LW6',
  newsletterSubstackUrl: 'https://chroniclesofchange.substack.com',
  newsletterLinkedInUrl: 'https://www.linkedin.com/newsletters/chronicles-of-change-7062450977085255682/',
} as const;

export const RETAILERS = [
  {
    id: 'amazon-uk',
    name: 'Amazon',
    format: 'Hardcover · Paperback · Kindle',
    href: BOOK.buyUrl,
    primary: true,
  },
  {
    id: 'barnes-noble',
    name: 'Barnes & Noble',
    format: 'Hardcover · Paperback · Nook',
    href: 'https://www.barnesandnoble.com/w/the-agentic-cmo-francesco-federico/1147690575',
  },
  {
    id: 'kobo',
    name: 'Rakuten Kobo',
    format: 'eBook',
    href: 'https://www.kobo.com/us/en/ebook/the-agentic-cmo',
  },
  {
    id: 'apple-books',
    name: 'Apple Books',
    format: 'eBook',
    href: 'https://books.apple.com/us/book/the-agentic-cmo/id6747595154',
  },
];

export const ANCHORS = [
  {
    n: '01',
    title: 'From automation to autonomy',
    body: 'Why workflow software taught us the wrong lessons, and what an agent on the org chart actually changes.',
  },
  {
    n: '02',
    title: 'The marketing operating system',
    body: 'How to redesign the CMO’s function (strategy, brand, demand, ops) when agents are first-class participants.',
  },
  {
    n: '03',
    title: 'Briefs become contracts',
    body: 'A brief written for an agent is not a brief written for a human. The discipline of specification, replayed.',
  },
  {
    n: '04',
    title: 'Trust, attribution, and the audit trail',
    body: 'Governance for marketing organisations whose decisions are partly machine-authored.',
  },
  {
    n: '05',
    title: 'The leader’s posture',
    body: 'What it means to manage a team you cannot see, that does not sleep, that asks you to be precise.',
  },
];
