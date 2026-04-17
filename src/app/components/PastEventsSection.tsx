import { useState } from "react";
import { Play, ExternalLink, Calendar, MapPin } from "lucide-react";
import { ImageWithFallback } from "@/app/utils/ImageWithFallback";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

export function PastEventsSection() {
  const { t } = useTheme();
  const { pastEvents } = useSiteContent();
  const [activeEvent, setActiveEvent] = useState(0);
  const [galleryIndex, setGalleryIndex] = useState<null | { event: number; img: number }>(null);
  const event = pastEvents.events?.[activeEvent];

  if (!event) return null;

  return (
    <section id="past-events" className="relative py-24 overflow-hidden" style={{ background: t.sectionBgAlt2, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
            <span className="uppercase tracking-widest text-xs" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }}>
              {pastEvents.sectionLabel}
            </span>
            <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
          </div>
          <h2 className="uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: t.textPrimary }}>
            {pastEvents.headingPlain}{" "}
            <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {pastEvents.headingAccent}
            </span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>
            {pastEvents.description}
          </p>
        </div>

        {/* Event Tabs */}
        <div className="flex gap-3 mb-8 justify-center">
          {pastEvents.events.map((e, i) => (
            <button key={e.year} onClick={() => setActiveEvent(i)} className="px-5 py-2 rounded-lg transition-all duration-200"
              style={{ background: activeEvent === i ? t.ctaGradient : t.pastTabInactiveBg, border: activeEvent === i ? "none" : `1px solid ${t.pastTabInactiveBorder}`, color: activeEvent === i ? t.ctaText : t.pastTabInactiveColor, fontFamily: "'Oswald', sans-serif", fontWeight: activeEvent === i ? 700 : 500, fontSize: "0.95rem", letterSpacing: "0.04em" }}
            >
              {e.year} — {e.theme}
            </button>
          ))}
        </div>

        {/* Active Event */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {/* Main Image */}
          <div className="relative rounded-2xl overflow-hidden" style={{ height: "380px" }}>
            <ImageWithFallback src={event.imgUrl} alt={event.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0" style={{ background: t.pastEventImgGradient }} />
            <div className="absolute bottom-6 left-6 right-6">
              <h3 className="text-white mb-1 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.5rem", lineHeight: 1.1 }}>
                {event.title}
              </h3>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs" style={{ background: `rgba(${t.accentRgb},0.2)`, border: `1px solid rgba(${t.accentRgb},0.4)`, color: t.goldAccent, fontFamily: "'Barlow Condensed', sans-serif" }}>
                  Theme: {event.theme}
                </span>
                <span className="text-white/60 text-sm" style={{ fontFamily: "'Inter', sans-serif" }}>{event.attendees} Attendees</span>
              </div>
            </div>
          </div>

          {/* Details + Gallery */}
          <div className="flex flex-col gap-5">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <MapPin size={14} style={{ color: t.goldAccent }} />
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}>{event.location}</span>
                <span style={{ color: t.textDim }}>·</span>
                <Calendar size={14} style={{ color: t.goldAccent }} />
                <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}>{event.year}</span>
              </div>
              <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: t.pastDetailTextColor }}>
                {event.highlights}
              </p>
            </div>

            {/* Gallery grid */}
            <div>
              <p className="uppercase text-xs tracking-widest mb-3" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.textVeryMuted }}>
                {pastEvents.galleryLabel}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {event.gallery.map((imgUrl, i) => (
                  <button key={i} onClick={() => setGalleryIndex({ event: activeEvent, img: i })} className="relative rounded-lg overflow-hidden aspect-square group">
                    <ImageWithFallback src={imgUrl} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center" style={{ background: `rgba(${t.accentRgb},0.25)` }}>
                      <ExternalLink size={18} className="text-white" />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl" style={{ background: t.pastTestimonyBg, border: `1px solid ${t.pastTestimonyBorder}` }}>
              <p className="text-sm uppercase tracking-wider mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }}>
                {pastEvents.testimonyLabel}
              </p>
              <p className="text-sm italic leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", lineHeight: 1.7, color: t.pastTestimonyText }}>
                {pastEvents.testimony.text}
              </p>
              <p className="text-xs mt-2" style={{ fontFamily: "'Inter', sans-serif", color: t.pastTestimonyAttrib }}>
                — {pastEvents.testimony.attribution}, {event.year}
              </p>
            </div>
          </div>
        </div>

        {/* Sermons Section */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1" style={{ background: t.pastSermonsDivider }} />
            <h3 className="uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.3rem", letterSpacing: "0.06em", color: t.textPrimary }}>
              {pastEvents.sermonsSectionTitle}
            </h3>
            <div className="h-px flex-1" style={{ background: t.pastSermonsDivider }} />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {pastEvents.sermons.map((sermon) => (
              <a key={sermon.title} href={sermon.youtubeUrl} className="rounded-xl overflow-hidden group hover:scale-[1.03] transition-transform duration-300 block" style={{ background: t.pastSermonCardBg, border: `1px solid ${t.pastSermonCardBorder}` }}>
                <div className="relative h-40 overflow-hidden">
                  <ImageWithFallback src={sermon.thumbnailUrl} alt={sermon.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 flex items-center justify-center" style={{ background: t.pastSermonCardImgOverlay }}>
                    <div className="w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform" style={{ background: t.ctaGradient }}>
                      <Play size={18} fill={t.ctaText} className="ml-0.5" style={{ color: t.ctaText }} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-xs" style={{ background: "rgba(0,0,0,0.7)", color: "white", fontFamily: "'Barlow Condensed', sans-serif" }}>
                    {sermon.duration}
                  </div>
                </div>

                <div className="p-3">
                  <h4 className="mb-1 line-clamp-2" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.95rem", fontWeight: 600, color: t.pastSermonTitle }}>
                    {sermon.title}
                  </h4>
                  <p className="text-xs mb-1" style={{ fontFamily: "'Inter', sans-serif", color: t.goldAccent }}>{sermon.speaker}</p>
                  <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: t.pastSermonMeta }}>{sermon.event} · {sermon.views} views</p>
                </div>
              </a>
            ))}
          </div>

          <div className="text-center mt-6">
            <a href={pastEvents.youtubeChannelUrl} className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:opacity-80" style={{ border: `1px solid ${t.pastViewAllBorder}`, color: t.pastViewAllColor, fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.9rem", letterSpacing: "0.08em" }}>
              <Play size={14} />
              {pastEvents.viewAllLabel}
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {/* {galleryIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.9)" }} onClick={() => setGalleryIndex(null)}>
          <img src={pastEvents.events[galleryIndex.event].gallery[galleryIndex.img]} alt="Gallery" className="max-w-full max-h-full rounded-xl" style={{ maxHeight: "80vh" }} />
        </div>
      )} */}
    </section>
  );
}
