"use client";

import { useState, useRef, useEffect, useCallback } from "react";

export function useAudioPlayer(autoPlay: boolean = false) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    const storedMute = typeof window !== "undefined" && localStorage.getItem("inacap60_audio_muted") === "true";
    audio.muted = storedMute;
    setIsMuted(storedMute);
    audioRef.current = audio;

    const onTimeUpdate = () => {
      const time = audio.currentTime;
      setCurrentTime(time);
      window.dispatchEvent(
        new CustomEvent("audio-time-update", {
          detail: { currentTime: time, url: audio.src },
        })
      );
    };
    const onLoadedMetadata = () => {
      setDuration(audio.duration);
      setIsLoading(false);
    };
    const onEnded = () => setIsPlaying(false);
    const onWaiting = () => setIsLoading(true);
    const onCanPlay = () => setIsLoading(false);

    const handleSeekTo = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (typeof customEvent.detail.time === "number") {
        audio.currentTime = customEvent.detail.time;
        setCurrentTime(customEvent.detail.time);
      }
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("waiting", onWaiting);
    audio.addEventListener("canplay", onCanPlay);
    window.addEventListener("audio-seek-to", handleSeekTo);

    return () => {
      window.removeEventListener("audio-seek-to", handleSeekTo);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("waiting", onWaiting);
      audio.removeEventListener("canplay", onCanPlay);
      audio.pause();
      audio.src = "";
    };
  }, []);

  const loadTrack = useCallback((url: string) => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrentTime(0);
    setDuration(0);
    setIsLoading(true);
    setCurrentUrl(url);

    audio.src = url;
    const storedMute = typeof window !== "undefined" && localStorage.getItem("inacap60_audio_muted") === "true";
    audio.muted = storedMute;
    setIsMuted(storedMute);
    audio.load();

    if (autoPlay) {
      // Small timeout ensures the browser has registered user interaction from the swipe/click
      setTimeout(() => {
        audio.play().then(() => setIsPlaying(true)).catch(() => {
          // Autoplay blocked by browser policy
        });
      }, 50);
    }
  }, [autoPlay]);

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || !audio.src) return;
    try {
      await audio.play();
      setIsPlaying(true);
    } catch {
      /* autoplay blocked */
    }
  }, []);

  const pause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    setIsPlaying(false);
  }, []);

  const seek = useCallback((time: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = time;
    setCurrentTime(time);
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      if (typeof window !== "undefined") {
        localStorage.setItem("inacap60_audio_muted", String(next));
      }
      if (audioRef.current) {
        audioRef.current.muted = next;
      }
      return next;
    });
  }, []);

  return {
    isPlaying,
    currentTime,
    duration,
    isLoading,
    currentUrl,
    isMuted,
    loadTrack,
    play,
    pause,
    seek,
    togglePlay,
    toggleMute,
  };
}
