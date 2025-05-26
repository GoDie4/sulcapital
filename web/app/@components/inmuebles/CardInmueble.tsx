"use client";
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { MdStar } from "react-icons/md";

interface CardInmuebleProps {
  image: string;
  price: string;
  location: string;
  propertyType: string;
  address: string;
  isExclusive?: boolean;
}

const CardInmueble: React.FC<CardInmuebleProps> = ({
  image,
  price,
  location,
  propertyType,
  address,
  isExclusive = false,
}) => {
  return (
    <div className="w-full max-w-sm overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 bg-white rounded-xl border-0 shadow-lg">
      <div className="relative">
        <div className="relative overflow-hidden">
          <img
            src={image}
            alt={`${propertyType} en ${location}`}
            className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {isExclusive && (
          <span className="absolute top-3 right-2 flex items-center gap-1 rounded-full from-secondary-700 to-secondary-main text-white-main bg-gradient-to-r  px-3 py-1 shadow-lg">
            <MdStar className="w-3 h-3 mr-1 fill-current" />
            Exclusivo
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm text-black-700">Desde</span>
          <div className="text-lg font-bold text-secondary-main font-TypographBold ">
            {price}
          </div>
        </div>

        <div className="text-black-800 text-sm leading-relaxed line-clamp-2">
          {address}
        </div>

        <div className="w-full flex gap-1 items-center">
          <p className="text-sm line-clamp-1 ">
            <span className="">{propertyType}</span> en <span className="cursor-pointer text-secondary-main underline">{location}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CardInmueble;
