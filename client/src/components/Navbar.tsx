/* ============================================================
   FAST FIX 72 — Navbar Component
   Style: Néon Urbain / Tech Sombre — sticky, glassmorphism, neon accents
   ============================================================ */

import { useState, useEffect } from "react";
import { Menu, X, Zap, LogIn, LogOut } from "lucide-react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { useLocation } from "wouter";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "À propos", href: "#apropos" },
  { label: "Avis", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "rgba(13, 17, 23, 0.95)"
          : "rgba(13, 17, 23, 0.7)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 212, 255, 0.2)"
          : "1px solid transparent",
        boxShadow: scrolled ? "0 4px 30px rgba(0, 212, 255, 0.05)" : "none",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a
            href="#accueil"
            onClick={(e) => { e.preventDefault(); handleNavClick("#accueil"); }}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-9 h-9 rounded flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                boxShadow: "0 0 15px rgba(0, 212, 255, 0.4)",
              }}
            >
              <Zap size={18} className="text-[#0D1117]" fill="#0D1117" />
            </div>
            <span
              className="font-display text-sm font-bold tracking-widest"
              style={{ color: "#00D4FF", fontFamily: "'Orbitron', sans-serif" }}
            >
              FAST FIX 72
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-2 text-sm font-medium transition-all duration-200 rounded relative group"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(230, 237, 243, 0.7)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "#00D4FF";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(230, 237, 243, 0.7)";
                }}
              >
                {link.label}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 w-0 group-hover:w-4/5 transition-all duration-300"
                  style={{ background: "#00D4FF", boxShadow: "0 0 8px #00D4FF" }}
                />
              </a>
            ))}
          </div>

          {/* Auth & CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated && user?.role === "admin" && (
              <button
                onClick={() => navigate("/admin")}
                className="px-4 py-2 text-sm font-medium rounded transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "#00FF88",
                  border: "1px solid #00FF88",
                  background: "rgba(0, 255, 136, 0.05)",
                }}
              >
                Admin
              </button>
            )}
            {isAuthenticated ? (
              <button
                onClick={() => logout()}
                className="btn-neon text-sm flex items-center gap-2"
              >
                <LogOut size={16} />
                Déconnexion
              </button>
            ) : (
              <a
                href={getLoginUrl()}
                className="btn-neon text-sm flex items-center gap-2"
              >
                <LogIn size={16} />
                Connexion
              </a>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden p-2 rounded transition-colors"
            style={{ color: "#00D4FF" }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="md:hidden"
          style={{
            background: "rgba(13, 17, 23, 0.98)",
            borderTop: "1px solid rgba(0, 212, 255, 0.2)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                className="px-4 py-3 text-sm font-medium rounded transition-all duration-200"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "rgba(230, 237, 243, 0.8)",
                  borderLeft: "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "#00D4FF";
                  el.style.borderLeftColor = "#00D4FF";
                  el.style.background = "rgba(0, 212, 255, 0.05)";
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.color = "rgba(230, 237, 243, 0.8)";
                  el.style.borderLeftColor = "transparent";
                  el.style.background = "transparent";
                }}
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 space-y-2">
              {isAuthenticated && user?.role === "admin" && (
                <button
                  onClick={() => { setIsOpen(false); navigate("/admin"); }}
                  className="w-full px-4 py-3 text-sm font-medium rounded transition-all duration-200"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontWeight: 600,
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                    color: "#00FF88",
                    border: "1px solid #00FF88",
                    background: "rgba(0, 255, 136, 0.05)",
                  }}
                >
                  Admin
                </button>
              )}
              {isAuthenticated ? (
                <button
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="btn-neon w-full text-center block"
                >
                  Déconnexion
                </button>
              ) : (
                <a
                  href={getLoginUrl()}
                  className="btn-neon w-full text-center block"
                >
                  Connexion
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
