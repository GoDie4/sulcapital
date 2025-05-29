import React from "react";
import { GaleriaInmuebles } from "./_components/GaleriaInmuebles";
import DescripcionInmueble from "./_components/DescripcionInmueble";

export const VistaRapidaInmueble = () => {
  return (
    <div className="w-full space-y-5 a">
      <GaleriaInmuebles />
      <DescripcionInmueble />
    </div>
  );
};
