'use client';

import { Building2, Check, Copy, CreditCard, ExternalLink, Heart, Mail, Shield } from 'lucide-react';
import { useState } from 'react';

import { useTheme } from '@/app/contexts/ThemeContext';
import giveContent from '@/data/give.json';

function CopyButton({ text, label }: { text: string; label: string }) {
  const { t } = useTheme();
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={label}
      style={{
        background: 'none',
        border: 'none',
        color: copied ? '#10b981' : t.textMuted,
        cursor: 'pointer',
        display: 'inline-flex',
        padding: '4px',
      }}
    >
      {copied ? <Check size={15} /> : <Copy size={15} />}
    </button>
  );
}

function cardHover(element: HTMLElement, active: boolean, border: string) {
  element.style.borderColor = active ? border : '';
  element.style.boxShadow = active ? '0 8px 22px rgba(232,140,20,0.14)' : '0 4px 16px rgba(0,0,0,0.06)';
}

export function GiveQuickLinks() {
  const { t } = useTheme();
  const { etransfer, building, online } = giveContent.givingOptions;
  const cardStyle = {
    background: t.givingCardBg,
    border: `1px solid ${t.givingCardBorder}`,
    borderRadius: '16px',
    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
    transition: 'transform 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease',
  };

  return (
    <main
      style={{
        background: t.pageBg,
        color: t.textPrimary,
        fontFamily: "'Inter', sans-serif",
        minHeight: 'calc(100vh - 20rem)',
        padding: '9rem 20px 5rem',
        transition: 'background 0.4s ease, color 0.4s ease',
      }}
    >
      <div style={{ margin: '0 auto', maxWidth: '440px', width: '100%' }}>
        <header style={{ marginBottom: '36px', textAlign: 'center' }}>
          <div
            style={{
              alignItems: 'center',
              background: t.ctaGradient,
              borderRadius: '50%',
              boxShadow: '0 8px 32px rgba(232,93,4,0.25)',
              display: 'flex',
              height: '72px',
              justifyContent: 'center',
              margin: '0 auto 16px',
              width: '72px',
            }}
          >
            <Heart size={30} color="#fff" fill="#fff" />
          </div>
          <h1
            style={{
              color: t.textPrimary,
              fontFamily: "'Oswald', sans-serif",
              fontSize: '1.8rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              margin: '0 0 4px',
              textTransform: 'uppercase',
            }}
          >
            {giveContent.header.title}
          </h1>
          <p style={{ color: t.textMuted, fontSize: '0.84rem', margin: '0 0 6px' }}>{giveContent.header.event}</p>
          <p style={{ color: t.textVeryMuted, fontSize: '0.78rem', margin: 0 }}>{giveContent.header.location}</p>
        </header>

        <p
          style={{
            color: t.goldAccent,
            fontFamily: "'Barlow Condensed', sans-serif",
            fontSize: '0.75rem',
            letterSpacing: '0.2em',
            margin: '0 0 16px',
            textAlign: 'center',
            textTransform: 'uppercase',
          }}
        >
          {giveContent.sectionLabel}
        </p>

        <a
          href={online.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...cardStyle,
            alignItems: 'center',
            background: t.ctaGradient,
            border: '1px solid transparent',
            color: '#fff',
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '20px 24px',
            textDecoration: 'none',
          }}
          onMouseEnter={(event) => cardHover(event.currentTarget, true, '#fde68a')}
          onMouseLeave={(event) => cardHover(event.currentTarget, false, 'transparent')}
        >
          <div style={{ alignItems: 'center', display: 'flex', gap: '14px' }}>
            <div
              style={{
                alignItems: 'center',
                background: 'rgba(255,255,255,0.22)',
                borderRadius: '10px',
                display: 'flex',
                height: '42px',
                justifyContent: 'center',
                width: '42px',
              }}
            >
              <CreditCard size={20} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  margin: '0 0 2px',
                }}
              >
                {online.title}
              </p>
              <p style={{ fontSize: '0.75rem', margin: 0, opacity: 0.85 }}>{online.description}</p>
            </div>
          </div>
          <ExternalLink size={16} />
        </a>

        <a
          href={building.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...cardStyle,
            alignItems: 'center',
            color: t.textPrimary,
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
            marginBottom: '12px',
            padding: '20px 24px',
            textDecoration: 'none',
          }}
          onMouseEnter={(event) => cardHover(event.currentTarget, true, t.goldAccent)}
          onMouseLeave={(event) => cardHover(event.currentTarget, false, t.givingCardBorder)}
        >
          <div style={{ alignItems: 'center', display: 'flex', gap: '14px' }}>
            <div
              style={{
                alignItems: 'center',
                background: `rgba(${t.accentRgb},0.12)`,
                borderRadius: '10px',
                display: 'flex',
                height: '42px',
                justifyContent: 'center',
                width: '42px',
              }}
            >
              <Building2 size={20} color={t.goldAccent} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  margin: '0 0 2px',
                }}
              >
                {building.title}
              </p>
              <p style={{ color: t.textMuted, fontSize: '0.75rem', margin: 0 }}>{building.description}</p>
            </div>
          </div>
          <ExternalLink size={16} color={t.textMuted} />
        </a>

        {etransfer.show && (
          <section
            style={{ ...cardStyle, marginBottom: '32px', padding: '18px 24px' }}
            onMouseEnter={(event) => cardHover(event.currentTarget, true, t.goldAccent)}
            onMouseLeave={(event) => cardHover(event.currentTarget, false, t.givingCardBorder)}
          >
            <div style={{ alignItems: 'center', display: 'flex', gap: '14px' }}>
              <div
                style={{
                  alignItems: 'center',
                  background: t.givingMethodBg,
                  borderRadius: '10px',
                  display: 'flex',
                  height: '42px',
                  justifyContent: 'center',
                  width: '42px',
                }}
              >
                <Mail size={20} color={t.goldAccent} />
              </div>
              <div style={{ flex: 1 }}>
                <p
                  style={{
                    color: t.textPrimary,
                    fontFamily: "'Oswald', sans-serif",
                    fontSize: '0.98rem',
                    fontWeight: 700,
                    letterSpacing: '0.04em',
                    margin: '0 0 4px',
                  }}
                >
                  {etransfer.title}
                </p>
                <div style={{ alignItems: 'center', display: 'flex', gap: '4px' }}>
                  <code
                    style={{
                      background: t.givingMethodBg,
                      border: `1px solid ${t.givingCardBorder}`,
                      borderRadius: '6px',
                      color: t.goldAccent,
                      fontFamily: "'Courier New', monospace",
                      fontSize: '0.76rem',
                      padding: '2px 8px',
                    }}
                  >
                    {etransfer.email}
                  </code>
                  <CopyButton text={etransfer.email} label={etransfer.copyButtonLabel} />
                </div>
              </div>
            </div>
          </section>
        )}

        <section
          style={{
            background: t.givingScriptureBg,
            border: `1px solid ${t.givingScriptureBorder}`,
            borderRadius: '12px',
            marginBottom: '24px',
            padding: '20px',
            textAlign: 'center',
          }}
        >
          <Heart size={16} color={t.goldAccent} style={{ display: 'block', margin: '0 auto 10px' }} />
          <p
            style={{
              color: t.givingScriptureText,
              fontSize: '0.85rem',
              fontStyle: 'italic',
              lineHeight: 1.7,
              margin: '0 0 8px',
            }}
          >
            &quot;{giveContent.scripture.text}&quot;
          </p>
          <p
            style={{
              color: t.goldAccent,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontSize: '0.72rem',
              letterSpacing: '0.1em',
              margin: 0,
              textTransform: 'uppercase',
            }}
          >
            {giveContent.scripture.reference}
          </p>
        </section>

        <div style={{ alignItems: 'flex-start', display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <Shield size={13} color={t.textMuted} style={{ flexShrink: 0, marginTop: '2px' }} />
          <p style={{ color: t.givingTrustText, fontSize: '0.7rem', lineHeight: 1.6, margin: 0, textAlign: 'center' }}>
            {giveContent.trustNote}
            <br />
            {giveContent.transparencyNote}
          </p>
        </div>
      </div>
    </main>
  );
}
