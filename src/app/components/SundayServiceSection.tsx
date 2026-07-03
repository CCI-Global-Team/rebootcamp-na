import { Clock, MapPin, AlertCircle, ArrowRight, CalendarDays } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

export function SundayServiceSection() {
  const { t } = useTheme();
  const { sundayService, venue } = useSiteContent();

  return (
    <section
      id="sunday-service"
      className="relative overflow-hidden"
      style={{ background: t.isDark ? "#0a0d1c" : "#faf7f2", transition: "background 0.4s ease" }}
    >
      {/* Bold top accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundImage: "linear-gradient(90deg, #8A6A00, #E8C033, #E85D04, #E8C033, #8A6A00)" }} />

      {/* Background radial glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]"
          style={{ backgroundImage: "radial-gradient(ellipse, rgba(232,93,4,0.18), transparent 65%)", filter: "blur(10px)" }} />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
            style={{ background: t.isDark ? "rgba(232,93,4,0.15)" : "rgba(232,93,4,0.1)", border: "1px solid rgba(232,93,4,0.4)" }}>
            <CalendarDays size={13} style={{ color: "#E85D04" }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.2em", color: "#E85D04", fontWeight: 700 }}>
              {sundayService.sectionLabel}
            </span>
          </div>

          <h2 className="uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.4rem, 6vw, 4rem)", color: t.textPrimary, lineHeight: 1.05 }}>
            {sundayService.heading}{" "}
            <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {sundayService.headingAccent}
            </span>
          </h2>

          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.1rem", color: t.textSecondary }}>
            {sundayService.subheading}
          </p>
        </div>

        {/* Service time cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {sundayService.services.map(({ label, time }, i) => (
            <div
              key={label}
              className="relative rounded-2xl p-6 text-center overflow-hidden group"
              style={{
                backgroundImage: t.isDark
                  ? "linear-gradient(145deg, rgba(232,192,51,0.08), rgba(232,93,4,0.06))"
                  : "linear-gradient(145deg, rgba(232,192,51,0.07), rgba(232,93,4,0.05))",
                border: `1px solid rgba(232,${i === 1 ? "93,4" : "192,51"},${t.isDark ? "0.35" : "0.28"})`,
                boxShadow: i === 1
                  ? `0 8px 32px rgba(232,93,4,${t.isDark ? "0.2" : "0.12"})`
                  : "none",
              }}
            >
              {/* Featured badge for middle card */}
              {/* {i === 1 && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-0.5 rounded-full text-white"
                  style={{ backgroundImage: t.ctaGradient, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", fontWeight: 700, whiteSpace: "nowrap" }}>
                  MOST POPULAR
                </div>
              )} */}

              <div className="w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{ background: `rgba(232,${i === 1 ? "93,4" : "192,51"},0.15)`, border: `1px solid rgba(232,${i === 1 ? "93,4" : "192,51"},0.3)` }}>
                <Clock size={16} style={{ color: i === 1 ? "#E85D04" : t.goldAccent }} />
              </div>

              <p className="uppercase mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.75rem", letterSpacing: "0.15em", color: t.textVeryMuted }}>
                {label}
              </p>
              <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: t.textPrimary, lineHeight: 1.2 }}>
                {time.split(" - ")[0]}
              </p>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: t.textMuted, marginTop: "2px" }}>
                - {time.split(" - ")[1]}
              </p>
            </div>
          ))}
        </div>

        {/* Required notice */}
        <div className="flex items-start gap-3 rounded-xl px-5 py-4 mb-8 max-w-2xl mx-auto"
          style={{ background: t.isDark ? "rgba(232,93,4,0.08)" : "rgba(232,93,4,0.06)", border: "1px solid rgba(232,93,4,0.3)" }}>
          <AlertCircle size={17} style={{ color: "#E85D04", flexShrink: 0, marginTop: "1px" }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.85rem", color: t.textSecondary, lineHeight: 1.65, margin: 0 }}>
            <strong style={{ color: "#E85D04" }}>Registration required. </strong>
            {sundayService.requiredNote.replace("Registration is required to attend any of the services. ", "")}
          </p>
        </div>

        {/* Venue note */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <MapPin size={14} style={{ color: t.goldAccent, flexShrink: 0 }} />
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: t.textMuted, textAlign: "center" }}>
            {sundayService.venueNote}
          </p>
          <a
            href={venue.sundayVenue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", color: t.goldAccent, textDecoration: "none", whiteSpace: "nowrap", letterSpacing: "0.05em" }}
            className="hover:underline"
          >
            View Map →
          </a>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href={sundayService.registrationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 px-10 py-5 rounded-2xl transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
            style={{
              backgroundImage: t.ctaGradient,
              color: "#fff",
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "1.15rem",
              letterSpacing: "0.1em",
              textDecoration: "none",
              boxShadow: "0 8px 40px rgba(232,93,4,0.4)",
            }}
          >
            <CalendarDays size={20} />
            {sundayService.ctaLabel}
            <ArrowRight size={18} className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </div>

      </div>

      {/* Bold bottom accent bar */}
      <div className="h-1.5 w-full" style={{ backgroundImage: "linear-gradient(90deg, #8A6A00, #E8C033, #E85D04, #E8C033, #8A6A00)" }} />
    </section>
  );
}
