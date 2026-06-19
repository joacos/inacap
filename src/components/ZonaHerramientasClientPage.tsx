"use client";

import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { exposicionData } from "@/data/exposicion";
import { useProgress } from "@/hooks/useProgress";
import ARViewer from "@/components/ARViewer";
import AudioPlayer from "@/components/AudioPlayer";

type FlowStep = "instructions" | "scanning" | "viewing";

export default function ZonaHerramientasClientPage() {
  const hitos = exposicionData.herramientas;
  const [step, setStep] = useState<FlowStep>("instructions");
  
  // Selected and viewing states
  const [activeToolId, setActiveToolId] = useState<number | null>(null);
  const [playingAudioId, setPlayingAudioId] = useState<number | null>(null);
  const [cameraError, setCameraError] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanLoopRef = useRef<number | null>(null);

  const { markVisited, isVisited } = useProgress();

  const discoveredTools = hitos.filter((h) => isVisited("herramientas", h.id));
  const discoveredCount = discoveredTools.length;
  const allDiscovered = discoveredCount === 5;

  // Camera should be active during "scanning" step
  const isCameraActive = step === "scanning";

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
          setStep("viewing");
          // Clean URL
          const newUrl = window.location.pathname;
          window.history.replaceState({}, document.title, newUrl);
        }
      }
    }
  }, [markVisited]);

  const handleOpenAR = (toolId: number) => {
    setActiveToolId(toolId);
    setStep("viewing");
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
    setActiveToolId(toolId);
    setStep("viewing");
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
    <div className="flex flex-col min-h-dvh bg-slate-950 text-slate-100 dot-grid relative overflow-x-hidden">
      
      {/* BACKGROUND CAMERA (Active during scanning) */}
      <AnimatePresence>
        {isCameraActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 bg-slate-950 pointer-events-none"
          >
            {!cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover opacity-45"
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
                    <p className="text-[9px] text-slate-500 leading-relaxed">
                      El navegador bloquea la cámara sobre HTTP. Accede desde <code className="bg-slate-900 px-1.5 py-0.5 rounded text-[8px]">localhost</code> o usa un túnel HTTPS (ej. Vercel) para probar el escaneo real en tu teléfono.
                    </p>
                  </div>
                ) : (
                  <div className="max-w-xs">
                    <span className="text-xs font-bold text-slate-350 block mb-1">
                      📷 Cámara no disponible
                    </span>
                    <p className="text-[9px] text-slate-500 leading-relaxed">
                      Concede permisos en tu navegador o conecta una cámara. Puedes usar los botones de simulación de abajo para testear.
                    </p>
                  </div>
                )}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/80 via-transparent to-[#020617]/95" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* FIXED HEADER (Visible during scanning and viewing) */}
      {step !== "instructions" && (
        <header className="fixed top-0 left-0 right-0 z-40 px-6 pt-6 pb-4 bg-gradient-to-b from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setStep("instructions");
                setActiveToolId(null);
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
            className="flex items-center gap-2.5 glass bg-slate-950/80 rounded-full px-3.5 py-1.5 border border-slate-800 shadow-lg"
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
                  Instrucciones de Escaneo
                </h2>
                <p className="text-xs text-slate-450 mt-2 max-w-xs leading-relaxed">
                  Sigue estos simples pasos para desbloquear los modelos 3D y completar tu recorrido.
                </p>
              </div>

              {/* Steps Card */}
              <div className="my-8 flex flex-col gap-4">
                <div className="flex gap-4 items-start p-4 rounded-2xl glass border border-slate-900 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-inacap-blue/10 border border-inacap-blue-light/20 flex items-center justify-center text-xs font-black text-inacap-blue-light flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Busca los Códigos QR</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                      Ubica los paneles con códigos QR de cada una de las 5 estaciones físicas en la exposición.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl glass border border-slate-900 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-inacap-blue/10 border border-inacap-blue-light/20 flex items-center justify-center text-xs font-black text-inacap-blue-light flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Apunta con tu Cámara</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                      Abre la cámara web integrada de la app y apunta al código QR para registrar tu avance.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-4 rounded-2xl glass border border-slate-900 shadow-inner">
                  <div className="w-8 h-8 rounded-xl bg-inacap-blue/10 border border-inacap-blue-light/20 flex items-center justify-center text-xs font-black text-inacap-blue-light flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-slate-200">Interactúa en AR</h3>
                    <p className="text-[10px] text-slate-450 mt-1 leading-relaxed">
                      El modelo 3D aparecerá de inmediato en pantalla. Proyéctalo en Realidad Aumentada sobre tu entorno.
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
                Abrir Cámara
              </button>
            </motion.div>
          )}

          {/* STEP 2: SCANNING VIEW (Completely Clean Full-Screen Camera) */}
          {step === "scanning" && (
            <motion.div
              key="scanning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col justify-between pt-24 pb-6 w-full max-w-md mx-auto px-6 h-full min-h-[450px]"
            >
              {/* Center Reticle Scope */}
              <div className="flex-grow flex flex-col items-center justify-center my-auto">
                <div className="relative w-52 h-52 border-2 border-dashed border-inacap-blue-light/70 rounded-3xl flex items-center justify-center">
                  <motion.div
                    initial={{ top: 0 }}
                    animate={{ top: "100%" }}
                    transition={{ duration: 1.8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-0.5 bg-inacap-blue-light shadow-[0_0_12px_rgba(59,130,246,0.6)] z-25"
                  />
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-20 text-slate-100 animate-pulse">
                    <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                  </svg>
                </div>
                
                <span className="text-[10px] text-slate-350 bg-slate-950/80 px-4 py-2 rounded-full border border-slate-900 shadow-md mt-6 text-center font-bold tracking-wide">
                  Apunta tu cámara al código QR de la estación
                </span>
              </div>

              {/* Minimal bottom simulator trigger panel */}
              <div className="mt-auto bg-slate-950/85 border border-slate-900/60 p-2.5 rounded-2xl flex items-center justify-between gap-3 shadow-2xl backdrop-blur-sm">
                <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest leading-none flex-shrink-0">
                  Simular QR:
                </span>
                <div className="flex gap-1.5 flex-1 justify-end">
                  {[1, 2, 3, 4, 5].map((id) => (
                    <button
                      key={id}
                      onClick={() => handleSuccessfulScan(id)}
                      className={`w-7 h-7 flex items-center justify-center rounded-lg border text-[10px] font-black transition-all active:scale-95 cursor-pointer ${
                        isVisited("herramientas", id)
                          ? "bg-emerald-500/10 border-emerald-500/35 text-emerald-400"
                          : "bg-slate-900 border-slate-850 text-slate-400 hover:bg-slate-800"
                      }`}
                    >
                      {id}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: VIEWING THE 3D MODEL INLINE (Fixed on Screen) */}
          {step === "viewing" && activeToolId !== null && (
            <motion.div
              key="viewing"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="flex-grow flex flex-col justify-between pt-24 pb-6 w-full max-w-md mx-auto px-6 h-full min-h-[500px]"
            >
              {/* Inline 3D Model Box */}
              <div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl border border-slate-800/80 bg-slate-950/70 overflow-hidden shadow-2xl flex items-center justify-center min-h-[280px] my-4">
                {activeToolId !== 4 && (
                  <span className="absolute top-4 left-4 z-20 bg-yellow-500/90 text-slate-950 font-black text-[9px] px-2 py-0.5 rounded-full shadow-md animate-pulse">
                    🧪 Modo Demo (Estación Total)
                  </span>
                )}
                
                {/* Embedded direct model-viewer to show model immediately */}
                <div className="w-full h-full relative">
                  <model-viewer
                    src={hitos[activeToolId - 1].modelo3dUrl || "/estacion_total.glb"}
                    alt={hitos[activeToolId - 1].titulo}
                    ar
                    ar-modes="webxr scene-viewer quick-look"
                    camera-controls
                    auto-rotate
                    shadow-intensity="1"
                    loading="lazy"
                    style={{ width: "100%", height: "100%", background: "transparent" }}
                  >
                    <button
                      slot="ar-button"
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 bg-inacap-blue hover:bg-inacap-blue-light text-white font-extrabold text-[10px] rounded-full px-4 py-2.5 glow-blue transition-all duration-300 active:scale-95 flex items-center gap-1.5 shadow-lg border border-inacap-blue-light/25 cursor-pointer"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                      Proyectar en AR 🚀
                    </button>
                  </model-viewer>
                </div>
              </div>

              {/* Description Card */}
              <div className="bg-slate-900/90 border border-slate-850 p-5 rounded-3xl shadow-xl flex flex-col">
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

                {/* Continue button inviting to scan the next one */}
                <button
                  onClick={() => {
                    setStep("scanning");
                    setActiveToolId(null);
                  }}
                  className="mt-5 w-full py-3.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-extrabold transition-all duration-300 active:scale-95 glow-blue shadow-lg border border-inacap-blue-light/20 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Cerrar 3D y Escanear Siguiente</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="animate-bounce-horizontal">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
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
