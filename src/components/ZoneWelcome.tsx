"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ZonaKey } from "@/data/exposicion";
import { zonaNombres, zonaDescripciones } from "@/data/exposicion";

interface ZoneWelcomeProps {
  zona: ZonaKey;
  onStart: () => void;
}

interface ZoneDetails {
  icon: React.ReactNode;
  themeColor: "blue" | "red";
  accentClass: string;
  bgGlowClass: string;
  textGlowClass: string;
  features: { emoji: string; title: string; desc: string }[];
}

const zoneConfig: Record<ZonaKey, ZoneDetails> = {
  inacap: {
    themeColor: "blue",
    accentClass: "text-inacap-blue-light bg-inacap-blue/20 border-inacap-blue-light/30",
    bgGlowClass: "bg-inacap-blue-light/10",
    textGlowClass: "text-glow-blue",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    features: [
      {
        emoji: "🏛️",
        title: "Bienvenido a INACAP Chronos",
        desc: "Estás ingresando a una exposición inmersiva. Usa este dispositivo como tu guía interactiva a través del tiempo."
      },
      {
        emoji: "📅",
        title: "Línea del Tiempo",
        desc: "Explora 10 hitos trascendentales desde nuestra fundación en 1966 hasta hoy, con contenido Nacional y local (Valdivia)."
      },
      {
        emoji: "🎧",
        title: "Relatos Inmersivos",
        desc: "Te recomendamos usar audífonos o subir el volumen para escuchar la narración especial de cada época."
      }
    ]
  },
  construccion: {
    themeColor: "red",
    accentClass: "text-inacap-red-light bg-inacap-red/20 border-inacap-red-light/30",
    bgGlowClass: "bg-inacap-red-light/10",
    textGlowClass: "text-glow-red",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="6" width="20" height="16" rx="2" />
        <path d="M12 2v4" />
        <path d="M2 10h20" />
        <path d="M7 14h4" />
        <path d="M7 18h10" />
      </svg>
    ),
    features: [
      {
        emoji: "🏛️",
        title: "Bienvenido a INACAP Chronos",
        desc: "Estás ingresando a una exposición inmersiva. Usa este dispositivo como tu guía interactiva a través de esta estación."
      },
      {
        emoji: "🏗️",
        title: "Evolución de la Industria",
        desc: "Descubre en esta zona cómo Chile pasó de la albañilería artesanal al hormigón y la impresión robótica 3D."
      },
      {
        emoji: "🎧",
        title: "Obras y Relatos",
        desc: "Explora grandes proyectos constructivos reales y asegúrate de activar el audio para escuchar su impacto."
      }
    ]
  },
  herramientas: {
    themeColor: "blue",
    accentClass: "text-inacap-blue-light bg-inacap-blue/20 border-inacap-blue-light/30",
    bgGlowClass: "bg-inacap-blue-light/10",
    textGlowClass: "text-glow-blue",
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    features: [
      {
        emoji: "🏛️",
        title: "Bienvenido a INACAP Chronos",
        desc: "Estás ingresando a una exposición inmersiva. Usa este dispositivo como tu guía interactiva a través de esta estación."
      },
      {
        emoji: "🛠️",
        title: "Evolución Instrumental",
        desc: "Descubre en esta zona la transformación desde las herramientas manuales clásicas hasta la digitalización y los escáneres 3D."
      },
      {
        emoji: "🎧",
        title: "Modelos 3D y Narración",
        desc: "Interactúa arrastrando los modelos 3D y activa tu audio para escuchar cómo revolucionaron la industria."
      }
    ]
  }
};

export default function ZoneWelcome({ zona, onStart }: ZoneWelcomeProps) {
  const config = zoneConfig[zona];
  const name = zonaNombres[zona];
  const subtitle = zonaDescripciones[zona];
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % config.features.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [config.features.length]);

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const,
        when: "beforeChildren" as const,
        staggerChildren: 0.15
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      transition: { duration: 0.4, ease: "easeIn" as const }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const glowBoxShadow = config.themeColor === "red"
    ? "0 0 25px rgba(239, 68, 68, 0.4)"
    : "0 0 25px rgba(59, 130, 246, 0.4)";

  const pulseGlow = config.themeColor === "red"
    ? "var(--glow-red-intense)"
    : "var(--glow-blue-intense)";

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="flex flex-col justify-between min-h-dvh px-6 py-8 relative overflow-hidden"
    >
      {/* Background radial gradient glow */}
      <div
        className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-50 ${config.bgGlowClass}`}
      />
      <div
        className={`absolute -bottom-40 -right-40 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-50 ${config.bgGlowClass}`}
      />

      {/* Top Section: Header & Badge */}
      <div className="flex flex-col items-center text-center mt-6 z-10">
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-6 bg-slate-900/80 border border-slate-700/50 shadow-md backdrop-blur-sm"
        >
          <span className={`w-2 h-2 rounded-full animate-pulse ${config.themeColor === "red" ? "bg-inacap-red-light shadow-[0_0_8px_rgba(239,68,68,0.8)]" : "bg-inacap-blue-light shadow-[0_0_8px_rgba(59,130,246,0.8)]"}`} />
          INACAP Chronos | Exposición
        </motion.div>

        {/* Floating Halo and Icon */}
        <motion.div
          variants={itemVariants}
          className="relative flex items-center justify-center w-24 h-24 rounded-2xl mb-6 border glass-elevated"
          style={{
            boxShadow: glowBoxShadow
          }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Animated background halo */}
          <div className={`absolute inset-0 rounded-2xl opacity-10 animate-pulse-glow ${config.themeColor === "red" ? "bg-inacap-red" : "bg-inacap-blue"}`} />
          <span className={config.themeColor === "red" ? "text-inacap-red-light" : "text-inacap-blue-light"}>
            {config.icon}
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className={`text-3xl font-extrabold tracking-tight ${config.textGlowClass} text-slate-50`}
        >
          Zona {name}
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-sm text-slate-300 font-medium max-w-sm mt-3 px-4 leading-relaxed"
        >
          {subtitle}
        </motion.p>
      </div>

      {/* Middle Section: Features & Guide */}
      <div className="flex flex-col gap-6 my-8 z-10 w-full max-w-sm mx-auto">
        {/* Slides/Carousel Card */}
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-2xl glass-elevated border border-slate-800/80 flex flex-col gap-4 min-h-[170px] justify-between shadow-lg"
        >
          {/* Card slide content */}
          <div className="relative overflow-hidden w-full flex-1 flex items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide}
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -50, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex gap-4 items-start w-full"
              >
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center border flex-shrink-0 ${config.accentClass} shadow-md`}>
                  <span className="text-xl">{config.features[activeSlide].emoji}</span>
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-slate-100">{config.features[activeSlide].title}</h3>
                  <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">{config.features[activeSlide].desc}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicators */}
          <div className="flex justify-center gap-1.5 mt-2">
            {config.features.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveSlide(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeSlide
                    ? config.themeColor === "red"
                      ? "bg-inacap-red-light w-4"
                      : "bg-inacap-blue-light w-4"
                    : "bg-slate-700 hover:bg-slate-600"
                }`}
                aria-label={`Ir al slide ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Minimalist Headphone Preparation */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center justify-center text-center py-2"
        >
          {/* Pulsing Headphone Icon */}
          <motion.div
            className={`w-12 h-12 rounded-full flex items-center justify-center border mb-3 ${config.accentClass}`}
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
              <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
            </svg>
          </motion.div>
          <span className="text-xs font-bold text-slate-200">Uso recomendado de Audífonos</span>
        </motion.div>
      </div>

      {/* Bottom Section: Enter Button */}
      <div className="flex flex-col items-center w-full max-w-sm mx-auto mt-auto mb-4 z-10">
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onStart}
          className={`w-full py-4 rounded-xl font-extrabold text-sm text-slate-50 relative overflow-hidden transition-all duration-300 cursor-pointer ${
            config.themeColor === "red"
              ? "bg-inacap-red hover:bg-inacap-red-light"
              : "bg-inacap-blue hover:bg-inacap-blue-light"
          }`}
          id={`start-tour-${zona}`}
        >
          {/* Intense button glow */}
          <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: pulseGlow }}
          />
          Comenzar Recorrido
        </motion.button>
      </div>
    </motion.div>
  );
}
