"use client";

import { useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@/app/contexts/ThemeContext";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { HeroWatchLive, isRebootCampLivePeriod } from "@/app/components/HeroWatchLive";
import { AboutSection } from "@/app/components/AboutSection";
import { RegistrationSection } from "@/app/components/RegistrationSection";
import { ChildcareSection } from "@/app/components/ChildcareSection";
import { SundayServiceSection } from "./SundayServiceSection";
import { ScheduleSection } from "@/app/components/ScheduleSection";
import { SpeakersSection } from "@/app/components/SpeakersSection";
import { AccommodationSection } from "@/app/components/AccommodationSection";
import { FlightDiscountsSection } from "@/app/components/FlightDiscountsSection";
import { TransportationSection } from "@/app/components/TransportationSection";
import { VenueSection } from "@/app/components/VenueSection";
// import { PastEventsSection } from "@/app/components/PastEventsSection";
import { FAQSection } from "@/app/components/FAQSection";
import { GivingSection } from "@/app/components/GivingSection";
import { Footer } from "@/app/components/Footer";

export function PageInner() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}

function PageContent() {
  const { t } = useTheme();
  const [showLiveHero, setShowLiveHero] = useState(false);

  useEffect(() => {
    const updateHero = () => setShowLiveHero(isRebootCampLivePeriod());
    updateHero();
    const interval = window.setInterval(updateHero, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        background: t.pageBg,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      <Navbar />
      {showLiveHero ? <HeroWatchLive /> : <Hero />}
      <AboutSection />
      <RegistrationSection />
      <ChildcareSection />
      <SundayServiceSection />
      <ScheduleSection />
      <SpeakersSection />
      <AccommodationSection />
      <FlightDiscountsSection />
      <TransportationSection />
      <VenueSection />
      {/* <PastEventsSection /> */}
      <FAQSection />
      <GivingSection />
      <Footer />
    </div>
  );
}
