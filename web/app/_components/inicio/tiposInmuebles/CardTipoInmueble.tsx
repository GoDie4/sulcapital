/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { ReactNode } from "react";
import { TipoPropiedad } from "../../../(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { config } from "@/assets/config/config";

export interface TipoInmueble {
  id: string;
  nombre: string;
  icono: ReactNode;
  imagen: string;
}

export const CardTipoInmueble = ({
  tipoinmueble,
}: {
  tipoinmueble: TipoPropiedad;
}) => {
  return (
    <Link
      href={`/buscar?tipo_propiedad=${tipoinmueble.nombre.toLocaleLowerCase()}`}
      className="relative shadow-main z-10 h-96 group rounded-main overflow-hidden"
    >
      <div className="absolute w-full h-full bg-gradient-to-b from-transparent to-black-main opacity-50 group-hover:opacity-80 left-0 top-0 -z-10 transition-all duration-200"></div>
      <img
        src={`${config.API_IMAGE_URL}${tipoinmueble.imagen}`}
        alt={`${tipoinmueble.nombre} en la selva - SULCAPITAL`}
        title={`${tipoinmueble.nombre} en la selva - SULCAPITAL`}
        loading="lazy"
        className="block w-full -z-20 absolute h-full object-cover scale-110 group-hover:scale-100 transition-all duration-500"
      />
      <div className="absolute py-10 flex flex-col gap-4 items-center justify-center w-full bottom-0 left-0">
        <img
          src={`${config.API_IMAGE_URL}${tipoinmueble.icono}`}
          alt=""
          className="block w-16 h-16 object-contain"
        />
        <p className="text-white-main font-TypographBold">
          {tipoinmueble.nombre}
        </p>
      </div>
    </Link>
  );
};
