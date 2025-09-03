/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/assets/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { TipoPropiedad } from "../../../(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { CiudadList } from "../../../(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { disponibilidadPropiedades } from "../../../(sistema)/sistema/propiedades/_components/interfaces/PropiedadesInterfaces";

export interface initialFiltros {
  search: string;
  tipo_propiedad: string;
  ciudad: string;
  disponibilidad: string;
}

export const FiltrosBusqueda = ({
  dataFiltrosInitial,
}: {
  dataFiltrosInitial: initialFiltros;
}) => {
  const { dataCiudades, dataTiposPropiedades } = useAuth();
  const isFirstRender = useRef(true);
  const [filtrosActivos, setFiltrosActivos] = useState({
    ciudad: "",
    disponibilidad: "",
    tipo_propiedad: "",
  });

  const [tipoPropiedad, setTipoPropiedad] = useState(
    dataFiltrosInitial.tipo_propiedad
  );
  const [ciudad, setCiudad] = useState(dataFiltrosInitial.ciudad);
  const [disponibilidad, setDisponibilidad] = useState(
    dataFiltrosInitial.disponibilidad
  );
  const router = useRouter();

  const handleBuscar = () => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams();
    params.set("page", "1");

    if (tipoPropiedad) params.set("tipo_propiedad", tipoPropiedad);
    if (ciudad) params.set("ciudad", ciudad);
    if (disponibilidad) params.set("disponibilidad", disponibilidad);

    router.push(`/buscar?${params.toString()}`);
  };

  useEffect(() => {
    if (tipoPropiedad || ciudad || disponibilidad) {
      handleBuscar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tipoPropiedad, ciudad, disponibilidad]);

  const handleRemoveFiltro = (filtro: keyof typeof filtrosActivos) => {
    setFiltrosActivos((prev) => ({
      ...prev,
      [filtro]: "",
    }));

    // Limpiar el estado específico también
    if (filtro === "ciudad") setCiudad("");
    if (filtro === "disponibilidad") setDisponibilidad("");
    if (filtro === "tipo_propiedad") setTipoPropiedad("");

    // Limpiar también el parámetro en la URL

    //@ts-ignore
    const query = new URLSearchParams(router.query as any);
    query.delete(filtro);
    router.push(`/buscar?${query.toString()}`);
  };
  return (
    <div className="flex bg-white-main flex-col gap-2 md:gap-4 lg:gap-6 rounded-main p-4 md:px-6 md:py-5 border border-secondary-main/40 items-center">
      {/* Input de texto */}
      {Object.values(filtrosActivos).some((val) => val !== "") && (
        <div className="flex flex-wrap w-full gap-2">
          {Object.entries(filtrosActivos).map(([key, value]) => {
            if (!value) return null;
            return (
              <div
                key={key}
                className="flex items-center bg-secondary-main rounded-full px-3 py-1 text-sm"
              >
                <span className="mr-2 capitalize text-white-main">{value}</span>
                <button
                  className="text-white-300 font-bold hover:text-white-main"
                  onClick={() =>
                    handleRemoveFiltro(key as keyof typeof filtrosActivos)
                  }
                >
                  &times;
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Select: Ubicación */}
      <div className="w-full">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Disponibilidad
        </label>
        <select
          value={disponibilidad}
          onChange={(e) => {
            setDisponibilidad(e.target.value);
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = e.target.options[selectedIndex];
            const selectedName = selectedOption.text;
            setFiltrosActivos({
              ...filtrosActivos,
              disponibilidad:
                selectedName !== "Todos" ? selectedName : "",
            });
          }}
          className="w-full h-[50px] md:h-[60px] px-4 text-sm border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
        >
          {disponibilidadPropiedades.map((disponibilidad) => (
            <option value={disponibilidad.value} key={disponibilidad.value}>
              {disponibilidad.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Select: Ubicación */}
      <div className="w-full">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Ubicación
        </label>
        <select
          value={ciudad}
          onChange={(e) => {
            setCiudad(e.target.value);
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = e.target.options[selectedIndex];
            const selectedName = selectedOption.text;
            setFiltrosActivos({
              ...filtrosActivos,
              ciudad:
                selectedName !== "Todas las ubicaciones" ? selectedName : "",
            });
          }}
          className="w-full h-[50px] md:h-[60px] px-4 text-sm border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
        >
          <option value="">Todas las ubicaciones</option>
          {dataCiudades.map((ciudad: CiudadList) => (
            <option value={ciudad.nombre.toLocaleLowerCase()} key={ciudad.id}>
              {ciudad.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Select: Tipo de propiedad */}
      <div className="w-full">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Tipo de propiedad
        </label>
        <select
          value={tipoPropiedad}
          onChange={(e) => {
            setTipoPropiedad(e.target.value);
            const selectedIndex = e.target.selectedIndex;
            const selectedOption = e.target.options[selectedIndex];
            const selectedName = selectedOption.text;
            setFiltrosActivos({
              ...filtrosActivos,
              tipo_propiedad:
                selectedName !== "Todos" ? selectedName : "",
            });
          }}
          className="w-full h-[50px] md:h-[60px] text-sm px-4 border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
        >
          <option value="">Todos</option>
          {dataTiposPropiedades.map((tipo: TipoPropiedad) => (
            <option value={tipo.nombre.toLocaleLowerCase()} key={tipo.id}>
              {tipo.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full">
        <button
          type="button"
          onClick={handleBuscar}
          className="flex rounded-main bg-secondary-main justify-center text-white-main text-sm md:text-base text-center py-2 sm:py-3 w-full"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
