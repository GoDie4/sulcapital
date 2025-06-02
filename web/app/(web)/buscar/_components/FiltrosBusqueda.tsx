/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useAuth } from "@/assets/context/AuthContext";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { MdSearch } from "react-icons/md";
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

  const [filtrosActivos, setFiltrosActivos] = useState({
    ciudad: "",
    disponibilidad: "",
    tipo_propiedad: "",
  });

  const [search, setSearch] = useState(dataFiltrosInitial.search);
  const [tipoPropiedad, setTipoPropiedad] = useState(
    dataFiltrosInitial.tipo_propiedad
  );
  const [ciudad, setCiudad] = useState(dataFiltrosInitial.ciudad);
  const [disponibilidad, setDisponibilidad] = useState(
    dataFiltrosInitial.disponibilidad
  );
  const router = useRouter();

  const handleBuscar = () => {
    const query = new URLSearchParams();

    if (search) query.append("search", search);
    if (tipoPropiedad) query.append("tipo_propiedad", tipoPropiedad);
    if (ciudad) query.append("ciudad", ciudad);
    if (disponibilidad) query.append("disponibilidad", disponibilidad);

    router.push(`/buscar?${query.toString()}`);
  };

  useEffect(() => {
    handleBuscar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (
      search.length > 2 ||
      search === "" ||
      tipoPropiedad ||
      ciudad ||
      disponibilidad
    ) {
      handleBuscar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, tipoPropiedad, ciudad, disponibilidad]);

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
    <div className="flex bg-white-main flex-col gap-6 rounded-main px-6 py-5 border border-secondary-main/40 items-center">
      {/* Input de texto */}

      <div className="flex flex-wrap w-full gap-2">
        {Object.entries(filtrosActivos).map(([key, value]) => {
          if (!value) return null; // No mostrar si está vacío
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
      <div className="w-full flex-1 h-[60px] relative">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Buscar por:
        </label>
        <div className="w-full relative">
          <MdSearch className="absolute left-3 h-[60px] top-0 transform bottom-0 my-auto text-gray-400 w-5" />
          <input
            type="text"
            placeholder="Buscar por ubicación, tipo de propiedad, características..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 h-[60px] border-2 placeholder:text-sm outline-none border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full"
          />
        </div>
      </div>
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
                selectedName !== "Seleccionar" ? selectedName : "",
            });
          }}
          className="w-full h-[60px] px-4 text-sm border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
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
                selectedName !== "Seleccionar ubicación" ? selectedName : "",
            });
          }}
          className="w-full h-[60px] px-4 text-sm border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
        >
          <option value="">Seleccionar ubicación</option>
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
                selectedName !== "Seleccionar" ? selectedName : "",
            });
          }}
          className="w-full h-[60px] text-sm px-4 border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
        >
          <option value="">Seleccionar</option>
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
          className="flex rounded-main bg-secondary-main justify-center text-white-main text-center py-3 w-full"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
