import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { Baby, AlertTriangle, ArrowRight } from "lucide-react";

export function ChildcareSection() {
  const { t } = useTheme();
  const { childcare } = useSiteContent();

  function trackChildcareRegistrationClick() {
    track("Registration CTA Clicked", {
      cta: "childcare_registration",
      page: "/",
    });
  }

  return (
    <section
      id="childcare"
      className="relative py-20 overflow-hidden"
      style={{ backgroundColor: t.sectionBg, transition: "background 0.4s ease" }}
    >
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      {/* Ambient glow */}
      <div
        className="absolute -bottom-20 right-0 w-96 h-96 pointer-events-none"
        style={{ backgroundImage: "radial-gradient(ellipse at bottom right, #E85D04, transparent 65%)", opacity: t.isDark ? 0.07 : 0.04 }}
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section label */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <div className="h-px w-12" style={{ backgroundColor: `rgba(${t.accentRgb},0.4)` }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
            {childcare.sectionLabel}
          </span>
          <div className="h-px w-12" style={{ backgroundColor: `rgba(${t.accentRgb},0.4)` }} />
        </div>

        <div className="grid lg:grid-cols-2 gap-10 items-center">

          {/* Banner */}
          <div className="flex justify-center lg:justify-end">
            <div
              className="rounded-2xl overflow-hidden"
              style={{
                maxWidth: "380px",
                width: "100%",
                boxShadow: t.isDark
                  ? "0 24px 80px rgba(232,93,4,0.25), 0 0 0 1px rgba(232,192,51,0.15)"
                  : "0 16px 60px rgba(232,93,4,0.18), 0 0 0 1px rgba(232,192,51,0.12)",
              }}
            >
              <Image
                src={childcare.imageUrl}
                alt="CelebKids Childcare Registration"
                width={2160}
                height={2700}
                sizes="(min-width: 1024px) 380px, 100vw"
                className="h-auto w-full block"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">

            <div>
              <h2 className="uppercase mb-3 leading-tight" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: t.textPrimary, lineHeight: 1.1 }}>
                {childcare.headingPlain}{" "}
                <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {childcare.headingAccent}
                </span>
              </h2>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", color: t.textSecondary, lineHeight: 1.7 }}>
                {childcare.description}
              </p>
            </div>

            {/* Compulsory notice */}
            <div
              className="flex items-start gap-3 rounded-xl px-5 py-4"
              style={{
                backgroundColor: t.isDark ? "rgba(232,93,4,0.10)" : "rgba(232,93,4,0.07)",
                border: `1px solid ${t.isDark ? "rgba(232,93,4,0.35)" : "rgba(232,93,4,0.28)"}`,
              }}
            >
              <AlertTriangle size={18} style={{ color: "#E85D04", marginTop: "2px", flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#E85D04", letterSpacing: "0.04em", marginBottom: "2px" }}>
                  {childcare.compulsoryTitle}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: t.textSecondary, lineHeight: 1.6, margin: 0 }}>
                  {childcare.compulsoryNote}
                </p>
              </div>
            </div>

            {/* Detail chips */}
            <div className="flex flex-wrap gap-3">
              {childcare.chips.map(({ label }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full"
                  style={{ background: `rgba(${t.accentRgb},0.08)`, border: `1px solid rgba(${t.accentRgb},0.2)` }}
                >
                  <Baby size={13} style={{ color: t.goldAccent }} />
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.8rem", letterSpacing: "0.05em", color: t.textSecondary }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <a
              href={childcare.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackChildcareRegistrationClick}
              className="group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-2xl self-start"
              style={{
                background: t.ctaGradient,
                color: "#fff",
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.1em",
                textDecoration: "none",
                boxShadow: "0 6px 32px rgba(232,93,4,0.35)",
              }}
            >
              <Baby size={18} />
              {childcare.ctaLabel}
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
