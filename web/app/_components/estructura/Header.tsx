/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { ContentMain } from "./ContentMain";
import { MdWhatsapp } from "react-icons/md";
import { NavItem } from "./NavItem";
import Link from "next/link";
import { LiaUserSolid } from "react-icons/lia";
import { HiMenu } from "react-icons/hi";
import { TipoPropiedad } from "../../(sistema)/sistema/tipo-propiedades/_components/table/ColumnasTipoPropiedad";
import { CiudadList } from "../../(sistema)/sistema/ciudades/_components/interfaces/CiudadesInterfaces";
import { useAuth } from "@/assets/context/AuthContext";
import { MenuLogeado } from "./MenuLoggeado";
export const Header = ({
  tipoPropiedades,
  ciudades,
}: {
  tipoPropiedades: TipoPropiedad[];
  ciudades: CiudadList[];
}) => {
  const menuItems = [
    {
      title: "Vender",
      propertyTypes: tipoPropiedades,
      locations: ciudades,
    },
    {
      title: "Comprar",
      propertyTypes: tipoPropiedades,
      locations: ciudades,
    },
    {
      title: "Alquiler",
      propertyTypes: tipoPropiedades,
      locations: ciudades,
    },
  ];

  const [scrollY, setScrollY] = useState(false);

  const { authUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY > 141.71 ? true : false);
    };

    window.addEventListener("scroll", handleScroll);

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
        <nav className="flex justify-between items-end">
          <Link
            href={"/"}
            className={`block ${
              scrollY ? "w-[120px]" : " w-[120px] md:w-[140px]"
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
            {authUser !== null && authUser !== undefined ? (
              <>
                <Link
                  href={"/sistema/propiedades"}
                  className={`flex items-center justify-center  btn--menuProfile relative flex-col ${
                    scrollY ? "text-secondary-main" : "text-white-main"
                  }`}
                >
                  <span className="flex items-center justify-center flex-1 w-6 h-6 font-bold uppercase rounded-full bg-primary-main sm:w-8 sm:h-8 text-white-main">
                    <p className="text-sm sm:text-base text-white-main ">
                      {authUser !== null && authUser !== undefined
                        ? authUser.nombres.charAt(0)
                        : ""}
                    </p>
                  </span>
                  <p>{authUser.nombres}</p>

                  <MenuLogeado />
                </Link>
              </>
            ) : (
              <Link
                href={"/iniciar-sesion"}
                className={`flex w-fit text-4xl ${
                  scrollY ? "text-secondary-main" : "text-white-main"
                }`}
              >
                <LiaUserSolid />
              </Link>
            )}
            <a
              href=""
              className="w-fit px-6 py-2 rounded-full hidden lg:flex gap-2  items-center justify-center bg-secondary-main text-white-main transition-all duration-200 hover:bg-green-600"
            >
              <MdWhatsapp size={30} /> <p className="block"> 987 654 321</p>
            </a>
            <button
              type="button"
              className={`hidden  ${
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
