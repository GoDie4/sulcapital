/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { GaleriaInmuebles } from "../../../../../_components/inmuebles/_components/GaleriaInmuebles";
import DescripcionInmueble from "../../../../../_components/inmuebles/_components/DescripcionInmueble";
import { VideoInmueble } from "../../../../../_components/inmuebles/_components/VideoInmueble";
import { UbicacionInmueble } from "../../../../../_components/inmuebles/_components/UbicacionInmueble";

export const VerPropiedad = ({ row }: { row: any }) => {
  return (
    <>
      <div className="w-full">
        <GaleriaInmuebles
          descripcionCorta={row.descripcionCorta}
          direccion={row.direccion}
          disponibilidad={row.disponibilidad}
          imagenes={row.imagenes}
          precio={row.precio}
          propiedadId={row.id}
        />
        <DescripcionInmueble descripcion={row.descripcionLarga} />
        <VideoInmueble url={row.video ?? ""} />
        <UbicacionInmueble
          coordenadas={row.coordenadas ?? ""}
          direccion={row.direccion}
        />
      </div>
    </>
  );
};
