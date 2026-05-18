import { useState } from "react";
import { Clock, Music, BookOpen, Zap, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import { fadeUp, stagger } from "@/app/components/ui/animation";

type SessionType = "worship" | "preaching" | "prayer" | "special" | "break";

export function ScheduleSection() {
  const { t } = useTheme();
  const { schedule } = useSiteContent();
  const [activeDay, setActiveDay] = useState(0);

  const days = schedule?.days ?? [];
  const current = days[activeDay] ?? days[0];

  const typeConfig: Record<SessionType, { color: string; bg: string; icon: React.ElementType; label: string }> = {
    worship: {
      color: "#A78BFA",
      bg: "rgba(167,139,250,0.1)",
      icon: Music,
      label: "Worship"
    },
    preaching: {
      color: t.goldAccent,
      bg: `rgba(${t.accentRgb},0.1)`,
      icon: BookOpen,
      label: "Preaching"
    },
    prayer: {
      color: "#34D399",
      bg: "rgba(52,211,153,0.1)",
      icon: Star,
      label: "Prayer"
    },
    special: {
      color: "#E85D04",
      bg: "rgba(232,93,4,0.1)",
      icon: Zap,
      label: "Special"
    },
    break: {
      color: "#6B7280",
      bg: "rgba(107,114,128,0.1)",
      icon: Clock,
      label: "Break"
    }
  };

  return (
    <section
      id="schedule"
      className="relative py-24 overflow-hidden"
      style={{ background: t.sectionBg, transition: "background 0.4s ease" }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: t.topDivider }}
      />

      <motion.div
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"
        variants={stagger}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-12">
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
              {schedule.sectionLabel}
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
            {schedule.headingPlain}{" "}
            <span
              style={{
                backgroundImage: t.titleGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text"
              }}
            >
              {schedule.headingAccent}
            </span>
          </h2>

          <p
            className="mt-3 max-w-xl mx-auto"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: t.scheduleSubtitle
            }}
          >
            {schedule.subtitle}
          </p>
        </motion.div>

        {/* Day Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2 justify-center">
          {days.map((d, i) => (
            <motion.button
              key={d.day}
              onClick={() => setActiveDay(i)}
              whileTap={{ scale: 0.97 }}
              animate={{ scale: activeDay === i ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 px-5 py-3 rounded-lg cursor-pointer"
              style={{
                background:
                  activeDay === i
                    ? t.ctaGradient
                    : t.scheduleTabInactiveBg,
                border:
                  activeDay === i
                    ? "none"
                    : `1px solid ${t.scheduleTabInactiveBorder}`,
                color:
                  activeDay === i
                    ? t.ctaText
                    : t.scheduleTabInactiveColor,
                fontFamily: "'Oswald', sans-serif",
                fontWeight: activeDay === i ? 700 : 500,
                letterSpacing: "0.05em"
              }}
            >
              <div className="text-xs uppercase tracking-wider opacity-75">
                {d.label}
              </div>
              <div className="text-base">
                {d.day} — {d.date}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Sessions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeDay}
            variants={stagger}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col gap-2"
          >
            {current?.sessions?.map((session, i) => {
              const config =
                typeConfig[session.type as SessionType] ??
                typeConfig.break;

              const Icon = config.icon;

              return (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ scale: 1.01 }}
                  className="flex gap-4 p-4 rounded-xl group transition-transform duration-200"
                  style={{
                    background:
                      session.type !== "break"
                        ? t.scheduleRowBg
                        : "transparent",
                    border:
                      session.type !== "break"
                        ? `1px solid ${t.scheduleRowBorder}`
                        : "none",
                    opacity: session.type === "break" ? 0.7 : 1,
                    willChange: "transform"
                  }}
                >
                  {/* Time (HIDDEN) */}
                  {/* <div
                    className="w-20 shrink-0 pt-0.5 text-right"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontSize: "0.85rem",
                      color: t.scheduleTimeColor,
                      letterSpacing: "0.04em"
                    }}
                  >
                    {session.time}
                  </div> */}

                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                      style={{
                        background: config.bg,
                        border: `1px solid ${config.color}40`
                      }}
                    >
                      <Icon size={13} style={{ color: config.color }} />
                    </motion.div>

                    {i < current.sessions.length - 1 && (
                      <div
                        className="w-px flex-1 mt-1"
                        style={{
                          background: t.scheduleTimelineDot,
                          minHeight: "16px"
                        }}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <div>
                        <h4
                          style={{
                            fontFamily: "'Barlow Condensed', sans-serif",
                            fontSize: "1rem",
                            fontWeight: 600,
                            letterSpacing: "0.03em",
                            color: t.textPrimary
                          }}
                        >
                          {session.title}
                        </h4>

                        {"speaker" in session && session.speaker && (
                          <p
                            className="text-sm mt-0.5"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: config.color,
                              opacity: 0.85
                            }}
                          >
                            {session.speaker}
                          </p>
                        )}

                        {"note" in session && session.note && (
                          <p
                            className="text-xs mt-0.5"
                            style={{
                              fontFamily: "'Inter', sans-serif",
                              color: t.scheduleNoteColor
                            }}
                          >
                            {session.note}
                          </p>
                        )}
                      </div>

                      <span
                        className="text-xs px-2 py-0.5 rounded-full shrink-0"
                        style={{
                          background: config.bg,
                          color: config.color,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          letterSpacing: "0.05em"
                        }}
                      >
                        {config.label}
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <motion.p
          variants={fadeUp}
          className="text-center mt-8 text-sm"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: t.scheduleFooter
          }}
        >
          {schedule.footnote}
        </motion.p>
      </motion.div>
    </section>
  );
}
