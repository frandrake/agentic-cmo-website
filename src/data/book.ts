// Canonical book metadata. Edit here, propagates everywhere.
export const BOOK = {
  title: 'The Agentic CMO',
  subtitle: 'How Artificial Intelligence Is Rewriting the Rules of Marketing Leadership',
  edition: 'Second Edition',
  author: 'Francesco Federico',
  authorTitle: 'Global Chief Marketing Officer',
  pubDate: 'June 2026',
  pubDateMachine: '2026-06',
  isbnHardcover: '978-1-0676534-3-9',
  isbnPaperback: '978-1-0676534-1-5',
  isbnEbook: '978-1-0676534-4-6',
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
