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

interface ZonaClientPageProps {
  zona: ZonaKey;
}

export default function ZonaClientPage({ zona }: ZonaClientPageProps) {
  const hitos = exposicionData[zona];
  const [activeId, setActiveId] = useState(1);
  const [direction, setDirection] = useState(1);
  const prevIdRef = useRef(1);
  const { markVisited, isVisited, totalVisited, resetProgress } = useProgress();

  const activeHito = hitos.find((h) => h.id === activeId) ?? hitos[0];

  useEffect(() => {
    if (activeId <= 10) {
      markVisited(zona, activeId);
    }
  }, [zona, activeId, markVisited]);

  const handleSelect = (id: number) => {
    setDirection(id > prevIdRef.current ? 1 : -1);
    prevIdRef.current = id;
    setActiveId(id);
  };

  return (
    <div className="flex flex-col min-h-dvh pb-28 dot-grid">
      {/* Header */}
      <header className="px-6 pt-6 pb-2 flex items-center justify-between">
        <Link href="/">
          <img
            src="/inacap60.png"
            alt="Logo INACAP 60"
            className="h-7 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
          />
        </Link>
        <ProgressTracker totalVisited={totalVisited} />
      </header>

      {/* Timeline */}
      <div className="mt-2">
        <TimelineSelector
          hitos={hitos}
          activeId={activeId}
          onSelect={handleSelect}
          zona={zona}
          isVisited={isVisited}
        />
      </div>

      {/* Content */}
      <motion.div
        className="flex-1 mt-4 touch-pan-y"
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
      {activeId !== 11 && (
        <AudioPlayer audioUrl={activeHito.audioUrl} title={activeHito.titulo} />
      )}
    </div>
  );
}
