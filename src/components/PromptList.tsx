import { useMemo, useState } from 'react';
import type { Prompt } from '../data/prompts';

interface Props {
  prompts: Prompt[];
  themes: readonly string[];
  chapters: string[];
}

export default function PromptList({ prompts, themes, chapters }: Props) {
  const [theme, setTheme] = useState<string>('All');
  const [chapter, setChapter] = useState<string>('All');
  const [query, setQuery] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return prompts.filter((p) => {
      if (theme !== 'All' && p.theme !== theme) return false;
      if (chapter !== 'All' && p.chapterNum !== chapter) return false;
      if (query) {
        const q = query.toLowerCase();
        if (!(p.title.toLowerCase().includes(q) || p.chapterTitle.toLowerCase().includes(q) || p.context.toLowerCase().includes(q))) {
          return false;
        }
      }
      return true;
    });
  }, [prompts, theme, chapter, query]);

  return (
    <div className="prompts-grid" style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: 64, padding: '48px 0 0' }}>
      <aside style={{ position: 'sticky', top: 24, alignSelf: 'start' }}>
        <FilterGroup label="Search">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search prompts…"
            aria-label="Search prompts"
            style={{
              width: '100%',
              fontFamily: 'var(--font-sans)', fontSize: 14, padding: '10px 12px',
              borderRadius: 2, border: '1px solid var(--border)', background: 'transparent',
              color: 'var(--fg)', outline: 'none',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ff-charcoal)')}
            onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
          />
        </FilterGroup>
        <FilterGroup label="By theme">
          <FilterList items={['All', ...themes]} active={theme} onChange={setTheme} />
        </FilterGroup>
        <FilterGroup label="By chapter">
          <FilterList items={['All', ...chapters]} active={chapter} onChange={setChapter} compact />
        </FilterGroup>

        <div style={{ marginTop: 32, padding: 24, border: '1px solid var(--border)', background: 'transparent' }}>
          <span className="eyebrow-block eyebrow-vermillion">From the book</span>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 17, fontStyle: 'italic', color: 'var(--ff-slate-blue)', margin: '12px 0 16px', lineHeight: 1.4 }}>
            These prompts are the field manual. The book is the argument.
          </p>
          <a href="/#buy" className="btn btn--accent btn--sm">Buy the book →</a>
        </div>
      </aside>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingBottom: 16, borderBottom: '2px solid var(--ff-charcoal)' }}>
          <span className="eyebrow-block">{filtered.length} of {prompts.length} prompts</span>
          <span className="eyebrow-block">Theme · Chapter · Title</span>
        </div>
        {filtered.length === 0 ? (
          <div style={{ padding: '64px 0', textAlign: 'center', color: 'var(--fg-muted)' }}>
            No prompts match these filters.
          </div>
        ) : (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {filtered.map((p) => (
              <PromptRow key={p.id} prompt={p} open={openId === p.id} onToggle={() => setOpenId(openId === p.id ? null : p.id)} />
            ))}
          </ul>
        )}
      </div>

      <style>{`
        @media (max-width: 880px) {
          .prompts-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
        }
      `}</style>
    </div>
  );
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <span className="eyebrow-block">{label}</span>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function FilterList({ items, active, onChange, compact }: { items: string[]; active: string; onChange: (v: string) => void; compact?: boolean }) {
  return (
    <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: compact ? 4 : 6 }}>
      {items.map((item) => {
        const isActive = item === active;
        return (
          <li key={item}>
            <button
              type="button"
              onClick={() => onChange(item)}
              style={{
                background: 'transparent', border: 0, padding: '4px 0',
                fontFamily: 'var(--font-sans)',
                fontSize: compact ? 13 : 14,
                color: isActive ? 'var(--ff-vermillion)' : 'var(--ff-charcoal)',
                cursor: 'pointer', textAlign: 'left',
                display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              }}
            >
              <span aria-hidden="true" style={{ width: 8, height: 1, background: isActive ? 'var(--ff-vermillion)' : 'transparent', flexShrink: 0 }} />
              <span style={{ borderBottom: isActive ? '1px solid var(--ff-vermillion)' : 'none', paddingBottom: 1 }}>{item}</span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}

function PromptRow({ prompt, open, onToggle }: { prompt: Prompt; open: boolean; onToggle: () => void }) {
  return (
    <li style={{ borderBottom: '1px solid var(--border)' }}>
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        style={{
          width: '100%', background: 'transparent', border: 0, padding: '24px 0',
          display: 'grid', gridTemplateColumns: '90px 110px 1fr 32px', gap: 24,
          alignItems: 'baseline', cursor: 'pointer', textAlign: 'left',
          fontFamily: 'var(--font-sans)', color: 'var(--ff-charcoal)',
        }}
      >
        <span className="mono" style={{ fontVariantNumeric: 'tabular-nums', fontSize: 12, color: 'var(--ff-steel-blue)', letterSpacing: '0.04em' }}>{prompt.theme}</span>
        <span className="mono" style={{ fontVariantNumeric: 'tabular-nums', fontSize: 12, color: 'var(--fg-muted)', letterSpacing: '0.04em' }}>Ch. {prompt.chapterNum}</span>
        <span style={{ fontFamily: 'var(--font-serif)', fontSize: 22, fontWeight: 600, color: open ? 'var(--ff-vermillion)' : 'var(--ff-slate-blue)', lineHeight: 1.3, transition: 'color 0.2s ease' }}>
          {prompt.title}
          <span style={{ color: 'var(--fg-muted)', fontWeight: 500, fontStyle: 'italic' }}> — {prompt.chapterTitle}</span>
        </span>
        <span aria-hidden="true" style={{ fontSize: 18, color: 'var(--fg-muted)', textAlign: 'right', transform: open ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s ease', display: 'inline-block' }}>+</span>
      </button>
      {open && <PromptDetail prompt={prompt} />}
    </li>
  );
}

function PromptDetail({ prompt }: { prompt: Prompt }) {
  const [copied, setCopied] = useState(false);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.body);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = prompt.body;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch {}
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const claudeUrl = `https://claude.ai/new?q=${encodeURIComponent(prompt.body)}`;
  const chatgptUrl = `https://chat.openai.com/?q=${encodeURIComponent(prompt.body)}`;

  return (
    <div className="prompt-detail" style={{ padding: '0 0 40px', display: 'grid', gridTemplateColumns: '224px 1fr', gap: 32 }}>
      <div>
        <span className="eyebrow-block">Context</span>
        <p style={{ fontSize: 14, color: 'var(--fg)', lineHeight: 1.55, margin: '12px 0 0' }}>{prompt.context}</p>
        <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid var(--border)' }}>
          <span className="eyebrow-block">Metadata</span>
          <dl style={{ margin: '12px 0 0', fontSize: 13, lineHeight: 1.7, color: 'var(--fg)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <dt style={{ color: 'var(--fg-muted)' }}>Theme</dt>
              <dd style={{ margin: 0 }}>{prompt.theme}</dd>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <dt style={{ color: 'var(--fg-muted)' }}>Chapter</dt>
              <dd style={{ margin: 0 }}>{prompt.chapterNum}</dd>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <dt style={{ color: 'var(--fg-muted)' }}>Length</dt>
              <dd style={{ margin: 0 }} className="mono">~{Math.round(prompt.body.length / 5)} tokens</dd>
            </div>
          </dl>
        </div>
      </div>
      <div>
        <pre
          style={{
            background: 'var(--ff-charcoal)', color: 'var(--ff-cool-white)',
            padding: '28px 32px', borderRadius: 2,
            fontFamily: 'var(--font-mono)', fontSize: 13.5, lineHeight: 1.75,
            whiteSpace: 'pre-wrap', overflowX: 'auto',
          }}
        >
          {renderPromptBody(prompt.body)}
        </pre>
        <div style={{ marginTop: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
          <button type="button" className={copied ? 'btn btn--accent btn--sm' : 'btn btn--sm'} onClick={onCopy}>
            {copied ? '✓ Copied' : 'Copy prompt'}
          </button>
          <a href={claudeUrl} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">Open in Claude →</a>
          <a href={chatgptUrl} target="_blank" rel="noopener" className="btn btn--ghost btn--sm">Open in ChatGPT →</a>
        </div>
      </div>
      <style>{`
        @media (max-width: 880px) {
          .prompt-detail { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function renderPromptBody(text: string) {
  const parts = text.split(/(\{\{[^}]+\}\})/g);
  return parts.map((p, i) => {
    if (p.startsWith('{{') && p.endsWith('}}')) {
      return <span key={i} style={{ color: 'var(--ff-vermillion)', fontStyle: 'normal' }}>{p}</span>;
    }
    return <span key={i}>{p}</span>;
  });
}
