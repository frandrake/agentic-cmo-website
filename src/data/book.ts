// Canonical book metadata. Edit here, propagates everywhere.
export const BOOK = {
  title: 'The Agentic CMO',
  subtitle: 'How Artificial Intelligence Is Rewriting the Rules of Marketing Leadership',
  edition: 'Second Edition',
  author: 'Francesco Federico',
  authorTitle: 'Global Chief Marketing Officer',
  pubDate: 'June 2026',
  pubDateMachine: '2026-06',
  isbnPrint: '978-1-0676534-0-8',
  isbnEbook: '978-1-0676534-1-5',
  promptCount: 24,
  thesis: 'The age of marketing automation is ending. The era of marketing autonomy has begun.',
  subThesis:
    'A field manual for marketing leaders running organisations that include AI agents on the team. Written for CMOs, marketing leaders, founders, and senior consultants.',
  shortDescription:
    'A field manual for marketing leaders running organisations that include AI agents on the team. The age of marketing automation is ending; the era of marketing autonomy has begun.',
  url: 'https://the-agentic-cmo.com',
} as const;

export const RETAILERS = [
  { id: 'amazon-us', name: 'Amazon US', format: 'Hardcover · Kindle', href: 'https://www.amazon.com/dp/B0FGXXXXXX', primary: true },
  { id: 'amazon-uk', name: 'Amazon UK', format: 'Hardcover · Kindle', href: 'https://www.amazon.co.uk/dp/B0FGXXXXXX' },
  { id: 'amazon-eu', name: 'Amazon EU', format: 'Hardcover · Kindle', href: 'https://www.amazon.de/dp/B0FGXXXXXX' },
  { id: 'apple', name: 'Apple Books', format: 'EPUB', href: 'https://books.apple.com/' },
  { id: 'bookshop', name: 'Bookshop.org', format: 'Hardcover', href: 'https://uk.bookshop.org/' },
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
    body: 'How to redesign the CMO’s function — strategy, brand, demand, ops — when agents are first-class participants.',
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

export const CHAPTERS = [
  '01 · Understanding agentic AI',
  '02 · The evolving CMO mandate',
  '03 · New business models for marketing',
  '04 · Building the agentic marketing organisation',
  '05 · Building the agentic marketing stack',
  '06 · The CMO as portfolio manager',
  '07 · Brand and voice under autonomy',
  '08 · Liability and governance under autonomy',
  '09 · The technology stack for agentic marketing',
  '10 · The customer experience audit',
  '11 · Ethical leadership in autonomous marketing',
  '12 · The customer experience revolution',
  '13 · Competitive strategy in the agentic era',
  '14 · Industry-specific implementation',
  '15 · B2B and buyer agents',
  '16 · Industry-specific applications',
  '17 · The CMO in the agentic era',
  '18 · Your 90-day agentic transformation',
  '19 · A field manual for the next eighteen months',
];
