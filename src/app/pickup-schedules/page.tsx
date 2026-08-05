import type { Metadata } from "next";

import { PickupSchedulesPage } from "@/app/components/PickupSchedulesPage";
import { ThemeProvider } from "@/app/contexts/ThemeContext";

export const metadata: Metadata = {
  title: "Pickup Schedules | Reboot Camp - North America",
  description:
    "Browse pickup schedules for general attendees, workers, and volunteers for Reboot Camp North America.",
  alternates: {
    canonical: "/pickup-schedules",
  },
};

export default function PickupSchedulesRoute() {
  return (
    <ThemeProvider>
      <PickupSchedulesPage />
    </ThemeProvider>
  );
}
