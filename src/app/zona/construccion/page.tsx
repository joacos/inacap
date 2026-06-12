import ZonaClientPage from "@/components/ZonaClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zona Construcción | 60 Años INACAP",
  description: "Descubre la evolución de la construcción en Chile a lo largo de 6 décadas, desde la albañilería artesanal hasta la impresión 3D.",
};

export default function ZonaConstruccionPage() {
  return <ZonaClientPage zona="construccion" />;
}
