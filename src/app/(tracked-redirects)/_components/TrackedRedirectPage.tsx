'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { track } from '@vercel/analytics';

type TrackedRedirectPageProps = {
  source: `/${string}`;
  destination: string;
  label: string;
};

export function TrackedRedirectPage({
  source,
  destination,
  label,
}: TrackedRedirectPageProps) {
  useEffect(() => {
    track('Redirect Link Visited', {
      source,
      destination,
      label,
    });

    const timeoutId = window.setTimeout(() => {
      window.location.replace(destination);
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [destination, label, source]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-950 px-6 text-center text-white">
      <div className="max-w-md space-y-4">
        <p className="font-oswald text-3xl uppercase tracking-[0.12em]">
          Redirecting...
        </p>
        <p className="font-inter text-sm text-white/75">
          Sending you to {label}. If nothing happens, use the link below.
        </p>
        <Link
          href={destination}
          className="font-barlow-condensed text-lg uppercase tracking-[0.1em] text-[#E8C033] underline underline-offset-4"
        >
          Continue to {label}
        </Link>
      </div>
    </main>
  );
}
