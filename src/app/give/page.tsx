import type { Metadata } from 'next';

import { GivePageInner } from '@/app/give/GivePageInner';
import giveContent from '@/data/give.json';

export const metadata: Metadata = {
  title: giveContent.metadata.title,
  description: giveContent.metadata.description,
  alternates: {
    canonical: giveContent.metadata.canonical,
  },
};

export default function GivePage() {
  return <GivePageInner />;
}
