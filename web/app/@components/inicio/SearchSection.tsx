"use client";
import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import PropertyFilter from "./PropertyFilter";
import { ContentMain } from "../estructura/ContentMain";

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("vender");
  const [propertyType, setPropertyType] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = () => {
    console.log("Búsqueda realizada:", {
      query: searchQuery,
      filter: selectedFilter,
    });
    // Aquí iría la lógica de búsqueda
  };

  return (
    <section className="w-full  py-12">
      <ContentMain>
        <div className="">
          <PropertyFilter
            selectedFilter={selectedFilter}
            onFilterChange={setSelectedFilter}
          />

          <div className="flex bg-white-main flex-col md:flex-row gap-4 rounded-tr-none md:rounded-tr-main rounded-tl-none rounded-main px-8 py-5 border border-gray-100 items-center">
            {/* Input de texto */}
            <div className="w-full  flex-1 h-[60px] relative">
              <MdSearch className="absolute left-3 h-[60px] top-0 transform bottom-0 my-auto text-gray-400 w-5" />
              <input
                type="text"
                placeholder="Buscar por ubicación, tipo de propiedad, características..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 h-[60px] border-2 outline-none border-gray-200 rounded-xl focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full"
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            {/* Select: Tipo de propiedad */}
            <div className="w-full lg:w-fit h-[60px]">
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full  lg:w-fit h-full px-4 border-2 border-gray-200 rounded-xl focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
              >
                <option value="">Tipo de propiedad</option>
                <option value="casa">Casa</option>
                <option value="apartamento">Apartamento</option>
                <option value="terreno">Terreno</option>
                {/* añade más según necesites */}
              </select>
            </div>

            {/* Select: Ubicación */}
            <div className="w-full lg:w-fit h-[60px]">
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full  lg:w-fit h-full px-4 border-2 border-gray-200 rounded-xl focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main"
              >
                <option value="">Ubicación</option>
                <option value="lima">Lima</option>
                <option value="cusco">Cusco</option>
                <option value="arequipa">Arequipa</option>
                {/* añade más según necesites */}
              </select>
            </div>

            {/* Botón de búsqueda */}
            <button
              type="button"
              onClick={handleSearch}
              className="py-2 px-6 w-full lg:w-fit justify-center  flex items-center gap-2 text-white-main font-TypographBold bg-primary-main font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              <MdSearch className=" h-5 w-5" />
              Buscar
            </button>
          </div>
        </div>
      </ContentMain>
    </section>
  );
};

export default SearchSection;
