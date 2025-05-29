"use client";
import { sampleProperties } from "@/assets/data/DataGeneral";
import React, { useState } from "react";
import { IoList } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import CardInmueble, {
  CardInmuebleDesign,
  CardInmuebleProps,
} from "../../../_components/inmuebles/CardInmueble";
export const ContenedorBusqueda = () => {
  const [gridOrList, setGridOrList] = useState<CardInmuebleDesign>("grid");
  return (
    <>
      <div className="w-full flex justify-between items-center mb-4">
        <p>
          1 de 300 resultados para <strong>Satipo</strong>
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
          gridOrList === "grid" ? "md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
        }  gap-5`}
      >
        {sampleProperties.map((inmueble: CardInmuebleProps) => (
          <CardInmueble data={inmueble} key={inmueble.id} type={gridOrList} />
        ))}
        {sampleProperties.map((inmueble: CardInmuebleProps) => (
          <CardInmueble data={inmueble} key={inmueble.id} type={gridOrList} />
        ))}
      </div>
    </>
  );
};
