"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import CardInmueble, { CardInmuebleProps } from "./CardInmueble";
export const SwiperInmuebles = ({
  inmuebles,
  reverse,
}: {
  inmuebles: CardInmuebleProps[];
  reverse?: boolean;
}) => {
  const newInmuebles = reverse ? inmuebles.reverse() : inmuebles;
  return (
    <Swiper
      modules={[Autoplay]}
      spaceBetween={20}
      slidesPerView={5}
      className="w-full swp--Inmuebles"
      autoplay={{
        delay: 5000,
        reverseDirection: reverse,
        disableOnInteraction: false,
      }}
      loop={true}
      breakpoints={{
        320: {
          slidesPerView: 1,
          grid: { rows: 1 },
        },
        640: {
          slidesPerView: 2,
          grid: { rows: 2 },
        },
        1024: {
          slidesPerView: 3,
          grid: { rows: 2 },
        },
        1280: {
          slidesPerView: 4,
          grid: { rows: 2 },
        },
        1536: {
          slidesPerView: 5,
          grid: { rows: 2 },
        },
      }}
    >
      {newInmuebles.map((item) => (
        <SwiperSlide key={item.id}>
          <CardInmueble data={item} />
        </SwiperSlide>
      ))}
   
    </Swiper>
  );
};
