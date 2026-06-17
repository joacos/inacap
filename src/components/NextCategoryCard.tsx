"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { zonaNombres, zonaDescripciones } from "@/data/exposicion";
import type { ZonaKey } from "@/data/exposicion";

interface NextCategoryCardProps {
  zona: ZonaKey;
  direction: number;
  onBack: () => void;
  totalVisited: number;
  resetProgress: () => void;
  isVisited: (zona: ZonaKey, hitoId: number) => boolean;
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

export default function NextCategoryCard({
  zona,
  direction,
  onBack,
  totalVisited,
  resetProgress,
}: NextCategoryCardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [cameraError, setCameraError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scanLoopRef = useRef<number | null>(null);

  const otherZones = (Object.keys(zonaNombres) as ZonaKey[]).filter(
    (key) => key !== zona
  );

  const startCamera = async () => {
    setCameraError(false);
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("navigator.mediaDevices.getUserMedia is not supported or context is insecure");
      }
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
        audio: false,
      });
      streamRef.current = mediaStream;
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      // Start real-time QR scan loop
      scanLoopRef.current = requestAnimationFrame(scanLoop);
    } catch (err) {
      console.error("Camera access error in scan modal:", err);
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

  const handleSuccessfulScan = (targetZone: ZonaKey) => {
    playBeep();
    stopCamera();
    setIsScanning(false);
    window.location.href = `/zona/${targetZone}`;
  };

  const handleSimulateScan = () => {
    const randomZone = otherZones[Math.floor(Math.random() * otherZones.length)];
    handleSuccessfulScan(randomZone);
  };

  const scanLoop = () => {
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
            const url = code.data;
            let detectedZone: ZonaKey | null = null;
            if (url.includes("/zona/inacap")) detectedZone = "inacap";
            else if (url.includes("/zona/construccion")) detectedZone = "construccion";
            else if (url.includes("/zona/herramientas")) detectedZone = "herramientas";
            
            // Allow redirect only to a different zone than the current one
            if (detectedZone && detectedZone !== zona) {
              handleSuccessfulScan(detectedZone);
              return;
            }
          }
        }
      }
    }
    scanLoopRef.current = requestAnimationFrame(scanLoop);
  };

  useEffect(() => {
    if (isScanning) {
      startCamera();
      return () => {
        stopCamera();
      };
    } else {
      stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScanning]);

  if (totalVisited === 30) {
    return (
      <motion.div
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
        className="px-6 flex flex-col justify-center min-h-[320px]"
      >
        <div className="p-6 rounded-2xl glass-elevated border border-slate-700/40 relative overflow-hidden text-center">
          {/* Confetti particles representation */}
          <div className="absolute top-0 left-0 right-0 bottom-0 pointer-events-none opacity-20">
            <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-yellow-400 animate-ping" />
            <div className="absolute top-20 right-16 w-3 h-3 rounded-full bg-blue-400 animate-bounce" />
            <div className="absolute bottom-12 left-20 w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
          </div>

          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-tr from-emerald-500/20 to-teal-500/20 text-emerald-400 border border-emerald-500/30 mb-4 glow-blue mx-auto">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          <h3 className="text-xl font-extrabold text-slate-50 mb-3 bg-gradient-to-r from-emerald-400 via-teal-200 to-inacap-blue-light bg-clip-text text-transparent">
            ¡Felicidades! 🎉
          </h3>

          <p className="text-sm text-slate-350 mb-6 leading-relaxed max-w-xs mx-auto">
            Has completado el <strong>100% de la exposición</strong> (los 30 hitos históricos). Agradecemos tu participación en este recorrido conmemorativo de los 60 Años de INACAP.
          </p>

          <div className="flex flex-col gap-3">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 p-3.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-sm font-bold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-blue"
            >
              Volver al Inicio
            </Link>
            
            <button
              onClick={() => {
                resetProgress();
                window.location.href = "/";
              }}
              className="text-xs text-slate-500 hover:text-slate-300 transition-colors py-2 flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 11-.57-8.38l.73-.73" />
              </svg>
              Reiniciar Recorrido
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        transition={transition}
        className="px-6 flex flex-col justify-center min-h-[320px]"
      >
        <div className="p-6 rounded-2xl glass-elevated border border-slate-700/40 relative overflow-hidden">
          {/* Background gradient hint */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-inacap-blue-light/10 to-transparent blur-2xl pointer-events-none" />

          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              ¡Recorrido Finalizado!
            </h3>
            <button
              onClick={onBack}
              className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
                Volver al Hito 10
            </button>
          </div>

          <p className="text-xs text-slate-400 mb-5 leading-relaxed">
            Has completado todos los hitos de la <strong>{zonaNombres[zona]}</strong>. Para continuar a la siguiente etapa de tu recorrido, debes escanear el código QR de entrada física.
          </p>

          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => setIsScanning(true)}
              className="flex items-center justify-center gap-2.5 p-4 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-extrabold transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] glow-blue cursor-pointer"
              id="start-next-zone-scan"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Escanear Próxima Zona
            </button>
          </div>
        </div>
      </motion.div>

      {/* QR Code Scan Modal */}
      <AnimatePresence>
        {isScanning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center p-6"
          >
            {/* Live Camera Feed */}
            {!cameraError ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-6 text-center h-full text-slate-400 bg-slate-950 w-full">
                <span className="text-xs mb-2">Acceso a cámara simulado (permiso no disponible)</span>
                <span className="text-[10px] text-slate-600">Haz clic en el cuadro de escaneo para simular</span>
              </div>
            )}

            {/* Scanning overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-black/60 via-transparent to-black/40 z-10">
              
              <h3 className="text-sm font-extrabold text-slate-100 mb-2 text-center bg-slate-950/80 px-4 py-2 rounded-xl border border-slate-800/80 shadow-lg">
                Buscando Código QR
              </h3>

              {/* Scanning Target frame (Clickable fallback for debug/simulations) */}
              <button 
                onClick={handleSimulateScan}
                className="relative w-48 h-48 border-2 border-dashed border-inacap-blue-light/80 rounded-2xl flex items-center justify-center mt-4 bg-transparent cursor-pointer"
                title="Haga clic aquí para simular escaneo"
              >
                {/* Laser animation */}
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-inacap-blue-light shadow-[0_0_15px_rgba(59,130,246,0.7)] z-25"
                />
                
                {/* Simulated QR icon */}
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="opacity-30 animate-pulse text-slate-100">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                </svg>
              </button>

              <span className="mt-8 text-[11px] font-semibold text-slate-200 bg-slate-950/90 px-4 py-2.5 rounded-full border border-slate-800/80 shadow-xl text-center max-w-xs">
                Apunta al código QR físico de la siguiente zona para avanzar automáticamente
              </span>

              {/* Cancel Button */}
              <button
                onClick={() => setIsScanning(false)}
                className="absolute bottom-10 px-6 py-2.5 rounded-full bg-slate-900/90 hover:bg-slate-850 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all duration-300 active:scale-95 cursor-pointer shadow-lg"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
