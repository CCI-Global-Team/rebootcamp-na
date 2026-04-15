import { Flame, Users, Globe, Star } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import { motion } from "framer-motion";
import { fadeUp, scaleIn, stagger } from "@/app/components/ui/animation";

const ICON_MAP: Record<string, React.ElementType> = { Users, Globe, Star, Flame };

export function AboutSection() {
  const { t } = useTheme();
  const { about, event } = useSiteContent();

  return (
    <section id="about" className="relative py-24 overflow-hidden" style={{ backgroundImage: t.sectionBgAlt, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      <motion.div
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Section Label */}
        <div className="flex items-center gap-3 mb-4">
          <div className="h-px flex-1 max-w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
          <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
            {about.sectionLabel}
          </span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div variants={fadeUp}>
            <h2 className="mb-6 uppercase leading-tight" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2.2rem, 5vw, 3.5rem)", color: t.textPrimary, lineHeight: 1.1 }}>
              {about.headingPlain}{" "}
              <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                {about.headingAccent}
              </span>
            </h2>

            <motion.div variants={stagger}>
              {about.paragraphs.map((para, i) => {
                // Replace {theme} placeholder with a styled span
                const parts = para.split("{theme}");
                return (
                  <motion.p
                    variants={fadeUp}
                    key={i}
                    className="mb-5 leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", color: t.textSecondary }}
                  >
                    {parts.length > 1 ? (
                      <>
                        {parts[0]}
                        <strong style={{ color: t.goldAccent }}>&ldquo;{event.theme}&rdquo;</strong>
                        {parts[1]}
                      </>
                    ) : para}
                  </motion.p>
                );
              })}
            </motion.div>

            {/* Verse highlight */}
            <motion.div
              variants={fadeUp}
              className="p-5 rounded-lg mb-8 relative overflow-hidden"
              style={{ background: t.aboutVerseBg, border: `1px solid ${t.aboutVerseBorder}` }}
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-lg" style={{ background: t.ctaGradient }} />
              <p className="italic pl-4" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1rem", lineHeight: 1.7, color: t.aboutVerseText }}>
                {about.verse.text}
              </p>
              <p className="pl-4 mt-2 text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.08em", color: t.goldAccent }}>
                {about.verse.reference}
              </p>
            </motion.div>

            <motion.a
              variants={fadeUp}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href="#register"
              onClick={(e) => { e.preventDefault(); document.querySelector("#register")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:scale-105"
              style={{ background: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.95rem" }}
            >
              <Flame size={16} />
              {about.ctaLabel}
            </motion.a>
          </motion.div>

          {/* Right — Stats & highlights */}
          <motion.div variants={fadeUp} className="flex flex-col gap-6">
            {/* Stats grid */}
            <motion.div variants={stagger} className="grid grid-cols-2 gap-4">
              {about.stats.map(({ icon, value, label }) => {
                const Icon = ICON_MAP[icon] ?? Flame;
                return (
                  <motion.div
                    variants={scaleIn}
                    whileHover={{ scale: 1.05 }}
                    key={label}
                    className="p-5 rounded-xl flex flex-col gap-2 group transition-transform duration-200"
                    style={{ backgroundImage: t.aboutStatCardBg, border: `1px solid ${t.aboutStatCardBorder}` }}
                  >
                    <Icon size={20} style={{ color: t.goldAccent }} />
                    <div style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.8rem", fontWeight: 700, color: t.textPrimary }}>{value}</div>
                    <div className="text-sm uppercase tracking-wider" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.textVeryMuted }}>{label}</div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* What to Expect */}
            <motion.div
              variants={fadeUp}
              className="p-6 rounded-xl"
              style={{ backgroundImage: t.aboutHighlightBg, border: `1px solid ${t.aboutHighlightBorder}` }}
            >
              <h3 className="mb-4 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.1rem", letterSpacing: "0.08em", color: t.textPrimary }}>
                What to Expect
              </h3>
              <motion.ul variants={stagger} className="flex flex-col gap-3">
                {about.whatToExpect.map((item) => (
                  <motion.li variants={fadeUp} key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0" style={{ background: t.goldAccent }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: t.aboutListItemText }}>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
