import ZonaClientPage from "@/components/ZonaClientPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zona INACAP | 60 Años",
  description: "Recorre los 10 hitos más importantes en la historia de INACAP, desde su fundación en 1966 hasta el presente.",
};

export default function ZonaInacapPage() {
  return <ZonaClientPage zona="inacap" />;
}
