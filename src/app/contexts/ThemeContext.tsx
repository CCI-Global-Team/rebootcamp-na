"use client";

import { createContext, useContext, useState, ReactNode } from "react";

export interface AppTheme {
  isDark: boolean;
  // Page / section backgrounds
  pageBg: string;
  heroGradient: string;
  sectionBg: string;
  sectionBgAlt: string;
  sectionBgAlt2: string;
  footerBg: string;
  footerBorder: string;
  footerBottomBorder: string;
  // Cards
  cardBg: string;
  cardBorder: string;
  cardBorderThin: string;
  // Form inputs
  inputBg: string;
  inputBorder: string;
  inputColor: string;
  inputFocusBorder: string;
  inputOptionBg: string;
  // Text
  textPrimary: string;
  textSecondary: string;
  textMuted: string;
  textVeryMuted: string;
  textDim: string;
  textUltraDim: string;
  // Navbar
  navbarScrolledBg: string;
  navbarBorder: string;
  navbarLinkColor: string;
  navbarMobileBg: string;
  navbarMobileBorder: string;
  navbarMobileLinkBorder: string;
  // Dividers & misc
  topDivider: string;
  sectionDividerColor: string;
  // Hero-specific
  heroGridOpacity: string;
  heroBadgeBg: string;
  heroBadgeBorder: string;
  heroBadgeColor: string;
  heroMetaBg: string;
  heroMetaBorder: string;
  heroLearnMoreBorder: string;
  heroLearnMoreColor: string;
  heroCountdownBg: string;
  heroCountdownBorder: string;
  heroCountdownLabelColor: string;
  heroCountdownSeparatorColor: string;
  heroScrollColor: string;
  heroSubtextColor: string;
  heroEventTimerLabel: string;
  // About
  aboutStatCardBg: string;
  aboutStatCardBorder: string;
  aboutHighlightBg: string;
  aboutHighlightBorder: string;
  aboutVerseBg: string;
  aboutVerseBorder: string;
  aboutVerseText: string;
  aboutListItemText: string;
  // Schedule
  scheduleTabInactiveBg: string;
  scheduleTabInactiveBorder: string;
  scheduleTabInactiveColor: string;
  scheduleRowBg: string;
  scheduleRowBorder: string;
  scheduleTimeColor: string;
  scheduleTimelineDot: string;
  scheduleNoteColor: string;
  scheduleFooter: string;
  scheduleSubtitle: string;
  // Speakers
  speakerCardBg: string;
  speakerCardBorder: string;
  speakerImgGradient: string;
  mainSpeakerBg: string;
  mainSpeakerBorder: string;
  mainSpeakerImgGradient: string;
  // Registration
  regFormBg: string;
  regFormBorder: string;
  // Accommodation
  accomPartnerBg: string;
  accomPartnerBorder: string;
  accomCardBg: string;
  accomCardBorder: string;
  accomCardImgGradient: string;
  accomAmenityBg: string;
  accomAmenityBorder: string;
  accomAmenityColor: string;
  // Venue
  venueInfoBg: string;
  venueInfoBorder: string;
  venueTorontoBg: string;
  venueTorontoBorder: string;
  venueMapBorder: string;
  venueMapFilter: string;
  venueDirBg: string;
  venueDirBorder: string;
  // Past Events
  pastTabInactiveBg: string;
  pastTabInactiveBorder: string;
  pastTabInactiveColor: string;
  pastEventImgGradient: string;
  pastDetailTextColor: string;
  pastTestimonyBg: string;
  pastTestimonyBorder: string;
  pastTestimonyText: string;
  pastTestimonyAttrib: string;
  pastSermonsDivider: string;
  pastSermonCardBg: string;
  pastSermonCardBorder: string;
  pastSermonCardImgOverlay: string;
  pastSermonTitle: string;
  pastSermonMeta: string;
  pastViewAllBorder: string;
  pastViewAllColor: string;
  // FAQ
  faqOpenBg: string;
  faqOpenBorder: string;
  faqClosedBg: string;
  faqClosedBorder: string;
  faqDivider: string;
  faqSubtitle: string;
  faqAnswerColor: string;
  faqContactBg: string;
  faqContactBorder: string;
  faqContactText: string;
  // Giving
  givingCardBg: string;
  givingCardBorder: string;
  givingScriptureBg: string;
  givingScriptureBorder: string;
  givingScriptureText: string;
  givingCategoriesBg: string;
  givingCategoriesBorder: string;
  givingTrustText: string;
  givingMethodBg: string;
  givingMethodColor: string;
  // Brand accent — fire gold
  goldAccent: string;      // primary accent for text / icons
  ctaGradient: string;     // CTA button background gradient
  ctaText: string;         // CTA button text colour
  titleGradient: string;   // large gradient text for section / hero titles
  accentRgb: string;       // raw RGB for rgba() tints, e.g. "232,192,51"
}

/* ─── Dark theme ──────────────────────────────────────────────────────── */
const dark: AppTheme = {
  isDark: true,
  pageBg: "#080B1A",
  heroGradient: "linear-gradient(160deg, #080B1A 0%, #12062B 50%, #1A0810 100%)",
  sectionBg: "#080B1A",
  sectionBgAlt: "linear-gradient(180deg, #0D0F22 0%, #080B1A 100%)",
  sectionBgAlt2: "linear-gradient(180deg, #0A0C1F 0%, #080B1A 100%)",
  footerBg: "linear-gradient(180deg, #080B1A 0%, #040610 100%)",
  footerBorder: "rgba(232,192,51,0.12)",
  footerBottomBorder: "rgba(255,255,255,0.06)",
  cardBg: "rgba(255,255,255,0.03)",
  cardBorder: "rgba(255,255,255,0.07)",
  cardBorderThin: "rgba(255,255,255,0.06)",
  inputBg: "rgba(255,255,255,0.05)",
  inputBorder: "rgba(255,255,255,0.1)",
  inputColor: "white",
  inputFocusBorder: "rgba(232,192,51,0.5)",
  inputOptionBg: "#0D0F22",
  textPrimary: "white",
  textSecondary: "rgba(255,255,255,0.65)",
  textMuted: "rgba(255,255,255,0.5)",
  textVeryMuted: "rgba(255,255,255,0.4)",
  textDim: "rgba(255,255,255,0.3)",
  textUltraDim: "rgba(255,255,255,0.25)",
  navbarScrolledBg: "rgba(8,11,26,0.97)",
  navbarBorder: "rgba(232,192,51,0.15)",
  navbarLinkColor: "rgba(255,255,255,0.7)",
  navbarMobileBg: "rgba(8,11,26,0.98)",
  navbarMobileBorder: "rgba(232,192,51,0.15)",
  navbarMobileLinkBorder: "rgba(255,255,255,0.05)",
  topDivider: "linear-gradient(90deg, transparent, rgba(232,192,51,0.3), transparent)",
  sectionDividerColor: "rgba(255,255,255,0.06)",
  heroGridOpacity: "0.05",
  heroBadgeBg: "rgba(232,192,51,0.1)",
  heroBadgeBorder: "rgba(232,192,51,0.35)",
  heroBadgeColor: "#E8C033",
  heroMetaBg: "rgba(255,255,255,0.06)",
  heroMetaBorder: "rgba(255,255,255,0.1)",
  heroLearnMoreBorder: "rgba(255,255,255,0.25)",
  heroLearnMoreColor: "white",
  heroCountdownBg: "rgba(232,192,51,0.1)",
  heroCountdownBorder: "rgba(232,192,51,0.3)",
  heroCountdownLabelColor: "rgba(255,255,255,0.5)",
  heroCountdownSeparatorColor: "#E8C033",
  heroScrollColor: "rgba(255,255,255,0.3)",
  heroSubtextColor: "rgba(255,255,255,0.6)",
  heroEventTimerLabel: "rgba(255,255,255,0.4)",
  aboutStatCardBg: "rgba(255,255,255,0.03)",
  aboutStatCardBorder: "rgba(255,255,255,0.07)",
  aboutHighlightBg: "linear-gradient(135deg, rgba(232,92,4,0.12), rgba(232,192,51,0.06))",
  aboutHighlightBorder: "rgba(232,92,4,0.25)",
  aboutVerseBg: "rgba(232,192,51,0.05)",
  aboutVerseBorder: "rgba(232,192,51,0.2)",
  aboutVerseText: "rgba(255,255,255,0.8)",
  aboutListItemText: "rgba(255,255,255,0.7)",
  scheduleTabInactiveBg: "rgba(255,255,255,0.04)",
  scheduleTabInactiveBorder: "rgba(255,255,255,0.08)",
  scheduleTabInactiveColor: "rgba(255,255,255,0.6)",
  scheduleRowBg: "rgba(255,255,255,0.03)",
  scheduleRowBorder: "rgba(255,255,255,0.06)",
  scheduleTimeColor: "rgba(255,255,255,0.4)",
  scheduleTimelineDot: "rgba(255,255,255,0.06)",
  scheduleNoteColor: "rgba(255,255,255,0.35)",
  scheduleFooter: "rgba(255,255,255,0.3)",
  scheduleSubtitle: "rgba(255,255,255,0.5)",
  speakerCardBg: "rgba(255,255,255,0.03)",
  speakerCardBorder: "rgba(255,255,255,0.07)",
  speakerImgGradient: "linear-gradient(to top, rgba(8,11,26,0.9) 0%, transparent 50%)",
  mainSpeakerBg: "linear-gradient(135deg, rgba(232,92,4,0.12) 0%, rgba(232,192,51,0.06) 100%)",
  mainSpeakerBorder: "rgba(232,192,51,0.25)",
  mainSpeakerImgGradient: "linear-gradient(to right, transparent 50%, #0D0F22 100%), linear-gradient(to top, #0D0F22 0%, transparent 30%)",
  regFormBg: "rgba(255,255,255,0.03)",
  regFormBorder: "rgba(255,255,255,0.08)",
  accomPartnerBg: "rgba(232,192,51,0.06)",
  accomPartnerBorder: "rgba(232,192,51,0.2)",
  accomCardBg: "rgba(255,255,255,0.03)",
  accomCardBorder: "rgba(255,255,255,0.07)",
  accomCardImgGradient: "linear-gradient(to top, rgba(8,11,26,0.8) 0%, transparent 60%)",
  accomAmenityBg: "rgba(255,255,255,0.05)",
  accomAmenityBorder: "rgba(255,255,255,0.08)",
  accomAmenityColor: "rgba(255,255,255,0.5)",
  venueInfoBg: "rgba(255,255,255,0.03)",
  venueInfoBorder: "rgba(255,255,255,0.07)",
  venueTorontoBg: "rgba(232,92,4,0.06)",
  venueTorontoBorder: "rgba(232,92,4,0.2)",
  venueMapBorder: "rgba(255,255,255,0.08)",
  venueMapFilter: "invert(0.9) hue-rotate(180deg)",
  venueDirBg: "rgba(255,255,255,0.03)",
  venueDirBorder: "rgba(255,255,255,0.06)",
  pastTabInactiveBg: "rgba(255,255,255,0.05)",
  pastTabInactiveBorder: "rgba(255,255,255,0.08)",
  pastTabInactiveColor: "rgba(255,255,255,0.55)",
  pastEventImgGradient: "linear-gradient(to top, rgba(8,11,26,0.85) 0%, transparent 40%)",
  pastDetailTextColor: "rgba(255,255,255,0.65)",
  pastTestimonyBg: "rgba(232,192,51,0.06)",
  pastTestimonyBorder: "rgba(232,192,51,0.15)",
  pastTestimonyText: "rgba(255,255,255,0.6)",
  pastTestimonyAttrib: "rgba(255,255,255,0.35)",
  pastSermonsDivider: "rgba(255,255,255,0.06)",
  pastSermonCardBg: "rgba(255,255,255,0.03)",
  pastSermonCardBorder: "rgba(255,255,255,0.07)",
  pastSermonCardImgOverlay: "rgba(8,11,26,0.5)",
  pastSermonTitle: "white",
  pastSermonMeta: "rgba(255,255,255,0.3)",
  pastViewAllBorder: "rgba(232,192,51,0.35)",
  pastViewAllColor: "#E8C033",
  faqOpenBg: "rgba(232,192,51,0.05)",
  faqOpenBorder: "rgba(232,192,51,0.25)",
  faqClosedBg: "rgba(255,255,255,0.03)",
  faqClosedBorder: "rgba(255,255,255,0.06)",
  faqDivider: "rgba(232,192,51,0.15)",
  faqSubtitle: "rgba(255,255,255,0.5)",
  faqAnswerColor: "rgba(255,255,255,0.6)",
  faqContactBg: "rgba(232,92,4,0.06)",
  faqContactBorder: "rgba(232,92,4,0.2)",
  faqContactText: "rgba(255,255,255,0.55)",
  givingCardBg: "rgba(255,255,255,0.03)",
  givingCardBorder: "rgba(255,255,255,0.07)",
  givingScriptureBg: "rgba(232,192,51,0.04)",
  givingScriptureBorder: "rgba(232,192,51,0.18)",
  givingScriptureText: "rgba(255,255,255,0.75)",
  givingCategoriesBg: "rgba(255,255,255,0.02)",
  givingCategoriesBorder: "rgba(255,255,255,0.07)",
  givingTrustText: "rgba(255,255,255,0.3)",
  givingMethodBg: "rgba(255,255,255,0.05)",
  givingMethodColor: "rgba(255,255,255,0.4)",
  goldAccent: "#E8C033",
  ctaGradient: "linear-gradient(135deg, #E8C033, #E85D04)",
  ctaText: "#080B1A",
  titleGradient: "linear-gradient(135deg, #F5D060 0%, #E8C033 40%, #E85D04 100%)",
  accentRgb: "232,192,51",
};

/* ─── Light theme ─────────────────────────────────────────────────────── */
const light: AppTheme = {
  isDark: false,
  pageBg: "#F7F4EF",
  heroGradient: "linear-gradient(160deg, #F4EFE6 0%, #FAF5EC 50%, #F5EEF2 100%)",
  sectionBg: "#F7F4EF",
  sectionBgAlt: "linear-gradient(180deg, #EEE9E2 0%, #F7F4EF 100%)",
  sectionBgAlt2: "linear-gradient(180deg, #F0ECE5 0%, #F7F4EF 100%)",
  footerBg: "linear-gradient(180deg, #E6E1D9 0%, #DAD5CC 100%)",
  footerBorder: "rgba(8,11,26,0.12)",
  footerBottomBorder: "rgba(8,11,26,0.08)",
  cardBg: "#FFFFFF",
  cardBorder: "rgba(8,11,26,0.08)",
  cardBorderThin: "rgba(8,11,26,0.06)",
  inputBg: "rgba(8,11,26,0.04)",
  inputBorder: "rgba(8,11,26,0.12)",
  inputColor: "#080B1A",
  inputFocusBorder: "rgba(200,158,30,0.6)",
  inputOptionBg: "#F7F4EF",
  textPrimary: "#080B1A",
  textSecondary: "rgba(8,11,26,0.65)",
  textMuted: "rgba(8,11,26,0.5)",
  textVeryMuted: "rgba(8,11,26,0.4)",
  textDim: "rgba(8,11,26,0.35)",
  textUltraDim: "rgba(8,11,26,0.25)",
  navbarScrolledBg: "rgba(247,244,239,0.97)",
  navbarBorder: "rgba(8,11,26,0.1)",
  navbarLinkColor: "rgba(8,11,26,0.65)",
  navbarMobileBg: "rgba(247,244,239,0.98)",
  navbarMobileBorder: "rgba(8,11,26,0.1)",
  navbarMobileLinkBorder: "rgba(8,11,26,0.06)",
  topDivider: "linear-gradient(90deg, transparent, rgba(8,11,26,0.1), transparent)",
  sectionDividerColor: "rgba(8,11,26,0.07)",
  heroGridOpacity: "0.04",
  heroBadgeBg: "rgba(200,158,30,0.1)",
  heroBadgeBorder: "rgba(200,158,30,1)",
  heroBadgeColor: "#836704",
  heroMetaBg: "rgba(8,11,26,0.05)",
  heroMetaBorder: "rgba(8,11,26,0.1)",
  heroLearnMoreBorder: "rgba(8,11,26,0.2)",
  heroLearnMoreColor: "#080B1A",
  heroCountdownBg: "rgba(200,158,30,0.1)",
  heroCountdownBorder: "rgba(200,158,30,0.3)",
  heroCountdownLabelColor: "rgba(8,11,26,0.45)",
  heroCountdownSeparatorColor: "#C09A1E",
  heroScrollColor: "rgba(8,11,26,0.3)",
  heroSubtextColor: "rgba(8,11,26,0.6)",
  heroEventTimerLabel: "rgba(8,11,26,0.45)",
  aboutStatCardBg: "#FFFFFF",
  aboutStatCardBorder: "rgba(8,11,26,0.07)",
  aboutHighlightBg: "linear-gradient(135deg, rgba(232,92,4,0.06), rgba(200,158,30,0.04))",
  aboutHighlightBorder: "rgba(232,92,4,0.18)",
  aboutVerseBg: "rgba(200,158,30,0.06)",
  aboutVerseBorder: "rgba(200,158,30,0.2)",
  aboutVerseText: "rgba(8,11,26,0.75)",
  aboutListItemText: "rgba(8,11,26,0.65)",
  scheduleTabInactiveBg: "rgba(8,11,26,0.04)",
  scheduleTabInactiveBorder: "rgba(8,11,26,0.08)",
  scheduleTabInactiveColor: "rgba(8,11,26,0.55)",
  scheduleRowBg: "#FFFFFF",
  scheduleRowBorder: "rgba(8,11,26,0.06)",
  scheduleTimeColor: "rgba(8,11,26,0.4)",
  scheduleTimelineDot: "rgba(8,11,26,0.06)",
  scheduleNoteColor: "rgba(8,11,26,0.35)",
  scheduleFooter: "rgba(8,11,26,0.35)",
  scheduleSubtitle: "rgba(8,11,26,0.5)",
  speakerCardBg: "#FFFFFF",
  speakerCardBorder: "rgba(8,11,26,0.08)",
  speakerImgGradient: "linear-gradient(to top, rgba(247,244,239,0.95) 0%, transparent 50%)",
  mainSpeakerBg: "linear-gradient(135deg, rgba(232,92,4,0.06) 0%, rgba(200,158,30,0.04) 100%)",
  mainSpeakerBorder: "rgba(200,158,30,0.3)",
  mainSpeakerImgGradient: "linear-gradient(to right, transparent 50%, #F7F4EF 100%), linear-gradient(to top, #F7F4EF 0%, transparent 30%)",
  regFormBg: "#FFFFFF",
  regFormBorder: "rgba(8,11,26,0.08)",
  accomPartnerBg: "rgba(200,158,30,0.06)",
  accomPartnerBorder: "rgba(200,158,30,0.2)",
  accomCardBg: "#FFFFFF",
  accomCardBorder: "rgba(8,11,26,0.08)",
  accomCardImgGradient: "linear-gradient(to top, rgba(247,244,239,0.85) 0%, transparent 60%)",
  accomAmenityBg: "rgba(8,11,26,0.04)",
  accomAmenityBorder: "rgba(8,11,26,0.07)",
  accomAmenityColor: "rgba(8,11,26,0.5)",
  venueInfoBg: "#FFFFFF",
  venueInfoBorder: "rgba(8,11,26,0.08)",
  venueTorontoBg: "rgba(232,92,4,0.05)",
  venueTorontoBorder: "rgba(232,92,4,0.15)",
  venueMapBorder: "rgba(8,11,26,0.1)",
  venueMapFilter: "none",
  venueDirBg: "#FFFFFF",
  venueDirBorder: "rgba(8,11,26,0.07)",
  pastTabInactiveBg: "rgba(8,11,26,0.04)",
  pastTabInactiveBorder: "rgba(8,11,26,0.08)",
  pastTabInactiveColor: "rgba(8,11,26,0.55)",
  pastEventImgGradient: "linear-gradient(to top, rgba(247,244,239,0.9) 0%, transparent 45%)",
  pastDetailTextColor: "rgba(8,11,26,0.65)",
  pastTestimonyBg: "rgba(200,158,30,0.06)",
  pastTestimonyBorder: "rgba(200,158,30,0.18)",
  pastTestimonyText: "rgba(8,11,26,0.6)",
  pastTestimonyAttrib: "rgba(8,11,26,0.35)",
  pastSermonsDivider: "rgba(8,11,26,0.07)",
  pastSermonCardBg: "#FFFFFF",
  pastSermonCardBorder: "rgba(8,11,26,0.08)",
  pastSermonCardImgOverlay: "rgba(8,11,26,0.35)",
  pastSermonTitle: "#080B1A",
  pastSermonMeta: "rgba(8,11,26,0.35)",
  pastViewAllBorder: "rgba(200,158,30,0.4)",
  pastViewAllColor: "#C09A1E",
  faqOpenBg: "rgba(200,158,30,0.06)",
  faqOpenBorder: "rgba(200,158,30,0.3)",
  faqClosedBg: "#FFFFFF",
  faqClosedBorder: "rgba(8,11,26,0.07)",
  faqDivider: "rgba(200,158,30,0.2)",
  faqSubtitle: "rgba(8,11,26,0.5)",
  faqAnswerColor: "rgba(8,11,26,0.6)",
  faqContactBg: "rgba(232,92,4,0.05)",
  faqContactBorder: "rgba(232,92,4,0.15)",
  faqContactText: "rgba(8,11,26,0.55)",
  givingCardBg: "#FFFFFF",
  givingCardBorder: "rgba(8,11,26,0.08)",
  givingScriptureBg: "rgba(200,158,30,0.05)",
  givingScriptureBorder: "rgba(200,158,30,0.2)",
  givingScriptureText: "rgba(8,11,26,0.7)",
  givingCategoriesBg: "#FFFFFF",
  givingCategoriesBorder: "rgba(8,11,26,0.07)",
  givingTrustText: "rgba(8,11,26,0.35)",
  givingMethodBg: "rgba(8,11,26,0.04)",
  givingMethodColor: "rgba(8,11,26,0.4)",
  goldAccent: "#8A6A00",
  ctaGradient: "linear-gradient(135deg, #E8C033, #E85D04)",
  ctaText: "#080B1A",
  titleGradient: "linear-gradient(135deg, #8A6A00 0%, #B07A10 40%, #C05000 100%)",
  accentRgb: "138,106,0",
};

interface ThemeContextType {
  t: AppTheme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  t: dark,
  toggleTheme: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false);
  const toggleTheme = () => setIsDark((d) => !d);
  return (
    <ThemeContext.Provider value={{ t: isDark ? dark : light, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
