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
import { ModalSizes } from "../../../app/_components/modal/ModalWrapper";
import {  CiudadList } from "../../../app/(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { Propiedad } from "../../../app/(sistema)/sistema/propiedades/_components/table/ColumnasPropiedades";
import { TipoPropiedad } from "../../../app/(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";

interface AuthContextInterface {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  modalSize: ModalSizes;
  setModalSize: Dispatch<SetStateAction<ModalSizes>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  rowEdit: any | null;
  setRowEdit: Dispatch<SetStateAction<any | null>>;
  dataPropiedades: Propiedad[];
  dataTiposPropiedades: TipoPropiedad[];
  dataCiudades: CiudadList[];
}

interface AuthProviderInterface {
  children: ReactNode;
  dataCiudadesInitial: any[];
  dataTiposPropiedadesInitial: any[];
  dataPropiedadesInitial: any[];
}

export type AuthContextValue = AuthContextInterface;

export const AuthContext = createContext<AuthContextInterface | undefined>(
  undefined
);

export const AuthProvider: React.FC<AuthProviderInterface> = ({
  children,
  dataCiudadesInitial,
  dataPropiedadesInitial,
  dataTiposPropiedadesInitial,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [modalContent, setModalContent] = useState<React.ReactNode | null>(
    null
  );

  const [dataCiudades] = useState<CiudadList[]>(dataCiudadesInitial);
  const [dataPropiedades] = useState<Propiedad[]>(dataPropiedadesInitial);
  const [dataTiposPropiedades] = useState<TipoPropiedad[]>(
    dataTiposPropiedadesInitial
  );

  const [modalSize, setModalSize] = useState<ModalSizes>("small");
  const [rowEdit, setRowEdit] = useState<any | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        openModal,
        closeModal,
        isModalOpen,
        modalContent,
        setModalContent,
        rowEdit,
        setRowEdit,
        modalSize,
        setModalSize,
        dataCiudades,
        dataPropiedades,
        dataTiposPropiedades,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth se debe de utilizar dentro de AuthProvider");
  }
  return context;
};
