import type { Metadata } from 'next';
import { requireTrackedRedirect } from '../../../../redirects';
import { TrackedRedirectPage } from '../_components/TrackedRedirectPage';

const redirect = requireTrackedRedirect('/books');

export const metadata: Metadata = {
  title: 'Redirecting...',
  robots: {
    index: false,
    follow: false,
  },
};

export default function BooksRedirectPage() {
  return <TrackedRedirectPage {...redirect} />;
}
