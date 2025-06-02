'use client'
import React from "react";
import { SwiperInmuebles } from "../../../_components/inmuebles/SwiperInmuebles";
import { useAuth } from "@/assets/context/AuthContext";

export const ContenteInmuebles = () => {
  const { dataPropiedades } = useAuth();

  return <SwiperInmuebles inmuebles={dataPropiedades} />;
};
