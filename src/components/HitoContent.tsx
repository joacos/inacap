"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Hito } from "@/data/exposicion";
import type { ZonaKey } from "@/data/exposicion";

interface HitoContentProps {
  hito: Hito;
  zona: ZonaKey;
  direction: number; // 1 = forward, -1 = backward
  viewMode?: "nacional" | "local" | "carreras";
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

export default function HitoContent({ hito, zona, direction, viewMode = "nacional" }: HitoContentProps) {
  const isBlueAccent = zona === "inacap" || zona === "herramientas";
  const [imgIndex, setImgIndex] = useState(0);
  const [showObra, setShowObra] = useState(false);
  const [obraIndex, setObraIndex] = useState(0);
  const [audioTime, setAudioTime] = useState(0);
  const obrasArray = hito.obrasRelacionadas || (hito.obraRelacionada ? [hito.obraRelacionada] : []);

  const isLocalActive = viewMode === "local" && !!hito.local;
  const isCarrerasActive = viewMode === "carreras" && !!hito.carreras;
  
  let currentTitle = hito.titulo;
  let currentDesc = hito.descripcion;
  let currentImages = hito.imagenes;
  let currentDialogue = hito.dialogue;

  if (isLocalActive && hito.local) {
    currentTitle = hito.local.titulo;
    currentDesc = hito.local.descripcion;
    currentImages = hito.local.imagenes || hito.imagenes;
    currentDialogue = hito.local.dialogue || hito.dialogue;
  } else if (isCarrerasActive && hito.carreras) {
    currentTitle = hito.carreras.titulo;
    currentDesc = hito.carreras.descripcion;
    currentImages = hito.carreras.imagenes || hito.imagenes;
    currentDialogue = hito.carreras.dialogue || hito.dialogue;
  }

  let displayTitle = currentTitle;
  let displayDate = typeof hito.anio === "number" ? String(hito.anio) : hito.anio;

  const titleMatch = currentTitle.match(/^(.*?)\s*\(([\d\s-]+)\)$/);
  if (titleMatch) {
    displayTitle = titleMatch[1];
    displayDate = titleMatch[2];
  }

  // Si el hito base tiene un rango de fechas, lo mantenemos fijo como el rango del hito
  let baseDateRange = typeof hito.anio === "number" ? String(hito.anio) : hito.anio;
  const baseMatch = hito.titulo.match(/\(([\d\s-]+)\)$/);
  if (baseMatch) {
    baseDateRange = baseMatch[1];
  }
  const baseDateString = String(baseDateRange);
  if (baseDateString.includes("-") || baseDateString.includes("–")) {
    displayDate = baseDateRange;
  }

  let activeIndex = -1;
  if (currentDialogue) {
    for (let i = 0; i < currentDialogue.length; i++) {
      if (audioTime >= currentDialogue[i].time) {
        activeIndex = i;
      } else {
        break;
      }
    }
  }

  // Auto-play slideshow every 4 seconds
  useEffect(() => {
    if (!currentImages || currentImages.length <= 1) return;
    const interval = setInterval(() => {
      setImgIndex((prev) => (prev + 1) % currentImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentImages]);

  // Reset index and modal state on hito or viewMode change
  useEffect(() => {
    setImgIndex(0);
    setShowObra(false);
    setObraIndex(0);
    setAudioTime(0);
  }, [hito.id, viewMode]);


  // Listen to global audio time update
  useEffect(() => {
    const handleTimeUpdate = (e: Event) => {
      const customEvent = e as CustomEvent;
      const relativeUrl = isLocalActive && hito.local?.audioUrl
        ? hito.local.audioUrl
        : hito.audioUrl;

      if (relativeUrl && customEvent.detail.url && customEvent.detail.url.endsWith(relativeUrl)) {
        setAudioTime(customEvent.detail.currentTime);
      }
    };

    window.addEventListener("audio-time-update", handleTimeUpdate);
    return () => window.removeEventListener("audio-time-update", handleTimeUpdate);
  }, [hito.audioUrl, hito.local?.audioUrl, isLocalActive]);

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
          className=""
        >

          {isBlueAccent ? (
            /* ── CINEMATIC HERO: inacap + herramientas ── */
            <>
            <motion.div
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
              className="relative w-full overflow-hidden group"
              style={{ height: "calc(100dvh - 180px)", minHeight: "240px" }}
            >
              {currentImages && currentImages.length > 0 ? (
                <>
                  {/* Ken Burns zoom on image change */}
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={currentImages[imgIndex]}
                      alt={`${displayTitle} - Imagen ${imgIndex + 1}`}
                      initial={{ opacity: 0, scale: 1.06 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.55, ease: "easeOut" }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </AnimatePresence>

                  {/* Cinematic gradient: dark top + very dark bottom */}
                  <div className="pointer-events-none absolute inset-0 z-10"
                    style={{ background: "linear-gradient(to bottom, rgba(2,6,23,0.6) 0%, rgba(2,6,23,0.05) 30%, rgba(2,6,23,0.1) 55%, rgba(2,6,23,0.95) 100%)" }}
                  />
                  {/* Side vignette */}
                  <div className="pointer-events-none absolute inset-0 z-10"
                    style={{ boxShadow: "inset 28px 0 36px rgba(2,6,23,0.7), inset -28px 0 36px rgba(2,6,23,0.7)" }}
                  />

                  {/* Title, Date & Dialogue overlay — bottom centered */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 px-4 sm:px-5 pb-4 sm:pb-6 pt-16 sm:pt-32 flex flex-col items-center text-center bg-gradient-to-t from-slate-950 via-slate-950/50 to-transparent">
                    <motion.h2
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.45, ease: "easeOut" }}
                      className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white leading-tight mb-1 sm:mb-2"
                      style={{ textShadow: "0 2px 20px rgba(0,0,0,0.9), 0 1px 4px rgba(0,0,0,0.7)" }}
                    >
                      {displayTitle}
                    </motion.h2>
                    {displayDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.4 }}
                        className="mb-2 sm:mb-4"
                      >
                        <span className="text-[11px] font-semibold text-slate-300/90 tracking-widest uppercase">
                          {displayDate}
                        </span>
                      </motion.div>
                    )}

                    {/* Dialogue inside image container */}
                    {currentDialogue && currentDialogue.length > 0 && (
                      <div className="relative h-20 sm:h-24 flex flex-col justify-center text-center select-none w-full max-w-lg mb-4 sm:mb-6">
                        <AnimatePresence mode="wait">
                          <motion.div
                            key={activeIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-base sm:text-lg md:text-xl font-bold font-sans text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide"
                          >
                            {activeIndex >= 0 ? currentDialogue[activeIndex].text : currentDialogue[0].text}
                          </motion.div>
                        </AnimatePresence>
                      </div>
                    )}

                    {/* Swipe indicator inside bottom overlay for cinematic view */}
                    {isBlueAccent && hito.id === 10 && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45, duration: 0.4 }}
                        className="mt-1 flex flex-col items-center justify-center gap-1.5 text-slate-400 text-center select-none"
                      >
                        <div className="flex items-center gap-1.5 bg-slate-900/60 border border-slate-800/80 px-3 py-1 rounded-full glass-elevated shadow-lg animate-pulse-glow">
                          <span className="text-[9px] font-semibold tracking-wide text-slate-200">
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
                  </div>

                  {/* Nav arrows */}
                  {currentImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/60 border border-slate-700/50 text-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white hover:bg-slate-800 active:scale-95 z-20 backdrop-blur-sm cursor-pointer"
                        aria-label="Imagen anterior"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={() => setImgIndex((prev) => (prev + 1) % currentImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-slate-950/60 border border-slate-700/50 text-slate-300 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:text-white hover:bg-slate-800 active:scale-95 z-20 backdrop-blur-sm cursor-pointer"
                        aria-label="Siguiente imagen"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-4 right-5 flex gap-1.5 z-20">
                        {currentImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                              i === imgIndex
                                ? "bg-inacap-blue-light w-5 h-1.5"
                                : "bg-white/30 w-1.5 h-1.5 hover:bg-white/60"
                            }`}
                            aria-label={`Ir a imagen ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </>
              ) : (
                <div className="w-full h-full bg-slate-950/60 dot-grid flex flex-col justify-end pb-5 px-5">
                  <div className="h-[2px] w-10 mb-3 rounded-full bg-gradient-to-r from-inacap-blue-light to-transparent" />
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white leading-tight">{displayTitle}</h2>
                </div>
              )}
            </motion.div>
            </>
          ) : (
            /* ── COMPACT LAYOUT: construccion ── */
            <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              className="relative -mx-6 h-72 sm:h-[26rem] md:h-[32rem] overflow-hidden mb-4 sm:mb-6 bg-slate-950/20 group flex items-center justify-center dot-grid"
            >
              {currentImages && currentImages.length > 0 ? (
                <>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={imgIndex}
                      src={currentImages[imgIndex]}
                      alt={`${displayTitle} - Imagen ${imgIndex + 1}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4 }}
                      className="w-full h-full object-cover absolute inset-0"
                    />
                  </AnimatePresence>
                  <div className="pointer-events-none absolute inset-0 z-10 shadow-[inset_0_0_24px_rgba(2,6,23,0.95)]" />
                  {currentImages.length > 1 && (
                    <>
                      <button
                        onClick={() => setImgIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-800 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                        aria-label="Imagen anterior"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M15 19l-7-7 7-7" /></svg>
                      </button>
                      <button
                        onClick={() => setImgIndex((prev) => (prev + 1) % currentImages.length)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-950/70 border border-slate-800 text-slate-400 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 cursor-pointer"
                        aria-label="Siguiente imagen"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M9 5l7 7-7 7" /></svg>
                      </button>
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-20 bg-slate-950/60 px-2.5 py-1 rounded-full border border-slate-800/50 backdrop-blur-sm">
                        {currentImages.map((_, i) => (
                          <button
                            key={i}
                            onClick={() => setImgIndex(i)}
                            className={`rounded-full transition-all duration-300 ${
                              i === imgIndex ? "bg-inacap-red-light w-3.5 h-1.5" : "bg-slate-500 w-1.5 h-1.5 hover:bg-slate-400"
                            }`}
                            aria-label={`Ir a imagen ${i + 1}`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#020617] to-transparent" />
                  <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#020617] to-transparent" />
                  <div className="pointer-events-none absolute top-0 left-0 right-0 h-6 z-10 bg-gradient-to-b from-[#020617] to-transparent" />
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 z-10 bg-gradient-to-t from-[#020617] to-transparent" />
                </>
              ) : (
                <div className="w-12 h-12 rounded-full bg-slate-950/40 border border-slate-800/50 flex items-center justify-center text-slate-700/60">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                    <line x1="4" y1="22" x2="4" y2="15" />
                  </svg>
                </div>
              )}
            </motion.div>

            {/* Title + Date + divider for construccion */}
            <div className="flex flex-col items-center text-center px-4">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.35 }}
                className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-50 mb-1 sm:mb-2 leading-tight"
              >
                {displayTitle}
              </motion.h2>
              {displayDate && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-3"
                >
                  <span className="text-[11px] font-semibold text-slate-400 tracking-widest uppercase">
                    {displayDate}
                  </span>
                </motion.div>
              )}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="h-px w-16 mb-5 origin-center bg-gradient-to-r from-transparent via-inacap-red-light to-transparent"
              />
            </div>
            </>
          )}

          {/* ── SHARED CONTENT ── */}
          {!isBlueAccent && (
            <div className="px-6">
              {/* Description / Dialogue Sing-Along */}
              {currentDialogue && currentDialogue.length > 0 ? (
                <div className="my-4 sm:my-6 relative h-20 sm:h-24 flex flex-col justify-center text-center select-none px-4">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="text-base sm:text-lg md:text-xl font-bold font-sans text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,1)] tracking-wide"
                    >
                      {activeIndex >= 0 ? currentDialogue[activeIndex].text : currentDialogue[0].text}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (!currentDialogue || currentDialogue.length === 0) ? (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, duration: 0.4 }}
                  className="text-sm text-slate-300 leading-relaxed max-w-prose"
                >
                  {currentDesc}
                </motion.p>
              ) : null}

              {/* Obras Drawer Trigger */}
              {zona === "construccion" && obrasArray.length > 0 && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.3 }}
                  onClick={() => setShowObra(true)}
                  className="mt-4 sm:mt-6 w-full py-3.5 px-4 bg-slate-900 border border-slate-700/60 rounded-2xl flex items-center justify-between text-slate-300 hover:text-white hover:bg-slate-800 transition-all active:scale-[0.98] shadow-lg group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-inacap-red/20 flex items-center justify-center text-inacap-red-light group-hover:bg-inacap-red/30 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                      </svg>
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-bold">{obrasArray.length > 1 ? `Ver Obras Asociadas` : "Ver Obra Emblemática"}</span>
                      <span className="text-[10px] text-slate-500 font-medium">{obrasArray.length} {obrasArray.length === 1 ? 'elemento' : 'elementos'}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-white group-hover:bg-slate-700 transition-colors">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 15l-6-6-6 6" />
                    </svg>
                  </div>
                </motion.button>
              )}

              {/* Swipe indicator (only on hito 10 to invite user to continue) */}
              {hito.id === 10 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45, duration: 0.4 }}
                  className="mt-8 mb-2 flex flex-col items-center justify-center gap-2 text-slate-400 text-center"
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
            </div>
          )}{/* end shared content */}
        </motion.div>
      </AnimatePresence>
      </div>
      
      {/* Bottom Sheet Drawer for Obras */}
      <AnimatePresence>
        {showObra && obrasArray.length > 0 && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowObra(false)}
              className="fixed inset-0 z-40 bg-slate-950/70 backdrop-blur-sm cursor-pointer"
            />
            
            {/* Drawer */}
            <motion.div
              drag="y"
              dragConstraints={{ top: 0 }}
              dragElastic={0.2}
              onDragEnd={(e, info) => {
                if (info.offset.y > 100) setShowObra(false);
              }}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-x-0 bottom-0 z-50 max-h-[85vh] w-full max-w-lg mx-auto flex flex-col rounded-t-[2rem] bg-slate-900 border-x border-t border-slate-700/50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] overflow-hidden"
            >
              {/* Drag Handle & Header */}
              <div className="flex-shrink-0 pt-3 pb-4 px-6 bg-slate-900 sticky top-0 z-10 border-b border-slate-800/80">
                <div className="w-12 h-1.5 mx-auto bg-slate-700 rounded-full mb-4" />
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-slate-100">Obras Emblemáticas</h3>
                  <button 
                    onClick={() => setShowObra(false)}
                    className="p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 pb-12 space-y-8 scrollbar-hide">
                {obrasArray.map((obra, idx) => (
                  <div key={idx} className="flex flex-col gap-4">
                    <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-slate-800 shadow-lg">
                      <img
                        src={obra.imagenUrl}
                        alt={obra.nombre}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                      <div className="absolute top-3 left-3 bg-inacap-red/90 text-white font-bold text-[11px] px-2.5 py-1 rounded-full shadow-lg">
                        {obra.anio}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-base font-extrabold text-slate-100 mb-2 leading-snug">
                        {obra.nombre}
                      </h4>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        {obra.descripcion}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>


    </div>
  );
}
