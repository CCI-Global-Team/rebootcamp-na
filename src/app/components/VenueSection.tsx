import { CalendarDays, MapPin, Navigation, Train, Car, Bus, Clock, ExternalLink, AlertCircle, BusFront, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "@/app/utils/ImageWithFallback";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

const ICON_MAP: Record<string, React.ElementType> = { Train, Car, Bus, Clock, MapPin };

export function VenueSection() {
  const { t } = useTheme();
  const { venue } = useSiteContent();

  return (
    <section id="venue" className="relative py-24 overflow-hidden" style={{ background: t.sectionBg, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
              {venue.sectionLabel}
            </span>
            <div className="h-px w-12" style={{ background: "rgba(232,192,51,0.4)" }} />
          </div>
          <h2 className="uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: t.textPrimary }}>
            {venue.headingPlain}{" "}
            <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {venue.headingAccent}
            </span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Left — Venue Info */}
          <div className="flex flex-col gap-6">

            {/* Venue card */}
            <div className="rounded-2xl overflow-hidden" style={{ background: t.venueInfoBg, border: `1px solid ${t.venueInfoBorder}` }}>
              <div className="relative h-52 overflow-hidden">
                <ImageWithFallback src={venue.venueImageUrl} alt="Venue" className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(8,11,26,0.85) 0%, transparent 50%)" }} />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} style={{ color: t.goldAccent }} />
                    <span className="text-white text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em" }}>
                      {venue.cityDisplay}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <h3 className="mb-1 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.4rem", color: t.textPrimary }}>
                  {venue.name}
                </h3>
                <p className="mb-4 text-lg" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.05em", color: t.heroBadgeColor }}>
                  {venue.address}
                </p>

                <div className="flex flex-col gap-3">
                  {venue.facts.map(({ icon, text }) => {
                    const Icon = ICON_MAP[icon] ?? Clock;
                    return (
                      <div key={text} className="flex items-start gap-3">
                        <Icon size={15} style={{ color: t.goldAccent }} className="mt-0.5 shrink-0" />
                        <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}>{text}</span>
                      </div>
                    );
                  })}
                </div>

                <div className="flex gap-3 mt-6">
                  <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-sm transition-all duration-200 hover:scale-105" style={{ background: t.ctaGradient, color: t.ctaText, fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.06em" }}>
                    <Navigation size={14} /> GET DIRECTIONS
                  </a>
                  <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm transition-all duration-200" style={{ border: `1px solid ${t.cardBorder}`, color: t.textMuted, fontFamily: "'Barlow Condensed', sans-serif" }}>
                    <ExternalLink size={14} /> VIEW MAP
                  </a>
                </div>
              </div>
            </div>

            {/* Sunday venue notice */}
            <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(232,93,4,0.45)", background: t.isDark ? "rgba(232,93,4,0.07)" : "rgba(232,93,4,0.04)" }}>
              {/* Orange header band */}
              <div className="flex items-center gap-3 px-5 py-3" style={{ background: t.isDark ? "rgba(232,93,4,0.18)" : "rgba(232,93,4,0.12)", borderBottom: "1px solid rgba(232,93,4,0.3)" }}>
                <AlertCircle size={16} style={{ color: "#E85D04", flexShrink: 0 }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.78rem", letterSpacing: "0.14em", color: "#E85D04", textTransform: "uppercase", fontWeight: 700 }}>
                  {venue.sundayVenue.notice}
                </span>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <CalendarDays size={15} style={{ color: t.goldAccent, marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: t.textPrimary, margin: 0 }}>
                      {venue.sundayVenue.date}
                    </p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: t.textMuted, margin: "2px 0 0 0" }}>
                      {venue.sundayVenue.note}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin size={15} style={{ color: t.goldAccent, marginTop: "2px", flexShrink: 0 }} />
                  <div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: t.textPrimary, margin: 0 }}>
                      {venue.sundayVenue.name}
                    </p>
                    <p style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.04em", fontSize: "1rem", color: t.heroBadgeColor, margin: "2px 0 0 0" }}>
                      {venue.sundayVenue.address}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-1">
                  <a href={venue.sundayVenue.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded text-sm transition-all duration-200 hover:scale-105"
                    style={{ background: t.ctaGradient, color: "#000", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, letterSpacing: "0.06em", textDecoration: "none" }}>
                    <Navigation size={13} /> GET DIRECTIONS
                  </a>
                  <a href={venue.sundayVenue.mapsUrl} target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-2.5 rounded text-sm transition-all duration-200"
                    style={{ border: `1px solid ${t.cardBorder}`, color: t.textMuted, fontFamily: "'Barlow Condensed', sans-serif", textDecoration: "none" }}>
                    <ExternalLink size={13} /> VIEW MAP
                  </a>
                </div>
              </div>
            </div>

            {/* About City */}
            <div className="p-5 rounded-xl" style={{ background: t.venueTorontoBg, border: `1px solid ${t.venueTorontoBorder}` }}>
              <h4 className="mb-2 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1rem", letterSpacing: "0.06em", color: t.textPrimary }}>
                {venue.aboutCity.heading}
              </h4>
              <p className="text-sm leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}>
                {venue.aboutCity.text}
              </p>
            </div>
          </div>

          {/* Right — Map + Directions */}
          <div className="flex flex-col gap-6">
            {/* Map Embed */}
            <a href={venue.mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl overflow-hidden block relative group" style={{ border: `1px solid ${t.venueMapBorder}`, height: "300px" }}>
              <iframe
                title="Venue Map"
                src={venue.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, filter: t.venueMapFilter, pointerEvents: "none" }}
                allowFullScreen
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: "rgba(8,11,26,0.55)" }}>
                <div className="flex items-center gap-2 px-5 py-3 rounded-lg" style={{ background: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.08em", fontSize: "0.9rem" }}>
                  <Navigation size={15} /> OPEN IN GOOGLE MAPS
                </div>
              </div>
            </a>

            {/* Transport registration card */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ background: t.isDark ? "rgba(232,192,51,0.06)" : "rgba(232,192,51,0.04)", border: `1px solid rgba(232,192,51,${t.isDark ? "0.3" : "0.22"})` }}
            >
              <div
                className="flex items-center gap-3 px-5 py-3"
                style={{ background: t.isDark ? "rgba(232,192,51,0.12)" : "rgba(232,192,51,0.09)", borderBottom: `1px solid rgba(232,192,51,${t.isDark ? "0.25" : "0.18"})` }}
              >
                <BusFront size={15} style={{ color: t.goldAccent, flexShrink: 0 }} />
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", color: t.goldAccent, textTransform: "uppercase", fontWeight: 700 }}>
                  {venue.transport.label}
                </span>
              </div>
              <div className="px-5 py-4 flex flex-col gap-3">
                <div>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.1rem", color: t.textPrimary, margin: "0 0 4px 0" }}>
                    {venue.transport.heading}
                  </p>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.82rem", color: t.textSecondary, lineHeight: 1.6, margin: 0 }}>
                    {venue.transport.desc}
                  </p>
                </div>
                <a
                  href={venue.transport.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-2 py-3 px-5 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:shadow-lg"
                  style={{ background: t.ctaGradient, color: "#fff", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "0.88rem", letterSpacing: "0.09em", textDecoration: "none", boxShadow: "0 4px 20px rgba(232,93,4,0.28)" }}
                >
                  <BusFront size={15} />
                  {venue.transport.ctaLabel}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Directions */}
            <div className="flex flex-col gap-4">
              {venue.directions.map(({ icon, title, steps }) => {
                const Icon = ICON_MAP[icon] ?? Car;
                return (
                  <div key={title} className="p-5 rounded-xl" style={{ background: t.venueDirBg, border: `1px solid ${t.venueDirBorder}` }}>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "rgba(232,192,51,0.1)" }}>
                        <Icon size={15} style={{ color: t.goldAccent }} />
                      </div>
                      <h4 style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.04em", color: t.textPrimary }}>{title}</h4>
                    </div>
                    <ul className="flex flex-col gap-2">
                      {steps.map((step, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-xs" style={{ background: "rgba(232,192,51,0.15)", color: t.goldAccent, fontFamily: "'Oswald', sans-serif" }}>
                            {i + 1}
                          </span>
                          <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}>{step}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
