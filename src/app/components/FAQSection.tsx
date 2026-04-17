import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

export function FAQSection() {
  const { t } = useTheme();
  const { faqs, site } = useSiteContent();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="relative py-24 overflow-hidden" style={{ background: t.sectionBg, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ background: `rgba(${t.accentRgb},0.4)` }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
              {faqs.sectionLabel}
            </span>
            <div className="h-px w-12" style={{ background: "rgba(232,192,51,0.4)" }} />
          </div>
          <h2 className="uppercase mb-3" style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: t.textPrimary }}>
            {faqs.headingPlain}{" "}
            <span style={{ backgroundImage: t.titleGradient, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
              {faqs.headingAccent}
            </span>
          </h2>
          <p className="max-w-md mx-auto" style={{ fontFamily: "'Inter', sans-serif", color: t.faqSubtitle }}>
            {faqs.contactText}{" "}
            <a href={`mailto:${site.email}`} style={{ color: t.goldAccent }} className="hover:underline">{site.email}</a>
          </p>
        </div>

        {/* FAQs */}
        <div className="flex flex-col gap-2">
          {faqs.items.map((faq, i) => (
            <div key={i} className="rounded-xl overflow-hidden transition-all duration-200" style={{ background: openIndex === i ? t.faqOpenBg : t.faqClosedBg, border: `1px solid ${openIndex === i ? t.faqOpenBorder : t.faqClosedBorder}` }}>
              <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                <span className="flex-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.02em", color: openIndex === i ? t.goldAccent : t.textPrimary }}>
                  {faq.q}
                </span>
                <ChevronDown size={16} className="shrink-0 transition-transform duration-300" style={{ color: openIndex === i ? t.goldAccent : t.textVeryMuted, transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }} />
              </button>

              {openIndex === i && (
                <div className="px-5 pb-5">
                  <div className="w-full h-px mb-4" style={{ background: t.faqDivider }} />
                  <p className="leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: t.faqAnswerColor }}>
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: t.faqContactBg, border: `1px solid ${t.faqContactBorder}` }}>
          <h3 className="mb-2 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", color: t.textPrimary }}>
            {faqs.stillHaveQsHeading}
          </h3>
          <p className="mb-4 text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.faqContactText }}>
            {faqs.stillHaveQsText}
          </p>
          <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:scale-105" style={{ background: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}>
            {faqs.contactCtaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
