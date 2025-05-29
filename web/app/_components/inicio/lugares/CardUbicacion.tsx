/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

export interface UbicacionProps {
  id: string;
  imagen: string;
  nombre: string;
  descripcion: string;
}

export const CardUbicacion = ({ ubicacion }: { ubicacion: UbicacionProps }) => {
  return (
    <Link href={'/buscar'} className="w-full bg-white-main group hover:bg-secondary-main shadow-main p-2 flex rounded-[1.4rem] overflow-hidden transition-all hover:scale-[1.05] duration-300">
      <div className="w-fit">
        <img
          src={ubicacion.imagen}
          alt={`${ubicacion.nombre} - Sulcapital`}
          title={`${ubicacion.nombre} - Sulcapital`}
          loading="lazy"
          className="w-[120px] h-[120px] rounded-main object-cover"
        />
      </div>
      <div className="flex-1 p-5">
        <p className="text-secondary-main font-bold text-lg mb-2 group-hover:text-white-main">
          {ubicacion.nombre}
        </p>
        <p className="text-sm text-black-900 line-clamp-2 group-hover:text-white-100">
          {ubicacion.descripcion}
        </p>
      </div>
    </Link>
  );
};
