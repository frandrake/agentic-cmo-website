import { ANSWER_PAGES } from '../data/answers';

// ── Shared entities ───────────────────────────────────────────

export const PERSON = {
  "@type": "Person",
  "@id": "https://the-agentic-cmo.com/#person",
  "name": "Francesco Federico",
  "honorificSuffix": "JD, FCIM",
  "url": "https://the-agentic-cmo.com/about/",
  "image": {
    "@type": "ImageObject",
    "url": "https://the-agentic-cmo.com/assets/author.jpg",
    "caption": "Francesco Federico, Chief Marketing Officer at S&P Global"
  },
  "jobTitle": "Chief Marketing Officer",
  "worksFor": {
    "@type": "Organization",
    "name": "S&P Global",
    "url": "https://www.spglobal.com"
  },
  "email": "mailto:francesco@francescofederico.net",
  "sameAs": [
    "https://www.francescofederico.com/",
    "https://www.linkedin.com/in/federicofrancesco/",
    "https://orcid.org/0009-0002-3839-9830",
    "https://www.amazon.co.uk/stores/Francesco-Federico/author/B0GMYQDVB7",
    "https://chroniclesofchange.substack.com"
  ],
  "subjectOf": [
    {
      "@type": "WebPage",
      "name": "Look Forward Council",
      "url": "https://www.spglobal.com/en/research-insights/special-reports/look-forward"
    }
  ],
  "hasCredential": [
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Fellowship",
      "name": "Fellow of the Chartered Institute of Marketing",
      "abbreviation": "FCIM",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Chartered Institute of Marketing",
        "url": "https://www.cim.co.uk"
      }
    },
    {
      "@type": "EducationalOccupationalCredential",
      "credentialCategory": "Degree",
      "name": "Doctor of Law",
      "abbreviation": "JD",
      "recognizedBy": {
        "@type": "Organization",
        "name": "Università Cattolica del Sacro Cuore",
        "url": "https://www.unicatt.it"
      }
    }
  ],
  "knowsAbout": [
    "Agentic AI in marketing",
    "CMO operating model",
    "Generative Engine Optimisation",
    "Hybrid Intelligence",
    "Marketing transformation",
    "MarTech strategy",
    "AI governance for marketing",
    "B2B marketing leadership"
  ]
} as const;

export const BOOK_AGENTIC_CMO = {
  "@type": "Book",
  "@id": "https://the-agentic-cmo.com/#book",
  "name": "The Agentic CMO",
  "alternateName": "The Agentic CMO by Francesco Federico",
  "author": { "@id": "https://the-agentic-cmo.com/#person" },
  "url": "https://the-agentic-cmo.com/",
  "datePublished": "2026-06",
  "bookEdition": "Second Edition",
  "inLanguage": "en",
  "isbn": "978-1-0676534-3-9",
  "numberOfPages": 454,
  "description": "The second edition is an eighteen-chapter operating manual with twenty-four AI prompts on the governance and skill mix Chief Marketing Officers need to orchestrate human and artificial intelligence as a unified force. Introduces the PACE Framework, Hybrid Intelligence checklist, AI Autonomy Spectrum, Position Sizing Formula, and Value Stack.",
  "about": [
    { "@type": "Thing", "name": "Agentic AI in marketing" },
    { "@type": "Thing", "name": "CMO operating model" },
    { "@type": "Thing", "name": "Hybrid Intelligence" },
    { "@type": "Thing", "name": "AI governance for marketing" },
    { "@type": "Thing", "name": "Marketing transformation" }
  ],
  "publisher": { "@type": "Organization", "name": "Self-published" },
  "sameAs": [
    "https://www.francescofederico.com/book#agentic-cmo",
    "https://www.amazon.co.uk/dp/B0D9H67LW6",
    "https://www.amazon.co.uk/stores/Francesco-Federico/author/B0GMYQDVB7",
    "https://www.barnesandnoble.com/w/the-agentic-cmo-francesco-federico/1147690575",
    "https://www.kobo.com/us/en/ebook/the-agentic-cmo",
    "https://books.apple.com/us/book/the-agentic-cmo/id6747595154",
    "https://books.google.com/books/about/The_Agentic_CMO.html?id=mskQ0gEACAAJ"
  ]
} as const;

export const BOOK_CITED = {
  "@type": "Book",
  "@id": "https://the-agentic-cmo.com/cited/#book",
  "name": "Cited.",
  "author": { "@id": "https://the-agentic-cmo.com/#person" },
  "url": "https://the-agentic-cmo.com/cited/",
  "inLanguage": "en",
  "isbn": "979-8235761650",
  "description": "The GEO (Generative Engine Optimisation) operating manual for marketing practitioners on earning citation in AI-synthesised answers. Introduces the Dual-Layer Citation Model, Entity Bible, Prompt Battery, and 90-Day GEO Playbook.",
  "about": [
    { "@type": "Thing", "name": "Generative Engine Optimisation" },
    { "@type": "Thing", "name": "LLM citation strategy" },
    { "@type": "Thing", "name": "Entity optimisation" },
    { "@type": "Thing", "name": "AI search visibility" }
  ],
  "publisher": { "@type": "Organization", "name": "Self-published" },
  "sameAs": [
    "https://www.francescofederico.com/book#cited",
    "https://www.amazon.co.uk/stores/Francesco-Federico/author/B0GMYQDVB7"
  ]
} as const;

// DefinedTerms anchored on / (The Agentic CMO page)
export const DEFINED_TERMS_AGENTIC_CMO = [
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/#pace-framework",
    "name": "PACE Framework",
    "description": "Engineering-to-marketing translation model: Perception (real-time signal ingestion), Action (observable agent-executed changes), Cognition (policy selection and objective weighting), Evolution (continuous model update with brand guardrails). Introduced in The Agentic CMO by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/#hybrid-intelligence",
    "name": "Hybrid Intelligence",
    "description": "Sociotechnical AI configuration meeting three falsifiable conditions: Bidirectional Learning, Failure-Mode Complementarity, and Explicit Arbitration. Introduced in The Agentic CMO by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/#ai-autonomy-spectrum",
    "name": "AI Autonomy Spectrum",
    "description": "Four-level taxonomy (Rule-Based, Predictive, Generative, Agentic), each characterised by increasing autonomy. Introduced in The Agentic CMO by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/#position-sizing",
    "name": "Position Sizing Formula",
    "description": "Capital allocation model for AI agent portfolios: Capital_i = k × (EV_i/σ_i) × S_i × (1/G_i). Applies Modern Portfolio Theory to marketing AI investments. Introduced in The Agentic CMO by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/#value-stack",
    "name": "Value Stack",
    "description": "Three-tier AI value model: Efficiency (immediate returns), Enhancement (new capabilities), Strategic Value (business model transformation). Introduced in The Agentic CMO by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/#ifd-framework",
    "name": "IFD Framework",
    "description": "Problem prioritisation model for AI automation investment: Intensity × Frequency × Density. Prioritise High-I, High-F, High-D problems first. Introduced in The Agentic CMO by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/#book" }
  }
] as const;

// DefinedTerms anchored on /cited/
export const DEFINED_TERMS_CITED = [
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/cited/#dual-layer-citation",
    "name": "Dual-Layer Citation Model",
    "description": "Two pathways to AI citation: Indirect Layer (JSON-LD → knowledge graph → organic ranking → AI Overview) and Direct Layer (visible text → chunking → fragment selection). Introduced in Cited. by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/cited/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/cited/#entity-bible",
    "name": "Entity Bible",
    "description": "Governance document managing brand entity across 8 platforms: Wikidata, Wikipedia, Crunchbase, G2, LinkedIn, GitHub, ORCID, financial registries. Entity fragmentation carries a 2.8x citation penalty. Introduced in Cited. by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/cited/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/cited/#prompt-battery",
    "name": "Prompt Battery",
    "description": "300-cell weekly citation tracker: 50 prompts × 6 AI engines × 5 intent bands (Unbranded, Branded, Competitor, Problem, Long-tail). Introduced in Cited. by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/cited/#book" }
  },
  {
    "@type": "DefinedTerm",
    "@id": "https://the-agentic-cmo.com/cited/#90-day-playbook",
    "name": "90-Day GEO Playbook",
    "description": "Four-phase GEO implementation: Week 1 audit, Days 8–30 foundations, Days 31–90 experimentation, Day 91+ governance. Introduced in Cited. by Francesco Federico.",
    "inDefinedTermSet": { "@id": "https://the-agentic-cmo.com/cited/#book" }
  }
] as const;

// ── Page schema functions ─────────────────────────────────────

export function schemaHomepage() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://the-agentic-cmo.com/#website",
        "url": "https://the-agentic-cmo.com/",
        "name": "The Agentic CMO",
        "description": "Official website for The Agentic CMO and Cited. by Francesco Federico.",
        "publisher": { "@id": "https://the-agentic-cmo.com/#person" }
      },
      {
        "@type": "WebPage",
        "@id": "https://the-agentic-cmo.com/#webpage",
        "url": "https://the-agentic-cmo.com/",
        "name": "The Agentic CMO · Francesco Federico",
        "description": "The operating model, governance, and skill mix for CMOs orchestrating human and AI as a unified force. PACE Framework. Hybrid Intelligence. ISBN 978-1-0676534-3-9.",
        "isPartOf": { "@id": "https://the-agentic-cmo.com/#website" },
        "mainEntity": { "@id": "https://the-agentic-cmo.com/#book" }
      },
      BOOK_AGENTIC_CMO,
      PERSON,
      ...DEFINED_TERMS_AGENTIC_CMO
    ]
  };
}

export function schemaCited() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://the-agentic-cmo.com/cited/#webpage",
        "url": "https://the-agentic-cmo.com/cited/",
        "name": "Cited. · The GEO Operating Manual by Francesco Federico",
        "description": "The practical GEO manual for marketers on earning citation in AI-synthesised answers. Dual-Layer Citation Model. Entity Bible. Prompt Battery. ISBN 979-8235761650.",
        "isPartOf": { "@id": "https://the-agentic-cmo.com/#website" },
        "mainEntity": { "@id": "https://the-agentic-cmo.com/cited/#book" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://the-agentic-cmo.com/" },
            { "@type": "ListItem", "position": 2, "name": "Cited.", "item": "https://the-agentic-cmo.com/cited/" }
          ]
        }
      },
      BOOK_CITED,
      PERSON,
      ...DEFINED_TERMS_CITED
    ]
  };
}

export function schemaAbout() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://the-agentic-cmo.com/about/#webpage",
        "url": "https://the-agentic-cmo.com/about/",
        "name": "Francesco Federico · Author of The Agentic CMO and Cited.",
        "description": "Chief Marketing Officer at S&P Global, Fellow of the Chartered Institute of Marketing, and author of The Agentic CMO and Cited.",
        "about": { "@id": "https://the-agentic-cmo.com/#person" },
        "mainEntity": { "@id": "https://the-agentic-cmo.com/#person" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://the-agentic-cmo.com/" },
            { "@type": "ListItem", "position": 2, "name": "About", "item": "https://the-agentic-cmo.com/about/" }
          ]
        }
      },
      PERSON
    ]
  };
}

export function schemaFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": "FAQ · The Agentic CMO and Cited. by Francesco Federico",
    "url": "https://the-agentic-cmo.com/faq/",
    "description": "Answers to common questions about The Agentic CMO, Cited., and the frameworks inside them: PACE, Hybrid Intelligence, GEO, Dual-Layer Citation Model.",
    "mainEntity": [
      { "@type": "Question", "name": "What is The Agentic CMO?", "acceptedAnswer": { "@type": "Answer", "text": "The Agentic CMO is a book by Francesco Federico that sets out the operating model, governance frameworks, and skill mix marketing leaders need to orchestrate human and artificial intelligence as a unified force. It argues the CMO must evolve from Campaign Commander to Portfolio Manager, allocating capital across autonomous AI agent fleets with financial-fund rigour. ISBN 978-1-0676534-3-9 (hardcover)." } },
      { "@type": "Question", "name": "Who introduced the agentic CMO operating model?", "acceptedAnswer": { "@type": "Answer", "text": "The Agentic CMO by Francesco Federico was first published in June 2025, before the term entered common industry use. It introduced the operating model and named frameworks, including the PACE Framework and Hybrid Intelligence, that define the role. The June 2026 second edition is a substantial rewrite." } },
      { "@type": "Question", "name": "Is The Agentic CMO a book or a podcast?", "acceptedAnswer": { "@type": "Answer", "text": "The Agentic CMO by Francesco Federico is a book and operating framework for marketing leaders, first published in June 2025. A separately produced podcast uses a similar title; the official book site is https://the-agentic-cmo.com." } },
      { "@type": "Question", "name": "Who is The Agentic CMO written for?", "acceptedAnswer": { "@type": "Answer", "text": "The Agentic CMO is written for Chief Marketing Officers, Vice Presidents of Marketing, Chief Digital Officers, and senior marketing transformation leaders responsible for integrating autonomous AI systems into their marketing functions." } },
      { "@type": "Question", "name": "What is the PACE Framework?", "acceptedAnswer": { "@type": "Answer", "text": "The PACE Framework is an engineering-to-marketing translation model introduced in The Agentic CMO. PACE stands for: Perception (real-time signal ingestion: ad auctions, CRM events, brand trackers), Action (observable changes executed by agents: bid lifts, creative rotation), Cognition (policy selection and objective weighting), and Evolution (continuous model update governed by brand guardrails)." } },
      { "@type": "Question", "name": "What is Hybrid Intelligence?", "acceptedAnswer": { "@type": "Answer", "text": "Hybrid Intelligence, introduced in The Agentic CMO, is a sociotechnical AI configuration meeting three falsifiable conditions: (1) Bidirectional Learning, where the machine learns from human judgment and humans visibly change decisions based on machine patterns; (2) Failure-Mode Complementarity, where human and machine fail on different inputs; (3) Explicit Arbitration, a documented protocol specifying who decides when human and machine disagree." } },
      { "@type": "Question", "name": "What is the AI Autonomy Spectrum?", "acceptedAnswer": { "@type": "Answer", "text": "The AI Autonomy Spectrum, introduced in The Agentic CMO, is a four-level taxonomy: Rule-Based (deterministic if/then logic, makes no decisions), Predictive (ranks and scores, recommends to humans), Generative (produces content on a prompt), and Agentic (plans, decides, and executes multi-step work toward a goal autonomously)." } },
      { "@type": "Question", "name": "What is the Position Sizing Formula?", "acceptedAnswer": { "@type": "Answer", "text": "The Position Sizing Formula, introduced in The Agentic CMO, applies Modern Portfolio Theory to AI agent capital allocation: Capital_i = k × (EV_i/σ_i) × S_i × (1/G_i). EV is Expected Value, σ is Variance, S is Strategic Fit, and G is Governance Load. A mandatory 17% dry powder reserve is required for mid-year portfolio shifts." } },
      { "@type": "Question", "name": "What are the 24 AI prompts in The Agentic CMO?", "acceptedAnswer": { "@type": "Answer", "text": "The Agentic CMO includes 24 structured AI prompts for marketing leaders implementing the book's frameworks. They are available at https://the-agentic-cmo.com/prompts/." } },
      { "@type": "Question", "name": "What is Cited.?", "acceptedAnswer": { "@type": "Answer", "text": "Cited. is a practical GEO (Generative Engine Optimisation) operating manual for marketing practitioners by Francesco Federico. It explains how generative search engines technically work, why 93% of AI Mode interactions produce zero clicks, and what marketers must do to earn citation in AI-synthesised answers rather than optimising for clicks. ISBN 979-8235761650." } },
      { "@type": "Question", "name": "What is GEO (Generative Engine Optimisation)?", "acceptedAnswer": { "@type": "Answer", "text": "GEO is the discipline of optimising content, entity presence, and technical architecture so that brands are retrieved and cited by large language models and AI-powered search engines. It differs from SEO in that success is measured by citation share and content extractability rather than click-through rate and keyword ranking." } },
      { "@type": "Question", "name": "What is the Dual-Layer Citation Model?", "acceptedAnswer": { "@type": "Answer", "text": "The Dual-Layer Citation Model, introduced in Cited. by Francesco Federico, distinguishes two citation pathways. The Indirect Layer: JSON-LD schema → knowledge graph → organic ranking → AI Overview. The Direct Layer: visible text → chunking (150–300 tokens) → fragment selection. Research shows authority signals outweigh schema 3.5 to 1 in predicting citation outcomes." } },
      { "@type": "Question", "name": "What is the Entity Bible?", "acceptedAnswer": { "@type": "Answer", "text": "The Entity Bible, introduced in Cited. by Francesco Federico, is a governance document managing a brand's presence across eight canonical platforms: Wikidata, Wikipedia, Crunchbase, G2, LinkedIn, GitHub, ORCID, and major financial registries. Entity fragmentation, meaning inconsistent details across these platforms, carries a 2.8x citation penalty in AI retrieval systems." } },
      { "@type": "Question", "name": "What is a Prompt Battery?", "acceptedAnswer": { "@type": "Answer", "text": "A Prompt Battery, introduced in Cited. by Francesco Federico, is a 300-cell weekly citation tracker: 50 prompts tested across 6 AI engines (Google AIO, ChatGPT Search, Perplexity, Copilot, Claude, and one secondary engine) across 5 intent bands: Unbranded, Branded, Competitor, Problem, and Long-tail. It provides honest citation measurement independent of vendor composite scores." } },
      { "@type": "Question", "name": "Who is Francesco Federico?", "acceptedAnswer": { "@type": "Answer", "text": "Francesco Federico is Chief Marketing Officer at S&P Global and the author of The Agentic CMO and Cited. He has held senior marketing executive roles at Vodafone, Acer, and JLL over a twenty-year career. He is a Fellow of the Chartered Institute of Marketing (FCIM) and a member of the World Economic Forum Strategic Communicators Exchange. His main professional website is https://www.francescofederico.com." } },
      { "@type": "Question", "name": "Where can I buy The Agentic CMO and Cited.?", "acceptedAnswer": { "@type": "Answer", "text": "Both books are available on Amazon. The Agentic CMO hardcover ISBN is 978-1-0676534-3-9. Cited. ISBN is 979-8235761650. Visit the author's Amazon page at https://www.amazon.co.uk/stores/Francesco-Federico/author/B0GMYQDVB7." } },
      { "@type": "Question", "name": "What is the difference between generative AI and agentic AI?", "acceptedAnswer": { "@type": "Answer", "text": "Generative AI operates in a request-response mode: it produces output when prompted. Agentic AI operates in a continuous loop: it perceives signals, makes decisions, executes actions, and learns from outcomes without waiting for each explicit prompt. The Agentic CMO's AI Autonomy Spectrum distinguishes four levels: Rule-Based, Predictive, Generative, and Agentic." } }
    ]
  };
}

export function schemaPrompts() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://the-agentic-cmo.com/prompts/#webpage",
        "url": "https://the-agentic-cmo.com/prompts/",
        "name": "24 AI Prompts from The Agentic CMO · Francesco Federico",
        "description": "The 24 implementation prompts from The Agentic CMO by Francesco Federico: structured AI prompts for marketing leaders building agentic capabilities.",
        "isPartOf": { "@id": "https://the-agentic-cmo.com/#website" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://the-agentic-cmo.com/" },
            { "@type": "ListItem", "position": 2, "name": "Prompts", "item": "https://the-agentic-cmo.com/prompts/" }
          ]
        }
      },
      {
        "@type": "Article",
        "@id": "https://the-agentic-cmo.com/prompts/#article",
        "headline": "24 AI Prompts from The Agentic CMO",
        "author": { "@id": "https://the-agentic-cmo.com/#person" },
        "url": "https://the-agentic-cmo.com/prompts/",
        "inLanguage": "en",
        "isPartOf": { "@id": "https://the-agentic-cmo.com/#book" },
        "description": "24 structured AI prompts for marketing leaders implementing the frameworks in The Agentic CMO by Francesco Federico.",
        "about": { "@id": "https://the-agentic-cmo.com/#book" }
      }
    ]
  };
}

export function schemaAnswerPage(slug: string) {
  const page = ANSWER_PAGES.find((p) => p.slug === slug);
  if (!page) return {};
  const url = `https://the-agentic-cmo.com/${slug}/`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        "url": url,
        "name": page.title,
        "description": page.description,
        "isPartOf": { "@id": "https://the-agentic-cmo.com/#website" },
        "about": { "@id": "https://the-agentic-cmo.com/#book" },
        "mentions": { "@id": "https://the-agentic-cmo.com/#person" },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://the-agentic-cmo.com/" },
            { "@type": "ListItem", "position": 2, "name": page.crumb, "item": url }
          ]
        }
      },
      {
        "@type": "Article",
        "@id": `${url}#article`,
        "headline": page.h1Plain,
        "author": { "@id": "https://the-agentic-cmo.com/#person" },
        "url": url,
        "inLanguage": "en",
        "isPartOf": { "@id": "https://the-agentic-cmo.com/#website" },
        "about": { "@id": "https://the-agentic-cmo.com/#book" },
        "description": page.description
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        "url": url,
        "mainEntity": page.faq.map((qa) => ({
          "@type": "Question",
          "name": qa.q,
          "acceptedAnswer": { "@type": "Answer", "text": qa.a }
        }))
      },
      BOOK_AGENTIC_CMO,
      PERSON
    ]
  };
}

export function schemaPrivacy() {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "url": "https://the-agentic-cmo.com/privacy/",
    "name": "Privacy Policy · the-agentic-cmo.com",
    "isPartOf": { "@id": "https://the-agentic-cmo.com/#website" }
  };
}
