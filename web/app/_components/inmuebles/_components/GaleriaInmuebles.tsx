"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ContentMain } from "../../estructura/ContentMain";
import { MdLocationPin } from "react-icons/md";
import "photoswipe/style.css";
import { Gallery, Item } from "react-photoswipe-gallery";
export const GaleriaInmuebles = () => {
  const imagenes = [
    "/images/inmueble/foto1.webp",
    "/images/inmueble/foto2.webp",
    "/images/inmueble/foto3.webp",
    "/images/inmueble/foto4.webp",
    "/images/inmueble/foto5.webp",
    "/images/inmueble/foto6.webp",
  ];
  return (
    <section>
      <ContentMain className="py-12">
        <Gallery>
          <div className="w-full flex flex-col xl:flex-row gap-4">
            <div className="w-full xl:w-3/5 relative">
              <span className="block absolute z-20 top-4 font-TypographBold text-xs right-4 w-fit bg-primary-main text-white-main px-3 py-1 rounded-full">
                Venta
              </span>
              <Item
                original={imagenes[0]}
                thumbnail={imagenes[0]}
                width="1200"
                height="800"
              >
                {({ ref, open }) => (
                  <div className="relative z-10">
                    <img
                      ref={ref}
                      onClick={open}
                      src={imagenes[0]}
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
                      original={img}
                      thumbnail={img}
                      width="1200"
                      height="800"
                    >
                      {({ ref, open }) => (
                        <img
                          ref={ref}
                          onClick={open}
                          src={img}
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
                  S/ 400
                </h2>
                <p className="flex items-center gap-1 mb-2 text-sm">
                  <span className="text-secondary-main text-lg">
                    <MdLocationPin />
                  </span>
                  <p>Jr. Los Pinos 456, Barrio El Milagro, Satipo, Junín.</p>
                </p>
                <p className="text-black-900 line-clamp-2">
                  Acogedora casa de un piso con techo de tejas, rodeada de
                  árboles y un amplio jardín en la selva central.
                </p>
              </div>
            </div>
          </div>
        </Gallery>
      </ContentMain>
    </section>
  );
};
