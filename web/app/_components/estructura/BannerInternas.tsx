/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { ContentMain } from "./ContentMain";

export const BannerInternas = ({
  title,
  image,
}: {
  title: string;
  image: string;
}) => {
  return (
    <section className="w-full relative z-10 pt-[141.71px]  before:absolute before:w-full before:h-full before:inset-0 before:bg-secondary-main before:opacity-50 before:-z-10 bg-cover bg-fixed bg-center">
      <img
        src={image}
        alt=""
        className="block w-full h-full absolute object-cover inset-0 -z-20"
      />
      <ContentMain className="pt-4 pb-20">
        <h1 className="text-center  text-3xl text-white-main">{title}</h1>
      </ContentMain>
    </section>
  );
};
