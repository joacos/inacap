"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exposicionData } from "@/data/exposicion";
import { useProgress } from "@/hooks/useProgress";
import ARViewer from "@/components/ARViewer";
import AudioPlayer from "@/components/AudioPlayer";
import ZoneWelcome from "@/components/ZoneWelcome";

export default function ZonaHerramientasClientPage() {
  const hitos = exposicionData.herramientas;
  const [showWelcome, setShowWelcome] = useState(true);
  
  // Active states
  const [selectedToolId, setSelectedToolId] = useState<number | null>(null);
  const [activeARId, setActiveARId] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanLoopRef = useRef<number | null>(null);

  const { markVisited, isVisited } = useProgress();

  const discoveredTools = hitos.filter((h) => isVisited("herramientas", h.id));
  const discoveredCount = discoveredTools.length;
  const allDiscovered = discoveredCount === 5;

  // Determine if the background camera should be active
  const isCameraActive = !showWelcome && activeARId === null;

  // Process query parameter (?scan=ID) on page load
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const scanId = params.get("scan");
      if (scanId) {
        const idNum = parseInt(scanId, 10);
        if (idNum >= 1 && idNum <= 5) {
          markVisited("herramientas", idNum);
          setSelectedToolId(idNum);
          setActiveARId(idNum);
          // Clean URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
    }
  }, [markVisited]);

  const handleOpenAR = (toolId: number) => {
    setSelectedToolId(toolId);
    setActiveARId(toolId);
  };

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
    setSelectedToolId(toolId);
    setActiveARId(toolId);
  }, [markVisited]);

  // QR Scanning Loop using jsQR loaded from layout
  const scanLoop = useCallback(() => {
    const video = videoRef.current;
    if (video && video.readyState === video.HAVE_ENOUGH_DATA) {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        
        const jsQR = (window as any).jsQR;
        if (jsQR) {
          const code = jsQR(imageData.data, imageData.width, imageData.height, {
            inversionAttempts: "dontInvert",
          });
          if (code) {
            const decodedData = code.data;
            try {
              const parsedUrl = new URL(decodedData);
              const scanId = parsedUrl.searchParams.get("scan");
              if (scanId) {
                const idNum = parseInt(scanId, 10);
                if (idNum >= 1 && idNum <= 5) {
                  handleSuccessfulScan(idNum);
                  return;
                }
              }
            } catch (e) {
              const idNum = parseInt(decodedData, 10);
              if (idNum >= 1 && idNum <= 5) {
                handleSuccessfulScan(idNum);
                return;
              }
            }
          }
        }
      }
    }
    scanLoopRef.current = requestAnimationFrame(scanLoop);
  }, [handleSuccessfulScan]);

  const startCamera = async () => {
    setCameraError(false);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported or context is insecure");
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      scanLoopRef.current = requestAnimationFrame(scanLoop);
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (scanLoopRef.current) {
      cancelAnimationFrame(scanLoopRef.current);
      scanLoopRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  };

  // Sync camera state with view status
  useEffect(() => {
    if (isCameraActive) {
      startCamera();
      return () => {
        stopCamera();
      };
    } else {
      stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCameraActive]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const progressPercentage = Math.round((discoveredCount / 5) * 100);

  return (
    <AnimatePresence mode="wait">
      {showWelcome ? (
        <ZoneWelcome key="welcome" zona="herramientas" onStart={() => setShowWelcome(false)} />
      ) : (
        <motion.div
          key="timeline-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col min-h-dvh pb-36 dot-grid relative overflow-x-hidden"
        >
          {/* Continuous Camera Feed Background */}
          <div className="fixed inset-0 z-0 bg-slate-950 pointer-events-none">
            {!cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover opacity-35"
              />
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 bg-slate-950">
                <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-3">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                </div>
                {typeof window !== "undefined" && !window.isSecureContext ? (
                  <div className="max-w-xs">
                    <span className="text-xs font-bold text-yellow-500 block mb-1">
                      ⚠️ Contexto Inseguro (HTTP)
                    </span>
                    <p className="text-[9px] text-slate-550 leading-relaxed">
                      El navegador bloquea la cámara sobre HTTP. Accede desde <code className="bg-slate-900 px-1 py-0.5 rounded text-[8px]">localhost</code> o usa un túnel HTTPS (ej. Vercel) para probar el escaneo real en tu teléfono.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-xs">
                    <span className="text-xs font-bold text-slate-350 block mb-1">
                      📷 Cámara no disponible
                    </span>
                    <p className="text-[9px] text-slate-500 leading-relaxed">
                      Por favor, concede permisos de cámara en tu navegador o conecta una cámara para probar el escaneo. Puedes usar el simulador de abajo para testear.
                    </p>
                  </div>
                )}
              </div>
            )}
            {/* Ambient gradients to blend camera seamlessly */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/90 via-[#020617]/50 to-[#020617]/95" />
          </div>

          {/* Floating UI Container */}
          <div className="relative z-10 w-full flex flex-col flex-grow">
            {/* Header */}
            <header className="px-6 pt-6 pb-2 flex items-center justify-between">
              <Link href="/">
                <img
                  src="/inacap60.png"
                  alt="Logo INACAP 60"
                  className="h-7 w-auto object-contain cursor-pointer hover:opacity-80 transition-opacity"
                />
              </Link>

              {/* Tools Circular Progress Indicator */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 glass bg-slate-950/80 rounded-full px-4 py-2 border border-slate-800/60 shadow-lg"
                id="progress-tracker-tools"
              >
                <div className="relative w-8 h-8 flex-shrink-0">
                  <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                    <circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="rgba(100, 116, 139, 0.2)"
                      strokeWidth="3.5"
                    />
                    <motion.circle
                      cx="18"
                      cy="18"
                      r="15"
                      fill="none"
                      stroke="#3b82f6"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeDasharray={`${progressPercentage * 0.942} 100`}
                      initial={{ strokeDasharray: "0 100" }}
                      animate={{ strokeDasharray: `${progressPercentage * 0.942} 100` }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-[9px] font-extrabold text-slate-250">
                    {progressPercentage}%
                  </span>
                </div>
                <div className="text-xs">
                  <span className="font-bold text-slate-100">{discoveredCount}</span>
                  <span className="text-slate-400"> / 5 descubiertos</span>
                </div>
              </motion.div>
            </header>

            {/* Central Screen Helper Hint */}
            <div className="px-6 mt-4 mb-2 flex flex-col items-center text-center">
              <h1 className="text-xl font-black text-slate-100 leading-tight">
                Zona Herramientas
              </h1>
              
              <div className="mt-4 flex items-center gap-2 bg-slate-950/80 border border-slate-800/80 px-4 py-2.5 rounded-full shadow-lg max-w-xs justify-center">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-inacap-blue-light opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-inacap-blue-light"></span>
                </span>
                <p className="text-[10px] font-bold text-slate-350 uppercase tracking-wider leading-none">
                  Cámara activa · Escaneando QR...
                </p>
              </div>
            </div>

            {/* List of 5 tool families */}
            <div className="px-6 mt-6 flex flex-col gap-4 max-w-md mx-auto w-full">
              {hitos.map((tool) => {
                const unlocked = isVisited("herramientas", tool.id);

                return (
                  <div
                    key={tool.id}
                    className={`relative rounded-3xl transition-all duration-500 overflow-hidden ${
                      unlocked
                        ? "bg-slate-900/85 backdrop-blur-md border border-slate-700/50 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
                        : "bg-slate-950/65 backdrop-blur-sm border border-slate-900/80 opacity-80"
                    }`}
                  >
                    <AnimatePresence mode="wait">
                      {unlocked ? (
                        /* UNLOCKED CARD */
                        <motion.div
                          key="unlocked"
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col"
                        >
                          {/* Image banner */}
                          {tool.imagenes && tool.imagenes.length > 0 && (
                            <div className="relative w-full h-32 overflow-hidden bg-slate-950/20">
                              <img
                                src={tool.imagenes[0]}
                                alt={tool.titulo}
                                className="w-full h-full object-cover"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f19] via-[#0b0f19]/25 to-transparent" />
                              
                              <span className="absolute top-3 right-3 bg-inacap-blue text-white font-extrabold text-[10px] px-2.5 py-0.5 rounded-full border border-inacap-blue-light/35">
                                Hito {tool.id} · {tool.anio}
                              </span>
                            </div>
                          )}

                          <div className="p-5">
                            <h3 className="text-base font-bold text-slate-100 mb-2 leading-snug">
                              {tool.titulo}
                            </h3>
                            <p className="text-xs text-slate-400 leading-relaxed mb-4">
                              {tool.descripcion}
                            </p>

                            <div className="flex gap-2 w-full mt-2">
                              <button
                                onClick={() => handleOpenAR(tool.id)}
                                className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-bold transition-all duration-300 active:scale-95 glow-blue cursor-pointer"
                              >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                  <path d="M2 17l10 5 10-5" />
                                  <path d="M2 12l10 5 10-5" />
                                </svg>
                                Ver en AR
                              </button>

                              <button
                                onClick={() => handlePlayAudio(tool.id)}
                                className={`flex items-center justify-center w-11 h-11 rounded-xl border transition-all duration-300 active:scale-95 cursor-pointer ${
                                  playingAudioId === tool.id
                                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                                    : "bg-slate-900 border-slate-800 text-slate-350 hover:text-slate-200"
                                }`}
                                title="Reproducir audioguía"
                              >
                                {playingAudioId === tool.id ? (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-pulse">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                                  </svg>
                                ) : (
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                                  </svg>
                                )}
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ) : (
                        /* LOCKED CARD */
                        <motion.div
                          key="locked"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="p-5 flex items-center gap-4 relative"
                        >
                          <div className="w-12 h-12 rounded-2xl bg-slate-950/70 border border-slate-800/80 flex items-center justify-center text-slate-500 flex-shrink-0">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="animate-pulse">
                              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <span className="text-[10px] font-bold text-slate-650 uppercase tracking-widest block mb-0.5">
                              Familia {tool.id} (Bloqueada)
                            </span>
                            <h3 className="text-sm font-bold text-slate-500 truncate">
                              {tool.titulo}
                            </h3>
                          </div>
                          
                          {/* Live Scan indicator */}
                          <div className="flex items-center gap-1 bg-slate-950/70 px-2.5 py-1.5 rounded-lg border border-slate-800/40 text-[9px] text-slate-500 uppercase tracking-wider font-bold">
                            <span className="relative flex h-1.5 w-1.5">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-inacap-blue-light opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-inacap-blue-light"></span>
                            </span>
                            Escanear
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>

            {/* Debug simulation panel - visible for testing */}
            <div className="px-6 mt-6 mb-12 max-w-md mx-auto w-full z-10">
              <div className="bg-slate-950/90 border border-slate-900 p-4 rounded-3xl flex flex-col items-center shadow-2xl">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">
                  Simulador de Escaneo (Pruebas / Demo)
                </span>
                <div className="grid grid-cols-5 gap-2 w-full">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <button
                      key={id}
                      onClick={() => handleSuccessfulScan(id)}
                      className={`w-full aspect-square flex flex-col items-center justify-center rounded-2xl border text-xs font-black transition-all active:scale-95 cursor-pointer ${
                        isVisited("herramientas", id)
                          ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-400"
                          : "bg-slate-900 border-slate-800 text-slate-350 hover:bg-slate-800 hover:text-white"
                      }`}
                    >
                      <span>{id}</span>
                      <span className="text-[7px] text-slate-500 font-bold uppercase mt-0.5">
                        {isVisited("herramientas", id) ? "ok" : "scan"}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-[8px] text-slate-650 mt-3 text-center">
                  Presiona los números para simular la detección del código QR físico de cada estación.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Floating Bar */}
          {allDiscovered && (
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent z-30">
              <div className="max-w-md mx-auto">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="p-4 rounded-2xl bg-slate-900/90 border border-emerald-500/25 flex flex-col items-center justify-center text-center shadow-2xl backdrop-blur-md"
                >
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <polyline points="22 4 12 14.01 9 11.01" />
                    </svg>
                  </div>
                  <h4 className="text-xs font-bold text-slate-100 mb-1">
                    ¡Excelente! Has descubierto todas las herramientas
                  </h4>
                  <p className="text-[10px] text-slate-450 mb-3 max-w-[280px]">
                    Completaste exitosamente el recorrido tecnológico conmemorativo de INACAP.
                  </p>
                  <Link
                    href="/"
                    className="w-full py-2.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-extrabold transition-all duration-300 active:scale-95 flex items-center justify-center gap-1.5 glow-blue shadow-lg"
                  >
                    Volver al Inicio
                  </Link>
                </motion.div>
              </div>
            </div>
          )}

          {/* AR Model Viewer Modal */}
          <AnimatePresence>
            {activeARId !== null && selectedToolId !== null && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-slate-950 flex flex-col items-center justify-center p-6"
              >
                {/* Header inside AR modal */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-30">
                  <div className="bg-slate-900/90 px-4 py-2.5 rounded-2xl border border-slate-800/80 shadow-lg max-w-[70%]">
                    <h4 className="text-xs font-bold text-slate-100 truncate">
                      {hitos[selectedToolId - 1].titulo}
                    </h4>
                    {selectedToolId !== 4 && (
                      <span className="text-[9px] text-yellow-400/90 font-bold flex items-center gap-1 mt-0.5 animate-pulse">
                        🧪 Demo (Modelo Estación Total)
                      </span>
                    )}
                  </div>
                  
                  <button
                    onClick={() => setActiveARId(null)}
                    className="w-9 h-9 rounded-2xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-lg cursor-pointer"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* AR View implementation */}
                <div className="w-full h-full flex items-center justify-center">
                  <ARViewer
                    src={hitos[selectedToolId - 1].modelo3dUrl || "/estacion_total.glb"}
                    alt={hitos[selectedToolId - 1].titulo}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Audio Player Component */}
          {playingAudioId !== null && (
            <AudioPlayer
              audioUrl={hitos[playingAudioId - 1].audioUrl}
              title={hitos[playingAudioId - 1].titulo}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
