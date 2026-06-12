import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#020617",
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
      </body>
    </html>
  );
}
