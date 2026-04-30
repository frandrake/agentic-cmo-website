import { useState } from 'react';

export default function NewsletterInline({ tone = 'light' }: { tone?: 'light' | 'dark' }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'sent'>('idle');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) return;
    // Open the Substack subscribe URL with the email pre-filled.
    const url = `https://francescofederico.substack.com/subscribe?email=${encodeURIComponent(email)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
    setState('sent');
    setTimeout(() => { setState('idle'); setEmail(''); }, 3500);
  };

  const isDark = tone === 'dark';

  return (
    <form onSubmit={onSubmit} style={{ display: 'flex', gap: 12, alignItems: 'stretch', maxWidth: 560, flexWrap: 'wrap' }}>
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        style={{
          flex: 1, minWidth: 200,
          fontFamily: 'var(--font-sans)', fontSize: 15, padding: '13px 16px',
          borderRadius: 2,
          border: `2px solid ${isDark ? 'rgba(248,249,250,0.3)' : 'var(--border)'}`,
          background: 'transparent',
          color: isDark ? 'var(--ff-cool-white)' : 'var(--fg)',
          outline: 'none',
          transition: 'border-color 0.2s ease',
        }}
        onFocus={(e) => (e.currentTarget.style.borderColor = isDark ? 'var(--ff-cool-white)' : 'var(--ff-charcoal)')}
        onBlur={(e) => (e.currentTarget.style.borderColor = isDark ? 'rgba(248,249,250,0.3)' : 'var(--border)')}
      />
      <button
        type="submit"
        style={{
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 500,
          padding: '0 24px', borderRadius: 2,
          border: `2px solid ${isDark ? 'var(--ff-cool-white)' : 'var(--ff-charcoal)'}`,
          background: isDark ? 'var(--ff-cool-white)' : 'var(--ff-charcoal)',
          color: isDark ? 'var(--ff-charcoal)' : 'var(--ff-cool-white)',
          cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'background 0.2s ease, color 0.2s ease',
        }}
      >
        {state === 'sent' ? 'Thank you ✓' : 'Subscribe'}
      </button>
    </form>
  );
}
