/* ============================================================
   FAST FIX 72 — Process Section (How it works)
   Style: Néon Urbain / Tech Sombre — numbered steps with neon connectors
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { MessageSquare, Search, Wrench, CheckCircle } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <MessageSquare size={24} />,
    title: "Contactez-nous",
    description:
      "Décrivez votre panne par téléphone, email ou via notre formulaire. Nous vous répondons rapidement.",
    color: "#00D4FF",
  },
  {
    number: "02",
    icon: <Search size={24} />,
    title: "Diagnostic gratuit",
    description:
      "Apportez votre téléphone. Nous effectuons un diagnostic complet et gratuit pour identifier le problème.",
    color: "#00FF88",
  },
  {
    number: "03",
    icon: <Wrench size={24} />,
    title: "Réparation express",
    description:
      "Après votre accord sur le devis, nous réparons votre téléphone en moins de 30 minutes dans la plupart des cas.",
    color: "#00D4FF",
  },
  {
    number: "04",
    icon: <CheckCircle size={24} />,
    title: "Récupérez votre téléphone",
    description:
      "Votre téléphone est testé et garanti 3 mois. Vous repartez avec un appareil comme neuf.",
    color: "#00FF88",
  },
];

export default function ProcessSection() {
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
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0A0E14 0%, #0D1117 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 100%, rgba(0, 212, 255, 0.04) 0%, transparent 70%)",
        }}
      />

      <div
        ref={ref}
        className="container relative z-10"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease, transform 0.7s ease",
        }}
      >
        {/* Header */}
        <div className="text-center mb-16">
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
            Simple et rapide
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3" }}
          >
            Comment ça{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              marche ?
            </span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(230, 237, 243, 0.55)", lineHeight: "1.7" }}
          >
            Un processus simple et transparent en 4 étapes pour remettre votre téléphone en état.
          </p>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector line (desktop) */}
          <div
            className="absolute top-10 left-1/8 right-1/8 h-px hidden lg:block pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0, 212, 255, 0.3) 20%, rgba(0, 255, 136, 0.3) 50%, rgba(0, 212, 255, 0.3) 80%, transparent 100%)",
              top: "2.5rem",
              left: "12.5%",
              right: "12.5%",
            }}
          />

          {steps.map((step, i) => (
            <div
              key={step.number}
              className="flex flex-col items-center text-center relative"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(25px)",
                transition: `opacity 0.5s ease ${i * 0.12}s, transform 0.5s ease ${i * 0.12}s`,
              }}
            >
              {/* Number + Icon */}
              <div className="relative mb-6">
                {/* Outer ring */}
                <div
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: `rgba(${step.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.08)`,
                    border: `1px solid rgba(${step.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.2)`,
                    boxShadow: `0 0 30px rgba(${step.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.1)`,
                  }}
                >
                  {/* Inner circle */}
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: `rgba(${step.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.12)`,
                      border: `1px solid rgba(${step.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.3)`,
                      color: step.color,
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                {/* Step number badge */}
                <div
                  className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-xs font-black"
                  style={{
                    background: step.color,
                    color: "#0D1117",
                    fontFamily: "'Orbitron', sans-serif",
                    fontSize: "0.65rem",
                    boxShadow: `0 0 12px ${step.color}`,
                  }}
                >
                  {i + 1}
                </div>
              </div>

              <h3
                className="text-xl font-bold mb-3"
                style={{
                  fontFamily: "'Rajdhani', sans-serif",
                  color: "#E6EDF3",
                  letterSpacing: "0.02em",
                }}
              >
                {step.title}
              </h3>
              <p
                className="text-sm leading-relaxed"
                style={{ color: "rgba(230, 237, 243, 0.5)" }}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
