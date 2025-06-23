"use client";
import { useAuth } from "@/assets/context/AuthContext";
import { Footer } from "../_components/estructura/Footer";
import { Header } from "../_components/estructura/Header";
import { useState } from "react";
import { SideBarHome } from "../(sistema)/_components/SideBarHome";

export default function Layout({ children }: { children: React.ReactNode }) {
  const {
    dataCiudades,
    dataTiposPropiedades,
    dataContacto,
    setShowMenu,
    showMenu,
  } = useAuth();
  const [ocultarSideBar, setOcultarSideBar] = useState<boolean>(false);

  return (
    <>
      <SideBarHome
        ocultarSideBar={ocultarSideBar}
        setOcultarSideBar={setOcultarSideBar}
        setShowMenu={setShowMenu}
        showMenu={showMenu}
      />
      <Header
        ciudades={dataCiudades}
        tipoPropiedades={dataTiposPropiedades}
        contacto={dataContacto}
      />
      {children}
      <Footer
        ciudades={dataCiudades}
        tipoPropiedades={dataTiposPropiedades}
        contacto={dataContacto}
      />
    </>
  );
}
