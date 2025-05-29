"use client";
import React from "react";

export const ButtonSubmit = ({
  loading,
  text,
  textLoading,
  disabled,
}: {
  loading: boolean;
  text: string;
  textLoading: string;
  disabled?: boolean;
}) => {
  return (
    <button
      type={loading ? "button" : "submit"}
      disabled={disabled}
      className={`flex items-center gap-2 justify-center w-full md:w-1/2 py-3 text-center transition-all duration-200 rounded-main text-white-main bg-secondary-main hover:bg-primary-main ${
        disabled || loading
          ? "opacity-80 hover:!bg-secondary-main cursor-default"
          : "opacity-100"
      }`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-white-main border-t-transparent rounded-full animate-spin"></div>
          {textLoading}
        </>
      ) : (
        text
      )}
    </button>
  );
};
