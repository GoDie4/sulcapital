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
import { CiudadList } from "../../../app/(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { Propiedad } from "../../../app/(sistema)/sistema/propiedades/_components/table/ColumnasPropiedades";
import { TipoPropiedad } from "../../../app/(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { UserInterface } from "../../../app/(auth)/_components/AuthInterfaces";
import axios from "axios";
import { config } from "../config/config";
import { EmpresaContacto } from "../../../app/(sistema)/sistema/contacto/_components/interface/ContactoInterfaces";
import { Banner } from "../../../app/(sistema)/sistema/banners/_components/table/ColumnasBanners";

interface AuthContextInterface {
  modalContent: ReactNode | null;
  setModalContent: Dispatch<SetStateAction<ReactNode>>;
  modalSize: ModalSizes;
  setModalSize: Dispatch<SetStateAction<ModalSizes>>;
  isModalOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  cerrarSesion: () => void;
  rowEdit: any | null;
  setRowEdit: Dispatch<SetStateAction<any | null>>;
  dataPropiedades: Propiedad[];
  dataTiposPropiedades: TipoPropiedad[];
  dataCiudades: CiudadList[];
  dataContacto: EmpresaContacto;
  dataBanners: Banner[]
  authUser: UserInterface | null;
  setAuthUser: Dispatch<SetStateAction<UserInterface | null>>;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  showMenu: boolean;
}

interface AuthProviderInterface {
  children: ReactNode;
  dataCiudadesInitial: any[];
  dataTiposPropiedadesInitial: any[];
  dataPropiedadesInitial: any[];
  dataContactoInitial: any;
  userAuthenticated: UserInterface | null;
  dataBannersInitial: any[];
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
  userAuthenticated,
  dataContactoInitial,
  dataBannersInitial,
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
  const [dataBanners] = useState<Banner[]>(dataBannersInitial);
  const [dataContacto] = useState<EmpresaContacto>(dataContactoInitial);
  const [authUser, setAuthUser] = useState<UserInterface | null>(
    userAuthenticated
  );
  const [showMenu, setShowMenu] = useState<boolean>(false);

  const [modalSize, setModalSize] = useState<ModalSizes>("small");
  const [rowEdit, setRowEdit] = useState<any | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const cerrarSesion = async () => {
    try {
      const response = await axios.post(`${config.API_URL}/logout`, null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        window.location.href = "/";
        setAuthUser(null);
        localStorage.removeItem("token");
      }
    } catch (error) {
      console.log(error);
    }
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
        authUser,
        setAuthUser,
        cerrarSesion,
        dataContacto,
        setShowMenu,
        showMenu,
        dataBanners
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
