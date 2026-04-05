/* ============================================================
   FAST FIX 72 — Pricing Section
   Style: Néon Urbain / Tech Sombre — pricing table with neon highlights
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Check, Zap } from "lucide-react";

const brands = [
  {
    name: "iPhone",
    logo: "🍎",
    repairs: [
      { name: "Remplacement écran (série 11-13)", price: "89€ - 149€" },
      { name: "Remplacement écran (série 14-15)", price: "129€ - 199€" },
      { name: "Remplacement batterie", price: "49€ - 79€" },
      { name: "Connecteur Lightning / USB-C", price: "59€ - 89€" },
      { name: "Caméra arrière", price: "79€ - 129€" },
      { name: "Bouton Home / Face ID", price: "69€ - 99€" },
    ],
  },
  {
    name: "Samsung",
    logo: "⬡",
    repairs: [
      { name: "Remplacement écran Galaxy S (récent)", price: "79€ - 159€" },
      { name: "Remplacement écran Galaxy A", price: "49€ - 99€" },
      { name: "Remplacement batterie", price: "39€ - 69€" },
      { name: "Connecteur USB-C", price: "49€ - 79€" },
      { name: "Caméra arrière", price: "59€ - 99€" },
      { name: "Vitre arrière", price: "39€ - 69€" },
    ],
  },
  {
    name: "Autres marques",
    logo: "📱",
    repairs: [
      { name: "Huawei — écran", price: "59€ - 119€" },
      { name: "Xiaomi — écran", price: "49€ - 99€" },
      { name: "OnePlus — écran", price: "69€ - 129€" },
      { name: "Oppo / Realme — écran", price: "49€ - 89€" },
      { name: "Batterie toutes marques", price: "35€ - 65€" },
      { name: "Diagnostic (offert si réparation)", price: "Gratuit" },
    ],
  },
];

const guarantees = [
  "Pièces de qualité garanties",
  "Garantie 3 mois sur toutes les réparations",
  "Devis gratuit et sans engagement",
  "Réparation en moins d'1 heure pour la plupart des pannes",
  "Techniciens certifiés et expérimentés",
  "Données personnelles protégées",
];

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="tarifs"
      className="py-24 relative overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Background gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(0, 212, 255, 0.03) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="container relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.6s ease, transform 0.6s ease",
        }}
      >
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(0, 255, 136, 0.08)",
              border: "1px solid rgba(0, 255, 136, 0.2)",
              color: "#00FF88",
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Transparence totale
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3" }}
          >
            Nos{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Tarifs
            </span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(230, 237, 243, 0.55)", lineHeight: "1.7" }}
          >
            Des prix clairs et compétitifs. Devis gratuit avant toute intervention. 
            Pas de mauvaises surprises.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Pricing table */}
          <div className="lg:col-span-2">
            {/* Brand tabs */}
            <div
              className="flex rounded-xl p-1 mb-6 gap-1"
              style={{
                background: "rgba(22, 27, 34, 0.8)",
                border: "1px solid rgba(0, 212, 255, 0.1)",
              }}
            >
              {brands.map((brand, i) => (
                <button
                  key={brand.name}
                  onClick={() => setActiveTab(i)}
                  className="flex-1 py-2.5 px-4 rounded-lg text-sm font-bold transition-all duration-200"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.05em",
                    background:
                      activeTab === i
                        ? "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(0,255,136,0.1))"
                        : "transparent",
                    color: activeTab === i ? "#00D4FF" : "rgba(230, 237, 243, 0.5)",
                    border:
                      activeTab === i
                        ? "1px solid rgba(0, 212, 255, 0.3)"
                        : "1px solid transparent",
                  }}
                >
                  {brand.logo} {brand.name}
                </button>
              ))}
            </div>

            {/* Repairs list */}
            <div
              className="rounded-xl overflow-hidden"
              style={{
                background: "rgba(22, 27, 34, 0.8)",
                border: "1px solid rgba(0, 212, 255, 0.12)",
              }}
            >
              {brands[activeTab].repairs.map((repair, i) => (
                <div
                  key={repair.name}
                  className="flex items-center justify-between px-6 py-4 transition-colors duration-150 group"
                  style={{
                    borderBottom:
                      i < brands[activeTab].repairs.length - 1
                        ? "1px solid rgba(0, 212, 255, 0.06)"
                        : "none",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.background =
                      "rgba(0, 212, 255, 0.04)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.background = "transparent";
                  }}
                >
                  <span
                    className="text-sm"
                    style={{ color: "rgba(230, 237, 243, 0.75)" }}
                  >
                    {repair.name}
                  </span>
                  <span
                    className="text-sm font-bold ml-4 flex-shrink-0"
                    style={{
                      color: repair.price === "Gratuit" ? "#00FF88" : "#00D4FF",
                      fontFamily: "'Orbitron', sans-serif",
                      fontSize: "0.8rem",
                    }}
                  >
                    {repair.price}
                  </span>
                </div>
              ))}
            </div>

            <p
              className="text-xs mt-3 text-center"
              style={{ color: "rgba(230, 237, 243, 0.35)" }}
            >
              * Les prix sont indicatifs et peuvent varier selon le modèle exact. Devis précis sur demande.
            </p>
          </div>

          {/* Guarantees card */}
          <div>
            <div
              className="rounded-xl p-6 h-full"
              style={{
                background: "rgba(22, 27, 34, 0.8)",
                border: "1px solid rgba(0, 255, 136, 0.2)",
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.05)",
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: "rgba(0, 255, 136, 0.1)",
                    border: "1px solid rgba(0, 255, 136, 0.25)",
                    color: "#00FF88",
                  }}
                >
                  <Zap size={20} />
                </div>
                <h3
                  className="text-xl font-bold"
                  style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    color: "#E6EDF3",
                  }}
                >
                  Nos Engagements
                </h3>
              </div>

              <div className="flex flex-col gap-3">
                {guarantees.map((g) => (
                  <div key={g} className="flex items-start gap-3">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{
                        background: "rgba(0, 255, 136, 0.15)",
                        border: "1px solid rgba(0, 255, 136, 0.3)",
                        color: "#00FF88",
                      }}
                    >
                      <Check size={11} />
                    </div>
                    <span
                      className="text-sm leading-relaxed"
                      style={{ color: "rgba(230, 237, 243, 0.65)" }}
                    >
                      {g}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <button
                  className="btn-neon w-full"
                  onClick={() =>
                    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
                  }
                >
                  Obtenir un devis
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
