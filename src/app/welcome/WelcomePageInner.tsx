"use client";

import { useEffect, useState } from "react";
import QRCode from "qrcode";
import { ExternalLink, HeartHandshake, MapPin, QrCode } from "lucide-react";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { useTheme } from "@/app/contexts/ThemeContext";
import type {
  CountryOption,
  WelcomeCountryFallback,
  WelcomeJourney,
  WelcomeLocationWithForms,
} from "@/data/welcomeLinks";
import {
  buildCountryFallback,
  welcomePageCopy,
} from "@/data/welcomeLinks";

type WelcomePageInnerProps = {
  locations: WelcomeLocationWithForms[];
  countryOptions: CountryOption[];
};

type ResolvedMatch =
  | {
      kind: "location";
      location: WelcomeLocationWithForms;
      message: string;
    }
  | {
      kind: "fallback";
      fallback: WelcomeCountryFallback;
      message: string;
    };

const journeyOptions: WelcomeJourney[] = ["first-timer", "second-timer"];
const notListedValue = "__not-listed__";

export function WelcomePageInner({
  locations,
  countryOptions,
}: WelcomePageInnerProps) {
  const { t } = useTheme();
  const [journey, setJourney] = useState<WelcomeJourney>("first-timer");
  const [selectedCountryCode, setSelectedCountryCode] = useState("");
  const [selectedRegionCode, setSelectedRegionCode] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState("");

  const activeJourneyCopy = welcomePageCopy.journeys[journey];
  const selectedCountry =
    countryOptions.find((country) => country.code === selectedCountryCode) ?? null;
  const countryLocations = locations.filter(
    (location) => location.countryCode === selectedCountryCode,
  );
  const regionOptions = Array.from(
    new Map(
      countryLocations.map((location) => [
        location.regionCode,
        { code: location.regionCode, name: location.regionName },
      ]),
    ).values(),
  ).sort((a, b) => a.name.localeCompare(b.name));
  const regionLocations = countryLocations.filter(
    (location) => location.regionCode === selectedRegionCode,
  );
  const cityOptions = Array.from(
    new Map(regionLocations.map((location) => [location.city, location])).values(),
  )
    .map((location) => location.city)
    .sort((a, b) => a.localeCompare(b));

  const selectedCountryHasTrackedLocations = countryLocations.length > 0;
  const needsCitySelection = regionLocations.length > 1;

  let resolvedMatch: ResolvedMatch | null = null;

  if (selectedCountry) {
    if (!selectedCountryHasTrackedLocations) {
      resolvedMatch = {
        kind: "fallback",
        fallback: buildCountryFallback(selectedCountry.code, selectedCountry.name),
        message: welcomePageCopy.notTrackedYet,
      };
    } else if (selectedRegionCode === notListedValue) {
      resolvedMatch = {
        kind: "fallback",
        fallback: buildCountryFallback(selectedCountry.code, selectedCountry.name),
        message: `We could not find your state or province yet, so here is the default ${selectedCountry.name} form.`,
      };
    } else if (selectedRegionCode) {
      if (regionLocations.length === 1) {
        const matchedLocation = regionLocations[0];

        if (matchedLocation) {
          resolvedMatch = {
            kind: "location",
            location: matchedLocation,
            message: `We found the best match for ${matchedLocation.city}, ${matchedLocation.regionName}.`,
          };
        }
      } else if (selectedCity === notListedValue) {
        resolvedMatch = {
          kind: "fallback",
          fallback: buildCountryFallback(selectedCountry.code, selectedCountry.name),
          message: `We could not find your city yet, so here is the default ${selectedCountry.name} form.`,
        };
      } else if (selectedCity) {
        const matchedLocation =
          regionLocations.find((location) => location.city === selectedCity) ?? null;

        if (matchedLocation) {
          resolvedMatch = {
            kind: "location",
            location: matchedLocation,
            message: `We found the best match for ${matchedLocation.city}, ${matchedLocation.regionName}.`,
          };
        }
      }
    }
  }

  const activeLink = resolvedMatch
    ? resolvedMatch.kind === "location"
      ? resolvedMatch.location.formLinks[journey]
      : resolvedMatch.fallback.formLinks[journey]
    : "";

  useEffect(() => {
    let cancelled = false;

    if (!activeLink) {
      setQrCodeDataUrl("");
      return;
    }

    void QRCode.toDataURL(activeLink, {
      errorCorrectionLevel: "M",
      margin: 1,
      width: 280,
      color: {
        dark: "#111827",
        light: "#FFFFFFFF",
      },
    }).then((url) => {
      if (!cancelled) {
        setQrCodeDataUrl(url);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [activeLink]);

  useEffect(() => {
    setSelectedRegionCode("");
    setSelectedCity("");
  }, [selectedCountryCode]);

  useEffect(() => {
    setSelectedCity("");
  }, [selectedRegionCode]);

  return (
    <div
      style={{
        background: t.pageBg,
        minHeight: "100vh",
        fontFamily: "'Inter', sans-serif",
        overflowX: "hidden",
        transition: "background 0.4s ease",
      }}
    >
      <Navbar />

      <main>
        <section
          style={{
            background: t.heroGradient,
            borderBottom: `1px solid ${t.sectionDividerColor}`,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at top left, rgba(232,192,51,0.2), transparent 30%), radial-gradient(circle at bottom right, rgba(232,93,4,0.18), transparent 32%)",
            }}
          />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 sm:pt-36 sm:pb-20">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div className="max-w-3xl">
                <div
                  className="inline-flex items-center rounded-full px-4 py-2 text-xs uppercase tracking-[0.24em]"
                  style={{
                    background: t.heroBadgeBg,
                    border: `1px solid ${t.heroBadgeBorder}`,
                    color: t.heroBadgeColor,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {welcomePageCopy.badge}
                </div>

                <h1
                  className="mt-6 text-5xl sm:text-6xl lg:text-7xl leading-[0.95]"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    color: t.textPrimary,
                  }}
                >
                  {welcomePageCopy.title}
                </h1>

                <p
                  className="mt-5 max-w-2xl text-base sm:text-lg leading-7"
                  style={{ color: t.heroSubtextColor }}
                >
                  {activeJourneyCopy.warmMessage}
                </p>

                <p
                  className="mt-4 max-w-2xl text-sm sm:text-base leading-6"
                  style={{ color: t.textMuted }}
                >
                  {welcomePageCopy.description} {welcomePageCopy.helper}
                </p>
              </div>

              <div
                className="rounded-[28px] p-6 sm:p-7"
                style={{
                  background: t.heroMetaBg,
                  border: `1px solid ${t.heroMetaBorder}`,
                  backdropFilter: "blur(14px)",
                  boxShadow: t.isDark
                    ? "0 24px 60px rgba(0,0,0,0.3)"
                    : "0 24px 60px rgba(8,11,26,0.08)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.22em]"
                  style={{
                    color: t.goldAccent,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  How this works
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-3">
                  {[
                    "Choose first timer or second timer",
                    "Tell us your country and state or province",
                    "Get the right link and QR code",
                  ].map((step, index) => (
                    <div
                      key={step}
                      className="rounded-2xl p-4"
                      style={{
                        background: t.cardBg,
                        border: `1px solid ${t.cardBorder}`,
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-[0.2em]"
                        style={{
                          color: t.goldAccent,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        Step {index + 1}
                      </p>
                      <p
                        className="mt-2 text-sm leading-6"
                        style={{ color: t.textSecondary }}
                      >
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          style={{
            background: t.sectionBgAlt,
            borderBottom: `1px solid ${t.sectionDividerColor}`,
          }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <div
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2"
                  style={{
                    background: t.aboutVerseBg,
                    border: `1px solid ${t.aboutVerseBorder}`,
                    color: t.goldAccent,
                  }}
                >
                  <HeartHandshake size={16} />
                  <span
                    className="text-xs uppercase tracking-[0.18em]"
                    style={{
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    Visitor Journey
                  </span>
                </div>

                <h2
                  className="mt-5 text-3xl sm:text-4xl leading-tight"
                  style={{
                    fontFamily: "'Oswald', sans-serif",
                    color: t.textPrimary,
                    fontWeight: 700,
                  }}
                >
                  {activeJourneyCopy.title}
                </h2>

                <p
                  className="mt-3 max-w-xl text-base leading-7"
                  style={{ color: t.textSecondary }}
                >
                  {activeJourneyCopy.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {journeyOptions.map((option) => {
                  const optionCopy = welcomePageCopy.journeys[option];
                  const isActive = option === journey;

                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setJourney(option)}
                      className="rounded-[24px] p-5 text-left transition-transform duration-200 hover:-translate-y-0.5"
                      style={{
                        background: isActive ? t.mainSpeakerBg : t.cardBg,
                        border: `1px solid ${isActive ? t.mainSpeakerBorder : t.cardBorder}`,
                        boxShadow: isActive
                          ? t.isDark
                            ? "0 20px 40px rgba(0,0,0,0.28)"
                            : "0 20px 40px rgba(8,11,26,0.08)"
                          : "none",
                      }}
                    >
                      <p
                        className="text-xs uppercase tracking-[0.22em]"
                        style={{
                          color: t.goldAccent,
                          fontFamily: "'Barlow Condensed', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        {optionCopy.badge}
                      </p>
                      <p
                        className="mt-3 text-2xl"
                        style={{
                          color: t.textPrimary,
                          fontFamily: "'Oswald', sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        {optionCopy.title}
                      </p>
                      <p
                        className="mt-3 text-sm leading-6"
                        style={{ color: t.textSecondary }}
                      >
                        {optionCopy.warmMessage}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-8 grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
              <div
                className="rounded-[30px] p-6 sm:p-7"
                style={{
                  background: t.cardBg,
                  border: `1px solid ${t.cardBorder}`,
                  boxShadow: t.isDark
                    ? "0 18px 40px rgba(0,0,0,0.18)"
                    : "0 18px 40px rgba(8,11,26,0.05)",
                }}
              >
                <p
                  className="text-xs uppercase tracking-[0.22em]"
                  style={{
                    color: t.goldAccent,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  Step 1
                </p>
                <h3
                  className="mt-3 text-3xl"
                  style={{
                    color: t.textPrimary,
                    fontFamily: "'Oswald', sans-serif",
                    fontWeight: 700,
                  }}
                >
                  {welcomePageCopy.question}
                </h3>

                <div className="mt-6 space-y-5">
                  <FieldGroup
                    label={welcomePageCopy.countryLabel}
                    value={selectedCountryCode}
                    onChange={setSelectedCountryCode}
                    placeholder={welcomePageCopy.countryPlaceholder}
                    options={countryOptions.map((country) => ({
                      value: country.code,
                      label: country.name,
                    }))}
                  />

                  <FieldGroup
                    label={welcomePageCopy.regionLabel}
                    value={selectedRegionCode}
                    onChange={setSelectedRegionCode}
                    placeholder={
                      selectedCountryHasTrackedLocations
                        ? welcomePageCopy.regionPlaceholder
                        : selectedCountry
                        ? "No tracked state or province list for this country yet"
                        : "Choose a country first"
                    }
                    disabled={!selectedCountry || !selectedCountryHasTrackedLocations}
                    options={[
                      ...regionOptions.map((region) => ({
                        value: region.code,
                        label: region.name,
                      })),
                      ...(selectedCountryHasTrackedLocations
                        ? [
                            {
                              value: notListedValue,
                              label: welcomePageCopy.fallbackRegionOption,
                            },
                          ]
                        : []),
                    ]}
                  />

                  {needsCitySelection ? (
                    <FieldGroup
                      label={welcomePageCopy.cityLabel}
                      value={selectedCity}
                      onChange={setSelectedCity}
                      placeholder={welcomePageCopy.cityPlaceholder}
                      disabled={!selectedRegionCode || selectedRegionCode === notListedValue}
                      options={[
                        ...cityOptions.map((city) => ({
                          value: city,
                          label: city,
                        })),
                        {
                          value: notListedValue,
                          label: welcomePageCopy.fallbackCityOption,
                        },
                      ]}
                    />
                  ) : null}
                </div>
              </div>

              <ResultPanel
                journey={journey}
                qrCodeDataUrl={qrCodeDataUrl}
                resolvedMatch={resolvedMatch}
                selectedCountry={selectedCountry?.name ?? ""}
                selectedCountryHasTrackedLocations={selectedCountryHasTrackedLocations}
                selectedRegionCode={selectedRegionCode}
                selectedCity={selectedCity}
              />
            </div>
          </div>
        </section>

        <section style={{ background: t.sectionBgAlt2 }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <div
              className="rounded-[28px] p-6 sm:p-8"
              style={{
                background: t.faqContactBg,
                border: `1px solid ${t.faqContactBorder}`,
              }}
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-2xl">
                  <p
                    className="text-xs uppercase tracking-[0.22em]"
                    style={{
                      color: t.goldAccent,
                      fontFamily: "'Barlow Condensed', sans-serif",
                      fontWeight: 700,
                    }}
                  >
                    {welcomePageCopy.supportHeading}
                  </p>
                  <p
                    className="mt-3 text-base leading-7"
                    style={{ color: t.faqContactText }}
                  >
                    {welcomePageCopy.supportBody}
                  </p>
                </div>

                <a
                  href="mailto:canada@joincci.org?subject=Reboot%20Camp%20NA%20Welcome%20Page%20Support"
                  className="inline-flex items-center justify-center rounded-full px-5 py-3 text-sm transition-transform duration-200 hover:-translate-y-0.5"
                  style={{
                    background: t.ctaGradient,
                    color: t.ctaText,
                    fontFamily: "'Barlow Condensed', sans-serif",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                  }}
                >
                  {welcomePageCopy.supportCta}
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function FieldGroup({
  label,
  value,
  onChange,
  placeholder,
  options,
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  options: Array<{ value: string; label: string }>;
  disabled?: boolean;
}) {
  const { t } = useTheme();

  return (
    <label className="block">
      <span
        className="mb-2 block text-xs uppercase tracking-[0.18em]"
        style={{
          color: t.goldAccent,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        disabled={disabled}
        className="w-full rounded-2xl px-4 py-4 text-base outline-none"
        style={{
          background: t.inputBg,
          border: `1px solid ${t.inputBorder}`,
          color: disabled ? t.textDim : t.inputColor,
          appearance: "none",
        }}
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function ResultPanel({
  journey,
  qrCodeDataUrl,
  resolvedMatch,
  selectedCountry,
  selectedCountryHasTrackedLocations,
  selectedRegionCode,
  selectedCity,
}: {
  journey: WelcomeJourney;
  qrCodeDataUrl: string;
  resolvedMatch: ResolvedMatch | null;
  selectedCountry: string;
  selectedCountryHasTrackedLocations: boolean;
  selectedRegionCode: string;
  selectedCity: string;
}) {
  const { t } = useTheme();
  const journeyCopy = welcomePageCopy.journeys[journey];

  return (
    <div
      className="rounded-[30px] p-6 sm:p-7"
      style={{
        background: t.cardBg,
        border: `1px solid ${t.cardBorder}`,
        boxShadow: t.isDark
          ? "0 18px 40px rgba(0,0,0,0.18)"
          : "0 18px 40px rgba(8,11,26,0.05)",
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.22em]"
        style={{
          color: t.goldAccent,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
        }}
      >
        Step 2
      </p>

      <h3
        className="mt-3 text-3xl"
        style={{
          color: t.textPrimary,
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
        }}
      >
        Your best next step
      </h3>

      {!selectedCountry ? (
        <HelperState
          title="Choose your country to get started"
          body="Once you select your country, we’ll guide you to the right form."
        />
      ) : !selectedCountryHasTrackedLocations ? (
        <ResolvedCard
          journey={journey}
          qrCodeDataUrl={qrCodeDataUrl}
          title={welcomePageCopy.fallbackLabel}
          subtitle={selectedCountry}
          description={resolvedMatch?.message ?? welcomePageCopy.notTrackedYet}
          link={
            resolvedMatch?.kind === "fallback"
              ? resolvedMatch.fallback.formLinks[journey]
              : ""
          }
          qrLabel={journeyCopy.qrLabel}
          meta={`Country: ${selectedCountry}`}
        />
      ) : !selectedRegionCode ? (
        <HelperState
          title="Select your state or province"
          body={`We have tracked locations in ${selectedCountry}. Pick your state or province so we can show the best match.`}
        />
      ) : resolvedMatch?.kind === "location" ? (
        <ResolvedCard
          journey={journey}
          qrCodeDataUrl={qrCodeDataUrl}
          title={welcomePageCopy.exactMatchLabel}
          subtitle={resolvedMatch.location.name}
          description={resolvedMatch.message}
          link={resolvedMatch.location.formLinks[journey]}
          qrLabel={journeyCopy.qrLabel}
          meta={`${resolvedMatch.location.city}, ${resolvedMatch.location.regionName} • ${resolvedMatch.location.kind}`}
          address={resolvedMatch.location.address}
        />
      ) : resolvedMatch?.kind === "fallback" ? (
        <ResolvedCard
          journey={journey}
          qrCodeDataUrl={qrCodeDataUrl}
          title={welcomePageCopy.fallbackLabel}
          subtitle={selectedCountry}
          description={resolvedMatch.message}
          link={resolvedMatch.fallback.formLinks[journey]}
          qrLabel={journeyCopy.qrLabel}
          meta={`Country: ${selectedCountry}`}
        />
      ) : !selectedCity && selectedRegionCode !== notListedValue ? (
        <HelperState
          title="Select your city"
          body="We found more than one location in that state or province, so we need one more detail to route you well."
        />
      ) : (
        <HelperState
          title="Almost there"
          body="Finish your selection and your link will appear here."
        />
      )}
    </div>
  );
}

function HelperState({ title, body }: { title: string; body: string }) {
  const { t } = useTheme();

  return (
    <div
      className="mt-6 rounded-[24px] p-6"
      style={{
        background: t.inputBg,
        border: `1px solid ${t.inputBorder}`,
      }}
    >
      <p
        className="text-2xl"
        style={{
          color: t.textPrimary,
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
        }}
      >
        {title}
      </p>
      <p className="mt-3 text-base leading-7" style={{ color: t.textSecondary }}>
        {body}
      </p>
    </div>
  );
}

function ResolvedCard({
  journey,
  qrCodeDataUrl,
  title,
  subtitle,
  description,
  link,
  qrLabel,
  meta,
  address,
}: {
  journey: WelcomeJourney;
  qrCodeDataUrl: string;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  qrLabel: string;
  meta: string;
  address?: string;
}) {
  const { t } = useTheme();
  const journeyCopy = welcomePageCopy.journeys[journey];

  return (
    <article
      className="mt-6 rounded-[26px] p-5 sm:p-6"
      style={{
        background: t.mainSpeakerBg,
        border: `1px solid ${t.mainSpeakerBorder}`,
      }}
    >
      <p
        className="text-xs uppercase tracking-[0.18em]"
        style={{
          color: t.goldAccent,
          fontFamily: "'Barlow Condensed', sans-serif",
          fontWeight: 700,
        }}
      >
        {title}
      </p>

      <h4
        className="mt-3 text-3xl leading-tight"
        style={{
          color: t.textPrimary,
          fontFamily: "'Oswald', sans-serif",
          fontWeight: 700,
        }}
      >
        {subtitle}
      </h4>

      <p className="mt-3 text-base leading-7" style={{ color: t.textSecondary }}>
        {description}
      </p>

      <div
        className="mt-5 rounded-2xl p-4"
        style={{
          background: t.cardBg,
          border: `1px solid ${t.cardBorder}`,
        }}
      >
        <p className="text-sm" style={{ color: t.textPrimary, fontWeight: 600 }}>
          {meta}
        </p>
        {address ? (
          <div className="mt-3 flex items-start gap-3">
            <MapPin size={18} style={{ color: t.goldAccent }} className="mt-0.5 shrink-0" />
            <p className="text-sm leading-6" style={{ color: t.textSecondary }}>
              {address}
            </p>
          </div>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm transition-transform duration-200 hover:-translate-y-0.5"
            style={{
              background: t.ctaGradient,
              color: t.ctaText,
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            {journeyCopy.ctaLabel}
            <ExternalLink size={16} />
          </a>

          <p className="mt-4 text-xs leading-5 break-all" style={{ color: t.textDim }}>
            {link}
          </p>
        </div>

        <div
          className="mx-auto flex w-full max-w-[240px] flex-col items-center rounded-[28px] p-4 text-center"
          style={{
            background: t.isDark ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.7)",
            border: `1px solid ${t.cardBorder}`,
          }}
        >
          <div
            className="rounded-[24px] p-3"
            style={{ background: "#FFFFFF", boxShadow: "0 16px 35px rgba(8,11,26,0.08)" }}
          >
            {qrCodeDataUrl ? (
              <img
                src={qrCodeDataUrl}
                alt={`${qrLabel} for ${subtitle}`}
                width={190}
                height={190}
              />
            ) : (
              <div className="flex h-[190px] w-[190px] items-center justify-center text-center">
                <div>
                  <QrCode size={32} style={{ color: "#111827", margin: "0 auto" }} />
                  <p className="mt-3 text-sm text-slate-700">Generating QR code…</p>
                </div>
              </div>
            )}
          </div>
          <p className="mt-4 text-sm" style={{ color: t.textPrimary, fontWeight: 600 }}>
            {qrLabel}
          </p>
          <p className="mt-2 text-xs leading-5" style={{ color: t.textMuted }}>
            Scan to open this form on your phone.
          </p>
        </div>
      </div>
    </article>
  );
}
