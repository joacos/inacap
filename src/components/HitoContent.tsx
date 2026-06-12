"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Hito } from "@/data/exposicion";
import type { ZonaKey } from "@/data/exposicion";

interface HitoContentProps {
  hito: Hito;
  zona: ZonaKey;
  direction: number; // 1 = forward, -1 = backward
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

export default function HitoContent({ hito, zona, direction }: HitoContentProps) {
  const isBlueAccent = zona === "inacap" || zona === "herramientas";
  const [imgIndex, setImgIndex] = useState(0);
  const [showObra, setShowObra] = useState(false);

  // Auto-play slideshow every 4 seconds
  useEffect(() => {
    if (!hito.imagenes || hito.imagenes.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % hito.imagenes!.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [hito.imagenes]);

  // Reset index and modal state on hito change
  useEffect(() => {
    setImgIndex(0);
    setShowObra(false);
  }, [hito.id]);

  return (
    <div className="relative min-h-[280px]">
      <div className="relative overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
          key={hito.id}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={transition}
          className="px-6"
        >


          {/* Swipe indicator (only on hito 10 to invite user to continue) */}
          {hito.id === 10 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-4 flex flex-col items-center justify-center gap-2 text-slate-400 text-center"
            >
              <div className="flex items-center gap-2 bg-slate-900/60 border border-slate-800/80 px-4 py-2 rounded-full glass-elevated shadow-lg animate-pulse-glow">
                <span className="text-[11px] font-semibold tracking-wide text-slate-200">
                  Desliza para finalizar recorrido
                </span>
                <svg
                  className="w-3.5 h-3.5 text-inacap-blue-light animate-bounce-horizontal"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </motion.div>
          )}

          {/* Header block (always present to keep layout structure uniform) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            className="relative -mx-6 h-52 sm:h-64 overflow-hidden mb-6 bg-slate-950/20 group flex items-center justify-center dot-grid"
          >
            {hito.imagenes && hito.imagenes.length > 0 ? (
              <>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIndex}
                    src={hito.imagenes[imgIndex]}
                    alt={`${hito.titulo} - Imagen ${imgIndex + 1}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover absolute inset-0"
                  />
                </AnimatePresence>

                {/* Edge fades */}
                <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_24px_rgba(2,6,23,0.95)]" />

                {/* Controls (only if > 1 image) */}
                {hito.imagenes.length > 1 && (
                  <>
                    <button
                      onClick={() =>
                        setImgIndex((prev) => (prev - 1 + hito.imagenes!.length) % hito.imagenes!.length)
                      }
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-800 text-slate-350 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white hover:bg-slate-900 active:scale-95 z-20"
                      aria-label="Imagen anterior"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <button
                      onClick={() => setImgIndex((prev) => (prev + 1) % hito.imagenes!.length)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-800 text-slate-350 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white hover:bg-slate-900 active:scale-95 z-20"
                      aria-label="Siguiente imagen"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M9 5l7 7-7 7" />
                      </svg>
                    </button>

                    {/* Indicators */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800/50 backdrop-blur-sm">
                      {hito.imagenes.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setImgIndex(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                            i === imgIndex
                              ? isBlueAccent
                                ? "bg-inacap-blue-light w-3.5"
                                : "bg-inacap-red-light w-3.5"
                              : "bg-slate-500 hover:bg-slate-400"
                          }`}
                          aria-label={`Ir a imagen ${i + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </>
            ) : (
              /* Placeholder style when there are no images */
              <div className="w-12 h-12 rounded-full bg-slate-950/40 border border-slate-800/50 flex items-center justify-center text-slate-700/60 shadow-inner">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </div>
            )}

            {/* Edge gradient fades (always present to blend container seamlessly) */}
            <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_24px_rgba(2,6,23,0.95)]" />
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#020617] to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#020617] to-transparent" />
            <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 z-10 bg-gradient-to-b from-[#020617] to-transparent" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 z-10 bg-gradient-to-t from-[#020617] to-transparent" />

            {/* Floating button on top of header (only for construccion zone) */}
            {zona === "construccion" && hito.obraRelacionada && (
              <button
                onClick={() => setShowObra(true)}
                className="absolute top-4 left-4 z-30 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950/85 hover:bg-slate-900 border border-slate-800/80 text-slate-200 hover:text-white text-[10px] font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] cursor-pointer shadow-lg backdrop-blur-sm"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-inacap-red-light">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Obra Emblemática</span>
              </button>
            )}
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="text-2xl sm:text-3xl font-bold text-slate-50 mb-4 leading-tight"
          >
            {hito.titulo}
          </motion.h2>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className={`h-px w-16 mb-5 origin-left ${
              isBlueAccent
                ? "bg-gradient-to-r from-inacap-blue-light to-transparent"
                : "bg-gradient-to-r from-inacap-red-light to-transparent"
            }`}
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            className="text-base text-slate-300 leading-relaxed max-w-prose"
          >
            {hito.descripcion}
          </motion.p>

          {/* Hito counter */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="mt-6 flex items-center gap-2 text-xs text-slate-500"
          >
            <span className="font-mono">
              {String(hito.id).padStart(2, "0")} / 10
            </span>
            <span className="h-px flex-1 bg-slate-800" />
          </motion.div>

        </motion.div>
      </AnimatePresence>
      </div>
      
      {/* Related project modal */}
      <AnimatePresence>
        {showObra && hito.obraRelacionada && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm rounded-3xl glass-elevated border border-slate-700/40 overflow-hidden shadow-2xl"
            >
              {/* Image banner */}
              <div className="relative w-full h-40 overflow-hidden bg-slate-900">
                <img
                  src={hito.obraRelacionada.imagenUrl}
                  alt={hito.obraRelacionada.nombre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                
                {/* Year badge on top of image */}
                <div className="absolute top-4 left-4 bg-inacap-red/90 text-white font-bold text-xs px-2.5 py-1 rounded-full border border-inacap-red-light/30 shadow-lg">
                  {hito.obraRelacionada.anio}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h4 className="text-base font-extrabold text-slate-100 mb-2 leading-snug">
                  {hito.obraRelacionada.nombre}
                </h4>
                
                <p className="text-xs text-slate-400 leading-relaxed mb-6">
                  {hito.obraRelacionada.descripcion}
                </p>

                <button
                  onClick={() => setShowObra(false)}
                  className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 hover:text-white text-xs font-bold transition-all duration-300 active:scale-95 shadow-inner cursor-pointer"
                >
                  Cerrar Detalles
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
