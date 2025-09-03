/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { SwiperInmuebles } from "../../../_components/inmuebles/SwiperInmuebles";

export const ContenteInmuebles = ({
  propiedadesRelacionadas,
}: {
  propiedadesRelacionadas: any;
}) => {

  return <SwiperInmuebles inmuebles={propiedadesRelacionadas} />;
};
