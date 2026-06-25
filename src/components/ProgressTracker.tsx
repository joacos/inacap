"use client";

import { motion } from "framer-motion";

interface ProgressTrackerProps {
  totalVisited: number;
  total?: number;
}

export default function ProgressTracker({
  totalVisited,
  total = 30,
}: ProgressTrackerProps) {
  const percentage = Math.round((totalVisited / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex items-center gap-2 sm:gap-3 glass rounded-full px-3 sm:px-4 py-1.5 sm:py-2"
      id="progress-tracker"
    >
      {/* Circular progress */}
      <div className="relative w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
          <circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="rgba(100, 116, 139, 0.2)"
            strokeWidth="3"
          />
          <motion.circle
            cx="18"
            cy="18"
            r="15"
            fill="none"
            stroke="url(#progressGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray={`${percentage * 0.942} 100`}
            initial={{ strokeDasharray: "0 100" }}
            animate={{ strokeDasharray: `${percentage * 0.942} 100` }}
            transition={{ duration: 1, ease: "easeOut" }}
          />
          <defs>
            <linearGradient id="progressGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
          </defs>
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-slate-300">
          {percentage}%
        </span>
      </div>

      <div className="text-xs">
        <span className="font-semibold text-slate-200">{totalVisited}</span>
        <span className="text-slate-500"> / {total} hitos</span>
      </div>
    </motion.div>
  );
}
