import { useState } from "react";
import { ChevronDown, Baby, BusFront } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";

function AccordionList({ items, accentEmail, registerUrl, registerLabel }: {
  items: { q: string; a: string; hasLink?: boolean }[];
  accentEmail?: string;
  registerUrl?: string;
  registerLabel?: string;
}) {
  const { t } = useTheme();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-2">
      {items.map((faq, i) => (
        <div key={i} className="rounded-xl overflow-hidden transition-all duration-200"
          style={{ background: openIndex === i ? t.faqOpenBg : t.faqClosedBg, border: `1px solid ${openIndex === i ? t.faqOpenBorder : t.faqClosedBorder}` }}>
          <button className="w-full text-left px-5 py-4 flex items-center justify-between gap-4"
            onClick={() => setOpenIndex(openIndex === i ? null : i)}>
            <span className="flex-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontSize: "1rem", fontWeight: 600, letterSpacing: "0.02em", color: openIndex === i ? t.goldAccent : t.textPrimary }}>
              {faq.q}
            </span>
            <ChevronDown size={16} className="shrink-0 transition-transform duration-300"
              style={{ color: openIndex === i ? t.goldAccent : t.textVeryMuted, transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)" }} />
          </button>

          {openIndex === i && (
            <div className="px-5 pb-5">
              <div className="w-full h-px mb-4" style={{ background: t.faqDivider }} />
              <p className="leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.9rem", color: t.faqAnswerColor }}>
                {accentEmail ? faq.a.replace(accentEmail, "") : faq.a}
                {accentEmail && faq.a.includes(accentEmail) && (
                  <a href={`mailto:${accentEmail}`} style={{ color: t.goldAccent }} className="hover:underline">{accentEmail}</a>
                )}
              </p>
              {faq.hasLink && registerUrl && (
                <a
                  href={registerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-3 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-[1.02]"
                  style={{ background: "rgba(232,93,4,0.12)", border: "1px solid rgba(232,93,4,0.3)", color: "#E85D04", fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.8rem", letterSpacing: "0.08em", textDecoration: "none" }}
                >
                  <BusFront size={13} />
                  {registerLabel ?? "REGISTER FOR TRANSPORTATION"}
                </a>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export function FAQSection() {
  const { t } = useTheme();
  const { faqs, childcare, site, venue } = useSiteContent();
  const [activeTab, setActiveTab] = useState<"general" | "childcare" | "transport">("general");

  return (
    <section id="faqs" className="relative py-24 overflow-hidden" style={{ backgroundColor: t.sectionBg, transition: "background 0.4s ease" }}>
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: t.topDivider }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12" style={{ backgroundColor: `rgba(${t.accentRgb},0.4)` }} />
            <span style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }} className="uppercase text-xs tracking-widest">
              {faqs.sectionLabel}
            </span>
            <div className="h-px w-12" style={{ backgroundColor: "rgba(232,192,51,0.4)" }} />
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

        {/* Tab toggle */}
        <div className="flex gap-2 p-1 rounded-xl mb-8"
          style={{ background: t.isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)", border: `1px solid rgba(${t.accentRgb},0.12)` }}>
          {([
            { key: "general",   label: "General FAQs",                icon: null },
            { key: "childcare", label: childcare.faqsLabel,           icon: <Baby size={14} /> },
            { key: "transport", label: venue.transport.faqsLabel,     icon: <BusFront size={14} /> },
          ] as const).map(({ key, label, icon }) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg transition-all duration-200"
              style={{
                background: activeTab === key ? t.ctaGradient : "transparent",
                color: activeTab === key ? "#fff" : t.textMuted,
                fontFamily: "'Barlow Condensed', sans-serif",
                fontWeight: 600,
                fontSize: "0.88rem",
                letterSpacing: "0.06em",
                border: "none",
                cursor: "pointer",
                boxShadow: activeTab === key ? "0 4px 16px rgba(232,93,4,0.3)" : "none",
              }}
            >
              {icon}
              {label}
            </button>
          ))}
        </div>

        {/* General FAQs */}
        {activeTab === "general" && (
          <>
            <AccordionList items={faqs.items} />
            <div className="mt-10 p-6 rounded-2xl text-center" style={{ backgroundColor: t.faqContactBg, border: `1px solid ${t.faqContactBorder}` }}>
              <h3 className="mb-2 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", color: t.textPrimary }}>
                {faqs.stillHaveQsHeading}
              </h3>
              <p className="mb-4 text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.faqContactText }}>
                {faqs.stillHaveQsText}
              </p>
              <a href={`mailto:${site.email}`} className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:scale-105"
                style={{ backgroundImage: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}>
                {faqs.contactCtaLabel}
              </a>
            </div>
          </>
        )}

        {/* Transportation FAQs */}
        {activeTab === "transport" && (
          <>
            <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl"
              style={{ background: t.isDark ? "rgba(232,192,51,0.07)" : "rgba(232,192,51,0.05)", border: "1px solid rgba(232,192,51,0.2)" }}>
              <BusFront size={18} style={{ color: t.goldAccent, flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: t.goldAccent, letterSpacing: "0.04em", margin: 0 }}>
                  {venue.transport.label}
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: t.textMuted, margin: 0 }}>
                  {venue.transport.desc}
                </p>
              </div>
              <a
                href={venue.transport.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-auto text-xs hover:underline"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", color: t.goldAccent, textDecoration: "none", whiteSpace: "nowrap" }}
              >
                Register Now →
              </a>
            </div>

            <AccordionList
              items={venue.transport.faqs}
              accentEmail={venue.transport.faqsContact}
              registerUrl={venue.transport.url}
              registerLabel={venue.transport.ctaLabel}
            />

            <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: t.faqContactBg, border: `1px solid ${t.faqContactBorder}` }}>
              <h3 className="mb-2 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", color: t.textPrimary }}>
                Transportation Questions?
              </h3>
              <p className="mb-4 text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.faqContactText }}>
                Contact the transportation team directly.
              </p>
              <a
                href={`mailto:${venue.transport.faqsContact}`}
                className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:scale-105"
                style={{ background: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}
              >
                <BusFront size={15} />
                EMAIL TRANSPORT TEAM
              </a>
            </div>
          </>
        )}

        {/* CelebKids FAQs */}
        {activeTab === "childcare" && (
          <>
            {/* CelebKids header strip */}
            <div className="flex items-center gap-3 mb-6 px-4 py-3 rounded-xl"
              style={{ background: t.isDark ? "rgba(232,93,4,0.08)" : "rgba(232,93,4,0.05)", border: "1px solid rgba(232,93,4,0.2)" }}>
              <Baby size={18} style={{ color: "#E85D04", flexShrink: 0 }} />
              <div>
                <p style={{ fontFamily: "'Oswald', sans-serif", fontWeight: 600, fontSize: "0.9rem", color: "#E85D04", letterSpacing: "0.04em", margin: 0 }}>
                  CelebKids RBC&apos;26 North America
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.75rem", color: t.textMuted, margin: 0 }}>
                  Questions about child care at the event
                </p>
              </div>
              <a href={`#childcare`}
                onClick={(e) => { e.preventDefault(); document.querySelector("#childcare")?.scrollIntoView({ behavior: "smooth" }); }}
                className="ml-auto text-xs hover:underline"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.06em", color: t.goldAccent, textDecoration: "none", whiteSpace: "nowrap" }}>
                Register →
              </a>
            </div>

            <AccordionList items={childcare.faqs} accentEmail={childcare.faqsContact} />

            <div className="mt-10 p-6 rounded-2xl text-center" style={{ background: t.faqContactBg, border: `1px solid ${t.faqContactBorder}` }}>
              <h3 className="mb-2 uppercase" style={{ fontFamily: "'Oswald', sans-serif", fontSize: "1.2rem", letterSpacing: "0.06em", color: t.textPrimary }}>
                More CelebKids Questions?
              </h3>
              <p className="mb-4 text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.faqContactText }}>
                Reach the CelebKids team directly.
              </p>
              <a href={`mailto:${childcare.faqsContact}`} className="inline-flex items-center gap-2 px-6 py-3 rounded transition-all duration-200 hover:scale-105"
                style={{ backgroundImage: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 600, letterSpacing: "0.08em", fontSize: "0.9rem" }}>
                <Baby size={15} />
                EMAIL CELEBKIDS TEAM
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
