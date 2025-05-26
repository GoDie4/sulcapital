"use client";
import React, { useState } from "react";
import { BsChevronDown } from "react-icons/bs";

interface NavItemProps {
  title: string;
  propertyTypes: string[];
  locations: string[];
}

export const NavItem = ({ title, propertyTypes, locations }: NavItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-1 px-4 py-2  hover:bg-primary-main text-white-main rounded-full transition-colors duration-200">
        {title}
        <BsChevronDown
          size={16}
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-white-main rounded-main shadow-lg border border-gray-200 p-4 min-w-[400px] z-50">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                Tipos de Inmuebles
              </h3>
              <ul className="space-y-2">
                {propertyTypes.map((type, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block text-gray-600 hover:text-primary-main hover:bg-primary-50 px-3 py-1 rounded-full transition-colors duration-150"
                    >
                      {type}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 mb-3 text-sm uppercase tracking-wide">
                Ubicaciones
              </h3>
              <ul className="space-y-2">
                {locations.map((location, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="block text-gray-600 hover:text-primary-main hover:bg-primary-50 px-3 py-1 rounded-main transition-colors duration-150"
                    >
                      {location}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};
