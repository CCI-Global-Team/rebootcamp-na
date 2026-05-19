import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import { motion } from "framer-motion";
import { MapPin, Calendar, Ticket, Music, BookOpen, Users, Zap, ArrowRight, ExternalLink, CheckCircle } from "lucide-react";
import { fadeUp, scaleIn, stagger } from "@/app/components/ui/animation";

const ICON_MAP: Record<string, React.ElementType> = { Music, BookOpen, Users, Zap, Ticket, Calendar, MapPin };

export function RegistrationSection() {
  const { t } = useTheme();
  const { registration, event, venue } = useSiteContent();

  return (
    <section id="register" className="relative py-24 overflow-hidden" style={{ backgroundImage: t.sectionBgAlt, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: t.topDivider }} />

      {/* Background ambient glow */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse, #E8C033, transparent 68%)", opacity: t.isDark ? 0.08 : 0.05 }} />
      <div className="absolute bottom-0 right-0 w-[400px] h-[300px] pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at bottom right, #E85D04, transparent 65%)", opacity: t.isDark ? 0.07 : 0.04 }} />

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ backgroundImage: `rgba(${t.accentRgb},0.4)` }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
              {registration.sectionLabel}
            </span>
            <div className="h-px w-12" style={{ backgroundImage: `rgba(${t.accentRgb},0.4)` }} />
          </div>
          <h2 className="uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: t.textPrimary }}>
            {registration.headingPlain}{" "}
            <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {registration.headingAccent}
            </span>
          </h2>
          <p className="max-w-lg mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>
            {registration.description}
          </p>
        </motion.div>

        {/* Highlights Grid */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-14"
        >
          {registration.highlights.map(({ icon, color, rgb, title, imgUrl }) => {
            const Icon = ICON_MAP[icon] ?? Zap;
            return (
              <div key={title} className="rounded-2xl overflow-hidden flex flex-col transition-transform duration-200 hover:-translate-y-1"
                style={{ border: `1px solid rgba(${rgb},${t.isDark ? "0.25" : "0.18"})` }}
              >
                {/* Image */}
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={imgUrl}
                    alt={title}
                    className="w-full h-full object-cover"
                    style={{ filter: t.isDark ? "brightness(0.85)" : "brightness(0.9)" }}
                  />
                  {/* Colour tint overlay */}
                  <div className="absolute inset-0" style={{ background: `rgba(${rgb},0.18)` }} />
                  {/* Icon badge */}
                  <div className="absolute top-3 left-3 w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: "rgba(0,0,0,0.45)", backdropFilter: "blur(4px)" }}>
                    <Icon size={15} style={{ color }} />
                  </div>
                </div>
                {/* Title bar */}
                <div className="px-4 py-3" style={{ background: t.isDark ? `rgba(${rgb},0.07)` : `rgba(${rgb},0.05)` }}>
                  <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem", color: t.textPrimary, letterSpacing: "0.03em" }}>{title}</p>
                </div>
              </div>
            );
          })}
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-3xl overflow-hidden"
          style={{ border: `1px solid rgba(${t.accentRgb},${t.isDark ? "0.3" : "0.2"})`, boxShadow: t.isDark ? "0 24px 80px rgba(232,93,4,0.15)" : "0 16px 60px rgba(232,93,4,0.10)" }}
        >
          {/* Gold top band */}
          <div className="h-1.5 w-full" style={{ backgroundImage: "linear-gradient(90deg, #8A6A00, #E8C033, #E85D04, #E8C033, #8A6A00)" }} />

          <div className="grid lg:grid-cols-2">

            {/* Left — event details */}
            <motion.div
              variants={stagger}
              className="p-8 sm:p-10 flex flex-col justify-center gap-6"
              style={{ backgroundColor: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }}
            >
              <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.72rem", letterSpacing: "0.15em", color: t.goldAccent, textTransform: "uppercase" }}>
                Event Details
              </p>

              <div className="flex flex-col gap-4">
                <motion.div variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundImage: `rgba(${t.accentRgb},0.12)`, border: `1px solid rgba(${t.accentRgb},0.25)` }}>
                    <Calendar size={16} style={{ color: t.goldAccent }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: t.textPrimary }}>{event.dates}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: t.textMuted }}>Friday evening through Sunday afternoon</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundImage: `rgba(${t.accentRgb},0.12)`, border: `1px solid rgba(${t.accentRgb},0.25)` }}>
                    <MapPin size={16} style={{ color: t.goldAccent }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: t.textPrimary }}>{venue.name}</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: t.textMuted }}>{venue.address}</p>
                  </div>
                </motion.div>

                <motion.div variants={fadeUp} className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5" style={{ backgroundImage: "rgba(52,211,153,0.12)", border: "1px solid rgba(52,211,153,0.25)" }}>
                    <Ticket size={16} style={{ color: "#34D399" }} />
                  </div>
                  <div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.95rem", color: "#34D399" }}>Free Admission</p>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", color: t.textMuted }}>Registration required</p>
                  </div>
                </motion.div>
              </div>

              {/* What's included */}
              <div>
                <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.72rem", letterSpacing: "0.12em", color: t.textVeryMuted, textTransform: "uppercase", marginBottom: "10px" }}>
                  What&rsquo;s Included
                </p>
                <motion.ul variants={stagger} className="flex flex-col gap-2">
                  {registration.included.map((item) => (
                    <motion.li variants={fadeUp} key={item} className="flex items-center gap-2.5">
                      <CheckCircle size={13} style={{ color: t.goldAccent, flexShrink: 0 }} />
                      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.8rem", color: t.textSecondary }}>{item}</span>
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </motion.div>

            {/* Right — CTA */}
            <motion.div
              variants={fadeUp}
              className="p-8 sm:p-10 flex flex-col items-center justify-center gap-8 text-center"
              style={{
                backgroundImage: t.isDark
                  ? "linear-gradient(145deg, rgba(232,192,51,0.06) 0%, rgba(232,93,4,0.08) 100%)"
                  : "linear-gradient(145deg, rgba(232,192,51,0.05) 0%, rgba(232,93,4,0.06) 100%)",
                borderLeft: `1px solid rgba(${t.accentRgb},${t.isDark ? "0.15" : "0.10"})`,
              }}
            >
              {/* Pulse ring decoration */}
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.15, 0.4] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-32 h-32 rounded-full"
                  style={{ background: `rgba(${t.accentRgb},0.06)` }}
                />

                <motion.div
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }}
                  transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute w-20 h-20 rounded-full"
                  style={{ background: `rgba(${t.accentRgb},0.08)` }}
                />

                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-16 h-16 rounded-full flex items-center justify-center relative z-10"
                  style={{ background: t.ctaGradient, boxShadow: "0 8px 32px rgba(232,93,4,0.4)" }}
                >
                  <Ticket size={26} color="#fff" />
                </motion.div>
              </div>

              <div className="uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.6rem", color: t.textPrimary, lineHeight: 1.1 }}>
                <p className="mb-2">{registration.urgencyHeadingPlain}</p>
                <p style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                  {registration.urgencyHeadingAccent}
                </p>
              </div>

              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 py-4 px-8 rounded-xl transition-all duration-200 hover:scale-[1.03] hover:shadow-2xl"
                style={{ backgroundImage: t.ctaGradient, color: "#fff", fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.1rem", letterSpacing: "0.1em", textDecoration: "none", boxShadow: "0 6px 32px rgba(232,93,4,0.35)" }}
              >
                {registration.ctaLabel}
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.6 }}
                >
                  <ArrowRight size={18} />
                </motion.span>
              </a>

              <a
                href={event.registrationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 transition-opacity duration-200 hover:opacity-70"
                style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.73rem", color: t.textVeryMuted, textDecoration: "none" }}
              >
                <ExternalLink size={11} />
                {registration.externalNote}
              </a>

              <div className="w-full" style={{ borderTop: `1px solid rgba(${t.accentRgb},0.12)` }} />

              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: t.textVeryMuted, lineHeight: 1.6 }}>
                {registration.contactNote.split("\n").map((line, i) => (
                  <span key={i}>{line}{i < registration.contactNote.split("\n").length - 1 && <br />}</span>
                ))}{" "}
                <a href={`mailto:${registration.contactEmail}`} style={{ color: t.goldAccent }}>{registration.contactEmail}</a>
              </p>
            </motion.div>

          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
