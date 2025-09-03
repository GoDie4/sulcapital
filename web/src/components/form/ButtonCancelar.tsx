"use client";
import { useAuth } from "@/assets/context/AuthContext";
import React from "react";

export const ButtonCancelar = () => {
  const { closeModal } = useAuth();
  return (
    <button
      type="button"
      onClick={closeModal}
      className="flex justify-center w-full md:w-1/2 py-2 transition-all duration-200 border text-secondary-main rounded-main border-secondary-main hover:bg-gray-400 hover:text-secondary-main hover:border-gray-400"
    >
      Cancelar
    </button>
  );
};
