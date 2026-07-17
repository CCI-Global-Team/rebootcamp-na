import { useEffect, useRef, useState } from "react";
import { ImageWithFallback } from "@/app/utils/ImageWithFallback";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger } from "@/app/components/ui/animation";
import { X } from "lucide-react";

function VideoModal({ speaker, onClose }: { speaker: { name: string; videoUrl: string }; onClose: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="relative flex flex-col items-center gap-3"
        style={{ maxWidth: "360px", width: "90vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 flex items-center gap-1.5 transition-opacity hover:opacity-70"
          style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.7)" }}
        >
          <X size={18} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em" }}>CLOSE</span>
        </button>

        {/* Speaker name */}
        <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.18em", color: "rgba(232,192,51,0.9)", textTransform: "uppercase" }}>
          {speaker.name}
        </p>

        {/* Video */}
        <div className="rounded-2xl overflow-hidden w-full" style={{ background: "#000", border: "1px solid rgba(255,255,255,0.1)" }}>
          <video
            ref={videoRef}
            src={speaker.videoUrl}
            controls
            autoPlay
            playsInline
            preload="metadata"
            className="w-full h-full block"
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>
    </div>
  );
}

export function SpeakersSection() {
  const { t } = useTheme();
  const { speakers } = useSiteContent();
  const [activeVideo, setActiveVideo] = useState<{ name: string; videoUrl: string } | null>(null);

  const invited = speakers?.invited ?? [];
  const main = speakers?.main;

  return (
    <section
      id="speakers"
      className="relative py-24 overflow-hidden"
      style={{ background: t.sectionBgAlt2, transition: "background 0.4s ease" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: t.topDivider }}
      />

      {/* Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #E8C033, transparent 70%)",
          opacity: t.isDark ? 0.1 : 0.06
        }}
      />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div
              className="h-px w-12"
              style={{ background: `rgba(${t.accentRgb},0.4)` }}
            />
            <span
              style={{
                fontFamily: "'Barlow Condensed', sans-serif",
                color: t.goldAccent
              }}
              className="uppercase text-xs tracking-widest"
            >
              {speakers.sectionLabel}
            </span>
            <div
              className="h-px w-12"
              style={{ background: `rgba(${t.accentRgb},0.4)` }}
            />
          </div>

          <h2
            className="uppercase"
            style={{
              fontFamily: "'Oswald', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(2rem, 5vw, 3rem)",
              color: t.textPrimary
            }}
          >
            {speakers.headingPlain}{" "}
            <span
              style={{
                backgroundImage: t.titleGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              {speakers.headingAccent}
            </span>
          </h2>
        </motion.div>

        {/* Main Speaker */}
        {main && (
          <motion.div
            variants={fadeUp}
            className="rounded-2xl overflow-hidden mb-12 relative"
            style={{
              background: t.mainSpeakerBg,
              border: `1px solid ${t.mainSpeakerBorder}`
            }}
          >
            <div
              className="absolute top-4 left-4 z-10 px-3 py-1 rounded text-xs uppercase tracking-widest"
              style={{
                backgroundImage: t.ctaGradient,
                color: t.ctaText,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 700
              }}
            >
              {speakers.mainBadge}
            </div>

            <div className="grid md:grid-cols-2 gap-0">
              {/* Image */}
              <div
                className="relative overflow-hidden"
                style={{ minHeight: "380px" }}
              >
                <motion.div
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  viewport={{ once: true }}
                  className="absolute inset-0"
                >
                  <Image
                    src={main.imgUrl}
                    alt="Main Speaker"
                    fill
                    priority
                    className="object-cover object-top w-full h-auto"
                    style={{ filter: "brightness(0.9)" }}
                    loading="eager"
                  />
                </motion.div>

                <div
                  className="absolute inset-0"
                  style={{ backgroundImage: t.mainSpeakerImgGradient }}
                />
              </div>

              {/* Content */}
              <motion.div
                variants={stagger}
                className="p-6 lg:p-8 flex flex-col justify-center"
              >
                <motion.div variants={fadeUp}>
                  <div
                    className="uppercase text-xs tracking-widest mb-3"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      color: t.goldAccent
                    }}
                  >
                    {speakers.mainLabel}
                  </div>

                  <h3
                    className="mb-2 uppercase"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontWeight: 700,
                      fontSize: "2rem",
                      lineHeight: 1.1,
                      color: t.textPrimary
                    }}
                  >
                    {main.name}
                  </h3>

                  <p
                    className="mb-6"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      letterSpacing: "0.06em",
                      fontSize: "0.9rem",
                      color: t.goldAccent
                    }}
                  >
                    {main.title}
                  </p>

                  <p
                    className="mb-8 leading-relaxed"
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.95rem",
                      color: t.textSecondary
                    }}
                  >
                    {main.bio}
                  </p>
                </motion.div>

                {/* Instagram Reels */}
                <motion.div variants={stagger}>
                  <div className="flex items-center gap-2 mb-3">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: t.goldAccent }}>
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                    <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: t.textVeryMuted, textTransform: "uppercase" }}>
                      {main.excerptsTitle}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {main.excerpts.map(({url, caption}) => (
                      <div key={caption} className="rounded-xl overflow-hidden" style={{ border: `1px solid rgba(${t.accentRgb},0.2)`, background: "#000", aspectRatio: "9/16" }}>
                        <video
                          src={url}
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full h-full block"
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Main Speaker - specialties */}
                <motion.div
                  variants={stagger}
                  className="flex flex-wrap gap-2 mt-8"
                >
                  {main.specialties?.map((s) => (
                    <motion.span
                      key={s}
                      variants={scaleIn}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        background: `rgba(${t.accentRgb},0.1)`,
                        border: `1px solid rgba(${t.accentRgb},0.3)`,
                        color: t.goldAccent,
                        fontFamily: "'Barlow Condensed', sans-serif",
                        letterSpacing: "0.05em"
                      }}
                    >
                      {s}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Invited Speakers */}
        <motion.div variants={fadeUp}>
          <h3
            className="uppercase text-sm tracking-widest mb-6 text-center"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              color: t.textVeryMuted
            }}
          >
            {speakers.invitedLabel}
          </h3>

          <motion.div
            variants={stagger}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
          >
            {invited.map((speaker) => {
              const hasVideo = !!speaker.videoUrl;

              return (
                <motion.div
                  key={speaker.name}
                  variants={scaleIn}
                  className="rounded-xl overflow-hidden group transition-transform duration-300"
                  style={{ background: t.speakerCardBg, border: `1px solid ${t.speakerCardBorder}`, transform: "translateY(0)", cursor: hasVideo ? "pointer" : "default" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)"; }}
                  onClick={() => hasVideo && setActiveVideo({ name: speaker.name, videoUrl: speaker.videoUrl })}
                >
                  <div className="relative h-52 overflow-hidden">
                    <ImageWithFallback
                      src={speaker.imgUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ backgroundImage: t.speakerImgGradient }}
                    />

                    {/* Play button overlay — only if video exists */}
                    {hasVideo && (
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div
                          className="flex items-center gap-2 px-4 py-2 rounded-full"
                          style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)" }}
                        >
                          <svg width="12" height="14" viewBox="0 0 12 14" fill="white">
                            <path d="M1 1l10 6-10 6V1z"/>
                          </svg>
                          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.75rem", letterSpacing: "0.12em", color: "#fff" }}>
                            WATCH
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Subtle persistent video indicator — bottom-right corner */}
                    {hasVideo && (
                      <div
                        className="absolute bottom-2.5 right-2.5 w-7 h-7 rounded-full flex items-center justify-center"
                        style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", border: "1px solid rgba(255,255,255,0.2)" }}
                      >
                        <svg width="9" height="10" viewBox="0 0 9 10" fill="white">
                          <path d="M1 1l7 4-7 4V1z"/>
                        </svg>
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h4
                      style={{
                        fontFamily: "'Oswald', sans-serif",
                        fontWeight: 600,
                        fontSize: "1.05rem",
                        color: t.textPrimary
                      }}
                    >
                      {speaker.name}
                    </h4>

                    <p
                      className="text-sm mt-1"
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        color: t.textMuted
                      }}
                    >
                      {speaker.title}
                    </p>

                    <div className="flex items-center justify-between mt-3">
                      <span
                        className="text-xs"
                        style={{
                          color: t.goldAccent,
                          fontFamily: "'Barlow Condensed', sans-serif"
                        }}
                      >
                        {speaker.specialty}
                      </span>
                      <span
                        className="text-xs"
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          color: t.textVeryMuted
                        }}
                      >
                        {speaker.city}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>

      {activeVideo && <VideoModal speaker={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}
