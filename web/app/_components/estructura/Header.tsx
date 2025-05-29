/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { ContentMain } from "./ContentMain";
import { MdWhatsapp } from "react-icons/md";
import { NavItem } from "./NavItem";
import Link from "next/link";
import { LiaUserSolid } from "react-icons/lia";
import { HiMenu } from "react-icons/hi";
export const Header = () => {
  const menuItems = [
    {
      title: "Vender",
      propertyTypes: ["Locales", "Terrenos", "Casas", "Lotes", "Alquiler"],
      locations: [
        "Pichanaki",
        "Satipo",
        "Río Negro",
        "Mazamari",
        "Pangoa",
        "La Merced",
        "Perené",
        "Sangani",
        "San Ramón",
        "Villa Rica",
        "Oxapampa",
      ],
    },
    {
      title: "Alquilar",
      propertyTypes: ["Locales", "Terrenos", "Casas", "Lotes", "Alquiler"],
      locations: [
        "Pichanaki",
        "Satipo",
        "Río Negro",
        "Mazamari",
        "Pangoa",
        "La Merced",
        "Perené",
        "Sangani",
        "San Ramón",
        "Villa Rica",
        "Oxapampa",
      ],
    },
    {
      title: "Comprar",
      propertyTypes: ["Locales", "Terrenos", "Casas", "Lotes", "Alquiler"],
      locations: [
        "Pichanaki",
        "Satipo",
        "Río Negro",
        "Mazamari",
        "Pangoa",
        "La Merced",
        "Perené",
        "Sangani",
        "San Ramón",
        "Villa Rica",
        "Oxapampa",
      ],
    },
  ];

  const [scrollY, setScrollY] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY > 141.71 ? true : false);
    };

    window.addEventListener("scroll", handleScroll);

    // Limpieza del evento al desmontar el componente
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full  z-[1300] ${
        scrollY ? "bg-white-main shadow-md" : ""
      } transition-all duration-300`}
    >
      <ContentMain className="py-3">
        <nav className="flex justify-between items-center">
          <Link
            href={"/"}
            className={`block ${
              scrollY ? "w-[160px]" : "w-[200px]"
            }  transition-all duration-200`}
          >
            <img
              src="/images/logo/logo_white.png"
              alt=""
              className={` ${
                scrollY ? "hidden " : "block"
              } transition-all duration-200`}
            />
            <img
              src="/images/logo/logo.png"
              alt=""
              className={` ${
                scrollY ? "block " : "hidden"
              } transition-all duration-200`}
            />
          </Link>
          <ul
            className={`hidden lg:flex items-center space-x-2 ${
              scrollY ? "text-secondary-main" : "text-white-main "
            }`}
          >
            {menuItems.map((item, index) => (
              <NavItem
                key={index}
                title={item.title}
                propertyTypes={item.propertyTypes}
                locations={item.locations}
              />
            ))}
          </ul>
          <div className="w-fit flex items-center gap-4">
            <Link
              href={""}
              className={`flex w-fit text-4xl ${
                scrollY ? "text-secondary-main" : "text-white-main"
              }`}
            >
              <LiaUserSolid />
            </Link>
            <a
              href=""
              className="w-fit px-6 py-2 rounded-full hidden lg:flex gap-2  items-center justify-center bg-secondary-main text-white-main transition-all duration-200 hover:bg-green-600"
            >
              <MdWhatsapp size={30} /> <p className="block"> 987 654 321</p>
            </a>
            <button
              type="button"
              className={`block lg:hidden  ${
                scrollY ? "text-secondary-main" : "text-white-main"
              } text-3xl`}
            >
              <HiMenu />
            </button>
          </div>
        </nav>
      </ContentMain>
    </header>
  );
};
