"use client";

import Link from "next/link";
import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exposicionData } from "@/data/exposicion";
import { useProgress } from "@/hooks/useProgress";
import AudioPlayer from "@/components/AudioPlayer";
import dynamic from "next/dynamic";

const MindARViewer = dynamic(() => import("@/components/MindARViewer"), {
  ssr: false,
});

type FlowStep = "instructions" | "scanning";

export default function ZonaHerramientasClientPage() {
  const hitos = exposicionData.herramientas;
  const [step, setStep] = useState<FlowStep>("instructions");
  
  const [activeToolId, setActiveToolId] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);

  const { markVisited, isVisited } = useProgress();

  const discoveredTools = hitos.filter((h) => isVisited("herramientas", h.id));
  const discoveredCount = discoveredTools.length;
  const progressPercentage = Math.round((discoveredCount / 5) * 100);

  // Process query parameter (?scan=ID) on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const scanId = params.get("scan");
      if (scanId) {
        const idNum = parseInt(scanId, 10);
        if (idNum >= 1 && idNum <= 5) {
          markVisited("herramientas", idNum);
          setActiveToolId(idNum);
          setStep("scanning");
          // Clean URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
    }
  }, [markVisited]);

  const handlePlayAudio = (toolId: number) => {
    if (playingAudioId === toolId) {
      setPlayingAudioId(null);
    } else {
      setPlayingAudioId(toolId);
    }
  };

  const playBeep = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch {}
  };

  const handleSuccessfulScan = useCallback((toolId: number) => {
    playBeep();
    markVisited("herramientas", toolId);
    setActiveToolId(toolId);
  }, [markVisited]);

  return (
    <div className="flex flex-col min-h-dvh bg-slate-950 text-slate-100 dot-grid relative overflow-x-hidden">
      
      {/* FIXED HEADER (Visible during scanning) */}
      {step !== "instructions" && (
        <header className="fixed top-0 left-0 right-0 z-40 px-6 pt-6 pb-4 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-3 pointer-events-auto">
            <button
              onClick={() => {
                setStep("instructions");
                setActiveToolId(null);
                setPlayingAudioId(null);
              }}
              className="text-slate-400 hover:text-slate-100 transition-colors w-8 h-8 rounded-xl bg-slate-900/60 border border-slate-800/40 flex items-center justify-center active:scale-95"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </button>
            <div>
              <h1 className="text-xs font-black text-slate-200 leading-none">
                Zona Herramientas
              </h1>
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest mt-0.5 block">
                Exposición 60 Años
              </span>
            </div>
          </div>

          {/* Tools Circular Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2.5 glass bg-slate-950/80 rounded-full px-3.5 py-1.5 border border-slate-800 shadow-lg pointer-events-auto"
          >
            <div className="relative w-6 h-6 flex-shrink-0">
              <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="rgba(100, 116, 139, 0.15)"
                  strokeWidth="4"
                />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${progressPercentage * 0.942} 100`}
                  initial={{ strokeDasharray: "0 100" }}
                  animate={{ strokeDasharray: `${progressPercentage * 0.942} 100` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[7px] font-black text-slate-350">
                {discoveredCount}
              </span>
            </div>
            <span className="text-[10px] font-black text-slate-250">
              {discoveredCount} / 5
            </span>
          </motion.div>
        </header>
      )}

      {/* VIEWPORT CONTROLLER */}
      <div className="relative z-10 flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: INSTRUCTIONS VIEW */}
          {step === "instructions" && (
            <motion.div
              key="instructions"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="flex-grow flex flex-col justify-between px-6 py-10 max-w-sm mx-auto w-full"
            >
              <div className="flex flex-col items-center text-center mt-6">
                <div className="relative flex items-center justify-center w-20 h-20 rounded-2xl mb-6 border border-inacap-blue-light/35 bg-inacap-blue/15 shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-inacap-blue-light">
                    <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
                  </svg>
                </div>

                <h2 className="text-2xl font-black text-slate-100 tracking-tight">
                  Realidad Aumentada
                </h2>
                <p className="text-xs text-slate-450 mt-2 max-w-xs leading-relaxed">
                  Apunta tu cámara al código QR de la estación física para ver el modelo 3D directamente sobre él.
                </p>
              </div>

              {/* Steps Card */}
              <div className="my-8 flex flex-col gap-4">
                <div className="flex gap-4 items-start p-4 rounded-2xl glass border border-slate-900 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-inacap-blue/10 border border-inacap-blue-light/20 flex items-center justify-center text-xs font-black text-inacap-blue-light flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Ubica la estación</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                      Busca los paneles con códigos QR de cada una de las 5 estaciones físicas.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl glass border border-slate-900 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-inacap-blue/10 border border-inacap-blue-light/20 flex items-center justify-center text-xs font-black text-inacap-blue-light flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Apunta el QR</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                      Alinea el código QR en el visor de la cámara. El modelo 3D aparecerá sobre el papel.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl glass border border-slate-900 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-inacap-blue/10 border border-inacap-blue-light/20 flex items-center justify-center text-xs font-black text-inacap-blue-light flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Escucha la guía</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                      Presiona el botón de audio para reproducir la audioguía histórica del hito.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => setStep("scanning")}
                className="w-full py-4 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-extrabold transition-all duration-300 active:scale-95 glow-blue shadow-xl border border-inacap-blue-light/25 cursor-pointer flex items-center justify-center gap-2"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                  <circle cx="12" cy="13" r="4" />
                </svg>
                Iniciar Cámara AR
              </button>
            </motion.div>
          )}

          {/* STEP 2: SCANNING & AR VIEW (MindAR Full Screen) */}
          {step === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-0 flex flex-col justify-between"
            >
              <MindARViewer
                targetsUrl="/targets.mind"
                onTargetFound={(index) => {
                  const toolId = index + 1;
                  handleSuccessfulScan(toolId);
                }}
                onTargetLost={() => {}}
                onClose={() => {
                  setStep("instructions");
                  setActiveToolId(null);
                  setPlayingAudioId(null);
                }}
              />

              {/* Demo / Simulation trigger overlay for browser preview */}
              <div className="absolute top-20 left-6 right-6 z-55 bg-slate-950/80 border border-slate-800 p-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-2xl backdrop-blur-sm pointer-events-auto max-w-sm mx-auto">
                <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none flex-shrink-0">
                  Simular QR:
                </span>
                <div className="flex gap-1.5 flex-1 justify-end">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <button
                      key={id}
                      onClick={() => handleSuccessfulScan(id)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg border text-[10px] font-black transition-all active:scale-95 cursor-pointer ${
                        activeToolId === id
                          ? "bg-inacap-blue/20 border-inacap-blue-light/50 text-inacap-blue-light"
                          : "bg-slate-900 border-slate-800 text-slate-400 hover:bg-slate-850"
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>

              {/* HUD detail card overlay when target QR code is tracked */}
              {activeToolId !== null && (
                <div className="absolute bottom-6 left-6 right-6 z-55 max-w-sm mx-auto pointer-events-auto">
                  <div className="bg-slate-900/90 border border-slate-850 p-5 rounded-3xl shadow-2xl flex flex-col backdrop-blur-md">
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <span className="bg-inacap-blue text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full border border-inacap-blue-light/20">
                        Hito {activeToolId} · {hitos[activeToolId - 1].anio}
                      </span>

                      {/* Audio Guide trigger */}
                      <button
                        onClick={() => handlePlayAudio(activeToolId)}
                        className={`flex items-center justify-center w-8 h-8 rounded-lg border transition-all duration-300 active:scale-95 cursor-pointer ${
                          playingAudioId === activeToolId
                            ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                            : "bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200"
                        }`}
                      >
                        {playingAudioId === activeToolId ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 5L6 9H2v6h4l5 4V5z" />
                            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          </svg>
                        )}
                      </button>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-100 mb-1 leading-snug">
                      {hitos[activeToolId - 1].titulo}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {hitos[activeToolId - 1].descripcion}
                    </p>

                    <div className="flex gap-2.5 mt-4">
                      {/* Button to clear current active hito */}
                      <button
                        onClick={() => {
                          setActiveToolId(null);
                          setPlayingAudioId(null);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-slate-450 hover:text-slate-200 text-[10px] font-bold border border-slate-850 transition-all active:scale-95 cursor-pointer"
                      >
                        Ocultar Detalle
                      </button>
                      <button
                        onClick={() => {
                          setActiveToolId(null);
                          setPlayingAudioId(null);
                        }}
                        className="flex-1 py-2.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-[10px] font-extrabold border border-inacap-blue-light/20 transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1"
                      >
                        <span>Escanear Otro</span>
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="animate-pulse">
                          <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* AUDIO PLAYER OVERLAY */}
      {playingAudioId !== null && (
        <AudioPlayer
          audioUrl={hitos[playingAudioId - 1].audioUrl}
          title={hitos[playingAudioId - 1].titulo}
        />
      )}
    </div>
  );
}
