/* ============================================================
   FAST FIX 72 — Services Section
   Style: Néon Urbain / Tech Sombre — glassmorphism cards, neon icons
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import {
  Smartphone,
  Battery,
  Plug,
  Camera,
  Volume2,
  Wifi,
  Droplets,
  Cpu,
  ArrowRight,
} from "lucide-react";

const SERVICES_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663517700784/ZfHsYWdv8GXj6XQcz2Wakv/services-bg-FmXDQbKGbi8ypzRcN8KPW8.webp";

const services = [
  {
    icon: <Smartphone size={28} />,
    title: "Remplacement d'écran",
    description:
      "Écran fissuré ou cassé ? Nous remplaçons les écrans LCD et OLED de toutes marques avec des pièces de qualité.",
    color: "#00D4FF",
    time: "30min",
    popular: true,
  },
  {
    icon: <Battery size={28} />,
    title: "Remplacement de batterie",
    description:
      "Batterie qui ne tient plus ? Retrouvez une autonomie comme neuf avec une batterie haute capacité certifiée.",
    color: "#00FF88",
    time: "45min",
    popular: false,
  },
  {
    icon: <Plug size={28} />,
    title: "Connecteur de charge",
    description:
      "Problème de charge ? Remplacement du connecteur USB-C, Lightning ou micro-USB pour tous modèles.",
    color: "#00D4FF",
    time: "1h",
    popular: false,
  },
  {
    icon: <Camera size={28} />,
    title: "Réparation caméra",
    description:
      "Photos floues ou caméra défaillante ? Remplacement de la caméra avant ou arrière, toutes marques.",
    color: "#00FF88",
    time: "1h30",
    popular: false,
  },
  {
    icon: <Volume2 size={28} />,
    title: "Haut-parleur / Micro",
    description:
      "Son absent ou voix inaudible ? Diagnostic et remplacement du haut-parleur ou du microphone.",
    color: "#00D4FF",
    time: "1h",
    popular: false,
  },
  {
    icon: <Droplets size={28} />,
    title: "Dégâts des eaux",
    description:
      "Téléphone tombé dans l'eau ? Intervention rapide pour nettoyer et sécher les composants internes.",
    color: "#00FF88",
    time: "2-24h",
    popular: false,
  },
  {
    icon: <Wifi size={28} />,
    title: "Problèmes réseau",
    description:
      "Pas de signal ou Wi-Fi défaillant ? Diagnostic et réparation des antennes et modules réseau.",
    color: "#00D4FF",
    time: "1h30",
    popular: false,
  },
  {
    icon: <Cpu size={28} />,
    title: "Diagnostic complet",
    description:
      "Votre téléphone a un problème non identifié ? Diagnostic approfondi offert avant toute réparation.",
    color: "#00FF88",
    time: "30min",
    popular: false,
  },
];

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setVisible(true), index * 80);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="glass-card glass-card-hover rounded-xl p-6 relative overflow-hidden group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Popular badge */}
      {service.popular && (
        <div
          className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, #00D4FF, #00FF88)",
            color: "#0D1117",
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          Populaire
        </div>
      )}

      {/* Icon */}
      <div
        className="w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `rgba(${service.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.1)`,
          border: `1px solid rgba(${service.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.25)`,
          color: service.color,
          boxShadow: `0 0 20px rgba(${service.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.1)`,
        }}
      >
        {service.icon}
      </div>

      {/* Title */}
      <h3
        className="text-xl font-bold mb-2"
        style={{
          fontFamily: "'Rajdhani', sans-serif",
          color: "#E6EDF3",
          letterSpacing: "0.02em",
        }}
      >
        {service.title}
      </h3>

      {/* Description */}
      <p
        className="text-sm mb-4 leading-relaxed"
        style={{ color: "rgba(230, 237, 243, 0.55)" }}
      >
        {service.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span
            className="text-xs"
            style={{ color: "rgba(230, 237, 243, 0.4)" }}
          >
            Délai :
          </span>
          <span
            className="text-sm font-bold"
            style={{ color: service.color, fontFamily: "'Orbitron', sans-serif", fontSize: "0.75rem" }}
          >
            {service.time}
          </span>
        </div>
        <div
          className="flex items-center gap-1 text-xs font-semibold transition-all duration-200 group-hover:gap-2"
          style={{
            color: service.color,
            fontFamily: "'Rajdhani', sans-serif",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          En savoir plus
          <ArrowRight size={12} />
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.color}, transparent)`,
          boxShadow: `0 0 8px ${service.color}`,
        }}
      />
    </div>
  );
}

export default function ServicesSection() {
  const [titleVisible, setTitleVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      className="relative py-24 overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Background circuit image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${SERVICES_BG})`,
          opacity: 0.04,
        }}
      />

      {/* Top divider */}
      <div className="section-divider mb-0" />

      <div className="container relative z-10">
        {/* Section header */}
        <div
          ref={titleRef}
          className="text-center mb-16"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
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
            Ce que nous faisons
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3" }}
          >
            Nos{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Services
            </span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(230, 237, 243, 0.55)", lineHeight: "1.7" }}
          >
            Toutes les réparations pour votre smartphone, réalisées par des techniciens 
            expérimentés avec des pièces de qualité et une garantie incluse.
          </p>
        </div>

        {/* Services grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p
            className="text-sm mb-4"
            style={{ color: "rgba(230, 237, 243, 0.45)" }}
          >
            Vous ne trouvez pas votre panne ? Contactez-nous, nous avons sûrement la solution.
          </p>
          <button
            className="btn-outline-neon"
            onClick={() =>
              document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })
            }
          >
            Nous contacter
          </button>
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
