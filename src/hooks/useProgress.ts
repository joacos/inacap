"use client";

import { useState, useEffect, useCallback } from "react";
import type { ZonaKey } from "@/data/exposicion";

const STORAGE_KEY = "inacap60_progress";

function getStoredProgress(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return new Set(JSON.parse(raw) as string[]);
    }
  } catch {
    /* ignore corrupt storage */
  }
  return new Set();
}

function saveProgress(set: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...set]));
  } catch {
    /* storage full or unavailable */
  }
}

export function useProgress() {
  const [visited, setVisited] = useState<Set<string>>(new Set());

  useEffect(() => {
    setVisited(getStoredProgress());
  }, []);

  const markVisited = useCallback((zona: ZonaKey, hitoId: number) => {
    setVisited((prev) => {
      const next = new Set(prev);
      next.add(`${zona}-${hitoId}`);
      saveProgress(next);
      return next;
    });
  }, []);

  const isVisited = useCallback(
    (zona: ZonaKey, hitoId: number) => {
      return visited.has(`${zona}-${hitoId}`);
    },
    [visited]
  );

  const resetProgress = useCallback(() => {
    setVisited(new Set());
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const totalVisited = visited.size;

  return { markVisited, isVisited, totalVisited, resetProgress };
}
