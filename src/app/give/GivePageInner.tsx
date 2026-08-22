'use client';

import { Footer } from '@/app/components/Footer';
import { GiveQuickLinks } from '@/app/components/GiveQuickLinks';
import { Navbar } from '@/app/components/Navbar';
import { ThemeProvider } from '@/app/contexts/ThemeContext';

export function GivePageInner() {
  return (
    <ThemeProvider>
      <Navbar />
      <GiveQuickLinks />
      <Footer />
    </ThemeProvider>
  );
}
