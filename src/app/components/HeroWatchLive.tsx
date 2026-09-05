"use client";

import { Calendar, Play, Radio } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import ministersFlyer from "@/assets/images/rbc-na-ministers-flyer.webp";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import { fadeUp, stagger } from "@/app/components/ui/animation";

const YOUTUBE_STREAMS_URL = "https://www.youtube.com/@CelebrationChurchCanada/streams";

/** Returns the date in Toronto, where Reboot Camp North America takes place. */
function torontoDate(date: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Toronto",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(date);
  const value = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value;

  return `${value("year")}-${value("month")}-${value("day")}`;
}

/** Keep the live experience on screen for all three event days, in Eastern Time. */
export function isRebootCampLivePeriod(date = new Date()) {
  const today = torontoDate(date);
  return today >= "2026-09-04" && today <= "2026-09-06";
}

export function HeroWatchLive() {
  const { t } = useTheme();
  const { event, venue } = useSiteContent();

  const scrollToSchedule = () => {
    document.querySelector("#schedule")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ backgroundImage: t.heroGradient, transition: "background 0.4s ease" }}
    >
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-30" style={{ backgroundImage: "radial-gradient(circle, #E85D04, transparent 70%)" }} />
        <div className="absolute top-1/4 -right-24 w-96 h-96 rounded-full opacity-20" style={{ backgroundImage: "radial-gradient(circle, #E8C033, transparent 70%)" }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 opacity-25" style={{ backgroundImage: "radial-gradient(ellipse, #E85D04, transparent 70%)" }} />
      </div>
      <div
        className="absolute inset-0"
        style={{
          opacity: Number(t.heroGridOpacity),
          backgroundImage: "linear-gradient(rgba(232,192,51,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,192,51,0.3) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 pt-28 lg:pt-32 pb-16 flex-1 flex flex-col xl:flex-row items-center gap-12 xl:gap-10">
        <motion.div variants={stagger} initial="hidden" animate="show" className="xl:w-[38%] flex flex-col items-center xl:items-start text-center xl:text-left">
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs uppercase tracking-widest"
            style={{ backgroundImage: t.heroBadgeBg, border: `1px solid ${t.heroBadgeBorder}`, color: t.heroBadgeColor, fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <Radio size={13} className="animate-pulse" />
            Live now · Reboot Camp NA
          </motion.div>

          <motion.p variants={fadeUp} className="uppercase tracking-[0.24em] mb-3 text-sm" style={{ color: t.goldAccent, fontFamily: "'Barlow Condensed', sans-serif" }}>
            {event.datesDisplay}
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="leading-none uppercase mb-6"
            style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(3.5rem, 10vw, 7rem)", backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", backgroundClip: "text", WebkitTextFillColor: "transparent", letterSpacing: "0.02em" }}
          >
            Watch Live
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-md mb-6" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", lineHeight: 1.7, color: t.heroSubtextColor }}>
            Join Reboot Camp North America from wherever you are.
          </motion.p>
          <motion.div variants={fadeUp} className="flex items-center gap-2 px-4 py-2 rounded mb-8" style={{ backgroundImage: t.heroMetaBg, border: `1px solid ${t.heroMetaBorder}` }}>
            <Calendar size={15} style={{ color: t.goldAccent }} />
            <span className="text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", color: t.textSecondary }}>
              {venue.cityDisplay} · All times Eastern
            </span>
          </motion.div>
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href={YOUTUBE_STREAMS_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ backgroundImage: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.1em", boxShadow: "0 4px 24px rgba(232,92,4,0.35)" }}
            >
              <Play size={20} fill="currentColor" /> Watch on YouTube
            </a>
            <button
              type="button"
              onClick={scrollToSchedule}
              className="px-8 py-4 rounded transition-all duration-200 hover:opacity-80 cursor-pointer"
              style={{ border: `1px solid ${t.heroLearnMoreBorder}`, color: t.heroLearnMoreColor, fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: "1rem", letterSpacing: "0.1em" }}
            >
              VIEW SCHEDULE
            </button>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.95, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} className="xl:w-[62%] w-full max-w-4xl">
          <div className="relative rounded-2xl p-[1px] shadow-2xl" style={{ backgroundImage: t.ctaGradient, boxShadow: "0 20px 60px rgba(232,92,4,0.4)" }}>
            <div className="rounded-2xl p-4 sm:p-6 lg:p-8" style={{ background: t.pageBg }}>
              <div className="relative aspect-[16/9] rounded-xl flex items-center overflow-hidden px-6 sm:px-12" style={{ backgroundImage: "linear-gradient(135deg, rgba(232,93,4,0.3), rgba(232,192,51,0.14))", border: `1px solid ${t.heroMetaBorder}` }}>
                <div className="relative z-10 flex flex-col items-center text-center pr-20 sm:pr-44 sm:items-start sm:text-left">
                  <div className="w-14 h-14 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mb-4 sm:mb-6 transition-transform duration-300 hover:scale-110" style={{ backgroundColor: "#FF0000", color: "#fff", boxShadow: "0 0 0 8px rgba(255,0,0,0.12), 0 12px 36px rgba(255,0,0,0.35)" }}>
                    <Play size={32} fill="currentColor" className="ml-1 sm:hidden" />
                    <Play size={42} fill="currentColor" className="hidden sm:block ml-1" />
                  </div>
                  <p className="uppercase tracking-[0.16em] sm:tracking-[0.22em] text-[0.6rem] sm:text-sm mb-2 sm:mb-3" style={{ color: t.goldAccent, fontFamily: "'Barlow Condensed', sans-serif" }}>Celebration Church Canada</p>
                  <p className="max-w-md" style={{ color: t.textPrimary, fontFamily: "'Oswald', sans-serif", fontSize: "clamp(1.25rem, 3vw, 2.75rem)", lineHeight: 1.1, fontWeight: 600 }}>The broadcast is live on YouTube</p>
                </div>
                <motion.div
                  initial={{ opacity: 0, rotate: 8, x: 30 }}
                  animate={{ opacity: 1, rotate: 4, x: 0 }}
                  transition={{ duration: 0.7, delay: 0.45, ease: "easeOut" }}
                  className="absolute z-10 right-2 sm:right-6 top-1/2 -translate-y-1/2 w-20 sm:w-36 md:w-44 rounded-lg overflow-hidden"
                  style={{ boxShadow: "0 18px 40px rgba(0,0,0,0.5)", border: `1px solid ${t.goldAccent}` }}
                >
                  <Image src={ministersFlyer} alt="Reboot Camp North America ministers" className="w-full h-auto" sizes="(min-width: 768px) 11rem, (min-width: 640px) 9rem, 5rem" />
                </motion.div>
                <div className="absolute right-0 bottom-0 h-3/4 w-1/2 opacity-50 pointer-events-none" style={{ backgroundImage: "radial-gradient(ellipse at right bottom, rgba(232,192,51,0.4), transparent 70%)" }} />
              </div>
              <a href={YOUTUBE_STREAMS_URL} target="_blank" rel="noreferrer" className="mt-6 flex items-center justify-center gap-2 text-sm transition-opacity hover:opacity-75" style={{ color: t.goldAccent, fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}>
                OPEN THE LIVE STREAM <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
