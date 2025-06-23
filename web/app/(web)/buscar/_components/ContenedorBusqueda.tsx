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
import { useAuth } from "@/assets/context/AuthContext";
import { FormContactoInmueble } from "../../../_components/inmuebles/_components/FormContactoInmueble";
import { ResultadosText } from "./ResultadosText";
import { Paginacion } from "../../../_components/estructura/Paginacion";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
export const ContenedorBusqueda = ({
  data,
  pagination,
  dataFiltrosActivos,
}: {
  data: any;
  pagination: Pagination;
  dataFiltrosActivos: initialFiltros;
}) => {
  const { setModalContent, openModal } = useAuth();
  const [gridOrList, setGridOrList] = useState<CardInmuebleDesign>("grid");
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <ResultadosText data={data} dataFiltrosActivos={dataFiltrosActivos} />
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
        className={`w-full min-h-[300px] relative grid  ${
          gridOrList === "grid" ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }  gap-2 md:gap-5`}
      >
        {data.length === 0 && (
          <p className="min-h-[300px] text-center flex items-center flex-col justify-center gap-2 absolute left-0 right-0 top-0 m-auto">
            No se encontraron resultados para esta búsqueda:{" "}
            <button
              type="button"
              onClick={() => {
                setModalContent(<FormContactoInmueble idPropiedad="" />);
                openModal();
              }}
              className="text-red-500"
            >
              {" "}
              Avísame cuando haya una propiedad que coincida con mi búsqueda
            </button>
          </p>
        )}
        {data.map((inmueble: Propiedad) => (
          <CardInmueble data={inmueble} key={inmueble.id} type={gridOrList} />
        ))}
      </div>
      <div className="w-full flex items-center flex-col lg:flex-row mt-5 lg:mt-0 justify-between">
        <div className="w-fit flex items-center gap-2">
          <select
            id="limit"
            className="py-2 px-3 outline-none text-sm border text-black-main bg-white-main rounded-main"
            value={searchParams.get("limit") || pagination.limit}
            onChange={(e) => {
              const params = new URLSearchParams(searchParams.toString());
              params.set("limit", e.target.value);
              params.set("page", "1");
              router.push(`${pathname}?${params.toString()}`);
            }}
          >
            {[10, 20, 50, 100].map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-sm text-black-800">registros por página</p>
        </div>
        <Paginacion />
      </div>
    </>
  );
};
