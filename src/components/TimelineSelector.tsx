"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Hito } from "@/data/exposicion";
import type { ZonaKey } from "@/data/exposicion";

interface TimelineSelectorProps {
  hitos: Hito[];
  activeId: number;
  onSelect: (id: number) => void;
  zona: ZonaKey;
  isVisited: (zona: ZonaKey, hitoId: number) => boolean;
}

export default function TimelineSelector({
  hitos,
  activeId,
  onSelect,
  zona,
  isVisited,
}: TimelineSelectorProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (activeRef.current && scrollRef.current) {
      const container = scrollRef.current;
      const button = activeRef.current;
      const scrollLeft =
        button.offsetLeft - container.offsetWidth / 2 + button.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }
  }, [activeId]);

  const isBlueAccent = zona === "inacap" || zona === "herramientas";
  const accentColor = isBlueAccent ? "var(--color-inacap-blue-light)" : "var(--color-inacap-red-light)";

  return (
    <div className="relative w-full">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-6 z-10 bg-gradient-to-l from-slate-950 to-transparent" />

      <div
        ref={scrollRef}
        className="timeline-scroll flex items-center gap-0 overflow-x-auto px-8 py-2 sm:py-3 snap-x snap-mandatory"
      >
        {hitos.map((hito, index) => {
          const isActive = hito.id === activeId;
          const visited = isVisited(zona, hito.id);
          const isLast = index === hitos.length - 1;

          return (
            <div key={hito.id} className="flex items-center flex-shrink-0 snap-center">
              <button
                ref={isActive ? activeRef : undefined}
                onClick={() => onSelect(hito.id)}
                className="relative flex flex-col items-center cursor-pointer group"
                id={`timeline-hito-${hito.id}`}
              >
                {/* The dot/number */}
                <div className="relative">
                  {isActive && (
                    <motion.div
                      layoutId="timeline-active-pill"
                      className="absolute -inset-1.5 rounded-full"
                      style={{
                        background: `radial-gradient(circle, ${isBlueAccent ? 'rgba(59,130,246,0.25)' : 'rgba(239,68,68,0.25)'} 0%, transparent 70%)`,
                        boxShadow: isBlueAccent
                          ? '0 0 12px rgba(59,130,246,0.4), 0 0 24px rgba(59,130,246,0.15)'
                          : '0 0 12px rgba(239,68,68,0.4), 0 0 24px rgba(239,68,68,0.15)',
                      }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <span
                    className={`
                      relative z-10 flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold
                      transition-all duration-300
                      ${isActive
                        ? isBlueAccent
                          ? "bg-inacap-blue-light text-white"
                          : "bg-inacap-red-light text-white"
                        : visited
                          ? "bg-slate-800 text-slate-300 border border-emerald-500/40"
                          : "bg-slate-800/60 text-slate-500 group-hover:text-slate-300 group-hover:bg-slate-700/60"
                      }
                    `}
                  >
                    {hito.id}
                  </span>
                </div>

                {/* Year — only show for active */}
                <span
                  className={`
                    text-[10px] font-medium mt-1 transition-all duration-300 leading-none
                    ${isActive ? "text-slate-300 opacity-100" : "text-slate-600 opacity-0 group-hover:opacity-100"}
                  `}
                >
                  {hito.anio}
                </span>
              </button>

              {/* Connecting line */}
              {!isLast && (
                <div
                  className="w-4 h-px flex-shrink-0 mx-0.5 mb-4"
                  style={{
                    background: `linear-gradient(to right, ${
                      visited || isActive ? (isBlueAccent ? 'rgba(59,130,246,0.4)' : 'rgba(239,68,68,0.4)') : 'rgba(100,116,139,0.2)'
                    }, ${
                      isVisited(zona, hitos[index + 1]?.id) || hitos[index + 1]?.id === activeId
                        ? (isBlueAccent ? 'rgba(59,130,246,0.4)' : 'rgba(239,68,68,0.4)')
                        : 'rgba(100,116,139,0.2)'
                    })`,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
