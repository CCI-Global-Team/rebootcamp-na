'use client';

import { Captions, ExternalLink, Languages, Wifi } from 'lucide-react';

import { Footer } from '@/app/components/Footer';
import { Navbar } from '@/app/components/Navbar';
import { ThemeProvider, useTheme } from '@/app/contexts/ThemeContext';

const captionsUrl = 'https://captionkit.com/c/cci-toronto';

function QuickLinksContent() {
  const { t } = useTheme();

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
            <Captions size={31} color="#fff" />
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
            Quick Links
          </h1>
          <p style={{ color: t.textMuted, fontSize: '0.84rem', margin: '0 0 6px' }}>
            Reboot Camp North America
          </p>
          <p style={{ color: t.textVeryMuted, fontSize: '0.78rem', margin: 0 }}>
            Toronto, Ontario · Canada
          </p>
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
          Accessibility
        </p>

        <a
          href={captionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open live captions and translation"
          style={{
            alignItems: 'center',
            background: t.ctaGradient,
            border: '1px solid transparent',
            borderRadius: '16px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
            color: '#fff',
            display: 'flex',
            gap: '16px',
            justifyContent: 'space-between',
            padding: '20px 24px',
            textDecoration: 'none',
            transition: 'transform 0.18s ease, box-shadow 0.18s ease',
          }}
          onMouseEnter={(event) => {
            event.currentTarget.style.boxShadow = '0 8px 22px rgba(232,140,20,0.24)';
            event.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(event) => {
            event.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.06)';
            event.currentTarget.style.transform = '';
          }}
        >
          <div style={{ alignItems: 'center', display: 'flex', gap: '14px' }}>
            <div
              style={{
                alignItems: 'center',
                background: 'rgba(255,255,255,0.22)',
                borderRadius: '10px',
                display: 'flex',
                flexShrink: 0,
                height: '42px',
                justifyContent: 'center',
                width: '42px',
              }}
            >
              <Languages size={21} />
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Oswald', sans-serif",
                  fontSize: '1.05rem',
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                  margin: '0 0 4px',
                }}
              >
                Live Captions &amp; Translation
              </p>
              <p style={{ fontSize: '0.78rem', lineHeight: 1.5, margin: 0, opacity: 0.9 }}>
                Scan, choose Spanish or French, and read along. Or listen on your device.
              </p>
            </div>
          </div>
          <ExternalLink size={17} style={{ flexShrink: 0 }} />
        </a>

        <div
          style={{
            alignItems: 'center',
            color: t.textMuted,
            display: 'flex',
            fontSize: '0.75rem',
            gap: '8px',
            justifyContent: 'center',
            marginTop: '18px',
          }}
        >
          <Wifi size={15} />
          <span>Needs internet · Works anywhere in the building</span>
        </div>
      </div>
    </main>
  );
}

export function QuickLinksPageInner() {
  return (
    <ThemeProvider>
      <Navbar />
      <QuickLinksContent />
      <Footer />
    </ThemeProvider>
  );
}
