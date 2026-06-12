"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { zonaNombres, zonaDescripciones } from "@/data/exposicion";
import type { ZonaKey } from "@/data/exposicion";

interface NextCategoryCardProps {
  zona: ZonaKey;
  direction: number;
  onBack: () => void;
  totalVisited: number;
  resetProgress: () => void;
  isVisited: (zona: ZonaKey, hitoId: number) => boolean;
}

const variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction: number) => ({
    x: direction > 0 ? -300 : 300,
    opacity: 0,
    scale: 0.95,
  }),
};

const transition = {
  type: "spring" as const,
  damping: 20,
  stiffness: 300,
  mass: 0.8,
};

export default function NextCategoryCard({
  zona,
  direction,
  onBack,
  totalVisited,
  resetProgress,
  isVisited,
}: NextCategoryCardProps) {
  const isZoneCompleted = (zKey: ZonaKey) => {
    for (let i = 1; i <= 10; i++) {
      if (!isVisited(zKey, i)) return false;
    }
    return true;
  };
  if (totalVisited === 30) {
    return (
      <motion.div
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
        className="px-6 flex flex-col justify-center min-h-[320px]"
      >
        <div className="p-6 rounded-2xl glass-elevated border border-slate-700/40 relative overflow-hidden text-center">
          {/* Confetti particles representation */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <div className="absolute top-20 right-16 w-3 h-3 rounded-full bg-blue-400 animate-bounce" />
            <div className="absolute bottom-12 left-20 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          </div>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 mb-4 glow-blue mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <h3 className="text-xl font-extrabold text-slate-50 mb-3 bg-gradient-to-r from-emerald-400 via-teal-200 to-inacap-blue-light bg-clip-text text-transparent">
            ¡Felicidades! 🎉
          </h3>

          <p className="text-sm text-slate-350 mb-6 leading-relaxed max-w-xs mx-auto">
            Has completado el <strong>100% de la exposición</strong> (los 30 hitos históricos). Agradecemos tu participación en este recorrido conmemorativo de los 60 Años de INACAP.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-blue"
            >
              Volver al Inicio
            </Link>
            
            <button
              onClick={() => {
                resetProgress();
                window.location.href = "/";
              }}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors py-2 flex items-center justify-center gap-1.5 mx-auto"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l.73-.73" />
              </svg>
              Reiniciar Recorrido
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  const otherZones = (Object.keys(zonaNombres) as ZonaKey[]).filter(
    (key) => key !== zona
  );

  const getZoneIcon = (z: ZonaKey) => {
    switch (z) {
      case "inacap":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
            <path d="M9 21V12h6v9" />
          </svg>
        );
      case "construccion":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="6" width="20" height="16" rx="2" />
            <path d="M12 2v4" />
            <path d="M2 10h20" />
            <path d="M7 14h4" />
            <path d="M7 18h10" />
          </svg>
        );
      case "herramientas":
        return (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
          </svg>
        );
    }
  };

  return (
    <motion.div
      custom={direction}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={transition}
      className="px-6 flex flex-col justify-center min-h-[320px]"
    >
      <div className="p-6 rounded-2xl glass-elevated border border-slate-700/40 relative overflow-hidden">
        {/* Background gradient hint */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-inacap-blue-light/10 to-transparent blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            ¡Recorrido Finalizado!
          </h3>
          <button
            onClick={onBack}
            className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors"
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
              Volver al Hito 10
          </button>
        </div>

        <p className="text-xs text-slate-400 mb-5 leading-relaxed">
          Has completado todos los hitos de la <strong>{zonaNombres[zona]}</strong>. Selecciona la siguiente categoría para continuar tu recorrido:
        </p>

        <div className="flex flex-col gap-3">
          {otherZones.map((zKey) => {
            const isBlue = zKey === "inacap" || zKey === "herramientas";
            return (
              <Link
                key={zKey}
                href={`/zona/${zKey}`}
                className="group relative flex items-center gap-4 p-4 rounded-xl glass border border-slate-800/80 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] overflow-hidden"
                id={`next-zone-${zKey}`}
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: isBlue
                      ? "linear-gradient(to right, var(--inacap-blue-light), transparent)"
                      : "linear-gradient(to right, var(--inacap-red-light), transparent)",
                  }}
                />

                <div
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-300
                    ${
                      isBlue
                        ? "bg-inacap-blue/20 text-inacap-blue-light group-hover:bg-inacap-blue/30"
                        : "bg-inacap-red/20 text-inacap-red-light group-hover:bg-inacap-red/30"
                    }
                  `}
                >
                  {getZoneIcon(zKey)}
                </div>

                <div className="flex-1 min-w-0">
                  <span className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors">
                    {zonaNombres[zKey]}
                  </span>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {zonaDescripciones[zKey]}
                  </p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  {isZoneCompleted(zKey) && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Completado
                    </span>
                  )}
                  <svg
                    className="w-3.5 h-3.5 text-slate-600 group-hover:text-slate-400 transition-colors"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
