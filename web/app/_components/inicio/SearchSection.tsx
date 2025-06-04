"use client";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import PropertyFilter from "./PropertyFilter";
import { ContentMain } from "../estructura/ContentMain";
import { TipoPropiedad } from "../../(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { CiudadList } from "../../(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { useRouter } from "next/navigation";

const SearchSection = ({
  tipoPropiedades,
  ciudades,
}: {
  tipoPropiedades: TipoPropiedad[];
  ciudades: CiudadList[];
}) => {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("EN_VENTA");
  const [propertyType, setPropertyType] = useState("");
  const [locacion, setLocacion] = useState("");

  const handleSearch = () => {
    // Construimos la query
    const query: Record<string, string> = {};

    if (searchQuery) query.search = searchQuery;
    if (propertyType) query.tipoPropiedad = propertyType;
    if (locacion) query.ciudad = locacion;
    if (selectedFilter) query.disponibilidad = selectedFilter;

    // Creamos el string de query
    const searchParams = new URLSearchParams(query);

    // Navegamos a /buscar con los query params
    router.push(`/buscar?${searchParams.toString()}`);
  };
  return (
    <section className="w-full pb-2 md:py-8 lg:py-12">
      <ContentMain>
        <div>
          <PropertyFilter
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <div className="flex bg-white-main flex-col md:flex-row gap-4 rounded-tr-none md:rounded-tr-main rounded-tl-none rounded-main px-3 md:px-4 py-4 border border-gray-100 items-center">
            {/* Input de texto */}
            <div className="w-full flex-1 h-[60px] relative">
              <MdSearch className="absolute left-3 h-[60px] top-0 transform bottom-0 my-auto text-gray-400 w-5" />
              <input
                type="text"
                placeholder="Buscar tu propiedad"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-[60px] border-2 outline-none border-gray-200 rounded-xl focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            {/* Select: Tipo de propiedad */}
            <div className="w-full lg:w-fit h-[60px]">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full lg:w-fit h-full px-4 border-2 border-gray-200 rounded-xl focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
              >
                <option value="">Tipo de propiedad</option>
                {tipoPropiedades.map((tipo: TipoPropiedad) => (
                  <option value={tipo.id} key={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Select: Ubicación */}
            <div className="w-full lg:w-fit h-[60px]">
              <select
                value={locacion}
                onChange={(e) => setLocacion(e.target.value)}
                className="w-full lg:w-fit h-full px-4 border-2 border-gray-200 rounded-xl focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
              >
                <option value="">Ubicación</option>
                {ciudades.map((ciudad: CiudadList) => (
                  <option value={ciudad.id} key={ciudad.id}>
                    {ciudad.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Botón de búsqueda */}
            <button
              type="button"
              onClick={handleSearch}
              className="py-2 px-6 w-full lg:w-fit justify-center flex items-center gap-2 text-white-main font-TypographBold bg-primary-main font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <MdSearch className="h-5 w-5" />
              Buscar
            </button>
          </div>
        </div>
      </ContentMain>
    </section>
  );
};

export default SearchSection;
