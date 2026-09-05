import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Play, Radio } from "lucide-react";

import logoWhite from "@/assets/logo/rbc-na-full-white.png";

const YOUTUBE_STREAMS_URL = "https://www.youtube.com/@CelebrationChurchCanada/streams";

export const metadata: Metadata = {
  title: "Watch Live | Reboot Camp North America",
  description: "Join the Reboot Camp North America live stream on YouTube.",
  alternates: { canonical: "/watch" },
};

export default function WatchPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#09080c] px-5 py-8 text-white sm:px-8 sm:py-10">
      <div className="pointer-events-none absolute -top-48 -left-40 h-[34rem] w-[34rem] rounded-full bg-[#e85d04]/25 blur-3xl" />
      <div className="pointer-events-none absolute right-[-12rem] bottom-[-12rem] h-[34rem] w-[34rem] rounded-full bg-[#e8c033]/15 blur-3xl" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage: "linear-gradient(rgba(232,192,51,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,192,51,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col items-center justify-center text-center">
        <Link href="/" aria-label="Reboot Camp North America home" className="mb-12 inline-flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f6d561]">
          <Image
            src={logoWhite}
            alt="Reboot Camp North America"
            className="h-auto w-40 sm:w-48"
            priority
          />
        </Link>

        <div className="inline-flex items-center gap-2 rounded-full border border-[#e8c033]/45 bg-[#e8c033]/10 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-[#f6d561] uppercase">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
          </span>
          Live stream
        </div>

        <h1 className="mt-6 max-w-4xl font-[family-name:var(--font-oswald)] text-[clamp(3.5rem,10vw,7.5rem)] leading-[0.88] font-bold tracking-[0.01em] uppercase">
          Join the
          <span className="block bg-linear-to-r from-[#f6d561] via-[#f88a36] to-[#e85d04] bg-clip-text text-transparent">live broadcast</span>
        </h1>

        <a
          href={YOUTUBE_STREAMS_URL}
          target="_blank"
          rel="noreferrer"
          className="mt-10 inline-flex min-h-16 items-center justify-center gap-3 rounded-full bg-linear-to-r from-[#e6321c] via-[#ff7429] to-[#ffb048] px-8 py-4 font-[family-name:var(--font-oswald)] text-lg font-semibold tracking-[0.1em] text-[#160b08] uppercase shadow-[0_12px_35px_rgba(232,93,4,0.4)] transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(232,93,4,0.55)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#f6d561]"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff0000] text-white">
            <Play size={17} fill="currentColor" className="ml-0.5" />
          </span>
          Watch on YouTube
          <ExternalLink size={18} aria-hidden="true" />
        </a>

        <div className="mt-12 grid w-full max-w-2xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 text-left sm:grid-cols-2">
          <div className="bg-[#121016]/90 p-5 sm:p-6">
            <p className="mb-2 font-[family-name:var(--font-barlow-condensed)] text-xs tracking-[0.17em] text-[#f6d561] uppercase">Where to watch</p>
            <p className="font-[family-name:var(--font-oswald)] text-xl">YouTube · Celebration Church Canada</p>
          </div>
          <div className="bg-[#121016]/90 p-5 sm:p-6">
            <p className="mb-2 font-[family-name:var(--font-barlow-condensed)] text-xs tracking-[0.17em] text-[#f6d561] uppercase">How to join</p>
            <p className="font-[family-name:var(--font-oswald)] text-xl">Open the stream and press play</p>
          </div>
        </div>

        <div className="mt-8 inline-flex items-center gap-2 text-sm text-white/50">
          <Radio size={15} /> September 4–6, 2026 · Toronto, Canada
        </div>
      </div>
    </main>
  );
}
