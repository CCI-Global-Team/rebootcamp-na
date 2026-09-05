import type { Metadata } from 'next';

import { QuickLinksPageInner } from '@/app/ql/QuickLinksPageInner';

export const metadata: Metadata = {
  title: 'Quick Links | Reboot Camp - North America',
  description: 'Live captions and translation for Reboot Camp North America.',
  alternates: {
    canonical: '/ql',
  },
};

export default function QuickLinksPage() {
  return <QuickLinksPageInner />;
}
