"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

export const TextareaForm = ({
  label,
  placeholder,
  name,
  onBlur,
  onChange,
  value,
  className,
  disabled,
  rows = 5,
}: {
  label: string;
  placeholder?: string;
  name: string;
  onBlur?: any;
  onChange?: any;
  value: string;
  className?: string;
  disabled?: boolean;
  rows?: number;
}) => {
  return (
    <>
      <label htmlFor={name} className="flex gap-1 text-sm text-black-900">
        {label}
      </label>
      <div className="relative w-full mt-1">
        <textarea
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          disabled={disabled}
          rows={rows} // Usa la prop 'rows' aquí
          className={`border w-full max-h-[180px] placeholder:text-sm focus:border-secondary-main outline-none rounded-lg py-2 px-3 resize-y ${
            className ?? ""
          } ${disabled ? "bg-white-100" : ""}`}
          placeholder={placeholder}
        ></textarea>
      </div>
    </>
  );
};
