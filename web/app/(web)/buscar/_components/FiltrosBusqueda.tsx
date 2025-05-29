import React from "react";
import { MdSearch } from "react-icons/md";

export const FiltrosBusqueda = () => {
  return (
    <div className="flex bg-white-main flex-col  gap-6   rounded-main px-6 py-5 border border-secondary-main/40 items-center">
      {/* Input de texto */}
      <div className="w-full  flex-1 h-[60px] relative">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Buscar por:
        </label>
        <div className="w-full relative">
          <MdSearch className="absolute left-3 h-[60px] top-0 transform bottom-0 my-auto text-gray-400 w-5" />
          <input
            type="text"
            placeholder="Buscar por ubicación, tipo de propiedad, características..."
            className="pl-9 h-[60px] border-2 placeholder:text-sm outline-none border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 w-full"
          />
        </div>
      </div>

      {/* Select: Tipo de propiedad */}
      <div className="w-full  ">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Tipo de propiedad
        </label>
        <select className="w-full h-[60px] text-sm px-4 border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main">
          <option value="">Seleccionar</option>
          <option value="casa">Casa</option>
          <option value="apartamento">Apartamento</option>
          <option value="terreno">Terreno</option>
          {/* añade más según necesites */}
        </select>
      </div>

      {/* Select: Ubicación */}
      <div className="w-full ">
        <label htmlFor="" className="text-sm text-secondary-main mb-2 block">
          Ubicación
        </label>
        <select className="w-full h-[60px] px-4 text-sm  border-2 border-gray-200 rounded-main focus:border-secondary-main focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-white-main">
          <option value="">Seleccionar ubicación</option>
          <option value="lima">Lima</option>
          <option value="cusco">Cusco</option>
          <option value="arequipa">Arequipa</option>
          {/* añade más según necesites */}
        </select>
      </div>

      <div className="w-full">
        <button
          type="button"
          className="flex rounded-main bg-secondary-main justify-center text-white-main text-center py-3 w-full"
        >
          Buscar
        </button>
      </div>
    </div>
  );
};
