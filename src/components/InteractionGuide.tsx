"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import type { ZonaKey } from "@/data/exposicion";

interface InteractionGuideProps {
  zona: ZonaKey;
  onClose: () => void;
}

export default function InteractionGuide({ zona, onClose }: InteractionGuideProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 6000); // 6 seconds duration
    return () => clearTimeout(timer);
  }, [onClose]);

  const pointerVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 10 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 20 }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9, 
      y: -10,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="fixed inset-0 z-40 pointer-events-none select-none">
      {/* 1. Toggle Switch Guide (INACAP only) */}
      {zona === "inacap" && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pointerVariants}
          className="absolute left-1/2 -translate-x-1/2 top-[125px] w-64 flex flex-col items-center z-50"
        >
          {/* Arrow pointing up */}
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-inacap-blue-light/90" />
          <div className="bg-slate-950/90 border border-inacap-blue-light/50 rounded-xl px-3 py-2 text-center shadow-[0_0_15px_rgba(59,130,246,0.3)] backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-100 flex items-center gap-1.5 justify-center">
              <span className="animate-pulse w-1.5 h-1.5 rounded-full bg-inacap-blue-light" />
              🔄 Alterna entre Nacional y Valdivia
            </span>
            <p className="text-[8px] text-slate-400 mt-0.5 leading-relaxed">
              Descubre la historia local usando este selector
            </p>
          </div>
        </motion.div>
      )}

      {/* 2. Scroll Down Guide (Construccion and Herramientas) */}
      {(zona === "construccion" || zona === "herramientas") && (
        <motion.div
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={pointerVariants}
          className="absolute left-1/2 -translate-x-1/2 bottom-[145px] w-72 flex flex-col items-center z-50"
        >
          <div className="bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-2.5 text-center shadow-[0_0_20px_rgba(255,255,255,0.05)] backdrop-blur-sm">
            <span className="text-[10px] font-bold text-slate-200 flex items-center gap-1.5 justify-center">
              {zona === "construccion" ? "🏛️ Obras Emblemáticas" : "🕶️ Modelos 3D y Realidad Aumentada"}
            </span>
            <p className="text-[8px] text-slate-450 mt-0.5 leading-relaxed">
              {zona === "construccion" 
                ? "Desliza hacia abajo para ver los detalles de las obras" 
                : "Desliza hacia abajo para interactuar con la herramienta"}
            </p>
            {/* Animated bouncing arrow */}
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
              className="text-slate-400 text-xs mt-1"
            >
              ↓
            </motion.div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
