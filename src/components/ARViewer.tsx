"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ARViewerProps {
  src: string;
  alt: string;
  poster?: string;
}

type ARState = "idle" | "scanning" | "active";

export default function ARViewer({ src, alt, poster }: ARViewerProps) {
  const [state, setState] = useState<ARState>("idle");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState(false);

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
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError(true);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    if (state === "scanning") {
      startCamera();
      const timer = setTimeout(() => {
        playBeep();
        setState("active");
      }, 2500);

      return () => {
        clearTimeout(timer);
      };
    } else if (state === "idle") {
      stopCamera();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // Sync camera stream video element when going from scanning to active
  useEffect(() => {
    if (state === "active" && stream && videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [state, stream]);

  // Clean up camera on unmount
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [stream]);

  const playBeep = () => {
    try {
      if (typeof window !== "undefined" && localStorage.getItem("inacap60_audio_muted") === "true") {
        return;
      }
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const audioCtx = new AudioCtx();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(880, audioCtx.currentTime); // High pitch beep
      gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.15);
    } catch {}
  };

  return (
    <div className="relative w-full aspect-square max-w-sm mx-auto rounded-3xl overflow-hidden glass-elevated border border-slate-700/30 flex flex-col items-center justify-center min-h-[300px]">
      <AnimatePresence mode="wait">
        {state === "idle" && (
          <motion.div
            key="idle"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center p-8 text-center h-full w-full"
          >
            <div className="w-16 h-16 rounded-2xl bg-inacap-blue/15 border border-inacap-blue/30 text-inacap-blue-light flex items-center justify-center mb-5 glow-blue">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <rect x="7" y="7" width="3" height="3" />
                <rect x="14" y="7" width="3" height="3" />
                <rect x="7" y="14" width="3" height="3" />
                <path d="M14 14h3v3h-3z" />
              </svg>
            </div>
            
            <h3 className="text-sm font-bold text-slate-200 mb-2">
              Realidad Aumentada 3D
            </h3>
            
            <p className="text-xs text-slate-500 mb-6 max-w-[240px] leading-relaxed">
              Escanea el código QR del hito físico para activar la proyección del modelo 3D.
            </p>

            <button
              onClick={() => setState("scanning")}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-bold transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] glow-blue"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                <circle cx="12" cy="13" r="4" />
              </svg>
              Abrir Cámara QR
            </button>
          </motion.div>
        )}

        {state === "scanning" && (
          <motion.div
            key="scanning"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full bg-black min-h-[300px] flex items-center justify-center"
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
              <div className="flex flex-col items-center justify-center p-6 text-center h-full text-slate-400">
                <span className="text-xs">Acceso a cámara simulado (permiso no disponible)</span>
              </div>
            )}

            {/* Scanning overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-t from-black/50 via-transparent to-black/35">
              {/* Scan target frame */}
              <div className="relative w-44 h-44 border-2 border-dashed border-inacap-blue-light/70 rounded-2xl flex items-center justify-center">
                {/* Laser animation */}
                <motion.div
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 right-0 h-0.5 bg-inacap-blue-light glow-blue z-25"
                />
                
                {/* Simulated QR logo in center */}
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-inacap-blue-light/40 animate-pulse">
                  <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
                </svg>
              </div>

              <span className="mt-6 text-[10px] font-medium text-slate-200 bg-slate-950/90 px-3 py-1.5 rounded-full border border-slate-800 shadow-xl">
                Apunta al código QR del hito...
              </span>

              <button
                onClick={() => setState("idle")}
                className="absolute bottom-4 px-4 py-2 rounded-full bg-slate-900/95 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-[10px] transition-all"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}

        {state === "active" && (
          <motion.div
            key="active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full h-full bg-slate-950 min-h-[300px] flex items-center justify-center"
          >
            {/* Camera feed in background */}
            {!cameraError && (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
              />
            )}

            {/* Model-viewer with transparent background layered on top */}
            <model-viewer
              src={src}
              alt={alt}
              poster={poster}
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
                className="
                  absolute bottom-4 left-1/2 -translate-x-1/2 z-20
                  bg-inacap-blue hover:bg-inacap-blue-light
                  text-white font-semibold text-[10px]
                  rounded-full px-4 py-2
                  glow-blue transition-all duration-300
                  active:scale-95 flex items-center gap-1.5
                "
                id="ar-button"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
                Proyectar en AR 🚀
              </button>
            </model-viewer>

            {/* Reset / Cerrar Cámara button */}
            <button
              onClick={() => setState("idle")}
              className="absolute top-3 right-3 z-30 w-7 h-7 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all active:scale-95 shadow-lg"
              title="Cerrar cámara"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
