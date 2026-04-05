/* ============================================================
   FAST FIX 72 — Reviews Section
   Style: Néon Urbain / Tech Sombre — testimonials with glassmorphism
   ============================================================ */

import { useEffect, useRef, useState } from "react";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Marie L.",
    date: "Mars 2025",
    rating: 5,
    text: "Écran de mon iPhone 14 remplacé en moins d'une heure ! Service impeccable, prix honnête et le résultat est parfait. Je recommande vivement Fast Fix 72.",
    device: "iPhone 14",
  },
  {
    name: "Thomas B.",
    date: "Février 2025",
    rating: 5,
    text: "Batterie de mon Samsung Galaxy S22 changée rapidement. Le téléphone tient maintenant toute la journée. Technicien très professionnel et sympathique.",
    device: "Samsung Galaxy S22",
  },
  {
    name: "Sophie M.",
    date: "Janvier 2025",
    rating: 5,
    text: "Mon téléphone était tombé dans l'eau. Fast Fix 72 l'a sauvé ! Intervention rapide et efficace. Merci beaucoup, je suis vraiment soulagée.",
    device: "Xiaomi Redmi Note 12",
  },
  {
    name: "Pierre D.",
    date: "Décembre 2024",
    rating: 5,
    text: "Connecteur de charge réparé en 45 minutes. Tarif très correct par rapport à d'autres boutiques. Je reviendrai sans hésiter si besoin.",
    device: "iPhone 13 Pro",
  },
  {
    name: "Lucie R.",
    date: "Novembre 2024",
    rating: 5,
    text: "Excellent accueil, diagnostic gratuit et réparation de l'écran le jour même. La garantie de 3 mois est vraiment rassurante. Top !",
    device: "Samsung Galaxy A54",
  },
  {
    name: "Antoine C.",
    date: "Octobre 2024",
    rating: 4,
    text: "Bonne réparation de ma caméra arrière. Délai un peu plus long que prévu mais le résultat est là. Prix raisonnable et équipe compétente.",
    device: "Huawei P30 Pro",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={14}
          fill={i <= rating ? "#FFB800" : "transparent"}
          style={{ color: i <= rating ? "#FFB800" : "rgba(230, 237, 243, 0.2)" }}
        />
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: (typeof reviews)[0]; index: number }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setTimeout(() => setVisible(true), index * 100);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div
      ref={ref}
      className="glass-card rounded-xl p-6 relative overflow-hidden group"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(25px)",
        transition: "opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(0, 212, 255, 0.3)";
        el.style.boxShadow = "0 0 25px rgba(0, 212, 255, 0.1)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "rgba(0, 212, 255, 0.15)";
        el.style.boxShadow = "none";
      }}
    >
      {/* Quote icon */}
      <div
        className="absolute top-4 right-4 opacity-10"
        style={{ color: "#00D4FF" }}
      >
        <Quote size={40} />
      </div>

      {/* Rating */}
      <div className="flex items-center justify-between mb-3">
        <StarRating rating={review.rating} />
        <span
          className="text-xs"
          style={{ color: "rgba(230, 237, 243, 0.35)", fontFamily: "'Space Grotesk', sans-serif" }}
        >
          {review.date}
        </span>
      </div>

      {/* Review text */}
      <p
        className="text-sm leading-relaxed mb-4"
        style={{ color: "rgba(230, 237, 243, 0.7)" }}
      >
        "{review.text}"
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div>
          <div
            className="text-sm font-bold"
            style={{ color: "#E6EDF3", fontFamily: "'Rajdhani', sans-serif" }}
          >
            {review.name}
          </div>
          <div
            className="text-xs"
            style={{ color: "#00D4FF", fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {review.device}
          </div>
        </div>
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
          style={{
            background: "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,255,136,0.15))",
            border: "1px solid rgba(0, 212, 255, 0.25)",
            color: "#00D4FF",
            fontFamily: "'Orbitron', sans-serif",
          }}
        >
          {review.name[0]}
        </div>
      </div>
    </div>
  );
}

export default function ReviewsSection() {
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
      id="avis"
      className="py-24 relative overflow-hidden"
      style={{ background: "#0D1117" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0, 255, 136, 0.03) 0%, transparent 70%)",
        }}
      />

      <div className="container relative z-10">
        {/* Header */}
        <div
          ref={titleRef}
          className="text-center mb-12"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{
              background: "rgba(255, 184, 0, 0.08)",
              border: "1px solid rgba(255, 184, 0, 0.2)",
              color: "#FFB800",
              fontFamily: "'Rajdhani', sans-serif",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            <Star size={12} fill="#FFB800" />
            4.9/5 — Plus de 200 avis
          </div>
          <h2
            className="text-4xl lg:text-5xl font-black mb-4"
            style={{ fontFamily: "'Rajdhani', sans-serif", color: "#E6EDF3" }}
          >
            Ce que disent{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #00D4FF 0%, #00FF88 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              nos clients
            </span>
          </h2>
          <p
            className="text-base max-w-xl mx-auto"
            style={{ color: "rgba(230, 237, 243, 0.55)", lineHeight: "1.7" }}
          >
            La satisfaction de nos clients est notre priorité. Découvrez leurs retours 
            d'expérience après réparation chez Fast Fix 72.
          </p>
        </div>

        {/* Reviews grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((review, i) => (
            <ReviewCard key={review.name} review={review} index={i} />
          ))}
        </div>
      </div>

      <div className="section-divider mt-24" />
    </section>
  );
}
