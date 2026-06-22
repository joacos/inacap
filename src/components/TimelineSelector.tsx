"use client";

import { useRef, useEffect } from "react";
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

  return (
    <div className="relative w-full">
      {/* Fade edges */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-r from-[#020617] to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 z-10 bg-gradient-to-l from-[#020617] to-transparent" />

      <div
        ref={scrollRef}
        className="timeline-scroll flex items-center gap-3 overflow-x-auto px-8 py-10 snap-x snap-mandatory"
      >
        {hitos.map((hito) => {
          const isActive = hito.id === activeId;
          const visited = isVisited(zona, hito.id);

          return (
            <button
              key={hito.id}
              ref={isActive ? activeRef : undefined}
              onClick={() => onSelect(hito.id)}
              className={`
                relative flex-shrink-0 snap-center flex flex-col items-center gap-1.5
                rounded-2xl px-4 py-3 min-w-[72px] transition-all duration-300
                ${
                  isActive
                    ? isBlueAccent
                      ? "glass-elevated glow-blue-intense scale-110"
                      : "glass-elevated glow-red-intense scale-110"
                    : "glass hover:scale-105"
                }
              `}
              id={`timeline-hito-${hito.id}`}
            >
              {/* Visited indicator */}
              {visited && !isActive && (
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
              )}

              {/* Number */}
              <span
                className={`
                  text-lg font-bold leading-none transition-colors duration-300
                  ${
                    isActive
                      ? isBlueAccent
                        ? "text-inacap-blue-light text-glow-blue"
                        : "text-inacap-red-light text-glow-red"
                      : "text-slate-400"
                  }
                `}
              >
                {hito.id}
              </span>

              {/* Year */}
              <span
                className={`
                  text-[11px] font-medium leading-none transition-colors duration-300
                  ${isActive ? "text-slate-200" : "text-slate-500"}
                `}
              >
                {hito.anio}
              </span>

              {/* Active line indicator */}
              {isActive && (
                <span
                  className={`
                    absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 rounded-full
                    ${isBlueAccent ? "bg-inacap-blue-light" : "bg-inacap-red-light"}
                  `}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
