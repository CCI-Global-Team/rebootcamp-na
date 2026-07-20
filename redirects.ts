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
];
