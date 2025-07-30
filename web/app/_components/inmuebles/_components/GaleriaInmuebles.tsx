"use client";
/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { ContentMain } from "../../estructura/ContentMain";
import { MdLocationPin } from "react-icons/md";
import "photoswipe/style.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import { config } from "@/assets/config/config";
import { registrarReciente } from "@/lib/registrarReciente";
import { useAuth } from "@/assets/context/AuthContext";
import { useRouter } from "next/navigation";

export interface ImagenPropiedad {
  id: number;
  url: string;
}

const ChipDisponibilidad = ({ disponibilidad }: { disponibilidad: string }) => {
  const getTexto = () => {
    switch (disponibilidad) {
      case "EN_VENTA":
        return "Venta";
      case "EN_COMPRA":
        return "Compra";
      case "EN_ALQUILER":
        return "Alquiler";
      default:
        return "";
    }
  };

  return (
    <span className="block absolute z-20 top-4 font-TypographBold text-xs right-4 w-fit bg-primary-main text-white-main px-3 py-1 rounded-full">
      {getTexto()}
    </span>
  );
};

export const GaleriaInmuebles = ({
  imagenes,
  precio,
  descripcionCorta,
  direccion,
  disponibilidad,
  propiedadId,
  celular,
}: {
  imagenes: ImagenPropiedad[];
  precio: string;
  descripcionCorta: string;
  direccion: string;
  disponibilidad: string;
  propiedadId: string;
  celular: string;
}) => {
  //   const imagenes = [
  //     "/images/inmueble/foto1.webp",
  //     "/images/inmueble/foto2.webp",
  //     "/images/inmueble/foto3.webp",
  //     "/images/inmueble/foto4.webp",
  //     "/images/inmueble/foto5.webp",
  //     "/images/inmueble/foto6.webp",
  //   ];

  const { authUser } = useAuth();

  const ruta = useRouter();

  function sendWhatsAppMessage(phone: string, message: string) {
    if (!authUser) {
      ruta.push("/iniciar-sesion");
      return;
    }

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(
      message
    )}`;
    window.open(url, "_blank");
  }

  useEffect(() => {
    if (authUser) {
      registrarReciente(propiedadId);
    }
  }, [authUser, propiedadId]);
  return (
    <section>
      <ContentMain className="py-12">
        <Gallery>
          <div className="w-full flex flex-col xl:flex-row gap-4">
            <div className="w-full xl:w-3/5 relative">
              <ChipDisponibilidad disponibilidad={disponibilidad} />
              <Item
                original={`${config.API_IMAGE_URL}${imagenes[0].url}`}
                thumbnail={`${config.API_IMAGE_URL}${imagenes[0].url}`}
                width="1200"
                height="800"
              >
                {({ ref, open }) => (
                  <div className="relative z-10">
                    <img
                      ref={ref}
                      onClick={open}
                      src={`${config.API_IMAGE_URL}${imagenes[0].url}`}
                      alt=""
                      className="block rounded-main w-full -z-20 cursor-pointer"
                    />
                    <div className="absolute w-full -z-10 rounded-main h-full bg-gradient-to-b from-transparent to-black-700 opacity-30 top-0 left-0"></div>
                  </div>
                )}
              </Item>
            </div>
            <div className="w-full xl:w-2/5">
              <div className="w-full grid grid-cols-3 gap-4">
                {imagenes.map((img, index) => (
                  <div className="w-full" key={index}>
                    <Item
                      original={`${config.API_IMAGE_URL}${img.url}`}
                      thumbnail={`${config.API_IMAGE_URL}${img.url}`}
                      width="1200"
                      height="800"
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={`${config.API_IMAGE_URL}${img.url}`}
                          alt=""
                          className="block rounded-main h-28 sm:h-40 w-full object-cover cursor-pointer"
                        />
                      )}
                    </Item>
                  </div>
                ))}
              </div>
              <div className="w-full px-2 py-4">
                <p className="text-black-900">Desde</p>
                <h2 className=" mb-3 text-xl text-secondary-main font-TypographBold">
                  S/ {precio}
                </h2>
                {direccion && (
                  <p className="flex items-center gap-1 mb-2 text-sm">
                    <span className="text-secondary-main text-lg">
                      <MdLocationPin />
                    </span>
                    <p>{direccion}</p>
                  </p>
                )}
                {descripcionCorta && (
                  <p className="text-black-900 line-clamp-2">
                    {descripcionCorta}
                  </p>
                )}

                <button
                  type="button"
                  onClick={() => {
                    sendWhatsAppMessage(
                      `${celular}`,
                      `Hola! Estoy interesado en tu propiedad 🚀\n\n¿Podrías brindarme más detalles?`
                    );
                  }}
                  className="bg-green-500 w-full mt-6 text-white-main  rounded-full py-2 px-4 flex items-center justify-center hover:bg-green-600 transition-all duration-200"
                >
                  Contactar con el anunciante
                </button>
              </div>
            </div>
          </div>
        </Gallery>
      </ContentMain>
    </section>
  );
};
