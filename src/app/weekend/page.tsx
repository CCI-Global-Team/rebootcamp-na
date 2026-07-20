import { ArrowDown } from "lucide-react";
import type { Metadata } from "next";

import { getChurchCenterFormUrl, weekendCampaign } from "@/lib/weekend/campaign";

import { LeadForm } from "./LeadForm";

import styles from "./weekend.module.css";

export const metadata: Metadata = {
  title: "Weekend | Reboot Camp North America",
  description:
    "A new Reboot Camp North America campaign is coming soon. Leave your details for updates.",
  alternates: { canonical: "/weekend" },
  robots: { index: false, follow: true },
};

const kickerClass =
  "mb-2 font-barlow-condensed text-sm font-bold tracking-widest text-[#e8c033] uppercase";

export default function WeekendPage() {
  return (
    <div className="font-inter min-h-screen bg-[#080b1a] text-white">
      <a
        className={`${styles.skipLink} fixed top-4 left-4 z-100 rounded-sm bg-[#e8c033] px-4 py-3 text-[#080b1a]`}
        href="#weekend-form"
      >
        Skip to form
      </a>
      <main>
        <section
          className={`${styles.heroBackground} relative min-h-[88svh] overflow-hidden`}
          aria-labelledby="weekend-title"
        >
          <div
            className={`${styles.gridPattern} pointer-events-none absolute inset-0 opacity-5`}
            aria-hidden="true"
          />
          <div className="relative z-1 mx-auto grid min-h-[88svh] w-full max-w-7xl grid-cols-1 items-center gap-x-10 gap-y-20 px-4 py-5 sm:px-6 md:grid-cols-[minmax(0,1.15fr)_minmax(18rem,.85fr)] md:py-15 lg:px-8 lg:py-20">
            <div className="max-w-3xl">
              <p className={kickerClass}>{weekendCampaign.eyebrow}</p>
              <h1
                className={`${styles.gradientText} font-oswald text-[clamp(4rem,10vw,8rem)] leading-none font-bold tracking-tighter uppercase`}
                id="weekend-title"
              >
                {weekendCampaign.heroTitle}
              </h1>
              <p className="font-barlow-condensed mt-7 text-[clamp(1.4rem,3vw,2rem)] leading-snug">
                {weekendCampaign.heroLead}
              </p>
              <div className="mt-6 max-w-2xl space-y-3 leading-7 text-white/65">
                {weekendCampaign.heroCopy.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              <a
                className="font-oswald mt-9 inline-flex items-center justify-center gap-3 rounded-sm bg-linear-to-br from-[#e8c033] to-[#e85d04] px-8 py-4 font-semibold tracking-widest text-[#080b1a] uppercase shadow-[0_4px_24px_rgba(232,92,4,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(232,92,4,.38)] focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-[#e8c033] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                href="#weekend-form"
              >
                Tell Me More <ArrowDown className={styles.gentleBounce} />
              </a>
            </div>
            <div
              className={`${styles.visualPlaceholder} relative flex min-h-112 flex-col justify-end overflow-hidden rounded-lg border border-[#e8c033]/30 p-12 shadow-lg select-none max-[800px]:mx-auto max-[800px]:min-h-0 max-[800px]:w-full max-[800px]:max-w-md lg:aspect-4/5`}
              aria-label="Campaign visual placeholder"
            >
              <div
                className={`${styles.visualMark} font-oswald absolute inset-y-[35%] leading-none font-bold text-white/15`}
              >
                HOPE
              </div>
              <p className="font-oswald relative text-2xl font-semibold uppercase">
                Campaign artwork placeholder
              </p>
              <span className="relative mt-2 text-sm text-white/65">
                Final creative coming soon
              </span>
            </div>
          </div>
        </section>

        <section
          className="border-t border-t-amber-200/10 bg-linear-to-b from-[#0d0f22] to-[#080b1a] px-6 py-20 md:py-32"
          id="weekend-form"
          aria-labelledby="weekend-form-title"
        >
          <div className="mx-auto w-full max-w-2xl">
            <header className="mb-10 text-center">
              <p className={kickerClass}>Reboot Camp North America</p>
              <h2
                className="font-oswald text-[clamp(2.8rem,7vw,4.8rem)] leading-normal font-bold uppercase"
                id="weekend-form-title"
              >
                {weekendCampaign.formTitle}
              </h2>
              <p className="mx-auto mt-5 max-w-lg leading-7 text-white/65">
                {weekendCampaign.formIntro}
              </p>
            </header>
            <div className="relative overflow-hidden rounded-2xl border border-[#e8c033]/25 bg-white/3 p-6 pt-7 shadow-2xl shadow-amber-50/10 before:absolute before:inset-x-0 before:top-0 before:h-1 before:bg-linear-to-r before:from-[#b98f00] before:via-[#e8c033] before:to-[#e85d04] md:p-12 md:pt-13">
              <LeadForm fallbackHref={getChurchCenterFormUrl()} />
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-[#040610] px-6 py-10 text-center text-white/65">
        <strong className="font-oswald text-xl font-bold text-white uppercase">
          {weekendCampaign.footerTitle}
        </strong>
        <p className="mt-3 mb-4">{weekendCampaign.footerBody}</p>
        <small className="text-white/50">
          &copy; 2026 Celebration Church International. All rights reserved.
        </small>
      </footer>
    </div>
  );
}
