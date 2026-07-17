import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import logo from "@/assets/logo/rbc-na-full-blue.png";
import logoWhite from "@/assets/logo/rbc-na-full-white.png";

type NavGroup = {
  label: string;
  items: { label: string; href: string; desc: string }[];
};

function DropdownGroup({ group, onNavigate, t }: { group: NavGroup; onNavigate: (href: string) => void; t: ReturnType<typeof useTheme>["t"] }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(true);
  };
  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setOpen(false), 120);
  };

  return (
    <div ref={ref} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        className="flex items-center gap-1 px-3 py-2 transition-colors duration-200 text-sm uppercase tracking-wider"
        style={{ fontFamily: "'Barlow Condensed', sans-serif", color: open ? t.goldAccent : t.navbarLinkColor, background: "none", border: "none", cursor: "pointer" }}
      >
        {group.label}
        <ChevronDown
          size={13}
          style={{ transition: "transform 0.2s ease", transform: open ? "rotate(180deg)" : "rotate(0deg)", color: open ? t.goldAccent : t.navbarLinkColor }}
        />
      </button>

      {open && (
        <div
          className="absolute top-full left-1/2 -translate-x-1/2 mt-2 rounded-xl overflow-hidden z-50"
          style={{
            minWidth: "220px",
            background: t.isDark ? "rgba(10,13,30,0.97)" : "rgba(255,253,247,0.98)",
            border: `1px solid rgba(${t.accentRgb},0.2)`,
            boxShadow: t.isDark
              ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,192,51,0.08)"
              : "0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(232,192,51,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          {/* Gold top rule */}
          <div className="h-0.5 w-full" style={{ background: `linear-gradient(90deg, transparent, ${t.goldAccent}, transparent)` }} />

          <div className="py-2">
            {group.items.map((item) => (
              <button
                key={item.href}
                onClick={() => { setOpen(false); onNavigate(item.href); }}
                className="w-full text-left px-4 py-2.5 flex flex-col gap-0.5 transition-colors duration-150 group/item"
                style={{ background: "none", border: "none", cursor: "pointer" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = t.isDark ? "rgba(232,192,51,0.07)" : "rgba(232,192,51,0.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
              >
                <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.9rem", letterSpacing: "0.05em", color: t.textPrimary, textTransform: "uppercase" }}>
                  {item.label}
                </span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.72rem", color: t.textVeryMuted, lineHeight: 1.3 }}>
                  {item.desc}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Navbar() {
  const { t, toggleTheme } = useTheme();
  const { navbar } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    setOpenGroup(null);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? t.navbarScrolledBg
          : t.isDark
          ? "linear-gradient(to bottom, rgba(8,11,26,0.85), transparent)"
          : "linear-gradient(to bottom, rgba(247,244,239,0.9), transparent)",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled ? `1px solid ${t.navbarBorder}` : "none",
        transition: "background 0.3s ease, border-color 0.3s ease",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 lg:h-24">

          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => { e.preventDefault(); handleNavClick("#hero"); }}
            className="flex items-center group"
          >
            <Image
              src={t.isDark ? logoWhite : logo}
              alt="Reboot Camp North America"
              style={{ height: "52px", width: "auto", display: "block", transition: "opacity 0.3s ease" }}
              loading="eager"
            />
          </a>

          {/* Desktop Nav — grouped dropdowns + direct links */}
          <nav className="hidden lg:flex items-center gap-0">
            {navbar.groups.filter((g) => g.items.length > 0).map((group) => (
              <DropdownGroup key={group.label} group={group} onNavigate={handleNavClick} t={t} />
            ))}
            {navbar.directLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-3 py-2 transition-colors duration-200 text-sm uppercase tracking-wider"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", color: t.navbarLinkColor }}
                onMouseEnter={(e) => (e.currentTarget.style.color = t.goldAccent)}
                onMouseLeave={(e) => (e.currentTarget.style.color = t.navbarLinkColor)}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right: theme + CTA */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(8,11,26,0.07)", border: t.isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(8,11,26,0.12)" }}
            >
              {t.isDark ? <Sun size={15} style={{ color: t.goldAccent }} /> : <Moon size={15} style={{ color: "#080B1A" }} />}
            </button>
            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); handleNavClick("#register"); }}
              className="px-5 py-2.5 rounded text-sm uppercase tracking-wider transition-all duration-200 hover:scale-105 hover:shadow-lg"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", background: t.ctaGradient, color: t.ctaText, fontWeight: 700, letterSpacing: "0.12em" }}
            >
              {navbar.ctaLabel}
            </a>
          </div>

          {/* Mobile: theme + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ background: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(8,11,26,0.07)", border: t.isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(8,11,26,0.12)" }}
            >
              {t.isDark ? <Sun size={14} style={{ color: t.goldAccent }} /> : <Moon size={14} style={{ color: "#080B1A" }} />}
            </button>
            <button className="p-2" style={{ color: t.textPrimary }} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu — grouped accordion */}
      {menuOpen && (
        <div className="lg:hidden border-t" style={{ background: t.navbarMobileBg, borderColor: t.navbarMobileBorder }}>
          <div className="px-4 py-3 flex flex-col gap-1">
            {navbar.groups.filter((g) => g.items.length > 0).map((group) => (
              <div key={group.label}>
                <button
                  className="w-full flex items-center justify-between px-3 py-3 transition-colors duration-200"
                  style={{ background: "none", border: "none", cursor: "pointer", borderBottom: `1px solid ${t.navbarMobileLinkBorder}` }}
                  onClick={() => setOpenGroup(openGroup === group.label ? null : group.label)}
                >
                  <span style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 700, fontSize: "0.85rem", letterSpacing: "0.12em", color: t.textPrimary, textTransform: "uppercase" }}>
                    {group.label}
                  </span>
                  <ChevronDown
                    size={14}
                    style={{ color: t.textVeryMuted, transition: "transform 0.2s ease", transform: openGroup === group.label ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                </button>

                {openGroup === group.label && (
                  <div className="pl-3 py-1 flex flex-col gap-0">
                    {group.items.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="w-full text-left px-3 py-2.5 flex items-center gap-3 transition-colors duration-150 rounded-lg"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = t.isDark ? "rgba(232,192,51,0.07)" : "rgba(232,192,51,0.06)"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "none"; }}
                      >
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: t.goldAccent }} />
                        <div>
                          <p style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 600, fontSize: "0.88rem", letterSpacing: "0.06em", color: t.textPrimary, margin: 0, textTransform: "uppercase" }}>
                            {item.label}
                          </p>
                          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: t.textVeryMuted, margin: 0 }}>
                            {item.desc}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {navbar.directLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-3 py-3 transition-colors duration-200 text-sm uppercase tracking-wider"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", borderBottom: `1px solid ${t.navbarMobileLinkBorder}`, color: t.navbarLinkColor }}
              >
                {link.label}
              </a>
            ))}

            <a
              href="#register"
              onClick={(e) => { e.preventDefault(); handleNavClick("#register"); }}
              className="mt-3 px-5 py-3 rounded text-center text-sm uppercase tracking-wider"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", background: t.ctaGradient, color: t.ctaText, fontWeight: 700 }}
            >
              {navbar.ctaLabel}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
