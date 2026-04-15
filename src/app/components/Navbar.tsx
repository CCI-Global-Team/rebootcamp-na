import { useState, useEffect } from "react";
import Image from 'next/image';
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { useSiteContent } from "@/app/hooks/useSiteContent";
import logo from "@/assets/logo/rbc-na-full-blue.png";
import logoWhite from "@/assets/logo/rbc-na-full-white.png";

export function Navbar() {
  const { t, toggleTheme } = useTheme();
  const { navbar } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
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

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navbar.links.map((link) => (
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

          {/* Right side: Theme Toggle + CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(8,11,26,0.07)",
                border: t.isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(8,11,26,0.12)",
              }}
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

          {/* Mobile: theme toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Toggle light/dark mode"
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200"
              style={{
                background: t.isDark ? "rgba(255,255,255,0.07)" : "rgba(8,11,26,0.07)",
                border: t.isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(8,11,26,0.12)",
              }}
            >
              {t.isDark ? <Sun size={14} style={{ color: t.goldAccent }} /> : <Moon size={14} style={{ color: "#080B1A" }} />}
            </button>
            <button className="p-2 transition-colors duration-300" style={{ color: t.textPrimary }} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden border-t transition-all duration-300" style={{ background: t.navbarMobileBg, borderColor: t.navbarMobileBorder }}>
          <div className="px-4 py-4 flex flex-col gap-1">
            {navbar.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-3 py-3 border-b transition-colors duration-200 text-sm uppercase tracking-wider"
                style={{ fontFamily: "'Barlow Condensed', sans-serif", borderColor: t.navbarMobileLinkBorder, color: t.navbarLinkColor }}
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
