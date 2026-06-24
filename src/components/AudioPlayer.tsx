"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

interface AudioPlayerProps {
  audioUrl: string;
  title: string;
  autoPlay?: boolean;
}

function formatTime(seconds: number): string {
  if (!seconds || !isFinite(seconds)) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export default function AudioPlayer({ audioUrl, title, autoPlay = false }: AudioPlayerProps) {
  const {
    isPlaying,
    currentTime,
    duration,
    isLoading,
    isMuted,
    loadTrack,
    togglePlay,
    seek,
    toggleMute,
  } = useAudioPlayer(autoPlay);

  useEffect(() => {
    if (audioUrl) {
      loadTrack(audioUrl);
    }
  }, [audioUrl, loadTrack]);

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 80 }}
        animate={{ y: 0 }}
        exit={{ y: 80 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950 border-t border-slate-800/80 p-4 w-full"
        id="audio-player"
      >
        <div className="flex items-center gap-3 max-w-lg mx-auto w-full">
          {/* Play/Pause button */}
          <button
            onClick={togglePlay}
            disabled={isLoading}
            className={`
              relative flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center
              transition-all duration-300
              ${
                isLoading
                  ? "bg-slate-700 cursor-wait"
                  : "bg-inacap-blue hover:bg-inacap-blue-light glow-blue active:scale-95"
              }
            `}
            id="audio-play-btn"
            aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
          >
            {isLoading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-slate-400 border-t-transparent rounded-full"
              />
            ) : isPlaying ? (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white"
              >
                <rect x="6" y="4" width="4" height="16" rx="1" />
                <rect x="14" y="4" width="4" height="16" rx="1" />
              </svg>
            ) : (
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-white ml-0.5"
              >
                <path d="M8 5.14v14l11-7-11-7z" />
              </svg>
            )}
          </button>

          {/* Track info & progress */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate mb-2">
              {title}
            </p>

            {/* Progress bar */}
            <div className="relative group">
              <div className="h-1.5 bg-slate-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-inacap-blue to-inacap-blue-light rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>
              <input
                type="range"
                min={0}
                max={duration || 0}
                value={currentTime}
                onChange={(e) => seek(Number(e.target.value))}
                className="audio-progress absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                aria-label="Barra de progreso del audio"
              />
            </div>

            {/* Time */}
            <div className="flex justify-between mt-1">
              <span className="text-[10px] font-mono text-slate-500">
                {formatTime(currentTime)}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {formatTime(duration)}
              </span>
            </div>
          </div>

          {/* Mute button */}
          <button
            onClick={toggleMute}
            className="flex-shrink-0 w-9 h-9 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-200 flex items-center justify-center transition-all active:scale-95 cursor-pointer"
            aria-label={isMuted ? "Activar sonido" : "Mutear sonido"}
            id="audio-mute-btn"
          >
            {isMuted ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              </svg>
            )}
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
