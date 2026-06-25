import type { Metadata, Viewport } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "../fonts/Inter-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Inter-Medium.woff2", weight: "500", style: "normal" },
    { path: "../fonts/Inter-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../fonts/Inter-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "60 Años INACAP | Exposición Interactiva",
  description:
    "Recorre 6 décadas de historia, innovación y formación técnica. Explora hitos, escucha audio-guías y visualiza herramientas en Realidad Aumentada.",
  metadataBase: new URL("https://inacap60.todovirtual.cl"),
  openGraph: {
    title: "60 Años INACAP | Exposición Interactiva",
    description:
      "Recorre 6 décadas de historia, innovación y formación técnica.",
    type: "website",
    locale: "es_CL",
    siteName: "INACAP 60 Años",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} h-full`}>
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        {children}
        <Script
          src="https://ajax.googleapis.com/ajax/libs/model-viewer/3.5.0/model-viewer.min.js"
          type="module"
          strategy="lazyOnload"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/jsqr@1.4.0/dist/jsQR.min.js"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
