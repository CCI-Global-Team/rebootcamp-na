import type { Metadata } from "next";
import { ThemeProvider } from "@/app/contexts/ThemeContext";
import { WelcomePageInner } from "@/app/welcome/WelcomePageInner";
import {
  countryOptions,
  welcomeLocationsWithForms,
} from "@/data/welcomeLinks";

export const metadata: Metadata = {
  title: "Welcome | Reboot Camp North America",
  description:
    "A guided first-timer and second-timer welcome flow for finding the right Celebration Church form by country, state, and city.",
};
export default function WelcomePage() {
  return (
    <ThemeProvider>
      <WelcomePageInner
        locations={welcomeLocationsWithForms}
        countryOptions={countryOptions}
      />
    </ThemeProvider>
  );
}
