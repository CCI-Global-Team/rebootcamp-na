import logo from "@/assets/logo/rbc-na-full-blue.png";
import logoWhite from "@/assets/logo/rbc-na-full-white.png";
import { Mail, MapPin } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import Image from "next/image";

// const SOCIAL_ICON_MAP: Record<string, React.ElementType> = { Instagram, Facebook, Youtube, Twitter };

export function Footer() {
  const { t } = useTheme();
  const { navbar, footer, site, venue } = useSiteContent();

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden" style={{ background: t.footerBg, borderTop: `1px solid ${t.footerBorder}`, transition: "background 0.4s ease, border-color 0.4s ease" }}>
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <Image src={t.isDark ? logoWhite : logo} alt="Reboot Camp North America" style={{ height: "64px", width: "auto", display: "block", transition: "opacity 0.3s ease" }} />
            </div>
            <p className="text-sm mb-6 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>
              {footer.description}
            </p>
            <div className="flex gap-3">
              {/* {footer.socials.map(({ platform, url }) => {
                const Icon = SOCIAL_ICON_MAP[platform] ?? Instagram;
                return (
                  <a key={platform} href={url} aria-label={platform} className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ background: t.isDark ? "rgba(255,255,255,0.06)" : "rgba(8,11,26,0.06)", border: `1px solid ${t.cardBorder}` }}>
                    <Icon size={14} style={{ color: t.textMuted }} />
                  </a>
                );
              })} */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", fontSize: "0.8rem", color: t.textPrimary }}>
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2">
              {navbar.groups.flatMap((g) => g.items).map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={(e) => { e.preventDefault(); scrollTo(link.href); }} className="text-sm transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = t.goldAccent)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = t.textMuted)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Details */}
          <div>
            <h4 className="uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", fontSize: "0.8rem", color: t.textPrimary }}>
              Event Details
            </h4>
            <div className="flex flex-col gap-4">
              {footer.eventDetails.map(({ label, value }) => (
                <div key={label}>
                  <p className="text-xs uppercase tracking-wider mb-1" style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.goldAccent }}>{label}</p>
                  <p className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textSecondary, whiteSpace: "pre-line" }}>{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="uppercase mb-4" style={{ fontFamily: "'Barlow Condensed', sans-serif", letterSpacing: "0.1em", fontSize: "0.8rem", color: t.textPrimary }}>
              Contact Us
            </h4>
            <div className="flex flex-col gap-3 mb-6">
              {[
                { icon: Mail, text: site.email },
                { icon: MapPin, text: venue.cityDisplay },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-start gap-3">
                  <Icon size={14} style={{ color: t.goldAccent }} className="mt-0.5 shrink-0" />
                  <span className="text-sm" style={{ fontFamily: "'Inter', sans-serif", color: t.textMuted }}>{text}</span>
                </div>
              ))}
            </div>

            {/* Register CTA */}
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); scrollTo("#register"); }}
              className="block px-5 py-3 rounded text-center text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ background: t.ctaGradient, color: t.ctaText, fontFamily: "'Oswald', sans-serif", fontWeight: 700, letterSpacing: "0.1em" }}
            >
              {footer.registerCta}
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t py-6" style={{ borderColor: t.footerBottomBorder }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs" style={{ fontFamily: "'Inter', sans-serif", color: t.textDim }}>
            &copy; {new Date().getFullYear()} {site.orgName}. All rights reserved.
          </p>
          <div className="flex gap-5">
            {footer.legalLinks.map((item) => (
              <a key={item} href="#" className="text-xs transition-colors duration-200" style={{ fontFamily: "'Inter', sans-serif", color: t.textDim }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.goldAccent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.textDim)}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
