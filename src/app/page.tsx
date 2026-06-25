import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-dvh px-5 sm:px-6 dot-grid">
      {/* Hero */}
      <div className="text-center mb-12">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/inacap60.png"
            alt="Logo INACAP 60 Años"
            className="h-10 w-auto object-contain"
          />
        </div>

        <p className="text-sm text-slate-400 max-w-xs mx-auto leading-relaxed">
          Exposición interactiva. Escanea un QR o selecciona una zona para
          comenzar tu recorrido.
        </p>
      </div>

      {/* Zone Cards */}
      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 w-full max-w-sm md:max-w-xl">
        <Link
          href="/inacap"
          className="group relative glass-elevated rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          id="zone-link-inacap"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: "var(--glow-blue-intense)" }}
          />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-inacap-blue/20 flex items-center justify-center text-inacap-blue-light flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M3 21V9l9-7 9 7v12a1 1 0 01-1 1H4a1 1 0 01-1-1z" />
                <path d="M9 21V12h6v9" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Zona INACAP</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Historia institucional · 10 hitos
              </p>
            </div>
            <svg className="ml-auto text-slate-600 group-hover:text-inacap-blue-light transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>

        <Link
          href="/construccion"
          className="group relative glass-elevated rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          id="zone-link-construccion"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: "var(--glow-red-intense)" }}
          />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-inacap-red/20 flex items-center justify-center text-inacap-red-light flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="6" width="20" height="16" rx="2" />
                <path d="M12 2v4" />
                <path d="M2 10h20" />
                <path d="M7 14h4" />
                <path d="M7 18h10" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Zona Construcción</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Evolución técnica · 10 hitos
              </p>
            </div>
            <svg className="ml-auto text-slate-600 group-hover:text-inacap-red-light transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>

        <Link
          href="/herramientas"
          className="group relative glass-elevated rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
          id="zone-link-herramientas"
        >
          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
            style={{ boxShadow: "var(--glow-blue-intense)" }}
          />
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-inacap-blue/20 flex items-center justify-center text-inacap-blue-light flex-shrink-0">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
              </svg>
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-100">Zona Herramientas</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Realidad Aumentada · 10 hitos
              </p>
            </div>
            <svg className="ml-auto text-slate-600 group-hover:text-inacap-blue-light transition-colors" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </Link>
      </div>

      {/* Footer */}
      <p className="mt-12 text-[10px] text-slate-600 text-center">
        INACAP · 1966 — 2026 · Exposición Interactiva
      </p>
    </div>
  );
}
