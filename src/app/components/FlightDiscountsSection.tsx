import { useState } from "react";
import { Plane, Copy, CheckCheck, Tag, Info, ExternalLink } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import { fadeUp, scaleIn, stagger } from "@/app/components/ui/animation";

// The Airline type is now driven by the JSON shape
type Airline = ReturnType<typeof useSiteContent>["flightDiscounts"]["airlines"][number];

/* ─── Copy button ─────────────────────────────────────────────────────── */
function CopyButton({ code, isDark }: { code: string; isDark: boolean }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      title="Copy code"
      style={{
        background: copied
          ? "rgba(34,197,94,0.15)"
          : isDark
          ? "rgba(255,255,255,0.08)"
          : "rgba(8,11,26,0.06)",
        border: `1px solid ${
          copied
            ? "rgba(34,197,94,0.4)"
            : isDark
            ? "rgba(255,255,255,0.14)"
            : "rgba(8,11,26,0.12)"
        }`,
        borderRadius: "6px",
        padding: "4px 8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "4px",
        transition: "all 0.2s ease",
        color: copied
          ? "#22C55E"
          : isDark
          ? "rgba(255,255,255,0.5)"
          : "rgba(8,11,26,0.5)",
        flexShrink: 0,
      }}
    >
      {copied ? <CheckCheck size={13} /> : <Copy size={13} />}
      <span style={{ fontSize: "11px", fontFamily: "'Inter', sans-serif", fontWeight: 500 }}>
        {copied ? "Copied!" : "Copy"}
      </span>
    </button>
  );
}

/* ─── Compact icon SVGs (mark only, no wordmark) ──────────────────────── */

function AirCanadaIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="30" fill="#D82F2E" />
      <path
        fill="white"
        d="M32 11 l2.6 8.6 5.4-2.4-2.8 6.9 8.8-1.7-4.3 6H48l-5.6 5.4 4.3 7.7-8.4-3 .9 10.1L32 44.5l-8 4.1.9-10.1-8.4 3 4.3-7.7L15 28.4h6.3l-4.3-6 8.8 1.7-2.8-6.9 5.4 2.4Z"
      />
      <rect x="29.5" y="44.5" width="5" height="8" rx="1" fill="white" />
    </svg>
  );
}

function WestJetIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#00AAA6" />
      <path d="M10 46 Q32 12 54 46" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M14 53 Q32 26 50 53" stroke="#1A3F70" strokeWidth="3.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PorterIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#112855" />
      {/* Raccoon eye / target mark */}
      <circle cx="32" cy="30" r="18" fill="white" />
      <circle cx="32" cy="30" r="12" fill="#112855" />
      <circle cx="32" cy="30" r="6" fill="white" />
      <circle cx="32" cy="30" r="2.5" fill="#112855" />
      {/* Ear nubs */}
      <path d="M18 16 Q16 8 22 10 Q20 16 18 16Z" fill="white" />
      <path d="M46 16 Q48 8 42 10 Q44 16 46 16Z" fill="white" />
    </svg>
  );
}

function AirTransatIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#0072CE" />
      {/* Four-point star */}
      <path
        d="M32 8 L36 26 L52 22 L38 32 L52 42 L36 38 L32 56 L28 38 L12 42 L26 32 L12 22 L28 26 Z"
        fill="white"
      />
    </svg>
  );
}

function FlairIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#111111" />
      {/* Bold italic "f" */}
      <text
        x="50%"
        y="46"
        textAnchor="middle"
        fontFamily="'Arial Black', Arial, sans-serif"
        fontWeight="900"
        fontSize="42"
        fontStyle="italic"
        fill="#39FF14"
      >
        f
      </text>
      <rect x="10" y="54" width="44" height="3" rx="1.5" fill="#39FF14" opacity="0.6" />
    </svg>
  );
}

function LynxAirIcon() {
  return (
    <svg viewBox="0 0 64 64" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
      <rect width="64" height="64" rx="10" fill="#003A8F" />
      {/* Claw slashes */}
      <path d="M20 10 Q25 32 20 54" stroke="#A4D233" strokeWidth="4.5" fill="none" strokeLinecap="round" />
      <path d="M30 10 Q35 32 30 54" stroke="#A4D233" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M40 10 Q45 32 40 54" stroke="#A4D233" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

const LOGO_MAP: Record<string, JSX.Element> = {
  "Air Canada": <AirCanadaIcon />,
  "WestJet": <WestJetIcon />,
  "Porter Airlines": <PorterIcon />,
  "Air Transat": <AirTransatIcon />,
  "Flair Airlines": <FlairIcon />,
  "Lynx Air": <LynxAirIcon />,
};

/* ─── Airline logo — small square box on the left ────────────────────── */
function AirlineLogo({ airline }: { airline: Airline }) {
  const isCustomAccent = !airline.accentColor.startsWith("rgba");
  const logo = LOGO_MAP[airline.name];

  if (!logo) {
    return (
      <div
        style={{
          width: "48px",
          height: "48px",
          borderRadius: "10px",
          background: isCustomAccent ? `${airline.accentColor}22` : "rgba(255,255,255,0.18)",
          border: isCustomAccent
            ? `1px solid ${airline.accentColor}55`
            : "1px solid rgba(255,255,255,0.28)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
          fontSize: "1rem",
          color: isCustomAccent ? airline.accentColor : airline.headerTextColor,
          letterSpacing: "0.06em",
          flexShrink: 0,
        }}
      >
        {airline.abbr}
      </div>
    );
  }

  return (
    <div
      style={{
        width: "48px",
        height: "48px",
        borderRadius: "10px",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {logo}
    </div>
  );
}

/* ─── Individual airline card ─────────────────────────────────────────── */
function AirlineCard({ airline }: { airline: Airline }) {
  const { t } = useTheme();
  const [expanded, setExpanded] = useState(false);

  const isCustomAccent = !airline.accentColor.startsWith("rgba");
  const badgeBg = isCustomAccent ? `${airline.accentColor}22` : airline.accentColor;
  const badgeBorder = isCustomAccent
    ? `1px solid ${airline.accentColor}99`
    : `1px solid rgba(255,255,255,0.35)`;
  const badgeTextColor = isCustomAccent ? airline.accentColor : airline.headerTextColor;

  return (
    <div
      style={{
        background: t.isDark
          ? `rgba(${airline.cardRgb}, 0.10)`
          : `rgba(${airline.cardRgb}, 0.05)`,
        border: `1px solid rgba(${airline.cardRgb}, ${t.isDark ? "0.38" : "0.22"})`,
        borderRadius: "16px",
        overflow: "hidden",
        transition: "all 0.3s ease",
        boxShadow: t.isDark
          ? `0 4px 28px rgba(${airline.cardRgb}, 0.18)`
          : `0 4px 20px rgba(${airline.cardRgb}, 0.10)`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.isDark
          ? `0 16px 48px rgba(${airline.cardRgb}, 0.30), 0 0 0 1px rgba(${airline.cardRgb}, 0.50)`
          : `0 16px 40px rgba(${airline.cardRgb}, 0.20), 0 0 0 1px rgba(${airline.cardRgb}, 0.32)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow = t.isDark
          ? `0 4px 28px rgba(${airline.cardRgb}, 0.18)`
          : `0 4px 20px rgba(${airline.cardRgb}, 0.10)`;
      }}
    >
      {/* ── Header: single row — icon · name/tagline · badge ── */}
      <div
        style={{
          backgroundColor: airline.color,
          padding: "16px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "10px",
        }}
      >
        {/* Logo + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", minWidth: 0 }}>
          <AirlineLogo airline={airline} />
          <div style={{ minWidth: 0 }}>
            <p
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 600,
                fontSize: "1.05rem",
                color: airline.headerTextColor,
                margin: 0,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {airline.name}
            </p>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.7rem",
                color: isCustomAccent
                  ? `${airline.accentColor}CC`
                  : "rgba(255,255,255,0.72)",
                margin: 0,
              }}
            >
              {airline.tagline}
            </p>
          </div>
        </div>

        {/* Discount badge */}
        <div
          style={{
            background: badgeBg,
            border: badgeBorder,
            borderRadius: "8px",
            padding: "6px 12px",
            textAlign: "center",
            flexShrink: 0,
          }}
        >
          <p
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              fontSize: "1.35rem",
              color: badgeTextColor,
              margin: 0,
              lineHeight: 1,
            }}
          >
            {airline.discount}
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.62rem",
              color: badgeTextColor,
              opacity: 0.8,
              margin: 0,
              marginTop: "2px",
            }}
          >
            {airline.discountNote}
          </p>
        </div>
      </div>

      {/* Thin brand-colour accent rule */}
      <div
        style={{
          height: "2px",
          background: isCustomAccent
            ? `linear-gradient(90deg, ${airline.color}, ${airline.accentColor})`
            : airline.color,
          opacity: 0.7,
        }}
      />

      {/* ── Body ── */}
      <div style={{ padding: "18px 18px 16px" }}>
        {/* Promo code row */}
        <div
          style={{
            background: t.isDark
              ? `rgba(${airline.cardRgb}, 0.12)`
              : `rgba(${airline.cardRgb}, 0.07)`,
            border: `1px dashed rgba(${airline.cardRgb}, ${t.isDark ? "0.45" : "0.35"})`,
            borderRadius: "10px",
            padding: "11px 13px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
            marginBottom: "13px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "7px", minWidth: 0 }}>
            <Tag size={13} style={{ color: t.goldAccent, flexShrink: 0 }} />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                color: t.goldAccent,
                letterSpacing: "0.12em",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
              }}
            >
              {airline.code}
            </span>
          </div>
          <CopyButton code={airline.code} isDark={t.isDark} />
        </div>

        {/* Routes */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.77rem",
            color: t.textSecondary,
            margin: "0 0 3px 0",
            lineHeight: 1.5,
          }}
        >
          <span style={{ color: t.textMuted }}>Routes: </span>
          {airline.routes}
        </p>

        {/* Valid until */}
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.77rem",
            color: t.textMuted,
            margin: "0 0 12px 0",
          }}
        >
          <span style={{ color: t.textMuted }}>Valid until: </span>
          <span style={{ color: t.goldAccent }}>{airline.validUntil}</span>
        </p>

        {/* How-to toggle */}
        <button
          onClick={() => setExpanded((v) => !v)}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: "0",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            color: t.textVeryMuted,
            marginBottom: expanded ? "10px" : "0",
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = t.goldAccent)
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLButtonElement).style.color = t.textVeryMuted)
          }
        >
          <Info size={13} />
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.73rem" }}>
            {expanded ? "Hide instructions" : "How to apply this code"}
          </span>
        </button>

        {expanded && (
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.78rem",
              color: t.textSecondary,
              margin: "0 0 12px 0",
              padding: "10px 12px",
              background: t.isDark ? "rgba(255,255,255,0.04)" : "rgba(8,11,26,0.03)",
              borderRadius: "8px",
              border: `1px solid rgba(${airline.cardRgb}, ${t.isDark ? "0.22" : "0.15"})`,
              lineHeight: 1.6,
            }}
          >
            {airline.instructions}
          </p>
        )}

        {/* Book Now button */}
        <a
          href={airline.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "6px",
            marginTop: "14px",
            padding: "9px",
            borderRadius: "8px",
            background: airline.color,
            color: isCustomAccent ? airline.accentColor : airline.headerTextColor,
            textDecoration: "none",
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 600,
            fontSize: "0.82rem",
            letterSpacing: "0.09em",
            transition: "opacity 0.2s ease, transform 0.2s ease",
            border: isCustomAccent ? `1px solid ${airline.accentColor}55` : "none",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "0.85";
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1.02)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
            (e.currentTarget as HTMLAnchorElement).style.transform = "scale(1)";
          }}
        >
          BOOK NOW
          <ExternalLink size={13} />
        </a>
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────────── */
export function FlightDiscountsSection() {
  const { t } = useTheme();
  const { flightDiscounts } = useSiteContent();

  return (
    <section
      id="flight-discounts"
      style={{ background: t.sectionBg, transition: "background 0.4s ease" }}
    >
      <div style={{ height: "1px", background: t.topDivider }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
            style={{ background: t.heroBadgeBg, border: `1px solid ${t.heroBadgeBorder}` }}
          >
            <Plane size={13} style={{ color: t.goldAccent }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.18em", color: t.goldAccent, textTransform: "uppercase" }}>
              {flightDiscounts.sectionLabel}
            </span>
          </div>

          <h2
            className="mb-4"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.4rem)", letterSpacing: "0.02em", backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          >
            FLY TO TORONTO FOR LESS
          </h2>

          <p className="max-w-2xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: t.textSecondary, lineHeight: 1.7 }}>
            {flightDiscounts.description}
          </p>
        </div>

        {/* Note banner */}
        <div
          className="max-w-3xl mx-auto mb-12 flex items-start gap-3 rounded-xl px-5 py-4"
          style={{ background: t.isDark ? "rgba(232,192,51,0.07)" : "rgba(200,158,30,0.07)", border: `1px solid ${t.isDark ? "rgba(232,192,51,0.2)" : "rgba(200,158,30,0.25)"}` }}
        >
          <Info size={16} style={{ color: t.goldAccent, marginTop: "2px", flexShrink: 0 }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: t.textSecondary, margin: 0, lineHeight: 1.65 }}>
            {flightDiscounts.footnote}
          </p>
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {flightDiscounts.airlines.map((airline) => (
            <AirlineCard key={airline.abbr} airline={airline} />
          ))}
        </div>
      </div>
    </section>
  );
}