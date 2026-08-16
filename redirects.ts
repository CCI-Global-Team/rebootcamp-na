import type { Redirect } from 'next/dist/lib/load-custom-routes';

export type TrackedRedirect = {
  source: `/${string}`;
  destination: string;
  permanent: boolean;
  label: string;
};

export const trackedRedirects: TrackedRedirect[] = [
  {
    source: '/testimony',
    destination: 'https://ccicanada.churchcenter.com/people/forms/1211829',
    permanent: true,
    label: 'Testimony Form',
  },
  {
    source: '/ministers',
    destination: 'https://ccicanada.churchcenter.com/people/forms/1266296',
    permanent: true,
    label: 'Ministers Form',
  },
  {
    source: '/merch',
    destination: 'https://eden.cendance.com/store/reboot-camp-north-america-2026-merch',
    permanent: true,
    label: 'Reboot Camp North America 2026 Merch',
  },
  {
    source: '/give',
    destination: 'https://give.tithe.ly/?formId=3003d62b-3ed6-443d-94b2-d3f8ca9148b8',
    permanent: true,
    label: 'Give',
  },
  {
    source: '/cellchurch',
    destination: 'https://ccicanada.churchcenter.com/people/forms/1282963',
    permanent: false,
    label: 'Cell Church Form',
  },
];

export function getTrackedRedirect(source: TrackedRedirect['source']) {
  return trackedRedirects.find((redirect) => redirect.source === source);
}

export function requireTrackedRedirect(source: TrackedRedirect['source']) {
  const redirect = getTrackedRedirect(source);

  if (!redirect) {
    throw new Error(`Missing tracked redirect for ${source}`);
  }

  return redirect;
}

export const redirects: Redirect[] = [
  {
    source: '/index',
    destination: '/',
    permanent: true,
  },
];
