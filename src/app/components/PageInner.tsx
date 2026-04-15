"use client";

import { ThemeProvider, useTheme } from "@/app/contexts/ThemeContext";
import { Navbar } from "@/app/components/Navbar";
import { Hero } from "@/app/components/Hero";
import { AboutSection } from "@/app/components/AboutSection";
import { RegistrationSection } from "@/app/components/RegistrationSection";

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
      </div>
    </ThemeProvider>
  );
}
