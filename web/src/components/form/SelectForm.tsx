/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export interface SelectOption {
  id: string | number;
  [key: string]: any;
}

export interface SelectFormProps {
  label: string;
  name: string;
  onBlur?: (event: React.FocusEvent<HTMLSelectElement>) => void;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  value: string | number;
  className?: string;
  disabled?: boolean;
  options: SelectOption[];
  placeholder?: string;
  load: boolean;
}

export const SelectForm = ({
  label,
  name,
  onBlur,
  onChange,
  value,
  className,
  disabled,
  options,
  placeholder = "Seleccionar una opción",
  load,
}: SelectFormProps) => {
  return (
    <>
      <label htmlFor={name} className="flex gap-1 text-sm text-black-900">
        {label}
      </label>
      <div className="relative w-full mt-1">
        {load ? (
          <>
            <div className="w-full h-[46.78px]  rounded-main p-2 bg-gray-200 animate-pulse"></div>
          </>
        ) : (
          <select
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            className={` border w-full placeholder:text-sm focus:border-secondary-main outline-none rounded-main p-2 ${
              className ?? ""
            } ${disabled ? "bg-white-100" : ""}`}
            disabled={disabled}
          >
            <option value="">{placeholder}</option>
            {options.map((option: SelectOption) => (
              <option value={option.id} key={option.id}>
                {option.nombre ?? option.titulo}
              </option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};
