import { BusFront, MapPin, Clock, ArrowRight, Users, RotateCcw, Bell } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

export function TransportationSection() {
  const { t } = useTheme();
  const { venue } = useSiteContent();
  const tr = venue.transport;

  return (
    <section
      id="transportation"
      className="relative overflow-hidden py-24"
      style={{ background: t.sectionBgAlt, transition: "background 0.4s ease" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      {/* Ambient background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
          style={{ backgroundImage: "radial-gradient(circle, #E85D04, transparent 65%)", opacity: t.isDark ? 0.1 : 0.06 }} />
        <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full"
          style={{ backgroundImage: "radial-gradient(circle, #E8C033, transparent 65%)", opacity: t.isDark ? 0.08 : 0.05 }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label */}
        <div className="flex items-center gap-3 mb-10">
          <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
            {tr.sectionLabel}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">

          {/* ── Left: poster image ── */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative" style={{ maxWidth: "420px", width: "100%" }}>
              {/* Glow behind image */}
              <div className="absolute -inset-4 rounded-3xl pointer-events-none"
                style={{ backgroundImage: "radial-gradient(ellipse, rgba(232,93,4,0.35), transparent 70%)", filter: "blur(24px)" }} />
              <div className="relative rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 32px 80px rgba(232,93,4,0.3), 0 0 0 1px rgba(232,192,51,0.2)" }}>
                <img src={tr.transportCover} alt="Event Transportation" className="w-full h-auto block" />

                {/* Coming soon ribbon over image */}
                {tr.comingSoon && (
                  <div className="absolute top-4 left-0 right-0 flex justify-center">
                    <div
                      className="flex items-center gap-2 px-5 py-2 rounded-full"
                      style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(12px)", border: "1px solid rgba(232,192,51,0.5)" }}
                    >
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ background: "#E8C033", boxShadow: "0 0 8px #E8C033", animation: "pulse 2s infinite" }}
                      />
                      <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.18em", color: "#E8C033" }}>
                        {tr.comingSoonText.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: content ── */}
          <div className="flex flex-col gap-6">

            {/* Headline */}
            <div>
              <h2 className="uppercase leading-tight mb-3"
                style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4.5vw, 3.2rem)", color: t.textPrimary, lineHeight: 1.05 }}>
                Need A{" "}
                <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  Ride?
                </span>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: t.textSecondary, lineHeight: 1.7 }}>
                {tr.heroSub}
              </p>
            </div>

            {/* Key facts row */}
            <div className="grid grid-cols-2 gap-3">
              {tr.keyFacts.map(({ label, value }) => (
                <div key={label} className="rounded-xl px-4 py-3"
                  style={{ background: t.isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)", border: `1px solid rgba(${t.accentRgb},0.15)` }}>
                  <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.68rem", letterSpacing: "0.12em", color: t.textVeryMuted, textTransform: "uppercase", marginBottom: "3px" }}>
                    {label}
                  </p>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: t.goldAccent }}>
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Locations */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} style={{ color: t.goldAccent }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", color: t.textVeryMuted, textTransform: "uppercase" }}>
                  Available Pickup Locations
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tr.locations.map((loc) => (
                  <span key={loc}
                    className="px-3 py-1 rounded-full text-xs"
                    style={{ background: `rgba(${t.accentRgb},0.08)`, border: `1px solid rgba(${t.accentRgb},0.2)`, color: t.textSecondary, fontFamily: "'Inter', sans-serif" }}>
                    {loc}
                  </span>
                ))}
              </div>
            </div>

            {/* Coming soon notice + CTA */}
            {tr.comingSoon ? (
              <div className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(232,192,51,0.3)", background: t.isDark ? "rgba(232,192,51,0.05)" : "rgba(232,192,51,0.04)" }}>
                <div className="flex items-start gap-4 p-5">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: "rgba(232,192,51,0.15)", border: "1px solid rgba(232,192,51,0.3)" }}>
                    <Bell size={18} style={{ color: t.goldAccent }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", color: t.textPrimary, marginBottom: "4px", letterSpacing: "0.03em" }}>
                      Registration Opening Soon
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: t.textSecondary, lineHeight: 1.6, margin: 0 }}>
                      Seats are limited!  — the registration deadline is <strong style={{ color: t.goldAccent }}>{tr.deadline}</strong>. Be ready to register as soon as it opens.
                    </p>
                  </div>
                </div>

                {/* Disabled CTA */}
                <div className="px-5 pb-5 flex flex-col gap-2">
                  <div
                    className="w-full flex items-center justify-center gap-3 py-4 px-6 rounded-xl"
                    style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.05)", border: `1px dashed rgba(${t.accentRgb},0.25)`, cursor: "not-allowed" }}
                  >
                    <BusFront size={17} style={{ color: t.textVeryMuted }} />
                    <span style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1rem", letterSpacing: "0.1em", color: t.textVeryMuted }}>
                      {tr.ctaLabel}
                    </span>
                  </div>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: t.textVeryMuted, textAlign: "center" }}>
                    Registration link will be activated when registration opens.
                  </p>
                </div>
              </div>
            ) : (
              <a
                href={tr.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-3 py-4 px-8 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl"
                style={{ backgroundImage: t.ctaGradient, color: "#fff", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.05rem", letterSpacing: "0.1em", textDecoration: "none", boxShadow: "0 6px 32px rgba(232,93,4,0.35)" }}
              >
                <BusFront size={18} />
                {tr.ctaLabel}
                <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            )}

            {/* FAQ + contact links */}
            <div className="flex flex-wrap items-center gap-4 pt-1">
              <button
                onClick={() => {
                  document.querySelector("#faqs")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-1.5 hover:opacity-70 transition-opacity"
                style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: t.goldAccent, padding: 0 }}
              >
                View Transportation FAQs →
              </button>
              <span style={{ color: t.textVeryMuted, fontSize: "0.7rem" }}>·</span>
              <a href={`mailto:${tr.contact}`}
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: t.textMuted, textDecoration: "none" }}
                className="hover:opacity-70 transition-opacity">
                {tr.contact}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
