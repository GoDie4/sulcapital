"use client";

import React from "react";
import { ContentMain } from "./ContentMain";
import {
  BsEnvelope,
  BsFacebook,
  BsInstagram,
  BsMap,
  BsPhoneFill,
  BsTiktok,
} from "react-icons/bs";
import Link from "next/link";
import { TipoPropiedad } from "../../(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { CiudadList } from "../../(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { EmpresaContacto } from "../../(sistema)/sistema/contacto/_components/interface/ContactoInterfaces";
export const Footer = ({
  tipoPropiedades,
  ciudades,
  contacto,
}: {
  tipoPropiedades: TipoPropiedad[];
  ciudades: CiudadList[];
  contacto: EmpresaContacto;
}) => {
  return (
    <footer className="bg-secondary-main">
      <ContentMain className="pt-16 pb-10 flex flex-wrap justify-between gap-10 lg:gap-6">
        <div className="">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Contáctanos
          </h5>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <span>
                <BsMap />
              </span>
              <p>{contacto.direccion}</p>
            </li>
            {contacto.direccion && (
              <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
                <span>
                  <BsPhoneFill />
                </span>
                <p>{contacto.whatsapp}</p>
              </li>
            )}
            {contacto?.CorreoEmpresa.sort(
              (a, b) => Number(a.posicion) - Number(b.posicion)
            )
              .slice(0, 3)
              .map((telefono) => (
                <li
                  key={telefono.id}
                  className="flex items-center gap-3 text-white-200 hover:text-white-main"
                >
                  <span>
                    <BsEnvelope />
                  </span>
                  <p>{telefono.email}</p>
                </li>
              ))}

            <li className="flex pt-6 text-white-main text-3xl items-center gap-5">
              {contacto?.facebook && (
                <a href={contacto.facebook} target="_blank">
                  <BsFacebook />
                </a>
              )}
              {contacto?.instagram && (
                <a href={contacto.instagram} target="_blank">
                  <BsInstagram />
                </a>
              )}
              {contacto?.tiktok && (
                <a href={contacto.tiktok} target="_blank">
                  <BsTiktok />
                </a>
              )}
            </li>
          </ul>
        </div>
        <div className="min-w-72">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Deseas
          </h5>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={"/buscar?disponibilidad=EN_VENTA"}>Vender</Link>
            </li>

            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={"/buscar?disponibilidad=EN_ALQUILER"}>Alquiler</Link>
            </li>
          </ul>
        </div>
        <div className="min-w-72">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Tipo de Propiedad
          </h5>
          <ul className="space-y-4">
            {tipoPropiedades.map((tipo: TipoPropiedad) => (
              <li
                key={tipo.id}
                className="flex items-center gap-3 text-white-200 hover:text-white-main"
              >
                <Link
                  href={`/buscar?tipo_propiedad=${tipo.nombre.toLocaleLowerCase()}`}
                >
                  {tipo.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Ubicaciones
          </h5>
          <ul className="space-y-4 columns-2">
            {ciudades.map((ubicacion: CiudadList) => (
              <li
                key={ubicacion.id}
                className="flex items-center gap-3 text-white-200 hover:text-white-main"
              >
                <Link
                  href={`/buscar?ciudad=${ubicacion.nombre.toLocaleLowerCase()}`}
                >
                  {ubicacion.nombre}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentMain>
      <ContentMain className="flex flex-col lg:flex-row gap-4 justify-between border-t py-4">
        <p className="text-white-main flex gap-2 items-center">
          SULCAPITAL © 2025 | Todos los derechos reservados
        </p>
        <ul className="flex items-center gap-3 text-white-main">
          <li>
            <Link href="/">Inicio</Link>
          </li>
          <li>
            <Link href="/politicas-de-privacidad">Políticas de privacidad</Link>
          </li>
        </ul>
      </ContentMain>

    
    </footer>
  );
};
