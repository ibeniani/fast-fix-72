/* ============================================================
   FAST FIX 72 — Footer Component
   Style: Néon Urbain / Tech Sombre — dark footer with neon accents
   ============================================================ */

import { Zap, Phone, Mail, MapPin, Facebook, Instagram } from "lucide-react";

const navLinks = [
  { label: "Accueil", href: "#accueil" },
  { label: "Services", href: "#services" },
  { label: "Tarifs", href: "#tarifs" },
  { label: "À propos", href: "#apropos" },
  { label: "Avis clients", href: "#avis" },
  { label: "Contact", href: "#contact" },
];

const services = [
  "Remplacement d'écran",
  "Remplacement de batterie",
  "Connecteur de charge",
  "Réparation caméra",
  "Dégâts des eaux",
  "Diagnostic gratuit",
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      style={{
        background: "#080C10",
        borderTop: "1px solid rgba(0, 212, 255, 0.1)",
      }}
    >
      <div className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
                }}
              >
                <Zap size={20} className="text-[#0D1117]" fill="#0D1117" />
              </div>
              <span
                className="font-bold tracking-widest text-sm"
                style={{ color: "#00D4FF", fontFamily: "'Orbitron', sans-serif" }}
              >
                FAST FIX 72
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(230, 237, 243, 0.45)" }}
            >
              Votre spécialiste en réparation de smartphones dans la Sarthe. 
              Rapide, fiable et garanti.
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[
                { icon: <Facebook size={16} />, label: "Facebook" },
                { icon: <Instagram size={16} />, label: "Instagram" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: "rgba(22, 27, 34, 0.8)",
                    border: "1px solid rgba(0, 212, 255, 0.15)",
                    color: "rgba(230, 237, 243, 0.5)",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0, 212, 255, 0.4)";
                    el.style.color = "#00D4FF";
                    el.style.background = "rgba(0, 212, 255, 0.08)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "rgba(0, 212, 255, 0.15)";
                    el.style.color = "rgba(230, 237, 243, 0.5)";
                    el.style.background = "rgba(22, 27, 34, 0.8)";
                  }}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4
              className="text-sm font-bold mb-4 tracking-widest uppercase"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#00D4FF",
                letterSpacing: "0.12em",
              }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); handleNavClick(link.href); }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(230, 237, 243, 0.45)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00D4FF"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(230, 237, 243, 0.45)"; }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-sm font-bold mb-4 tracking-widest uppercase"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#00FF88",
                letterSpacing: "0.12em",
              }}
            >
              Services
            </h4>
            <ul className="space-y-2">
              {services.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    onClick={(e) => { e.preventDefault(); handleNavClick("#services"); }}
                    className="text-sm transition-colors duration-200"
                    style={{ color: "rgba(230, 237, 243, 0.45)" }}
                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00FF88"; }}
                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(230, 237, 243, 0.45)"; }}
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              className="text-sm font-bold mb-4 tracking-widest uppercase"
              style={{
                fontFamily: "'Rajdhani', sans-serif",
                color: "#00D4FF",
                letterSpacing: "0.12em",
              }}
            >
              Contact
            </h4>
            <div className="space-y-3">
              {[
                { icon: <Phone size={14} />, text: "06 62 59 51 96" },
                { icon: <Mail size={14} />, text: "Beniani.pro@gmail.com" },
                { icon: <MapPin size={14} />, text: "Sablé-sur-Sarthe (72300)" },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-2">
                  <span style={{ color: "#00D4FF", flexShrink: 0 }}>{item.icon}</span>
                  <span
                    className="text-sm"
                    style={{ color: "rgba(230, 237, 243, 0.5)" }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Hours */}
            <div
              className="mt-5 p-3 rounded-lg"
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.1)",
              }}
            >
              <div
                className="text-xs font-bold mb-1 uppercase tracking-wider"
                style={{ color: "#00D4FF", fontFamily: "'Rajdhani', sans-serif" }}
              >
                Horaires
              </div>
              <div className="text-xs" style={{ color: "rgba(230, 237, 243, 0.45)" }}>
                24h/24 — 7j/7
              </div>
              <div className="text-xs" style={{ color: "rgba(230, 237, 243, 0.45)" }}>
                Toujours disponible
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-6"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.2) 50%, transparent 100%)",
          }}
        />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p
            className="text-xs"
            style={{ color: "rgba(230, 237, 243, 0.3)" }}
          >
            © {new Date().getFullYear()} Fast Fix 72. Tous droits réservés.
          </p>
          <div className="flex gap-6">
            {["Mentions légales", "Politique de confidentialité", "CGV"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs transition-colors duration-200"
                style={{ color: "rgba(230, 237, 243, 0.3)" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = "#00D4FF"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = "rgba(230, 237, 243, 0.3)"; }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
