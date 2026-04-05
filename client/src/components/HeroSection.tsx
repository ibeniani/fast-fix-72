/* ============================================================
   FAST FIX 72 — Hero Section
   Style: Néon Urbain / Tech Sombre — full viewport, neon particles, glassmorphism
   ============================================================ */

import { useEffect, useRef } from "react";
import { ChevronDown, Shield, Clock, Star } from "lucide-react";

const HERO_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663517700784/ZfHsYWdv8GXj6XQcz2Wakv/hero-bg-5p5VixTJHvKpoj7yQx36Nc.webp";

export default function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string }[] = [];
    const colors = ["#00D4FF", "#00FF88", "#0099CC"];

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.6 + 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let animId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.floor(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();

        // Draw connections
        particles.forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });
      animId = requestAnimationFrame(animate);
    };
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const scrollToServices = () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="accueil"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${HERO_BG})`,
          opacity: 0.35,
        }}
      />

      {/* Dark overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,17,23,0.9) 0%, rgba(13,17,23,0.7) 50%, rgba(13,17,23,0.85) 100%)",
        }}
      />

      {/* Particle canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Neon glow orbs */}
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
      <div
        className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(0,255,136,0.06) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Content */}
      <div className="container relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text content */}
          <div>
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-6"
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                color: "#00D4FF",
                fontFamily: "'Rajdhani', sans-serif",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              <span
                className="w-2 h-2 rounded-full animate-pulse"
                style={{ background: "#00FF88", boxShadow: "0 0 6px #00FF88" }}
              />
              Ouvert aujourd'hui · Réparation express
            </div>

            {/* Main title */}
            <h1
              className="text-5xl lg:text-7xl font-black mb-4 leading-none"
              style={{ fontFamily: "'Rajdhani', sans-serif" }}
            >
              <span style={{ color: "#E6EDF3" }}>Votre téléphone</span>
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                réparé vite.
              </span>
              <br />
              <span style={{ color: "#E6EDF3" }}>Réparé bien.</span>
            </h1>

            <p
              className="text-lg mb-8 max-w-lg"
              style={{
                color: "rgba(230, 237, 243, 0.65)",
                fontFamily: "'Space Grotesk', sans-serif",
                lineHeight: "1.7",
              }}
            >
              Fast Fix 72, votre spécialiste en réparation de smartphones dans la Sarthe. 
              Écran cassé, batterie défaillante, connecteur endommagé — nous intervenons 
              rapidement avec des pièces de qualité et une garantie sur toutes nos réparations.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-10">
              <button className="btn-neon" onClick={scrollToContact}>
                Devis Gratuit
              </button>
              <button className="btn-outline-neon" onClick={scrollToServices}>
                Nos Services
              </button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6">
              {[
                { icon: <Clock size={16} />, label: "Réparation en", value: "1h" },
                { icon: <Shield size={16} />, label: "Garantie", value: "3 mois" },
                { icon: <Star size={16} />, label: "Clients satisfaits", value: "500+" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(0, 212, 255, 0.1)",
                      border: "1px solid rgba(0, 212, 255, 0.25)",
                      color: "#00D4FF",
                    }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <div
                      className="text-xl font-bold leading-none"
                      style={{
                        color: "#00D4FF",
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: "1.1rem",
                      }}
                    >
                      {stat.value}
                    </div>
                    <div
                      className="text-xs"
                      style={{ color: "rgba(230, 237, 243, 0.5)" }}
                    >
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Floating phone image */}
          <div className="hidden lg:flex justify-center items-center relative">
            <div
              className="relative rounded-2xl overflow-hidden animate-float"
              style={{
                width: "420px",
                height: "520px",
                border: "1px solid rgba(0, 212, 255, 0.25)",
                boxShadow: "0 0 60px rgba(0, 212, 255, 0.15), 0 20px 60px rgba(0, 0, 0, 0.5)",
              }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663517700784/ZfHsYWdv8GXj6XQcz2Wakv/technician-j5Y6DF5mFJ4ebKbST95cYK.webp"
                alt="Technicien Fast Fix 72"
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(180deg, transparent 60%, rgba(13,17,23,0.8) 100%)",
                }}
              />
              {/* Floating badge */}
              <div
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl"
                style={{
                  background: "rgba(13, 17, 23, 0.85)",
                  backdropFilter: "blur(12px)",
                  border: "1px solid rgba(0, 212, 255, 0.2)",
                }}
              >
                <div
                  className="text-sm font-bold mb-1"
                  style={{
                    color: "#00D4FF",
                    fontFamily: "'Rajdhani', sans-serif",
                    letterSpacing: "0.05em",
                    textTransform: "uppercase",
                  }}
                >
                  Technicien certifié
                </div>
                <div
                  className="text-xs"
                  style={{ color: "rgba(230, 237, 243, 0.6)" }}
                >
                  Réparation toutes marques — iPhone, Samsung, Huawei...
                </div>
              </div>
            </div>

            {/* Decorative neon ring */}
            <div
              className="absolute -inset-8 rounded-3xl pointer-events-none"
              style={{
                border: "1px solid rgba(0, 212, 255, 0.08)",
                boxShadow: "0 0 80px rgba(0, 212, 255, 0.05)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToServices}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
        style={{ color: "rgba(0, 212, 255, 0.6)" }}
      >
        <span
          className="text-xs tracking-widest uppercase"
          style={{ fontFamily: "'Rajdhani', sans-serif" }}
        >
          Découvrir
        </span>
        <ChevronDown size={20} className="animate-bounce" />
      </button>
    </section>
  );
}
