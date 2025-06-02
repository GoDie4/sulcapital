/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState } from "react";
import { IoList } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import CardInmueble, {
  CardInmuebleDesign,
} from "../../../_components/inmuebles/CardInmueble";
import { Propiedad } from "../../../(sistema)/sistema/propiedades/_components/table/ColumnasPropiedades";
import { Pagination } from "../../../(sistema)/_components/interfaces/Pagination";
import { initialFiltros } from "./FiltrosBusqueda";
export const ContenedorBusqueda = ({
  data,
  dataFiltrosActivos,
}: {
  data: any;
  pagination: Pagination;
  dataFiltrosActivos: initialFiltros;
}) => {
  console.log("cont: ", data);
  const [gridOrList, setGridOrList] = useState<CardInmuebleDesign>("grid");
  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <p>
          {dataFiltrosActivos.tipo_propiedad ||
          dataFiltrosActivos.ciudad ||
          dataFiltrosActivos.disponibilidad ? (
            <>
              1 de {data.length} resultados para{" "}
              {/*
        1) Si existe tipo_propiedad, muéstralo primero en negrita:
      */}
              {dataFiltrosActivos.tipo_propiedad && (
                <strong>{dataFiltrosActivos.tipo_propiedad}</strong>
              )}
              {/*
        2) Si no hay tipo_propiedad pero sí ciudad, muéstrala sola en negrita:
      */}
              {!dataFiltrosActivos.tipo_propiedad &&
                dataFiltrosActivos.ciudad && (
                  <strong>{dataFiltrosActivos.ciudad}</strong>
                )}
              {/*
        3) Si no hay ni tipo_propiedad ni ciudad, pero hay disponibilidad:
           muéstrala sola en negrita:
      */}
              {!dataFiltrosActivos.tipo_propiedad &&
                !dataFiltrosActivos.ciudad &&
                dataFiltrosActivos.disponibilidad && (
                  <strong>
                    {dataFiltrosActivos.disponibilidad === "EN_ALQUILER"
                      ? "Alquiler"
                      : dataFiltrosActivos.disponibilidad === "EN_COMPRA"
                      ? "Compra"
                      : dataFiltrosActivos.disponibilidad === "EN_VENTA"
                      ? "Venta"
                      : dataFiltrosActivos.disponibilidad}
                  </strong>
                )}
              {/*
        4) Si existen tipo_propiedad y ciudad juntos, antepón " en " antes de ciudad:
      */}
              {dataFiltrosActivos.tipo_propiedad &&
                dataFiltrosActivos.ciudad && (
                  <>
                    {" en "}
                    <strong>{dataFiltrosActivos.ciudad}</strong>
                  </>
                )}
              {/*
        5) Si al menos uno de tipo_propiedad o ciudad existe, y además hay disponibilidad,
           antepón ", disponibilidad: " antes del valor traducido:
      */}
              {(dataFiltrosActivos.tipo_propiedad ||
                dataFiltrosActivos.ciudad) &&
                dataFiltrosActivos.disponibilidad && (
                  <>
                    {", disponibilidad: "}
                    <strong>
                      {dataFiltrosActivos.disponibilidad === "EN_ALQUILER"
                        ? "Alquiler"
                        : dataFiltrosActivos.disponibilidad === "EN_COMPRA"
                        ? "Compra"
                        : dataFiltrosActivos.disponibilidad === "EN_VENTA"
                        ? "Venta"
                        : dataFiltrosActivos.disponibilidad}
                    </strong>
                  </>
                )}
            </>
          ) : (
            <>1 de {data.length} resultados</>
          )}
        </p>
        <div className="flex gap-2 text-2xl ">
          <button
            type="button"
            onClick={() => {
              setGridOrList("grid");
            }}
            className={`rounded-main  p-2 ${
              gridOrList === "grid"
                ? "bg-secondary-main text-white-main"
                : "text-secondary-main"
            } transition-all duration-200`}
          >
            <IoGridOutline />
          </button>
          <button
            type="button"
            onClick={() => {
              setGridOrList("list");
            }}
            className={`rounded-main  p-2 ${
              gridOrList === "list"
                ? "bg-secondary-main text-white-main"
                : "text-secondary-main"
            } transition-all duration-200`}
          >
            <IoList />
          </button>
        </div>
      </div>
      <div
        className={`w-full grid  ${
          gridOrList === "grid"
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "grid-cols-1"
        }  gap-5`}
      >
        {data.map((inmueble: Propiedad) => (
          <CardInmueble data={inmueble} key={inmueble.id} type={gridOrList} />
        ))}
      </div>
    </>
  );
};
