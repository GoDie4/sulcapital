"use client";

import React, { createContext, ReactNode, useContext, useState } from "react";

interface SistemaContextType {
  sistemaTemp: string;
}

const SistemaContext = createContext<SistemaContextType | undefined>(undefined);

export const useSistemaContext = () => {
  const context = useContext(SistemaContext);

  if (!context) {
    throw new Error("useSistemaContext debe usarse dentro de SistemaProvider");
  }

  return context;
};

export const SistemaProvider = ({ children }: { children: ReactNode }) => {
  const [sistemaTemp] = useState("");

  return (
    <SistemaContext.Provider value={{ sistemaTemp }}>
      {children}
    </SistemaContext.Provider>
  );
};
