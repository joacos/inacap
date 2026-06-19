import ZonaHerramientasClientPage from "@/components/ZonaHerramientasClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zona Herramientas | 60 Años INACAP",
  description: "Explora la transformación de las herramientas de construcción en Realidad Aumentada, desde el martillo hasta los exoesqueletos.",
};

export default function ZonaHerramientasPage() {
  return <ZonaHerramientasClientPage />;
}
