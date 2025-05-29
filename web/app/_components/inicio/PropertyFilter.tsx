"use client";
import React from "react";

interface PropertyFilterProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const PropertyFilter = ({
  selectedFilter,
  onFilterChange,
}: PropertyFilterProps) => {
  const filters = [
    { id: "vender", label: "Vender" },
    { id: "alquilar", label: "Alquilar" },
    { id: "comprar", label: "Comprar" },
  ];

  return (
    <div className="w-full radio-buttons-container border-b rounded-main rounded-b-none bg-white-main lg:w-fit px-3 md:px-8 py-4">
      {filters.map((filter) => {
        const isSelected = selectedFilter === filter.id;
        return (
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
            <label htmlFor={filter.id} className="radio-button__label">
              <span className="radio-button__custom" />
              {filter.label}
            </label>
          </div>
        );
      })}
      <style jsx>{`
        .radio-buttons-container {
          display: flex;
          align-items: center;
          gap: 24px;
        }
        .radio-button {
          display: flex;
          position: relative;
          cursor: pointer;
        }
        .radio-button__input {
          position: absolute;
          opacity: 0;
          width: 0;
          height: 0;
        }
        .radio-button__label {
          display: inline-block;
          padding-left: 30px;

          position: relative;
          font-size: 16px;
          color: #252525;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .radio-button__custom {
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
          width: 20px;
          height: 20px;
          border-radius: 50%;
          border: 2px solid #555;
          transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
        }
        .radio-button__input:checked
          + .radio-button__label
          .radio-button__custom {
          transform: translateY(-50%) scale(0.9);
          border: 5px solid #1e3062;
        }
        .radio-button__input:checked + .radio-button__label {
          color: #1e3062;
        }
        .radio-button__label:hover .radio-button__custom {
          transform: translateY(-50%) scale(1.2);
          border-color: #1e3062;
          box-shadow: 0 0 10px #1e306280;
        }
        @media (max-width: 520px) {
          .radio-buttons-container { gap: 5px;}
        }
      `}</style>
    </div>
  );
};

export default PropertyFilter;
