/* ============================================================
   FAST FIX 72 — Contact Section
   Style: Néon Urbain / Tech Sombre — contact form + info cards
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from "lucide-react";

const contactInfo = [
  {
    icon: <Phone size={20} />,
    label: "Téléphone",
    value: "06 XX XX XX XX",
    sub: "Lun–Sam, 9h–19h",
    color: "#00D4FF",
    href: "tel:+33600000000",
  },
  {
    icon: <Mail size={20} />,
    label: "Email",
    value: "contact@fastfix72.fr",
    sub: "Réponse sous 24h",
    color: "#00FF88",
    href: "mailto:contact@fastfix72.fr",
  },
  {
    icon: <MapPin size={20} />,
    label: "Adresse",
    value: "Le Mans, Sarthe (72)",
    sub: "Parking disponible",
    color: "#00D4FF",
    href: "#",
  },
  {
    icon: <Clock size={20} />,
    label: "Horaires",
    value: "Lun–Ven : 9h–19h",
    sub: "Sam : 9h–17h",
    color: "#00FF88",
    href: "#",
  },
];

export default function ContactSection() {
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    device: "",
    problem: "",
    message: "",
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 5000);
    setForm({ name: "", phone: "", email: "", device: "", problem: "", message: "" });
  };

  const inputStyle = {
    background: "rgba(22, 27, 34, 0.8)",
    border: "1px solid rgba(0, 212, 255, 0.15)",
    color: "#E6EDF3",
    borderRadius: "8px",
    padding: "0.75rem 1rem",
    width: "100%",
    fontFamily: "'Space Grotesk', sans-serif",
    fontSize: "0.875rem",
    outline: "none",
    transition: "border-color 0.2s ease, box-shadow 0.2s ease",
  };

  const labelStyle = {
    display: "block",
    marginBottom: "0.375rem",
    fontSize: "0.75rem",
    fontFamily: "'Rajdhani', sans-serif",
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "rgba(230, 237, 243, 0.5)",
  };

  return (
    <section
      id="contact"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D1117 0%, #080C10 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 right-0 w-1/2 h-3/4 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 100% 100%, rgba(0, 212, 255, 0.04) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="container relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.7s ease",
        }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(0, 212, 255, 0.08)",
              border: "1px solid rgba(0, 212, 255, 0.2)",
              color: "#00D4FF",
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Devis gratuit
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3" }}
          >
            Contactez{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Fast Fix 72
            </span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(230, 237, 243, 0.55)", lineHeight: "1.7" }}
          >
            Décrivez votre problème et obtenez un devis gratuit sous quelques heures. 
            Nous vous répondons rapidement.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {contactInfo.map((info) => (
              <a
                key={info.label}
                href={info.href}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-200 group"
                style={{
                  background: "rgba(22, 27, 34, 0.7)",
                  border: `1px solid rgba(${info.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.12)`,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${info.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.35)`;
                  el.style.background = `rgba(${info.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.04)`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `rgba(${info.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.12)`;
                  el.style.background = "rgba(22, 27, 34, 0.7)";
                }}
              >
                <div
                  className="w-11 h-11 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: `rgba(${info.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.1)`,
                    border: `1px solid rgba(${info.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.2)`,
                    color: info.color,
                  }}
                >
                  {info.icon}
                </div>
                <div>
                  <div
                    className="text-xs mb-0.5"
                    style={{ color: "rgba(230, 237, 243, 0.4)", fontFamily: "'Rajdhani', sans-serif", letterSpacing: "0.06em", textTransform: "uppercase" }}
                  >
                    {info.label}
                  </div>
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#E6EDF3" }}
                  >
                    {info.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{ color: "rgba(230, 237, 243, 0.4)" }}
                  >
                    {info.sub}
                  </div>
                </div>
              </a>
            ))}

            {/* Map placeholder */}
            <div
              className="rounded-xl overflow-hidden flex-1 min-h-32"
              style={{
                background: "rgba(22, 27, 34, 0.7)",
                border: "1px solid rgba(0, 212, 255, 0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "0.5rem",
                padding: "1.5rem",
              }}
            >
              <MapPin size={28} style={{ color: "#00D4FF", opacity: 0.6 }} />
              <p
                className="text-sm text-center"
                style={{ color: "rgba(230, 237, 243, 0.4)" }}
              >
                Le Mans, Sarthe (72)
                <br />
                <span style={{ color: "#00D4FF", fontSize: "0.75rem" }}>
                  Adresse exacte sur demande
                </span>
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(22, 27, 34, 0.8)",
                border: "1px solid rgba(0, 212, 255, 0.15)",
                boxShadow: "0 0 40px rgba(0, 212, 255, 0.05)",
              }}
            >
              {sent ? (
                <div className="flex flex-col items-center justify-center py-12 gap-4">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center"
                    style={{
                      background: "rgba(0, 255, 136, 0.1)",
                      border: "2px solid rgba(0, 255, 136, 0.4)",
                      color: "#00FF88",
                    }}
                  >
                    <CheckCircle size={32} />
                  </div>
                  <h3
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3" }}
                  >
                    Message envoyé !
                  </h3>
                  <p
                    className="text-sm text-center"
                    style={{ color: "rgba(230, 237, 243, 0.55)" }}
                  >
                    Nous vous répondrons dans les plus brefs délais.
                    <br />
                    Merci de votre confiance !
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Votre nom *</label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        placeholder="Jean Dupont"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
                          (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                          (e.target as HTMLInputElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Téléphone</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => setForm({ ...form, phone: e.target.value })}
                        placeholder="06 XX XX XX XX"
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
                          (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                          (e.target as HTMLInputElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Email *</label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="jean@exemple.fr"
                      style={inputStyle}
                      onFocus={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
                        (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.1)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                        (e.target as HTMLInputElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label style={labelStyle}>Modèle de téléphone *</label>
                      <input
                        type="text"
                        required
                        value={form.device}
                        onChange={(e) => setForm({ ...form, device: e.target.value })}
                        placeholder="Ex: iPhone 14, Galaxy S23..."
                        style={inputStyle}
                        onFocus={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
                          (e.target as HTMLInputElement).style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLInputElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                          (e.target as HTMLInputElement).style.boxShadow = "none";
                        }}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Type de panne *</label>
                      <select
                        required
                        value={form.problem}
                        onChange={(e) => setForm({ ...form, problem: e.target.value })}
                        style={{ ...inputStyle, cursor: "pointer" }}
                        onFocus={(e) => {
                          (e.target as HTMLSelectElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
                          (e.target as HTMLSelectElement).style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.1)";
                        }}
                        onBlur={(e) => {
                          (e.target as HTMLSelectElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                          (e.target as HTMLSelectElement).style.boxShadow = "none";
                        }}
                      >
                        <option value="" style={{ background: "#161B22" }}>Sélectionner...</option>
                        <option value="ecran" style={{ background: "#161B22" }}>Écran cassé</option>
                        <option value="batterie" style={{ background: "#161B22" }}>Batterie</option>
                        <option value="charge" style={{ background: "#161B22" }}>Connecteur de charge</option>
                        <option value="camera" style={{ background: "#161B22" }}>Caméra</option>
                        <option value="eau" style={{ background: "#161B22" }}>Dégâts des eaux</option>
                        <option value="reseau" style={{ background: "#161B22" }}>Problème réseau</option>
                        <option value="autre" style={{ background: "#161B22" }}>Autre</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Description du problème</label>
                    <textarea
                      rows={4}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="Décrivez votre problème en détail pour un devis plus précis..."
                      style={{ ...inputStyle, resize: "vertical", minHeight: "100px" }}
                      onFocus={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor = "rgba(0, 212, 255, 0.5)";
                        (e.target as HTMLTextAreaElement).style.boxShadow = "0 0 15px rgba(0, 212, 255, 0.1)";
                      }}
                      onBlur={(e) => {
                        (e.target as HTMLTextAreaElement).style.borderColor = "rgba(0, 212, 255, 0.15)";
                        (e.target as HTMLTextAreaElement).style.boxShadow = "none";
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-neon w-full flex items-center justify-center gap-2"
                  >
                    <Send size={16} />
                    Envoyer ma demande
                  </button>

                  <p
                    className="text-xs text-center"
                    style={{ color: "rgba(230, 237, 243, 0.3)" }}
                  >
                    Vos données sont protégées et ne seront jamais partagées.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
