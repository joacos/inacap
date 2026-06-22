"use client";

import { useState } from "react";
import Link from "next/link";

const FAMILIAS_HERRAMIENTAS = [
  { id: 1, nombre: "Familia del Desbaste y Carpintería", detalle: "Los Cepillos" },
  { id: 2, nombre: "Familia del Perforado", detalle: "Los Taladros" },
  { id: 3, nombre: "Familia del Corte", detalle: "Los Serruchos y Sierras" },
  { id: 4, nombre: "Familia de la Nivelación y Topografía", detalle: "Los Plomos y Niveles" },
  { id: 5, nombre: "Familia de la Unión y Estructura", detalle: "Las Soldadoras" },
];

export default function QRGeneratorPage() {
  const [domain, setDomain] = useState("https://inacap60.todovirtual.cl");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 md:p-12 dot-grid">
      {/* Page Header (Hidden on print) */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10 print:hidden z-10">
        <div>
          <div className="flex items-center gap-3">
            <Link href="/herramientas" className="text-slate-400 hover:text-slate-100 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 className="text-2xl font-black tracking-tight text-slate-50">
              Generador de Códigos QR
            </h1>
          </div>
          <p className="text-xs text-slate-450 mt-1 max-w-lg">
            Genera, configura e imprime los códigos QR correspondientes a las estaciones físicas de la Zona de Herramientas.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          {/* Domain configuration input */}
          <div className="flex flex-col gap-1 flex-1">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Dominio de Destino
            </label>
            <input
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-inacap-blue w-64 shadow-inner"
              placeholder="https://inacap60.todovirtual.cl"
            />
          </div>

          <button
            onClick={handlePrint}
            className="self-end px-5 py-2.5 rounded-xl bg-inacap-blue hover:bg-inacap-blue-light text-slate-50 text-xs font-bold transition-all duration-300 active:scale-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer border border-inacap-blue-light/15"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 6 2 18 2 18 9" />
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
              <rect x="6" y="14" width="12" height="8" />
            </svg>
            Imprimir QRs
          </button>
        </div>
      </div>

      {/* Grid of QR Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl print:grid-cols-2 print:gap-6 print:max-w-none print:w-full z-10">
        {FAMILIAS_HERRAMIENTAS.map((fam) => {
          const scanUrl = `${domain}/herramientas?scan=${fam.id}`;
          const qrCodeSrc = `https://quickchart.io/qr?text=${encodeURIComponent(
            scanUrl
          )}&dotStyle=rounded&finderStyle=rounded&ecLevel=H&dark=1e40af&size=250`;

          return (
            <div
              key={fam.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-3xl p-6 md:p-8 flex flex-col items-center justify-center text-center shadow-lg relative overflow-hidden print:bg-white print:border-2 print:border-slate-200 print:text-slate-900 print:shadow-none print:rounded-3xl print:page-break-inside-avoid print:p-6"
            >
              {/* Institution Branding Red Top Bar */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#dc2626]" />

              {/* Institution Logo Header */}
              <img
                src="/inacap60.png"
                alt="Logo INACAP"
                className="h-5 w-auto object-contain mb-3 opacity-90 print:mix-blend-multiply"
              />

              {/* Station Branded Badge */}
              <span className="bg-inacap-blue/15 border border-inacap-blue-light/30 text-inacap-blue-light text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full mb-3 print:bg-[#1e40af]/10 print:border-[#1e40af]/30 print:text-[#1e40af]">
                Estación {fam.id}
              </span>

              {/* Title & Detail */}
              <h3 className="text-sm font-extrabold text-slate-150 mb-1 max-w-[280px] print:text-slate-950 leading-snug">
                {fam.nombre}
              </h3>
              <p className="text-[11px] text-slate-400 font-semibold mb-5 print:text-slate-600">
                {fam.detalle}
              </p>

              {/* QR Image Wrapper with Inacap blue accent borders */}
              <div className="relative w-44 h-44 bg-slate-950 border border-slate-800/60 rounded-2xl flex items-center justify-center p-4 shadow-inner transition-transform hover:scale-[1.02] duration-300 print:bg-white print:border-2 print:border-slate-200 print:shadow-none">
                <img
                  src={qrCodeSrc}
                  alt={`QR Estación ${fam.id}`}
                  className="w-full h-full object-contain print:mix-blend-multiply"
                />
                {/* Logo overlay in center */}
                <div className="absolute w-9 h-9 bg-white rounded-lg p-1.5 flex items-center justify-center shadow-md border border-slate-100">
                  <img
                    src="/logo_inacap.png"
                    alt="Logo INACAP"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

              {/* URL String */}
              <span className="mt-5 text-[8px] font-mono text-slate-500 max-w-[260px] truncate print:text-slate-450 block">
                {scanUrl}
              </span>

              {/* Instruction */}
              <span className="mt-3 text-[10px] font-black text-inacap-blue-light uppercase tracking-wider print:text-[#1e40af]">
                Escanea para proyectar en AR
              </span>
              
              <span className="mt-1 text-[8px] text-slate-600 print:text-slate-400">
                INACAP · Exposición 60 Años
              </span>
            </div>
          );
        })}
      </div>

      {/* Printing Styles Override */}
      <style jsx global>{`
        @media print {
          body {
            background-color: white !important;
            color: black !important;
            font-size: 12pt;
          }
          .dot-grid {
            background-image: none !important;
          }
          /* Prevent layout issues on paper */
          @page {
            margin: 1.5cm;
          }
        }
      `}</style>
    </div>
  );
}
