import { Heart, CreditCard, Smartphone, Globe, ExternalLink, Shield } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

const ICON_MAP: Record<string, React.ElementType> = { CreditCard, Smartphone, Globe };

export function GivingSection() {
  const { t } = useTheme();
  const { giving } = useSiteContent();

  return (
    <section id="giving" className="relative py-24 overflow-hidden" style={{ background: t.sectionBgAlt, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-96 h-96 pointer-events-none" style={{ background: "radial-gradient(circle, #E8C033, transparent 70%)", opacity: t.isDark ? 0.1 : 0.06 }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
              {giving.sectionLabel}
            </span>
            <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
          </div>
          <h2 className="uppercase mb-4" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: t.textPrimary }}>
            {giving.headingPlain}{" "}
            <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {giving.headingAccent}
            </span>
          </h2>
          <p className="max-w-xl mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>
            {giving.description}
          </p>
        </div>

        {/* Scripture */}
        <div className="max-w-2xl mx-auto mb-12 p-5 rounded-xl text-center relative overflow-hidden" style={{ background: t.givingScriptureBg, border: `1px solid ${t.givingScriptureBorder}` }}>
          <Heart size={20} className="text-[#E85D04] mx-auto mb-3" />
          <p className="italic mb-2" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7, color: t.givingScriptureText }}>
            {giving.scripture.text}
          </p>
          <p className="text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", color: t.goldAccent }}>
            {giving.scripture.reference}
          </p>
        </div>

        {/* Giving Options */}
        <div className="grid md:grid-cols-3 gap-5 mb-12">
          {giving.options.map((option) => {
            const Icon = ICON_MAP[option.icon] ?? CreditCard;
            return (
              <div key={option.title} className="p-6 rounded-2xl flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-200"
                style={{ background: option.highlight ? (t.isDark ? "linear-gradient(135deg, rgba(232,192,51,0.1), rgba(232,92,4,0.08))" : "linear-gradient(135deg, rgba(232,192,51,0.08), rgba(232,92,4,0.05))") : t.givingCardBg, border: option.highlight ? "1px solid rgba(232,192,51,0.3)" : `1px solid ${t.givingCardBorder}` }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: option.highlight ? "linear-gradient(135deg, #E8C033, #E85D04)" : t.givingMethodBg }}>
                  <Icon size={20} style={{ color: option.highlight ? "#080B1A" : t.goldAccent }} />
                </div>

                <div className="flex-1">
                  <h3 className="mb-2" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1.15rem", color: t.textPrimary }}>{option.title}</h3>
                  <p className="text-sm mb-3" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>{option.description}</p>
                  {"details" in option && option.details && (
                    <p className="text-sm font-mono mb-3 p-2 rounded" style={{ background: "rgba(232,192,51,0.08)", color: t.goldAccent }}>
                      {option.details as string}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-1.5">
                    {option.methods.map((m) => (
                      <span key={m} className="text-xs px-2 py-0.5 rounded" style={{ background: t.givingMethodBg, color: t.givingMethodColor, fontFamily: "'Inter', sans-serif" }}>{m}</span>
                    ))}
                  </div>
                </div>

                <a href={option.url} className="flex items-center justify-center gap-2 py-3 rounded-lg text-sm transition-all duration-200 hover:scale-105"
                  style={{ background: option.highlight ? t.ctaGradient : t.givingMethodBg, color: option.highlight ? t.ctaText : t.textPrimary, border: option.highlight ? "none" : `1px solid ${t.cardBorder}`, fontFamily: "'Oswald', sans-serif", fontWeight: option.highlight ? 700 : 500, letterSpacing: "0.08em" }}
                >
                  {option.cta}
                  <ExternalLink size={13} />
                </a>
              </div>
            );
          })}
        </div>

        {/* Giving Categories */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: t.givingCategoriesBg, border: `1px solid ${t.givingCategoriesBorder}` }}>
          <h3 className="mb-5 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em", color: t.textPrimary }}>
            {giving.categoriesHeading}
          </h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {giving.categories.map((cat) => (
              <div key={cat.name} className="flex items-start gap-3 p-4 rounded-xl" style={{ background: `${cat.color}08`, border: `1px solid ${cat.color}25` }}>
                <div className="w-2 h-2 rounded-full mt-2 shrink-0" style={{ background: cat.color }} />
                <div>
                  <h4 className="mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: cat.color, fontSize: "0.95rem", fontWeight: 600, letterSpacing: "0.04em" }}>{cat.name}</h4>
                  <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>{cat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust note */}
        <div className="flex items-start gap-3 justify-center">
          <Shield size={16} className="mt-0.5 shrink-0" style={{ color: t.givingTrustText }} />
          <p className="text-sm max-w-lg" style={{ fontFamily: "'Inter', sans-serif", color: t.givingTrustText }}>
            {giving.trustNote}
          </p>
        </div>
      </div>
    </section>
  );
}
