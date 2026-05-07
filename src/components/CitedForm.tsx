import { useState } from 'react';

export default function CitedForm() {
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('');
  const [problem, setProblem] = useState('Organic traffic is declining');
  const [state, setState] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) return;
    setState('sending');
    setErrorMsg('');

    try {
      const res = await fetch('/api/cited-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role, problem }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        throw new Error(data.error || 'Could not send the manual. Try again in a moment.');
      }
      setState('sent');
    } catch (err: unknown) {
      setState('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong.');
    }
  };

  if (state === 'sent') {
    return (
      <div style={{ border: '2px solid var(--ff-vermillion)', padding: '48px 40px', background: 'var(--bg)' }}>
        <span className="eyebrow-block eyebrow-vermillion">Confirmed</span>
        <h3 style={{ fontSize: 36, color: 'var(--ff-slate-blue)', margin: '16px 0 0', fontFamily: 'var(--font-serif)', fontWeight: 700, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
          Check your inbox.
        </h3>
        <p style={{ fontFamily: 'var(--font-serif)', fontSize: 20, lineHeight: 1.5, color: 'var(--fg)', margin: '24px 0 0', maxWidth: 520 }}>
          Cited is on its way to <span style={{ color: 'var(--ff-vermillion)' }}>{email}</span>. The email comes from{' '}
          <span className="mono" style={{ fontSize: 16 }}>cited@the-agentic-cmo.com</span> — add it to your contacts so it doesn't end up in spam.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} style={{ border: '2px solid var(--ff-charcoal)', padding: '40px 40px 36px', background: 'var(--bg)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32, paddingBottom: 16, borderBottom: '1px solid var(--border)' }}>
        <span className="eyebrow-block">Request Cited.</span>
        <span className="mono" style={{ fontSize: 11, color: 'var(--ff-steel-blue)', letterSpacing: '0.08em' }}>FORM № 01</span>
      </div>

      <div className="form-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <FieldBlock label="Email address" required>
          <FormInput type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your@email.com" required name="email" autoComplete="email" />
        </FieldBlock>
        <FieldBlock label="Your role">
          <FormInput type="text" value={role} onChange={(e) => setRole(e.target.value)} placeholder="Head of marketing, founder, …" name="role" autoComplete="organization-title" />
        </FieldBlock>
      </div>

      <div style={{ marginTop: 32 }}>
        <FieldBlock label="What are you trying to solve">
          <FormSelect value={problem} onChange={(e) => setProblem(e.target.value)} name="problem">
            <option>Organic traffic is declining</option>
            <option>We don't appear in AI answers</option>
            <option>Building a GEO programme from zero</option>
            <option>Educating my executive team</option>
            <option>Other / just curious</option>
          </FormSelect>
        </FieldBlock>
      </div>

      {state === 'error' && (
        <p style={{ marginTop: 16, color: 'var(--ff-vermillion)', fontSize: 13 }}>{errorMsg}</p>
      )}

      <div style={{ marginTop: 36, paddingTop: 24, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
        <p style={{ margin: 0, fontSize: 12, color: 'var(--fg-muted)', maxWidth: 360, lineHeight: 1.5 }}>
          I use your email only to send the manual. See <a href="/privacy/" style={{ color: 'var(--ff-vermillion)' }}>the privacy note</a>. No third-party sharing.
        </p>
        <button type="submit" disabled={state === 'sending'} className="btn btn--accent btn--lg">
          {state === 'sending' ? 'Sending…' : 'Send me the manual →'}
        </button>
      </div>

      <style>{`
        @media (max-width: 720px) {
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </form>
  );
}

function FieldBlock({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label style={{ display: 'block' }}>
      <div style={{ fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 500, color: 'var(--ff-steel-blue)', marginBottom: 10 }}>
        {label}
        {required && <span style={{ color: 'var(--ff-vermillion)' }}> *</span>}
      </div>
      {children}
    </label>
  );
}

function FormInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        fontFamily: 'var(--font-sans)', fontSize: 15, padding: '12px 0',
        borderRadius: 0, border: 'none', borderBottom: '2px solid var(--ff-charcoal)',
        background: 'transparent', color: 'var(--fg)', width: '100%',
        outline: 'none', transition: 'border-color 0.2s ease',
      }}
      onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--ff-vermillion)')}
      onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--ff-charcoal)')}
    />
  );
}

function FormSelect({ children, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <select
      {...props}
      style={{
        fontFamily: 'var(--font-sans)', fontSize: 15, padding: '12px 0',
        borderRadius: 0, border: 'none', borderBottom: '2px solid var(--ff-charcoal)',
        background: 'transparent', color: 'var(--fg)', width: '100%',
        outline: 'none', appearance: 'none',
        backgroundImage:
          'linear-gradient(45deg, transparent 50%, var(--ff-charcoal) 50%), linear-gradient(135deg, var(--ff-charcoal) 50%, transparent 50%)',
        backgroundPosition: 'calc(100% - 14px) 50%, calc(100% - 8px) 50%',
        backgroundSize: '6px 6px',
        backgroundRepeat: 'no-repeat',
        paddingRight: 28,
      }}
    >
      {children}
    </select>
  );
}
