"use client";

import { ThemeProvider, useTheme } from "@/app/contexts/ThemeContext";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { AboutSection } from "@/app/components/AboutSection";
import { RegistrationSection } from "@/app/components/RegistrationSection";
import { ScheduleSection } from "@/app/components/ScheduleSection";
import { SpeakersSection } from "@/app/components/SpeakersSection";
import { AccommodationSection } from "@/app/components/AccommodationSection";
import { FlightDiscountsSection } from "@/app/components/FlightDiscountsSection";
import { VenueSection } from "@/app/components/VenueSection";
import { PastEventsSection } from "@/app/components/PastEventsSection";
import { FAQSection } from "@/app/components/FAQSection";
import { GivingSection } from "@/app/components/GivingSection";
import { Footer } from "@/app/components/Footer";

export function PageInner() {
  const { t } = useTheme();

  return (
    <ThemeProvider>
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
        <Hero />
        <AboutSection />
        <RegistrationSection />
        <ScheduleSection />
        <SpeakersSection />
        <AccommodationSection />
        <FlightDiscountsSection />
        <VenueSection />
        <PastEventsSection />
        <FAQSection />
        <GivingSection />
        <Footer />
      </div>
    </ThemeProvider>
  );
}
