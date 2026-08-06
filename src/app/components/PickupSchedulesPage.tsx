"use client";

import { useState } from "react";
import {
  BusFront,
  Clock3,
  MapPin,
  Route,
  Users,
} from "lucide-react";

import { Footer } from "@/app/components/Footer";
import { Navbar } from "@/app/components/Navbar";
import { useTheme } from "@/app/contexts/ThemeContext";
import generalSchedules from "@/data/pickupSchedulesGeneral.json";
import workersSchedules from "@/data/pickupSchedulesWorkers.json";

type PickupStop = {
  city: string;
  stopNumber: number;
  landmark: string;
  time: string;
};

type PickupDay = {
  date: string;
  dayLabel: string;
  venueAddress: string;
  departTime: string;
  stops: PickupStop[];
};

type ScheduleSet = {
  id: "general" | "workers";
  label: string;
  audience: string;
  description: string;
  pdfHref: string;
  days: PickupDay[];
};

const scheduleSets: ScheduleSet[] = [
  {
    id: "general",
    label: "General Attendance",
    audience: "Attendees",
    description:
      "Pickup schedule for general attendees travelling from the listed regions and city hubs.",
    pdfHref: "/pdfs/RBC Pick-up Schedule - General Attendance.pdf",
    days: generalSchedules.generalAttendance as PickupDay[],
  },
  {
    id: "workers",
    label: "Workers & Volunteers",
    audience: "Workers and volunteers",
    description:
      "Pickup schedule for service teams, workers, and volunteers with dedicated departure times.",
    pdfHref: "/pdfs/RBC Pick-up Schedule Workers.pdf",
    days: workersSchedules.workersAndVolunteers as PickupDay[],
  },
];

function formatDateLabel(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-CA", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function uniqueCities(stops: PickupStop[]) {
  return Array.from(new Set(stops.map((stop) => stop.city)));
}

export function PickupSchedulesPage() {
  const { t } = useTheme();
  const [activeScheduleIndex, setActiveScheduleIndex] = useState(0);
  const [activeDayIndex, setActiveDayIndex] = useState(0);
  const [activeCity, setActiveCity] = useState("All Cities");

  const activeSchedule = scheduleSets[activeScheduleIndex]!;
  const activeDay = activeSchedule.days[activeDayIndex]!;
  const cities = uniqueCities(activeDay.stops);
  const filteredStops =
    activeCity === "All Cities"
      ? activeDay.stops
      : activeDay.stops.filter((stop) => stop.city === activeCity);
  const groupedStops = (activeCity === "All Cities" ? cities : [activeCity]).map((city) => ({
    city,
    stops: filteredStops.filter((stop) => stop.city === city),
  }));

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{
        background: t.pageBg,
        color: t.textPrimary,
        fontFamily: "'Inter', sans-serif",
        transition: "background 0.4s ease",
      }}
    >
      <Navbar />
      <main className="pt-20 lg:pt-24">
        <div className="relative isolate">
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: t.heroGradient,
              opacity: 0.9,
            }}
          />
          <div
            className="absolute -top-24 left-[-8rem] h-72 w-72 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(232,93,4,0.28) 0%, rgba(232,93,4,0) 72%)",
            }}
          />
          <div
            className="absolute right-[-10rem] top-12 h-96 w-96 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(circle, rgba(232,192,51,0.22) 0%, rgba(232,192,51,0) 72%)",
            }}
          />

          <section className="relative z-10 border-b" style={{ borderColor: t.cardBorderThin }}>
            <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
              <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)] lg:items-end">
                <div className="max-w-3xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
                    <span
                      className="text-xs tracking-[0.22em] uppercase"
                      style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }}
                    >
                      Pickup Schedules
                    </span>
                  </div>

                  <h1
                    className="uppercase leading-none"
                    style={{
                      fontFamily: "'Oswald', sans-serif",
                      fontSize: "clamp(2.6rem, 7vw, 5rem)",
                      fontWeight: 700,
                    }}
                  >
                    Plan Your{" "}
                    <span
                      style={{
                        backgroundImage: t.titleGradient,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      Pickup Route
                    </span>
                  </h1>

                  <p
                    className="mt-4 max-w-2xl text-base leading-7 sm:text-lg"
                    style={{ color: t.textSecondary, fontFamily: "'Inter', sans-serif" }}
                  >
                    Switch between attendee and worker schedules, then choose your day to find the nearest stop,
                    pickup time, and departure location at a glance.
                  </p>
                </div>

                <div
                  className="grid gap-3 rounded-3xl p-4 sm:grid-cols-3"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                    boxShadow: t.isDark
                      ? "0 18px 50px rgba(0,0,0,0.22)"
                      : "0 18px 40px rgba(8,11,26,0.08)",
                  }}
                >
                  <div
                    className="rounded-2xl p-4"
                    style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.82)" }}
                  >
                    <div className="mb-2 flex items-center gap-2" style={{ color: t.goldAccent }}>
                      <Route size={16} />
                      <span className="text-xs uppercase tracking-[0.16em]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Day Stops
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.8rem", lineHeight: 1 }}>
                      {activeDay.stops.length}
                    </p>
                  </div>

                  <div
                    className="rounded-2xl p-4"
                    style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.82)" }}
                  >
                    <div className="mb-2 flex items-center gap-2" style={{ color: t.goldAccent }}>
                      <MapPin size={16} />
                      <span className="text-xs uppercase tracking-[0.16em]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Regions
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.8rem", lineHeight: 1 }}>
                      {cities.length}
                    </p>
                  </div>

                  <div
                    className="rounded-2xl p-4"
                    style={{ background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.82)" }}
                  >
                    <div className="mb-2 flex items-center gap-2" style={{ color: t.goldAccent }}>
                      <Users size={16} />
                      <span className="text-xs uppercase tracking-[0.16em]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                        Audience
                      </span>
                    </div>
                    <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1rem", lineHeight: 1.2 }}>
                      {activeSchedule.audience}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="relative z-10 py-8 sm:py-10">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:px-8">
              <div
                className="rounded-[2rem] p-3"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                }}
              >
              <div className="grid gap-3">
                <div className="grid gap-3 md:grid-cols-2">
                  {scheduleSets.map((schedule, index) => {
                    const isActive = index === activeScheduleIndex;

                    return (
                      <button
                        key={schedule.id}
                        onClick={() => {
                          setActiveScheduleIndex(index);
                          setActiveDayIndex(0);
                          setActiveCity("All Cities");
                        }}
                        className="rounded-[1.4rem] p-4 text-left transition-all duration-200 hover:scale-[1.01]"
                        style={{
                          background: isActive ? t.ctaGradient : t.scheduleTabInactiveBg,
                          color: isActive ? t.ctaText : t.textPrimary,
                          border: isActive ? "none" : `1px solid ${t.scheduleTabInactiveBorder}`,
                          boxShadow: isActive
                            ? "0 16px 34px rgba(232,93,4,0.22)"
                            : "none",
                        }}
                      >
                        <div className="mb-2 flex items-center justify-between gap-3">
                          <span
                            className="text-xs uppercase tracking-[0.18em]"
                            style={{ fontFamily: "'Barlow Condensed', sans-serif", opacity: isActive ? 0.85 : 0.65 }}
                          >
                            {schedule.audience}
                          </span>
                        </div>
                        <div
                          style={{
                            fontFamily: "'Oswald', sans-serif",
                            fontWeight: 700,
                            fontSize: "1.2rem",
                            lineHeight: 1.1,
                          }}
                        >
                          {schedule.label}
                        </div>
                        <p
                          className="mt-2 text-sm leading-6"
                          style={{
                            fontFamily: "'Inter', sans-serif",
                            opacity: isActive ? 0.85 : 0.72,
                          }}
                        >
                          {schedule.description}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[18rem_minmax(0,1fr)]">
              <aside
                className="rounded-[2rem] p-4 xl:sticky xl:top-6 xl:self-start"
                style={{
                  background: t.sectionBgAlt,
                  border: `1px solid ${t.cardBorder}`,
                }}
              >
                <p
                  className="mb-3 text-xs uppercase tracking-[0.18em]"
                  style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }}
                >
                  Select Day
                </p>
                <div className="grid gap-3">
                  {activeSchedule.days.map((day, index) => {
                    const isActive = index === activeDayIndex;
                    return (
                      <button
                        key={day.date}
                        onClick={() => {
                          setActiveDayIndex(index);
                          setActiveCity("All Cities");
                        }}
                        className="rounded-2xl p-4 text-left transition-all duration-200 hover:translate-y-[-1px]"
                        style={{
                          background: isActive ? t.ctaGradient : t.cardBg,
                          color: isActive ? t.ctaText : t.textPrimary,
                          border: isActive ? "none" : `1px solid ${t.cardBorderThin}`,
                        }}
                      >
                        <div
                          className="text-xs uppercase tracking-[0.16em]"
                          style={{ fontFamily: "'Barlow Condensed', sans-serif", opacity: isActive ? 0.85 : 0.65 }}
                        >
                          {formatDateLabel(day.date)}
                        </div>
                        <div
                          className="mt-1"
                          style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.15rem", fontWeight: 700 }}
                        >
                          {day.dayLabel}
                        </div>
                        <div
                          className="mt-2 flex items-center gap-2 text-sm"
                          style={{ fontFamily: "'Inter', sans-serif", opacity: isActive ? 0.8 : 0.7 }}
                        >
                          <Clock3 size={14} />
                          Depart {day.departTime}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>

              <div className="grid gap-6">
                <section
                  className="rounded-[2rem] p-5 sm:p-6"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-3">
                        <span
                          className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em]"
                          style={{
                            background: `rgba(${t.accentRgb},0.12)`,
                            color: t.goldAccent,
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          {activeSchedule.label}
                        </span>
                        <span
                          className="rounded-full px-3 py-1 text-xs uppercase tracking-[0.16em]"
                          style={{
                            background: t.isDark ? "rgba(255,255,255,0.04)" : "rgba(8,11,26,0.05)",
                            color: t.textSecondary,
                            fontFamily: "'Barlow Condensed', sans-serif",
                          }}
                        >
                          {activeDay.dayLabel}
                        </span>
                      </div>

                      <h2
                        style={{
                          fontFamily: "'Oswald', sans-serif",
                          fontWeight: 700,
                          fontSize: "clamp(1.8rem, 4vw, 2.7rem)",
                          lineHeight: 1.05,
                        }}
                      >
                        Find your city, then match your stop number and time.
                      </h2>

                      <p
                        className="mt-3 max-w-3xl text-sm leading-7 sm:text-base"
                        style={{ color: t.textSecondary, fontFamily: "'Inter', sans-serif" }}
                      >
                        The venue departure for this day is <strong style={{ color: t.textPrimary }}>{activeDay.departTime}</strong> from{" "}
                        <strong style={{ color: t.textPrimary }}>{activeDay.venueAddress}</strong>. Please arrive early enough to board at your stop before the listed time.
                      </p>
                    </div>

                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: t.sectionBgAlt2,
                          border: `1px solid ${t.cardBorderThin}`,
                        }}
                      >
                        <div className="mb-2 flex items-center gap-2" style={{ color: t.goldAccent }}>
                          <Clock3 size={16} />
                          <span className="text-xs uppercase tracking-[0.16em]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            Depart Time
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.35rem", fontWeight: 700 }}>
                          {activeDay.departTime}
                        </p>
                      </div>

                      <div
                        className="rounded-2xl p-4"
                        style={{
                          background: t.sectionBgAlt2,
                          border: `1px solid ${t.cardBorderThin}`,
                        }}
                      >
                        <div className="mb-2 flex items-center gap-2" style={{ color: t.goldAccent }}>
                          <BusFront size={16} />
                          <span className="text-xs uppercase tracking-[0.16em]" style={{ fontFamily: "'Barlow Condensed', sans-serif" }}>
                            Venue
                          </span>
                        </div>
                        <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.95rem", color: t.textSecondary }}>
                          {activeDay.venueAddress}
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <section
                  className="rounded-[2rem] p-5 sm:p-6"
                  style={{
                    background: t.cardBg,
                    border: `1px solid ${t.cardBorder}`,
                  }}
                >
                  <div className="mb-5 flex flex-wrap gap-2">
                    {["All Cities", ...cities].map((city) => {
                      const isActive = city === activeCity;

                      return (
                      <button
                        key={city}
                        onClick={() => setActiveCity(city)}
                        className="shrink-0 rounded-full px-3 py-1.5 text-xs transition-[background,color,border-color,box-shadow] duration-200"
                        style={{
                          background: isActive ? t.ctaGradient : `rgba(${t.accentRgb},0.08)`,
                          border: `1px solid ${isActive ? "transparent" : `rgba(${t.accentRgb},0.16)`}`,
                          color: isActive ? t.ctaText : t.textSecondary,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 600,
                          boxShadow: isActive ? "0 10px 22px rgba(232,93,4,0.18)" : "none",
                        }}
                      >
                        {city}
                      </button>
                    )})}
                  </div>

                  <div className="grid gap-5">
                    {groupedStops.map((group) => (
                      <div
                        key={group.city}
                        className="rounded-3xl overflow-hidden"
                        style={{ border: `1px solid ${t.cardBorderThin}` }}
                      >
                        <div
                          className="flex items-center justify-between gap-3 px-5 py-4"
                          style={{ background: t.sectionBgAlt2 }}
                        >
                          <div>
                            <h3
                              style={{
                                fontFamily: "'Oswald', sans-serif",
                                fontWeight: 700,
                                fontSize: "1.3rem",
                                lineHeight: 1.1,
                              }}
                            >
                              {group.city}
                            </h3>
                            <p
                              className="mt-1 text-xs uppercase tracking-[0.16em]"
                              style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.textMuted }}
                            >
                              {group.stops.length} {group.stops.length === 1 ? "stop" : "stops"}
                            </p>
                          </div>
                        </div>

                        <div className="hidden md:block">
                          <div
                            className="grid grid-cols-[0.7fr_3fr_0.85fr] gap-4 px-5 py-4"
                            style={{
                              color: t.textMuted,
                              fontFamily: "'Barlow Condensed', sans-serif",
                              letterSpacing: "0.16em",
                              textTransform: "uppercase",
                              fontSize: "0.78rem",
                              borderTop: `1px solid ${t.cardBorderThin}`,
                            }}
                          >
                            <span>Stop</span>
                            <span>Landmark</span>
                            <span>Time</span>
                          </div>

                          <div>
                            {group.stops.map((stop, index) => (
                              <div
                                key={`${stop.city}-${stop.stopNumber}-${stop.time}`}
                                className="grid grid-cols-[0.7fr_3fr_0.85fr] gap-4 px-5 py-4"
                                style={{
                                  background: index % 2 === 0
                                    ? t.isDark
                                      ? "rgba(255,255,255,0.015)"
                                      : "rgba(255,255,255,0.68)"
                                    : "transparent",
                                  borderTop: `1px solid ${t.cardBorderThin}`,
                                }}
                              >
                                <div style={{ fontFamily: "'Oswald', sans-serif", color: t.goldAccent }}>
                                  #{stop.stopNumber}
                                </div>
                                <div style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}>
                                  {stop.landmark}
                                </div>
                                <div style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600 }}>
                                  {stop.time}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid gap-3 p-4 md:hidden">
                          {group.stops.map((stop) => (
                            <article
                              key={`${stop.city}-${stop.stopNumber}-${stop.time}`}
                              className="rounded-3xl p-4"
                              style={{
                                background: t.isDark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)",
                                border: `1px solid ${t.cardBorderThin}`,
                              }}
                            >
                              <div className="mb-3 flex items-start justify-between gap-3">
                                <div>
                                  <p
                                    className="text-xs uppercase tracking-[0.16em]"
                                    style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.textMuted }}
                                  >
                                    {group.city}
                                  </p>
                                  <h3
                                    className="mt-1"
                                    style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "1.1rem" }}
                                  >
                                    Stop #{stop.stopNumber}
                                  </h3>
                                </div>
                                <div
                                  className="rounded-full px-3 py-1.5"
                                  style={{
                                    background: `rgba(${t.accentRgb},0.12)`,
                                    color: t.goldAccent,
                                    fontFamily: "'Oswald', sans-serif",
                                    fontWeight: 700,
                                  }}
                                >
                                  {stop.time}
                                </div>
                              </div>

                              <p
                                className="text-sm leading-6"
                                style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary }}
                              >
                                {stop.landmark}
                              </p>
                            </article>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
