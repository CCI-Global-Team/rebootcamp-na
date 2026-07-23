import {
  Baby,
  CalendarDays,
  Check,
  MapPin,
  Play,
  Sparkles,
  UserRound,
  Users,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { Big_Shoulders, Instrument_Serif } from "next/font/google";

import content from "@/data/content.json";
import { weekendCampaign } from "@/lib/weekend/campaign";

import { RegistrationLink } from "./RegistrationLink";
import styles from "./weekend.module.css";

const weekendDisplay = Big_Shoulders({
  subsets: ["latin"],
  weight: ["600", "700", "800", "900"],
  variable: "--font-big-shoulders-loaded",
});

const weekendSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: "italic",
  variable: "--font-instrument-serif-loaded",
});

export const metadata: Metadata = {
  title: weekendCampaign.landing.metadata.title,
  description: weekendCampaign.landing.metadata.description,
  alternates: { canonical: "/weekend" },
  openGraph: {
    type: "website",
    url: "/weekend",
    siteName: "Reboot Camp North America",
    title: weekendCampaign.landing.metadata.title,
    description: weekendCampaign.landing.metadata.description,
    images: [
      {
        url: weekendCampaign.landing.metadata.image,
        alt: weekendCampaign.landing.metadata.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: weekendCampaign.landing.metadata.title,
    description: weekendCampaign.landing.metadata.description,
    images: [weekendCampaign.landing.metadata.image],
  },
  robots: { index: true, follow: true },
};

const eventDetailIcons = {
  calendar: CalendarDays,
  location: MapPin,
  people: Users,
  childcare: Baby,
  check: Check,
} as const;

const ctaClass =
  "font-big-shoulders inline-flex min-h-11 items-center justify-center rounded-full bg-linear-to-r from-[#e6321c] via-[#ff8a33] to-[#ffbb55] px-7 py-3 font-bold tracking-wider text-[#170c08] uppercase shadow-[0_6px_22px_rgba(255,138,51,.28)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(255,138,51,.4)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffbb55] motion-reduce:transition-none motion-reduce:hover:translate-y-0";

const sectionHeadingClass =
  "font-big-shoulders text-[clamp(2.25rem,5vw,3.5rem)] leading-none font-extrabold tracking-tight uppercase";

// TODO: Enable with the trailer section after the approved video is available.
const SHOW_TRAILER_LINK = false;

// TODO: Enable after the attendee testimonials and attributions are approved.
const SHOW_TESTIMONIALS = false;

export default function WeekendPage() {
  const registrationUrl = content.event.registrationUrl;
  const { landing } = weekendCampaign;

  return (
    <div
      className={`${weekendDisplay.variable} ${weekendSerif.variable} min-h-screen overflow-x-hidden bg-[#170c08] font-inter text-[#f7f1e4] antialiased`}
    >
      <a
        className={`${styles.skipLink} fixed top-3 left-3 z-100 rounded-sm bg-[#ffbb55] px-4 py-3 font-semibold text-[#170c08] focus:translate-y-0`}
        href="#main-content"
      >
        Skip to main content
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex min-h-16 items-center justify-between border-b border-white/15 bg-[#0a0b10]/75 px-[5vw] backdrop-blur-md">
        <a
          className="font-big-shoulders text-lg font-extrabold tracking-wide uppercase focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffbb55]"
          href="#main-content"
        >
          {landing.wordmark}
        </a>
        <RegistrationLink
          className={`${ctaClass} px-5 py-2 text-sm`}
          href={registrationUrl}
          placement="header"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Register now for Reboot Camp (opens in a new tab)"
        >
          {landing.registerLabel}
        </RegistrationLink>
      </header>

      <main id="main-content">
        <section
          className={`${styles.hero} relative flex min-h-svh items-center overflow-hidden px-[6vw] pt-28 pb-28`}
          aria-labelledby="weekend-title"
        >
          <div
            className={`${styles.heroBackground} absolute inset-0`}
            aria-hidden="true"
          />
          <div
            className={`${styles.beam} ${styles.beamOne}`}
            aria-hidden="true"
          />
          <div
            className={`${styles.beam} ${styles.beamTwo}`}
            aria-hidden="true"
          />
          <div
            className={`${styles.beam} ${styles.beamThree}`}
            aria-hidden="true"
          />
          <svg
            className={styles.silhouette}
            viewBox="0 0 300 400"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <linearGradient
                id="weekend-figure-gradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#170c08" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#170c08" stopOpacity="0.7" />
              </linearGradient>
            </defs>
            <path
              fill="url(#weekend-figure-gradient)"
              d="M150 60 C175 60 190 82 188 108 C187 122 180 130 170 136 C200 148 222 172 226 206 L232 400 L68 400 L74 206 C78 172 100 148 130 136 C120 130 113 122 112 108 C110 82 125 60 150 60 Z"
            />
          </svg>

          <div className="relative z-2 max-w-3xl">
            <p className="mb-5 text-xs font-bold tracking-[.28em] text-[#ff8a33] uppercase">
              {landing.hero.eyebrow}
            </p>
            <h1
              id="weekend-title"
              className="font-big-shoulders max-w-3xl text-[clamp(3rem,9vw,6.5rem)] leading-[.92] font-extrabold tracking-tight uppercase"
            >
              {landing.hero.title}
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#d9cdb8] sm:text-lg">
              {landing.hero.description}
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
              <RegistrationLink
                className={`${ctaClass} px-9 py-4 w-fit`}
                href={registrationUrl}
                placement="hero"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Register now for Reboot Camp (opens in a new tab)"
              >
                {landing.registerLabel}
              </RegistrationLink>
              {SHOW_TRAILER_LINK && (
                <a
                  className="font-big-shoulders inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-white/35 px-6 py-4 font-bold tracking-wider uppercase transition hover:border-[#ffbb55] hover:text-[#ffbb55] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffbb55] motion-reduce:transition-none md:px-8"
                  href="#trailer"
                >
                  <Play size={16} fill="currentColor" aria-hidden="true" />
                  {landing.hero.trailerLabel}
                </a>
              )}
            </div>

            <ul
              className="mt-12 flex flex-wrap gap-x-0 gap-y-2.5 text-xs tracking-wider text-[#d9cdb8] uppercase"
              aria-label="Event highlights"
            >
              {landing.hero.highlights.map((item) => (
                <li
                  className="flex items-center after:mx-3 after:text-[#ff8a33] after:content-['•'] last:after:hidden"
                  key={item}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* TODO: Restore the trailer section and hero CTA when the approved video is available. */}

        <section
          className="px-[6vw] py-20 sm:py-24"
          aria-labelledby="why-title"
        >
          <header className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold tracking-[.28em] text-[#ff8a33] uppercase">
              {landing.benefits.eyebrow}
            </p>
            <h2 className={sectionHeadingClass} id="why-title">
              {landing.benefits.heading.map((line) => (
                <span className="block" key={line}>
                  {line}
                </span>
              ))}
            </h2>
          </header>
          <div className="mx-auto grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {landing.benefits.items.map((benefit) => (
              <article
                className="group overflow-hidden rounded-2xl border border-white/15 bg-[#2a160a]"
                key={benefit.title}
              >
                <div className="relative aspect-4/3 overflow-hidden">
                  <Image
                    src={benefit.image}
                    alt={benefit.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-[#2a160a] via-transparent to-transparent"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-6 text-center">
                  <h3 className="font-big-shoulders text-xl font-bold uppercase">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#d9cdb8]">
                    {benefit.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {SHOW_TESTIMONIALS && (
          <section
            className="border-y border-white/15 bg-[#20130a] px-[6vw] py-20 sm:py-24"
            aria-labelledby="testimonials-title"
          >
            <div className="mx-auto max-w-6xl">
              <h2
                className="font-instrument-serif mx-auto mb-12 max-w-2xl text-center text-[clamp(1.6rem,3vw,2.25rem)] leading-snug text-[#ffbb55] italic"
                id="testimonials-title"
              >
                {landing.socialProof.heading}
              </h2>
              <div className="grid gap-5 md:grid-cols-3">
                {landing.socialProof.testimonials.map((testimonial) => (
                  <article
                    className="rounded-2xl border border-white/15 bg-[#2a160a] p-7"
                    key={testimonial.id}
                  >
                    <div
                      className="mb-5 flex size-14 items-center justify-center rounded-full border-2 border-dashed border-[#ff8a33]/45 text-[#d9cdb8]"
                      aria-hidden="true"
                    >
                      <UserRound size={24} />
                    </div>
                    <p className="leading-7">“{testimonial.quote}”</p>
                    <p className="mt-5 text-xs tracking-wider text-[#d9cdb8] uppercase">
                      {testimonial.attribution}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        <section
          className="px-[6vw] py-20 sm:py-24"
          aria-labelledby="snapshot-title"
        >
          <header className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-4 text-xs font-bold tracking-[.28em] text-[#ff8a33] uppercase">
              {landing.snapshot.eyebrow}
            </p>
            <h2 className={sectionHeadingClass} id="snapshot-title">
              {landing.snapshot.heading}
            </h2>
          </header>
          <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {landing.snapshot.items.map(({ label, icon }) => {
              const Icon = eventDetailIcons[icon];

              return (
                <li
                  className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-white/15 bg-[#2a160a] p-5 text-center"
                  key={label}
                >
                  <Icon
                    className="mb-4 text-[#ffbb55]"
                    size={26}
                    aria-hidden="true"
                  />
                  <span className="font-big-shoulders font-bold uppercase">
                    {label}
                  </span>
                </li>
              );
            })}
          </ul>
        </section>

        <section
          className={`${styles.finalCta} relative overflow-hidden px-[6vw] py-28 text-center`}
          aria-labelledby="final-cta-title"
        >
          <div className="relative z-1 mx-auto max-w-3xl">
            <Sparkles
              className="mx-auto mb-6 text-[#ffbb55]"
              size={34}
              aria-hidden="true"
            />
            <h2 className={sectionHeadingClass} id="final-cta-title">
              {landing.finalCta.heading}
            </h2>
            <p className="font-instrument-serif mx-auto mt-5 max-w-xl text-xl leading-8 text-[#ffbb55] italic">
              {landing.finalCta.body}
            </p>
            <RegistrationLink
              className={`${ctaClass} mt-10 px-10 py-4`}
              href={registrationUrl}
              placement="final_cta"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Register now for Reboot Camp (opens in a new tab)"
            >
              {landing.registerLabel}
            </RegistrationLink>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/15 bg-[#20130a] px-[6vw] py-12 text-center">
        <p className="font-big-shoulders text-2xl font-extrabold uppercase">
          {landing.wordmark}
        </p>
        <p className="mt-3 text-sm leading-7 text-white/50">
          {landing.footer.details}
          <br />
          <a
            className="text-[#ffbb55] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffbb55]"
            href={landing.footer.website.href}
          >
            {landing.footer.website.label}
          </a>
          <span aria-hidden="true" className="mx-2 font-black">
            ·
          </span>
          <a
            className="underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#ffbb55]"
            href={`mailto:${landing.footer.email}`}
          >
            {landing.footer.email}
          </a>
        </p>
        <p className="mt-4 text-xs text-white/40">{landing.footer.copyright}</p>
      </footer>
    </div>
  );
}
