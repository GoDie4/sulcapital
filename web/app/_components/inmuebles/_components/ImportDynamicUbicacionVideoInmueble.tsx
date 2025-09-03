"use client";
import dynamic from "next/dynamic";

const DynamicVideoInmueble = dynamic(
  () => import("../../../_components/inmuebles/_components/VideoInmueble"),
  {
    ssr: false,
    loading: () => (
      <div className="h-48 bg-gray-100 animate-pulse rounded-main">
        Cargando video...
      </div>
    ),
  }
);

const DynamicUbicacionInmueble = dynamic(
  () => import("../../../_components/inmuebles/_components/UbicacionInmueble"),
  {
    ssr: false,
    loading: () => (
      <div className="h-64 bg-gray-100 animate-pulse rounded-main">
        Cargando mapa...
      </div>
    ),
  }
);

export default function ClientMediaInmueble({
  video,
  coordenadas,
  direccion,
}: {
  video?: string;
  coordenadas?: string;
  direccion?: string;
}) {
  return (
    <>
      <DynamicVideoInmueble url={video ?? ""} />
      <DynamicUbicacionInmueble
        coordenadas={coordenadas ?? ""}
        direccion={direccion ?? ""}
      />
    </>
  );
}
