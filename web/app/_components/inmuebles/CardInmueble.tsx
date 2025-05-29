"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MdStar } from "react-icons/md";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { PiEye } from "react-icons/pi";
import Link from "next/link";
import { BsEnvelope, BsWhatsapp } from "react-icons/bs";
import { useAuth } from "@/assets/context/AuthContext";
import { VistaRapidaInmueble } from "./VistaRapidaInmueble";
export type CardInmuebleDesign = "grid" | "list";
export interface CardInmuebleProps {
  id: string;
  images: string[];
  price: string;
  ubicacion: string;
  propertyType: string;
  address: string;
  isExclusive?: boolean;
}

const CardInmueble = ({
  data,
  type = "grid",
}: {
  data: CardInmuebleProps;
  type?: CardInmuebleDesign;
}) => {
  const variasImagenes = data.images.length > 1;
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
  data: CardInmuebleProps;
  variasImagenes: boolean;
}) => {
  return (
    <Link
      href="/inmueble"
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
              {data.images.map((image: string, index: number) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`${data.propertyType} en ${data.ubicacion}`}
                    className="w-full h-32 sm:h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className=" absolute z-10 w-full h-full inset-0 bg-black-main/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          </div>

          {data.isExclusive && (
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
              {data.price}
            </div>
          </div>
          <div className="text-black-800 mt-3 text-sm leading-relaxed line-clamp-2">
            {data.address}
          </div>
          <div className="w-full flex gap-1 mt-1 items-center">
            <p className="text-sm line-clamp-1 ">
              <span className="">{data.propertyType}</span> en{" "}
              <span className="cursor-pointer text-secondary-main underline">
                {data.ubicacion}
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
  data: CardInmuebleProps;
  variasImagenes: boolean;
}) => {
  const { setModalContent, openModal } = useAuth();
  return (
    <div className="w-full block rounded-main shadow-main overflow-hidden hover:-translate-y-2 transition-all duration-200">
      <div className="relative">
        <div className="relative group overflow-hidden">
          <Swiper
            modules={[Navigation]}
            slidesPerView={1}
            loop={variasImagenes}
            navigation={variasImagenes}
            className="w-full h-40 swp--Inmuebles--images"
          >
            {data.images.map((image: string, index: number) => (
              <SwiperSlide key={index}>
                <img
                  src={image}
                  alt={`${data.propertyType} en ${data.ubicacion}`}
                  className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className=" absolute z-10 w-full h-full inset-0 bg-black-main/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
          <button
            type="button"
            onClick={() => {
              setModalContent(<VistaRapidaInmueble />);
              openModal();
            }}
            className=" rounded-full p-1 hover:text-primary-main  absolute cursor-pointer z-40 -bottom-5 group-hover:bottom-2 left-3 opacity-0 group-hover:opacity-100 text-white-main text-lg transition-all duration-200"
          >
            <PiEye />
          </button>
        </div>

        {data.isExclusive && (
          <span className="absolute top-3 z-40 right-2 flex items-center gap-1 rounded-full from-secondary-700 to-secondary-main text-white-main bg-gradient-to-r px-3 py-1 shadow-lg">
            <MdStar className="w-3 h-3 mr-1 fill-current" />
            Exclusivo
          </span>
        )}
      </div>

      <Link href={"/inmueble"} className="block p-4 space-y-3 bg-white-main">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-black-700">Desde</span>
          <div className="text-lg font-bold text-secondary-main font-TypographBold ">
            {data.price}
          </div>
        </div>

        <div className="text-black-800 text-sm leading-relaxed line-clamp-2">
          {data.address}
        </div>

        <div className="w-full flex gap-1 items-center">
          <p className="text-sm line-clamp-1 ">
            <span className="">{data.propertyType}</span> en{" "}
            <span className="cursor-pointer text-secondary-main underline">
              {data.ubicacion}
            </span>
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CardInmueble;
