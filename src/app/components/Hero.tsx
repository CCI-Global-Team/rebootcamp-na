import { useState, useEffect, useMemo } from "react";
import { MapPin, Calendar, ChevronDown } from "lucide-react";
import mainFlyer from "@/assets/images/rbc-na-pivot-main-flyer.jpg";
import fireFlyer from "@/assets/images/rbc-na-fire-flyer.jpg";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import Image from "next/image";
import { motion, Variants } from "framer-motion";

function Countdown({ target, label }: { target: string; label: string }) {
  const [mounted, setMounted] = useState(false);
  const { t } = useTheme();
  const targetDate = useMemo(() => new Date(target), [target]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = targetDate.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const units = [
    { label: "Days",  value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Mins",  value: timeLeft.minutes },
    { label: "Secs",  value: timeLeft.seconds },
  ];

  return (
    <div>
      <p className="uppercase mb-3 text-xs tracking-widest" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.heroEventTimerLabel }}>
        {label}
      </p>
      <div className="flex items-center gap-3 sm:gap-4">
        {units.map(({ label: ul, value }, i) => (
          <div key={ul} className="flex items-center gap-3 sm:gap-4">
            <div className="text-center">
              <div
                className="w-14 sm:w-16 h-14 sm:h-16 rounded flex items-center justify-center"
                style={{ backgroundColor: t.heroCountdownBg, border: `1px solid ${t.heroCountdownBorder}`, fontFamily: "'Oswald', sans-serif", fontSize: "1.75rem", fontWeight: 700, color: t.goldAccent, transition: "background 0.4s, border-color 0.4s" }}
              >
                {String(value).padStart(2, "0")}
              </div>
              <div className="mt-1 uppercase" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "0.65rem", letterSpacing: "0.12em", color: t.heroCountdownLabelColor }}>
                {ul}
              </div>
            </div>
            {i < units.length - 1 && (
              <div style={{ color: t.heroCountdownSeparatorColor, fontFamily: "'Oswald', sans-serif", fontSize: "1.5rem" }}>:</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const stagger: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Hero() {
  const { t } = useTheme();
  const { hero, event, venue } = useSiteContent();

  const handleScroll = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-screen flex flex-col overflow-hidden" style={{ backgroundImage: t.heroGradient, transition: "background 0.4s ease" }}>
      {/* Background glow effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20" style={{ backgroundImage: "radial-gradient(circle, #E85D04, transparent 70%)" }} />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full" style={{ backgroundImage: "radial-gradient(circle, #E8C033, transparent 70%)", opacity: t.isDark ? 0.15 : 0.1 }} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 opacity-20" style={{ backgroundImage: "radial-gradient(ellipse, #E85D04, transparent 70%)" }} />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0"
        style={{
          opacity: Number(t.heroGridOpacity),
          backgroundImage: `
            linear-gradient(rgba(232,192,51,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(232,192,51,0.3) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32 pb-16 flex-1 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left Content */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          {/* Badge */}
          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 text-xs uppercase tracking-widest"
            style={{ backgroundImage: t.heroBadgeBg, border: `1px solid ${t.heroBadgeBorder}`, color: "#E8C033", fontFamily: "'Barlow Condensed', sans-serif" }}
          >
            <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: t.goldAccent }} />
            {hero.badge}
          </motion.div>

          {/* Theme */}
          {hero.themeLines.map((line, i) => (
            <motion.h1
              key={i}
              variants={fadeUp}
              className={`${i === 0 ? "mb-2" : "mb-6"} leading-none uppercase`}
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 700,
                fontSize: "clamp(3.5rem, 10vw, 7rem)",
                backgroundImage: t.titleGradient,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                WebkitTextFillColor: "transparent",
                letterSpacing: "0.02em",
                transition: "background 0.4s ease"
              }}
              >
              {line}
            </motion.h1>
          ))}

          <motion.p variants={fadeUp} className="max-w-md mb-2" style={{ fontFamily: "'Inter', sans-serif", fontSize: "1.05rem", lineHeight: 1.7, color: t.heroSubtextColor }}>
            {hero.description}
          </motion.p>

          {/* Event Meta */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 mb-8 mt-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ backgroundImage: t.heroMetaBg, border: `1px solid ${t.heroMetaBorder}` }}>
              <Calendar size={15} style={{ color: t.goldAccent }} />
              <span className="text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", color: t.textSecondary }}>
                {event.datesDisplay}
              </span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded" style={{ backgroundImage: t.heroMetaBg, border: `1px solid ${t.heroMetaBorder}` }}>
              <MapPin size={15} style={{ color: t.goldAccent }} />
              <span className="text-sm" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", color: t.textSecondary }}>
                {venue.cityDisplay}
              </span>
            </div>
          </motion.div>

          {/* Countdown */}
          <motion.div variants={fadeUp} className="mb-10">
            <Countdown target={event.countdownTarget} label={hero.countdownLabel} />
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); handleScroll("#register"); }}
              className="px-8 py-4 rounded text-center transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ backgroundImage: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "1rem", letterSpacing: "0.1em", boxShadow: "0 4px 24px rgba(232,92,4,0.35)" }}
            >
              {hero.ctaPrimary}
            </a>
            <a
              href="#about"
              onClick={(e) => { e.preventDefault(); handleScroll("#about"); }}
              className="px-8 py-4 rounded text-center transition-all duration-200 hover:opacity-80"
              style={{ border: `1px solid ${t.heroLearnMoreBorder}`, color: t.heroLearnMoreColor, fontFamily: "'Oswald', sans-serif", fontWeight: 500, fontSize: "1rem", letterSpacing: "0.1em" }}
            >
              {hero.ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        {/* Right — Flyer Images */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex justify-center lg:justify-end items-center relative w-full max-w-sm lg:max-w-none"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm lg:max-w-md">
            <motion.div
              initial={{ rotate: 4 }}
              animate={{
                y: [0, -50, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -right-4 -top-4 w-full rounded-xl overflow-hidden shadow-2xl"
              style={{
                filter: "brightness(0.75)",
                zIndex: 1,
              }}
            >
              <Image src={fireFlyer} alt="Reboot Camp Fire" className="w-full h-auto" loading="eager" />
            </motion.div>
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="show"
              whileHover={{
                scale: 1.03,
                y: -4,
                transition: { type: "spring", stiffness: 200, damping: 15 },
              }}
              className="relative rounded-xl overflow-hidden shadow-2xl"
              style={{ zIndex: 2, boxShadow: "0 20px 60px rgba(232,92,4,0.4)" }}
>
              <Image src={mainFlyer} alt={`${event.name} — ${event.theme}`} className="w-full h-auto" loading="eager" />
            </motion.div>
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-3/4 h-12 rounded-full opacity-40" style={{ backgroundImage: "radial-gradient(ellipse, #E85D04, transparent 70%)", filter: "blur(12px)" }} />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-8">
        <motion.button
          onClick={() => handleScroll("#about")}
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="transition-colors duration-200 hover:text-[#E8C033] cursor-pointer"
          style={{ color: t.heroScrollColor }}
        >
          <ChevronDown size={28} />
        </motion.button>
      </div>
    </section>
  );
}
