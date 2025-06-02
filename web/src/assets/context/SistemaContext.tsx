/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface SistemaContextType {
  rowEdit: any | null;
  setRowEdit: Dispatch<SetStateAction<any | null>>;
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
  const [rowEdit, setRowEdit] = useState<any | null>(null);

  return (
    <SistemaContext.Provider value={{ rowEdit, setRowEdit }}>
      {children}
    </SistemaContext.Provider>
  );
};
