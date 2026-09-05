export type WelcomeJourney = "first-timer" | "second-timer";
export type WelcomeLocationKind = "Campus" | "Cell Church";
export type TrackedCountryCode = "CA" | "US";
export type TrackedCountryName = "Canada" | "United States";

type JourneyCopy = {
  badge: string;
  title: string;
  warmMessage: string;
  description: string;
  ctaLabel: string;
  qrLabel: string;
};

type WelcomePageCopy = {
  badge: string;
  title: string;
  description: string;
  helper: string;
  question: string;
  countryLabel: string;
  regionLabel: string;
  cityLabel: string;
  countryPlaceholder: string;
  regionPlaceholder: string;
  cityPlaceholder: string;
  fallbackRegionOption: string;
  fallbackCityOption: string;
  notTrackedYet: string;
  exactMatchLabel: string;
  fallbackLabel: string;
  supportHeading: string;
  supportBody: string;
  supportCta: string;
  journeys: Record<WelcomeJourney, JourneyCopy>;
};

type WelcomeFormConfig = {
  firstTimerBaseUrl: string;
  secondTimerBaseUrl: string;
};

type CountryOption = {
  code: string;
  name: string;
};
export type { CountryOption };

export type WelcomeLocation = {
  slug: string;
  name: string;
  countryCode: TrackedCountryCode;
  country: TrackedCountryName;
  regionCode: string;
  regionName: string;
  city: string;
  kind: WelcomeLocationKind;
  address: string;
  serviceTime: string;
};

export type WelcomeLocationWithForms = WelcomeLocation & {
  formLinks: Record<WelcomeJourney, string>;
};

export type WelcomeCountryFallback = {
  countryCode: string;
  countryName: string;
  formLinks: Record<WelcomeJourney, string>;
};

export const welcomePageCopy: WelcomePageCopy = {
  badge: "Reboot Camp NA Welcome",
  title: "We’re glad you’re here",
  description:
    "Whether this is your first time with Celebration Church or your second visit, we’ll help you get to the right follow-up form in just a few steps.",
  helper:
    "Start with your visitor type, tell us where you’re coming from, and we’ll surface the best link and QR code for you.",
  question: "Where are you joining us from?",
  countryLabel: "Country",
  regionLabel: "State / Province",
  cityLabel: "City",
  countryPlaceholder: "Select your country",
  regionPlaceholder: "Select your state or province",
  cityPlaceholder: "Select your city",
  fallbackRegionOption: "I don’t see my state / province",
  fallbackCityOption: "I don’t see my city",
  notTrackedYet:
    "We don’t have a state-by-state list for this country yet, so we’ll route you to the default welcome form for your country.",
  exactMatchLabel: "Best match for your location",
  fallbackLabel: "Default form for your country",
  supportHeading: "Need help getting connected?",
  supportBody:
    "If your location is not listed yet, the fallback form below is still a good next step. You can also email the team and we’ll help you find the right church home.",
  supportCta: "Email the Reboot Camp NA team",
  journeys: {
    "first-timer": {
      badge: "First Time With Us?",
      title: "First timer",
      warmMessage:
        "Welcome. We’re genuinely happy you made it here, and we’d love to help you take your next step with ease.",
      description:
        "Choose your country first, then your state or province. If we find a matching location, we’ll show the right first-timer link and QR code right away.",
      ctaLabel: "Open first-timer form",
      qrLabel: "Scan for first-timer form",
    },
    "second-timer": {
      badge: "So Good To See You Again",
      title: "Second timer",
      warmMessage:
        "Welcome back. It’s a joy to have you with us again, and this will help you connect with the right team faster.",
      description:
        "Choose your country first, then your state or province. If we find a matching location, we’ll show the best second-timer form for that area.",
      ctaLabel: "Open second-timer form",
      qrLabel: "Scan for second-timer form",
    },
  },
};

const welcomeForms: WelcomeFormConfig = {
  firstTimerBaseUrl: "https://joincci.org/ft",
  secondTimerBaseUrl: "https://joincci.org/st",
};

const countryCodeList = [
  "AF",
  "AL",
  "DZ",
  "AD",
  "AO",
  "AG",
  "AR",
  "AM",
  "AU",
  "AT",
  "AZ",
  "BS",
  "BH",
  "BD",
  "BB",
  "BY",
  "BE",
  "BZ",
  "BJ",
  "BT",
  "BO",
  "BA",
  "BW",
  "BR",
  "BN",
  "BG",
  "BF",
  "BI",
  "CV",
  "KH",
  "CM",
  "CA",
  "CF",
  "TD",
  "CL",
  "CN",
  "CO",
  "KM",
  "CG",
  "CD",
  "CR",
  "CI",
  "HR",
  "CU",
  "CY",
  "CZ",
  "DK",
  "DJ",
  "DM",
  "DO",
  "EC",
  "EG",
  "SV",
  "GQ",
  "ER",
  "EE",
  "SZ",
  "ET",
  "FJ",
  "FI",
  "FR",
  "GA",
  "GM",
  "GE",
  "DE",
  "GH",
  "GR",
  "GD",
  "GT",
  "GN",
  "GW",
  "GY",
  "HT",
  "HN",
  "HU",
  "IS",
  "IN",
  "ID",
  "IR",
  "IQ",
  "IE",
  "IL",
  "IT",
  "JM",
  "JP",
  "JO",
  "KZ",
  "KE",
  "KI",
  "KP",
  "KR",
  "KW",
  "KG",
  "LA",
  "LV",
  "LB",
  "LS",
  "LR",
  "LY",
  "LI",
  "LT",
  "LU",
  "MG",
  "MW",
  "MY",
  "MV",
  "ML",
  "MT",
  "MH",
  "MR",
  "MU",
  "MX",
  "FM",
  "MD",
  "MC",
  "MN",
  "ME",
  "MA",
  "MZ",
  "MM",
  "NA",
  "NR",
  "NP",
  "NL",
  "NZ",
  "NI",
  "NE",
  "NG",
  "MK",
  "NO",
  "OM",
  "PK",
  "PW",
  "PS",
  "PA",
  "PG",
  "PY",
  "PE",
  "PH",
  "PL",
  "PT",
  "QA",
  "RO",
  "RU",
  "RW",
  "KN",
  "LC",
  "VC",
  "WS",
  "SM",
  "ST",
  "SA",
  "SN",
  "RS",
  "SC",
  "SL",
  "SG",
  "SK",
  "SI",
  "SB",
  "SO",
  "ZA",
  "SS",
  "ES",
  "LK",
  "SD",
  "SR",
  "SE",
  "CH",
  "SY",
  "TJ",
  "TZ",
  "TH",
  "TL",
  "TG",
  "TO",
  "TT",
  "TN",
  "TR",
  "TM",
  "TV",
  "UG",
  "UA",
  "AE",
  "GB",
  "US",
  "UY",
  "UZ",
  "VU",
  "VA",
  "VE",
  "VN",
  "YE",
  "ZM",
  "ZW",
  "XK",
];

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

export const countryOptions: CountryOption[] = countryCodeList
  .map((code) => ({
    code,
    name: countryNames.of(code) ?? code,
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

const welcomeLocations: WelcomeLocation[] = [
  {
    slug: "toronto-on",
    name: "CCI Toronto",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Toronto",
    kind: "Campus",
    address: "1000 Finch Ave W, North York, ON M3J 2V5, Canada",
    serviceTime: "Sundays 9:00 AM & 11:30 AM ET",
  },
  {
    slug: "hamilton-on",
    name: "CCI Hamilton",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Hamilton",
    kind: "Campus",
    address: "126 James St S, Hamilton, ON L8P 2Z4, Canada",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "oshawa-on",
    name: "CCI Oshawa",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Oshawa",
    kind: "Campus",
    address: "1351 Grandview St N, Oshawa, ON L1K 0G1, Canada",
    serviceTime: "Sundays 9:00 AM ET",
  },
  {
    slug: "barrie-on",
    name: "CCI Barrie",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Barrie",
    kind: "Campus",
    address: "507 Cundles Rd E, Barrie, ON L4M 0G9, Canada",
    serviceTime: "Sundays 9:30 AM ET",
  },
  {
    slug: "calgary-ab",
    name: "CCI Calgary",
    countryCode: "CA",
    country: "Canada",
    regionCode: "AB",
    regionName: "Alberta",
    city: "Calgary",
    kind: "Campus",
    address: "91 Crowfoot Terrace, Room 9 NW, Calgary, AB T3G 2L5, Canada",
    serviceTime: "Sundays 9:00 AM MT",
  },
  {
    slug: "ottawa-on",
    name: "CCI Ottawa",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Ottawa",
    kind: "Campus",
    address: "499 Preston Street, Ottawa, ON K1S 4N7, Canada",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "winnipeg-mb",
    name: "CCI Winnipeg",
    countryCode: "CA",
    country: "Canada",
    regionCode: "MB",
    regionName: "Manitoba",
    city: "Winnipeg",
    kind: "Campus",
    address: "341 Wilton St, Winnipeg, MB R3M 3B8, Canada",
    serviceTime: "Sundays 10:00 AM CT",
  },
  {
    slug: "montreal-qc",
    name: "CCI Montreal Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "QC",
    regionName: "Quebec",
    city: "Montreal",
    kind: "Cell Church",
    address: "4995 Rue Pare, Montreal, QC H4P 1S4, Canada",
    serviceTime: "Sundays 9:00 AM ET",
  },
  {
    slug: "sudbury-on",
    name: "CCI Sudbury Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Sudbury",
    kind: "Cell Church",
    address: "57 Morrison Avenue, Sudbury, ON P3C 3G7, Canada",
    serviceTime: "Sundays 5:00 PM ET",
  },
  {
    slug: "kitchener-on",
    name: "CCI Kitchener Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "Kitchener",
    kind: "Cell Church",
    address: "Block B Party Room, 1425 Block Line Rd, Kitchener, ON N2C 0B9, Canada",
    serviceTime: "Sundays 9:00 AM ET",
  },
  {
    slug: "edmonton-ab",
    name: "CCI Edmonton Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "AB",
    regionName: "Alberta",
    city: "Edmonton",
    kind: "Cell Church",
    address: "Buchanan Centre, 11209 86 St NW, Edmonton, AB T5B 3H7, Canada",
    serviceTime: "Sundays 10:00 AM MT",
  },
  {
    slug: "kamloops-bc",
    name: "CCI Kamloops Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "BC",
    regionName: "British Columbia",
    city: "Kamloops",
    kind: "Cell Church",
    address: "232 Holly Avenue, Kamloops, BC V2B 1M3, Canada",
    serviceTime: "Sundays 10:00 AM PT",
  },
  {
    slug: "london-on",
    name: "CCI London Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "ON",
    regionName: "Ontario",
    city: "London",
    kind: "Cell Church",
    address: "Kiwanis Seniors Centre, 78 Riverside Dr, London, ON N6H 1B4, Canada",
    serviceTime: "Sundays 9:00 AM ET",
  },
  {
    slug: "regina-sk",
    name: "CCI Regina Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "SK",
    regionName: "Saskatchewan",
    city: "Regina",
    kind: "Cell Church",
    address: "4-2151 Anaquod Rd, Regina, SK S4V 3T7, Canada",
    serviceTime: "Sundays 10:00 AM CT",
  },
  {
    slug: "vancouver-bc",
    name: "CCI Vancouver Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "BC",
    regionName: "British Columbia",
    city: "Vancouver",
    kind: "Cell Church",
    address: "Comma King George, 9651 136A Street, Surrey, BC V3T 0W9, Canada",
    serviceTime: "Sundays 10:00 AM PT",
  },
  {
    slug: "halifax-ns",
    name: "CCI Halifax Cell Church",
    countryCode: "CA",
    country: "Canada",
    regionCode: "NS",
    regionName: "Nova Scotia",
    city: "Halifax",
    kind: "Cell Church",
    address: "Coming soon",
    serviceTime: "Sundays 9:00 AM AT",
  },
  {
    slug: "dallas-tx",
    name: "CCI Dallas",
    countryCode: "US",
    country: "United States",
    regionCode: "TX",
    regionName: "Texas",
    city: "Dallas",
    kind: "Campus",
    address: "300 Chisholm Place, Plano, TX 75075, USA",
    serviceTime: "Sundays 10:00 AM CT",
  },
  {
    slug: "dmv-md",
    name: "CCI DMV",
    countryCode: "US",
    country: "United States",
    regionCode: "MD",
    regionName: "Maryland",
    city: "Brentwood",
    kind: "Campus",
    address: "3501 Windom Road, Brentwood, MD 20722, USA",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "boston-ma",
    name: "CCI Boston",
    countryCode: "US",
    country: "United States",
    regionCode: "MA",
    regionName: "Massachusetts",
    city: "Cambridge",
    kind: "Campus",
    address: "40 Granite Street, Cambridge, MA 02139, USA",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "austin-tx",
    name: "CCI Austin",
    countryCode: "US",
    country: "United States",
    regionCode: "TX",
    regionName: "Texas",
    city: "Austin",
    kind: "Campus",
    address: "9700 Stonelake Blvd, Austin, TX 78759, USA",
    serviceTime: "Sundays 10:00 AM CT",
  },
  {
    slug: "atlanta-ga",
    name: "CCI Atlanta Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "GA",
    regionName: "Georgia",
    city: "Atlanta",
    kind: "Cell Church",
    address: "Instructional Center, Room 109, 759 Ferst Dr, Atlanta, GA 30318, USA",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "bay-area-ca",
    name: "CCI Bay Area Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "CA",
    regionName: "California",
    city: "Hayward",
    kind: "Cell Church",
    address: "22433 Meekland Avenue, Hayward, CA 94541, USA",
    serviceTime: "Sundays 10:00 AM PT",
  },
  {
    slug: "chicago-il",
    name: "CCI Chicago Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "IL",
    regionName: "Illinois",
    city: "Chicago",
    kind: "Cell Church",
    address: "5450 N Winthrop Avenue, Chicago, IL 60640, USA",
    serviceTime: "Sundays 10:00 AM CT",
  },
  {
    slug: "knoxville-cleveland-tn",
    name: "CCI Knoxville/Cleveland Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "TN",
    regionName: "Tennessee",
    city: "Knoxville",
    kind: "Cell Church",
    address:
      "Humanities and Social Sciences Building, Room 103B, 1115 Volunteer Boulevard, Knoxville, TN 37916, USA",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "nashville-tn",
    name: "CCI Nashville Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "TN",
    regionName: "Tennessee",
    city: "Goodlettsville",
    kind: "Cell Church",
    address: "3100 Business Park Circle, Goodlettsville, TN 37072, USA",
    serviceTime: "Sundays 10:00 AM CT",
  },
  {
    slug: "new-york-new-jersey",
    name: "CCI New York/New Jersey Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "NY",
    regionName: "New York",
    city: "New York",
    kind: "Cell Church",
    address: "Michiko Studios, Floor 7, 15 W 39th Street, New York, NY 10018, USA",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "north-carolina-nc",
    name: "CCI North Carolina Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "NC",
    regionName: "North Carolina",
    city: "Morrisville",
    kind: "Cell Church",
    address: "1901 NW Cary Pkwy, Suite 105, Morrisville, NC 27560, USA",
    serviceTime: "Sundays 10:00 AM ET",
  },
  {
    slug: "oklahoma-ok",
    name: "CCI Oklahoma Cell Church",
    countryCode: "US",
    country: "United States",
    regionCode: "OK",
    regionName: "Oklahoma",
    city: "Tulsa",
    kind: "Cell Church",
    address: "1333 N Utica Ave, Suite H, Tulsa, OK 74110, USA",
    serviceTime: "Sundays 10:00 AM CT",
  },
];

function getJourneyBaseUrl(journey: WelcomeJourney) {
  return journey === "first-timer"
    ? welcomeForms.firstTimerBaseUrl
    : welcomeForms.secondTimerBaseUrl;
}

function buildFormLink(
  journey: WelcomeJourney,
  params: Record<string, string>,
) {
  const url = new URL(getJourneyBaseUrl(journey));

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url.toString();
}

function buildLocationFormLinks(location: WelcomeLocation) {
  return {
    "first-timer": buildFormLink("first-timer", {
      source: "reboot-camp-na",
      matchType: "location",
      journey: "first-timer",
      country: location.country,
      countryCode: location.countryCode,
      region: location.regionName,
      regionCode: location.regionCode,
      city: location.city,
      location: location.name,
      locationType: location.kind,
      locationSlug: location.slug,
    }),
    "second-timer": buildFormLink("second-timer", {
      source: "reboot-camp-na",
      matchType: "location",
      journey: "second-timer",
      country: location.country,
      countryCode: location.countryCode,
      region: location.regionName,
      regionCode: location.regionCode,
      city: location.city,
      location: location.name,
      locationType: location.kind,
      locationSlug: location.slug,
    }),
  } satisfies Record<WelcomeJourney, string>;
}

export function buildCountryFallback(countryCode: string, countryName: string): WelcomeCountryFallback {
  return {
    countryCode,
    countryName,
    formLinks: {
      "first-timer": buildFormLink("first-timer", {
        source: "reboot-camp-na",
        matchType: "country-fallback",
        journey: "first-timer",
        country: countryName,
        countryCode,
      }),
      "second-timer": buildFormLink("second-timer", {
        source: "reboot-camp-na",
        matchType: "country-fallback",
        journey: "second-timer",
        country: countryName,
        countryCode,
      }),
    },
  };
}

export const welcomeLocationsWithForms: WelcomeLocationWithForms[] = welcomeLocations.map(
  (location) => ({
    ...location,
    formLinks: buildLocationFormLinks(location),
  }),
);

export const trackedCountryCodes = ["CA", "US"] satisfies TrackedCountryCode[];
