/* ============================================================
   FAST FIX 72 — About Section
   Style: Néon Urbain / Tech Sombre — asymmetric layout, stats, image
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Award, Users, MapPin, Clock } from "lucide-react";

const REPAIR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663517700784/ZfHsYWdv8GXj6XQcz2Wakv/repair-phone-MiiEnoNptrrmiUUsC9aY4d.webp";

const stats = [
  { icon: <Users size={20} />, value: "500+", label: "Clients satisfaits", color: "#00D4FF" },
  { icon: <Award size={20} />, value: "5 ans", label: "D'expérience", color: "#00FF88" },
  { icon: <Clock size={20} />, value: "30min", label: "Délai moyen", color: "#00D4FF" },
  { icon: <MapPin size={20} />, value: "72", label: "Sarthe", color: "#00FF88" },
];

export default function AboutSection() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="apropos"
      className="py-24 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #0D1117 0%, #0A0E14 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 80% at 0% 50%, rgba(0, 212, 255, 0.04) 0%, transparent 70%)",
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
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Image */}
          <div
            className="relative"
            style={{
              transform: visible ? "translateX(0)" : "translateX(-40px)",
              transition: "transform 0.7s ease",
            }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.2)",
                boxShadow: "0 0 50px rgba(0, 212, 255, 0.1), 0 20px 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              <img
                src={REPAIR_IMG}
                alt="Réparation téléphone Fast Fix 72"
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 50%, rgba(0,255,136,0.05) 100%)",
                }}
              />
            </div>

            {/* Floating stat card */}
            <div
              className="absolute -bottom-6 -right-6 p-5 rounded-xl"
              style={{
                background: "rgba(13, 17, 23, 0.95)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(0, 255, 136, 0.25)",
                boxShadow: "0 0 30px rgba(0, 255, 136, 0.1)",
              }}
            >
              <div
                className="text-3xl font-black mb-1"
                style={{
                  fontFamily: "'Orbitron', sans-serif",
                  background: "linear-gradient(135deg, #00D4FF, #00FF88)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                98%
              </div>
              <div
                className="text-xs"
                style={{ color: "rgba(230, 237, 243, 0.6)", fontFamily: "'Space Grotesk', sans-serif" }}
              >
                Taux de satisfaction
              </div>
            </div>

            {/* Decorative corner */}
            <div
              className="absolute -top-4 -left-4 w-16 h-16 rounded-xl pointer-events-none"
              style={{
                border: "2px solid rgba(0, 212, 255, 0.2)",
                borderRight: "none",
                borderBottom: "none",
              }}
            />
          </div>

          {/* Right: Content */}
          <div
            style={{
              transform: visible ? "translateX(0)" : "translateX(40px)",
              transition: "transform 0.7s ease 0.1s",
            }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "rgba(0, 212, 255, 0.08)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                color: "#00D4FF",
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Notre histoire
            </div>

            <h2
              className="text-4xl lg:text-5xl font-black mb-6"
              style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3", lineHeight: "1.1" }}
            >
              Experts en{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                réparation
              </span>
              <br />
              dans la Sarthe
            </h2>

            <div
              className="space-y-4 mb-8"
              style={{ color: "rgba(230, 237, 243, 0.6)", lineHeight: "1.8" }}
            >
              <p>
                <strong style={{ color: "#E6EDF3" }}>Fast Fix 72</strong> est votre spécialiste local 
                en réparation de smartphones et téléphones mobiles dans le département de la Sarthe (72). 
                Fondé par des passionnés de technologie, notre atelier propose des réparations rapides, 
                fiables et abordables.
              </p>
              <p>
                Nous travaillons avec toutes les grandes marques — Apple, Samsung, Huawei, Xiaomi, 
                OnePlus et bien d'autres. Chaque réparation est réalisée avec des pièces de qualité 
                et couverte par une <strong style={{ color: "#00FF88" }}>garantie de 3 mois</strong>.
              </p>
              <p>
                Notre engagement : vous rendre votre téléphone comme neuf, dans les meilleurs délais, 
                au meilleur prix. Le diagnostic est toujours gratuit.
              </p>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 p-4 rounded-xl"
                  style={{
                    background: "rgba(22, 27, 34, 0.6)",
                    border: `1px solid rgba(${stat.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.15)`,
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      background: `rgba(${stat.color === "#00D4FF" ? "0, 212, 255" : "0, 255, 136"}, 0.1)`,
                      color: stat.color,
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div
                      className="font-bold text-lg leading-none"
                      style={{
                        color: stat.color,
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "1rem",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs mt-0.5"
                      style={{ color: "rgba(230, 237, 243, 0.45)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
