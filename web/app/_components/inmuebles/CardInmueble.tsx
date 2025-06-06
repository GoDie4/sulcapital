"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MdStar } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import Link from "next/link";
import { BsEnvelope, BsHeart, BsHeartFill, BsWhatsapp } from "react-icons/bs";
import { Propiedad } from "../../(sistema)/sistema/propiedades/_components/table/ColumnasPropiedades";
import { config } from "@/assets/config/config";
export type CardInmuebleDesign = "grid" | "list";
export interface CardInmuebleProps {
  id: string;
  imagenes: string[];
  precio: string;
  direccion: string;
  tipo: string;
  exclusivo?: boolean;
  ciudad: string;
}

const CardInmueble = ({
  data,
  type = "grid",
}: {
  data: Propiedad;
  type?: CardInmuebleDesign;
}) => {
  const variasImagenes = data.imagenes.length > 1;
  return (
    <>
      {type === "grid" ? (
        <CardInmuebleGrid data={data} variasImagenes={variasImagenes} />
      ) : (
        <CardInmuebleList data={data} variasImagenes={variasImagenes} />
      )}
    </>
  );
};

const CardInmuebleList = ({
  data,
  variasImagenes,
}: {
  data: Propiedad;
  variasImagenes: boolean;
}) => {
  return (
    <Link
      href={`/propiedad/${data.id}/try`}
      className="rounded-main shadow-main p-2 bg-white-main flex items-center justify-between"
    >
      <div className="w-fit flex">
        <div className="relative">
          <div className="relative group overflow-hidden w-28 sm:w-40 lg:w-60  rounded-main">
            <Swiper
              modules={[Navigation]}
              slidesPerView={1}
              loop={variasImagenes}
              navigation={variasImagenes}
              className="w-full  swp--Inmuebles--images"
            >
              {data.imagenes.map((image) => (
                <SwiperSlide key={image.id}>
                  <img
                    src={`${config.API_IMAGE_URL}${image.url}`}
                    alt={`${data.tipoPropiedad.nombre} en ${data.ciudad.nombre}`}
                    className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className=" absolute z-10 w-full h-full inset-0 bg-black-main/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {data.exclusivo && (
            <span className="absolute top-3 z-40 right-2 flex items-center gap-1 rounded-full from-secondary-700 to-secondary-main text-white-main bg-gradient-to-r px-3 py-1 shadow-lg">
              <MdStar className="w-3 h-3 mr-1 fill-current" />
              <p className="hidden sm:block">Exclusivo</p>
            </span>
          )}
        </div>

        <div className="px-4 py-3">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-black-700">Desde</span>
            <div className="text-base sm:text-lg font-bold text-secondary-main font-TypographBold ">
              S/ {data.precio}
            </div>
          </div>
          <div className="text-black-800 lin mt-3 text-sm leading-relaxed line-clamp-1">
            {data.direccion}
          </div>
          <div className="w-full flex gap-1 mt-1 items-center">
            <p className="text-sm line-clamp-1 ">
              <span className="">{data.tipoPropiedad.nombre}</span> en{" "}
              <span className="cursor-pointer text-secondary-main underline">
                {data.ciudad.nombre}
              </span>
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col gap-2 pr-4">
        <button
          type="submit"
          className="bg-primary-main hover:bg-primary-700 text-white-main font-medium py-2 px-6 rounded-full flex gap-2 items-center justify-center transition-colors duration-200"
        >
          <BsEnvelope />
          Contactar
        </button>
        <button
          type="button"
          className="bg-secondary-700 hover:bg-secondary-800 text-white-main font-medium py-2 px-6 rounded-full flex gap-2 items-center justify-center transition-colors duration-200"
        >
          <BsWhatsapp />
          WhatsApp
        </button>
      </div>
    </Link>
  );
};

const CardInmuebleGrid = ({
  data,
  variasImagenes,
}: {
  data: Propiedad;
  variasImagenes: boolean;
}) => {
  return (
    <Link
      href={`/propiedad/${data.id}/try`}
      className="w-full block rounded-main shadow-main overflow-hidden hover:-translate-y-2 transition-all duration-200"
    >
      <div className="relative">
        <div className="relative group overflow-hidden">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            loop={variasImagenes}
            navigation={variasImagenes}
            className="w-full h-32 sm:h-40 swp--Inmuebles--images"
          >
            {data.fondoPortada.map((image) => (
              <SwiperSlide key={image.id}>
                <img
                  src={`${config.API_IMAGE_URL}${image.url}`}
                  alt={`${data.tipoPropiedad.nombre} en ${data.ciudad.nombre}`}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className=" absolute z-10 w-full h-full inset-0 bg-black-main/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        </div>

        {data.exclusivo && (
          <span className="absolute top-3 z-40 right-2 flex items-center gap-1 rounded-full from-secondary-700 to-secondary-main text-white-main bg-gradient-to-r px-3 py-1 shadow-lg">
            <MdStar className="w-3 h-3 mr-1 fill-current" />
            Exclusivo
          </span>
        )}
      </div>

      <div className="block p-4 space-y-3 bg-white-main">
        <div className="w-full flex gap-2 items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-sm text-black-700">Desde</span>
            <div className="text-lg font-bold text-secondary-main font-TypographBold ">
              S/ {data.precio}
            </div>
          </div>
          <div className="w-fit">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation(); // evita que el clic se propague al Link
                e.preventDefault(); // previene la redirección
                alert("hola");
              }}
              className="text-gray-400 group active:scale-75 text-xl transition-all duration-150"
            >
              <span className="block group-hover:hidden">
                <BsHeart />
              </span>
              <span className="hidden group-hover:block">
                <BsHeartFill className="text-secondary-main" />
              </span>
            </button>
          </div>
        </div>

        <div className="text-black-800 text-sm leading-relaxed line-clamp-1">
          {data.direccion}
        </div>

        <div className="w-full flex gap-1 items-center">
          <p className="text-sm line-clamp-1 ">
            <span className="">{data.tipoPropiedad.nombre}</span> en{" "}
            <span className="cursor-pointer text-secondary-main underline">
              {data.ciudad.nombre}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
};

export default CardInmueble;
