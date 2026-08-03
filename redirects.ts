import type { Redirect } from 'next/dist/lib/load-custom-routes';

export const redirects: Redirect[] = [
  {
    source: '/index',
    destination: '/',
    permanent: true,
  },
  {
    source: "/testimony",
    destination: "https://ccicanada.churchcenter.com/people/forms/1211829",
    permanent: true,
  },
  {
    source: "/ministers",
    destination: "https://ccicanada.churchcenter.com/people/forms/1266296",
    permanent: true,
  },
  {
    source: "/merch",
    destination: "https://eden.cendance.com/store/reboot-camp-north-america-2026-merch",
    permanent: true,
  },
  {
    source: "/give",
    destination: "https://give.tithe.ly/?formId=3003d62b-3ed6-443d-94b2-d3f8ca9148b8",
    permanent: true,
  },
];
