"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exposicionData } from "@/data/exposicion";
import type { ZonaKey } from "@/data/exposicion";
import { useProgress } from "@/hooks/useProgress";
import TimelineSelector from "@/components/TimelineSelector";
import HitoContent from "@/components/HitoContent";
import AudioPlayer from "@/components/AudioPlayer";
import ARViewer from "@/components/ARViewer";
import ProgressTracker from "@/components/ProgressTracker";
import NextCategoryCard from "@/components/NextCategoryCard";
import ZoneWelcome from "@/components/ZoneWelcome";
import InteractionGuide from "@/components/InteractionGuide";

interface ZonaClientPageProps {
  zona: ZonaKey;
}

export default function ZonaClientPage({ zona }: ZonaClientPageProps) {
  const isBlueAccent = zona === "inacap" || zona === "herramientas";
  const hitos = exposicionData[zona];
  const [activeId, setActiveId] = useState(1);
  const [direction, setDirection] = useState(1);
  const [showWelcome, setShowWelcome] = useState(true);
  const [viewMode, setViewMode] = useState<"nacional" | "local" | "carreras">("nacional");
  const [showGuide, setShowGuide] = useState(true);
  const prevIdRef = useRef(1);
  const { markVisited, isVisited, totalVisited, resetProgress } = useProgress();

  const activeHito = hitos.find((h) => h.id === activeId) ?? hitos[0];

  useEffect(() => {
    if (activeId <= 10 && !showWelcome) {
      markVisited(zona, activeId);
    }
  }, [zona, activeId, markVisited, showWelcome]);

  const handleSelect = (id: number) => {
    setDirection(id > prevIdRef.current ? 1 : -1);
    prevIdRef.current = id;
    prevIdRef.current = id;
    setActiveId(id);
    
    // Automatically fallback to nacional if the selected viewMode is not available on the new hito
    const newHito = hitos.find((h) => h.id === id) ?? hitos[0];
    if (viewMode === "local" && !newHito.local) setViewMode("nacional");
    if (viewMode === "carreras" && !newHito.carreras) setViewMode("nacional");
  };

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <ZoneWelcome key="welcome" zona={zona} onStart={() => setShowWelcome(false)} />
      ) : (
        <motion.div
          key="timeline-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col h-dvh overflow-hidden dot-grid"
        >
          {/* --- FIXED TOP SECTION --- */}
          <div className="flex-shrink-0 z-40 relative pt-1 pb-0 bg-slate-950">
            {/* Header bar */}
            <header className="px-4 sm:px-5 pt-2 sm:pt-3 pb-1 flex items-center justify-between">
              <Link href="/">
                <img
                  src="/inacap60.png"
                  alt="Logo INACAP 60"
                  className="h-6 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>
              <ProgressTracker totalVisited={totalVisited} />
            </header>

            {/* Timeline */}
            <TimelineSelector
              hitos={hitos}
              activeId={activeId}
              onSelect={handleSelect}
              zona={zona}
              isVisited={isVisited}
            />

            {/* Gradient fade extending below the header */}
            <div className="absolute top-full left-0 right-0 h-16 bg-gradient-to-b from-slate-950 to-transparent pointer-events-none" />

            {/* Switch Toggle (Nacional vs Valdivia vs Carreras) - Fixed below header */}
            {zona === "inacap" && activeId !== 11 && (
              <div className="absolute top-full mt-2 sm:mt-4 left-0 right-0 z-40 flex justify-center pointer-events-none">
                <div className="inline-flex p-1 bg-slate-950/80 backdrop-blur-md rounded-full border border-slate-800/80 shadow-lg pointer-events-auto">
                  <button
                    onClick={() => setViewMode("nacional")}
                    className={`relative px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors duration-300 cursor-pointer ${
                      viewMode === "nacional" ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {viewMode === "nacional" && (
                      <motion.span
                        layoutId="viewmode-pill"
                        className="absolute inset-0 rounded-full bg-inacap-blue shadow-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Nacional</span>
                  </button>
                  <button
                    onClick={() => setViewMode("local")}
                    className={`relative px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors duration-300 cursor-pointer ${
                      viewMode === "local" ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    {viewMode === "local" && (
                      <motion.span
                        layoutId="viewmode-pill"
                        className="absolute inset-0 rounded-full bg-inacap-blue shadow-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Valdivia</span>
                  </button>
                  <button
                    onClick={() => activeHito.carreras && setViewMode("carreras")}
                    className={`relative px-4 py-1.5 rounded-full text-[11px] font-bold transition-colors duration-300 ${
                      !activeHito.carreras ? "opacity-30 cursor-not-allowed" : "cursor-pointer"
                    } ${
                      viewMode === "carreras" ? "text-slate-50" : "text-slate-400 hover:text-slate-200"
                    }`}
                    disabled={!activeHito.carreras}
                  >
                    {viewMode === "carreras" && (
                      <motion.span
                        layoutId="viewmode-pill"
                        className="absolute inset-0 rounded-full bg-inacap-blue shadow-md"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">Carreras</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* --- SCROLLABLE CONTENT SECTION --- */}
          <div className={`flex-1 overflow-x-hidden relative ${
            isBlueAccent && activeId !== 11
              ? "overflow-y-hidden pb-0"
              : "overflow-y-auto pb-20 sm:pb-24"
          }`}>
          {/* Content */}
          <motion.div
            className="flex-1 mt-0 touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.6}
            onDragEnd={(event, info) => {
              const swipeThreshold = 50;
              if (info.offset.x < -swipeThreshold) {
                if (activeId < 11) {
                  handleSelect(activeId + 1);
                }
              } else if (info.offset.x > swipeThreshold) {
                if (activeId > 1) {
                  handleSelect(activeId - 1);
                }
              }
            }}
          >
            <AnimatePresence mode="wait" custom={direction}>
              {activeId === 11 ? (
                <NextCategoryCard
                  key="next-category"
                  zona={zona}
                  direction={direction}
                  onBack={() => handleSelect(10)}
                  totalVisited={totalVisited}
                  resetProgress={resetProgress}
                  isVisited={isVisited}
                />
              ) : (
                <HitoContent
                  key={activeHito.id}
                  hito={activeHito}
                  zona={zona}
                  direction={direction}
                  viewMode={viewMode}
                />
              )}
            </AnimatePresence>
          </motion.div>

          {/* AR Viewer (herramientas zone + some construccion) */}
          {activeId !== 11 && activeHito.modelo3dUrl && (
            <div className="px-6 mt-6 mb-4">
              <ARViewer src={activeHito.modelo3dUrl} alt={activeHito.titulo} />
            </div>
          )}

          {/* Audio Player */}
          {activeId !== 11 && activeHito.audioUrl && (
            <AudioPlayer
              audioUrl={activeHito.audioUrl}
              title={activeHito.titulo}
              autoPlay={true}
            />
          )}

          </div> {/* END SCROLLABLE CONTENT SECTION */}

          {/* Onboarding Interactive Guide Overlay */}
          <AnimatePresence>
            {activeId === 1 && !showWelcome && showGuide && (
              <InteractionGuide zona={zona} onClose={() => setShowGuide(false)} />
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
