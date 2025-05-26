/* eslint-disable @next/next/no-img-element */
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
import { ubicaciones } from "@/assets/data/DataGeneral";
import { UbicacionProps } from "../inicio/lugares/CardUbicacion";

export const Footer = () => {
  return (
    <footer className="bg-secondary-main">
      <ContentMain className="pt-16 pb-5 flex flex-wrap justify-between gap-10 lg:gap-6">
        <div className="">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Contáctanos
          </h5>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <span>
                <BsMap />
              </span>
              <p>Av. General 123, Los Olivos. Lima</p>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <span>
                <BsPhoneFill />
              </span>
              <p>987 654 312</p>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <span>
                <BsEnvelope />
              </span>
              <p>ventas@dominio.com</p>
            </li>
            <li className="flex pt-6 text-white-main text-3xl items-center gap-5">
              <a href="">
                <BsFacebook />
              </a>
              <a href="">
                <BsInstagram />
              </a>
              <a href="">
                <BsTiktok />
              </a>
            </li>
          </ul>
        </div>
        <div className="min-w-72">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Deseas
          </h5>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Alquilar</Link>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Vender</Link>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Comprar</Link>
            </li>
          </ul>
        </div>
        <div className="min-w-72">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Tipo de inmueble
          </h5>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Locales</Link>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Terrenos</Link>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Casas</Link>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Lotes</Link>
            </li>
            <li className="flex items-center gap-3 text-white-200 hover:text-white-main">
              <Link href={""}>Alquiler</Link>
            </li>
          </ul>
        </div>
        <div className="">
          <h5 className="text-xl mb-8 font-TypographBold text-white-main">
            Ubicaciones
          </h5>
          <ul className="space-y-4 columns-2">
            {ubicaciones.map((ubicacion: UbicacionProps) => (
              <li
                key={ubicacion.id}
                className="flex items-center gap-3 text-white-200 hover:text-white-main"
              >
                <Link href={""}>{ubicacion.nombre}</Link>
              </li>
            ))}
          </ul>
        </div>
      </ContentMain>
      <ContentMain className="flex justify-between border-t py-4">
        <p className="text-white-main">
          SULCAPITAL © 2025 | Todos los derechos reservados - Design by:{" "}
          <a href="">
            <img src="" alt="" className="block w-[18px]" />
          </a>
        </p>
        <ul className="flex items-center gap-3 text-white-main">
          <li>
            <a href="">Inicio</a>
          </li>
          <li>
            <a href="">Políticas de privacidad</a>
          </li>
        </ul>
      </ContentMain>
    </footer>
  );
};
