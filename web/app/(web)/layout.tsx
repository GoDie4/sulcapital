'use client'
import { useAuth } from "@/assets/context/AuthContext";
import { Footer } from "../_components/estructura/Footer";
import { Header } from "../_components/estructura/Header";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { dataCiudades, dataTiposPropiedades } = useAuth();

  return (
    <>
      <Header ciudades={dataCiudades} tipoPropiedades={dataTiposPropiedades} />
      {children}
      <Footer ciudades={dataCiudades} tipoPropiedades={dataTiposPropiedades} />
    </>
  );
}
