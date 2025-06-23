"use client";
import { useAuth } from "@/assets/context/AuthContext";
import { useRouter } from "next/navigation";
import React from "react";
import { AgregarPropiedad } from "../../(sistema)/sistema/propiedades/_components/form/AgregarPropiedad";

interface PropertyFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const PropertyFilter = ({
  selectedFilter,
  onFilterChange,
}: PropertyFilterProps) => {
  const { authUser, setModalContent, openModal } = useAuth();
  const filters = [
    { id: "EN_VENTA", label: "Vender" },
    { id: "EN_COMPRA", label: "Comprar" },
    { id: "EN_ALQUILER", label: "Alquilar" },
  ];

  const router = useRouter();

  const handleClick = () => {
    if (!authUser) {
      const currentPath = "https://sulcapital.pe/sistema/propiedades";
      router.push(
        `/iniciar-sesion?callbackUrl=${encodeURIComponent(currentPath)}`
      );
    } else {
      setModalContent(
        <AgregarPropiedad
          pagination={{ total: 0, totalPages: 0, limit: 1, page: 1 }}
          totalItems={0}
        />
      );
      openModal();
    }
  };

  return (
    <div
      key={"PropertyFilters"}
      className="w-full radio-buttons-container border-b rounded-main rounded-b-none bg-white-main lg:w-fit px-3 md:px-4 py-2"
    >
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.id;
        return (
          <>
            {filter.id === "EN_VENTA" ? (
              <button
                onClick={handleClick}
                type="button"
                className="flex w-fit bg-secondary-main rounded-full text-white-main px-3 sm:px-5 py-2 text-xs sm:text-sm"
              >
                Vender
              </button>
            ) : (
              <div key={filter.id} className="w-full radio-button items-center">
                <input
                  type="radio"
                  name="propertyFilter"
                  id={filter.id}
                  value={filter.id}
                  checked={isSelected}
                  onChange={(e) => onFilterChange(e.target.value)}
                  className="radio-button__input"
                />
                <label
                  htmlFor={filter.id}
                  className={`radio-button__label ${
                    isSelected ? "font-bold" : ""
                  }`}
                >
                  <span className="radio-button__custom" />
                  {filter.label}
                </label>
              </div>
            )}
          </>
        );
      })}
    </div>
  );
};

export default PropertyFilter;
