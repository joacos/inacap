"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import type { ZonaKey } from "@/data/exposicion";

const zones: { key: ZonaKey; label: string; icon: React.ReactNode }[] = [
  {
    key: "inacap",
    label: "INACAP",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
  },
  {
    key: "construccion",
    label: "Construcción",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="16" rx="2" />
        <path d="M12 2v4" />
        <path d="M2 10h20" />
        <path d="M7 14h4" />
        <path d="M7 18h10" />
      </svg>
    ),
  },
  {
    key: "herramientas",
    label: "Herramientas",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
  },
];

export default function BottomNav() {
  const pathname = usePathname();

  const activeZona = zones.find((z) => pathname?.includes(z.key));

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 glass"
      id="bottom-nav"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto h-16">
        {zones.map((zone) => {
          const isActive = activeZona?.key === zone.key;

          return (
            <Link
              key={zone.key}
              href={`/zona/${zone.key}`}
              className={`
                relative flex flex-col items-center justify-center gap-1 px-4 py-2
                transition-colors duration-300
                ${isActive ? "text-slate-50" : "text-slate-500 hover:text-slate-300"}
              `}
              id={`nav-${zone.key}`}
            >
              {isActive && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute -top-px left-2 right-2 h-0.5 rounded-full bg-inacap-blue-light"
                  transition={{ type: "spring", damping: 25, stiffness: 400 }}
                />
              )}
              <span className={isActive ? "text-inacap-blue-light" : ""}>
                {zone.icon}
              </span>
              <span className="text-[10px] font-medium">{zone.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
