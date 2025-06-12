"use client";
/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { CgLogOut } from "react-icons/cg";
import { IoChevronBackOutline } from "react-icons/io5";
import {
  BsPeople, // Usuarios
  BsGeoAlt, // Ciudades
  BsHouseDoor, // Tipo de propiedad / Propiedades
  BsPerson, // Mi perfil
  BsEye, // Vistos
  BsHeart,
  BsDiagram2, // Mis favoritos
} from "react-icons/bs";

import DropdownMenu, { MenuCategory } from "./DropdownMenu";
import { useAuth } from "@/assets/context/AuthContext";

const menuItems = [
  {
    title: "Dashboard",
    icon: <BsDiagram2 />,
    route: "",
  },
  {
    title: "Usuarios",
    icon: <BsPeople />,
    route: "usuarios",
  },
  {
    title: "Ciudades",
    icon: <BsGeoAlt />,
    route: "ciudades",
  },
  {
    title: "Tipo de prop.",
    icon: <BsHouseDoor />,
    route: "tipo-propiedades",
  },
  {
    title: "Propiedades",
    icon: <BsHouseDoor />,
    route: "propiedades",
  },
];

const menuItemsCliente = [
  {
    title: "Mi perfil",
    icon: <BsPerson />,
    route: "perfil",
  },

  {
    title: "Vistos",
    icon: <BsEye />,
    route: "vistos",
  },
  {
    title: "Mis favoritos",
    icon: <BsHeart />,
    route: "favoritos",
  },
];

const menuItemsAnunciante = [
  {
    title: "Mi perfil",
    icon: <BsPerson />,
    route: "perfil",
  },
  {
    title: "Mis Propiedades",
    icon: <BsHouseDoor />,
    route: "propiedades",
  },
  {
    title: "Vistos",
    icon: <BsEye />,
    route: "vistos",
  },
  {
    title: "Mis favoritos",
    icon: <BsHeart />,
    route: "favoritos",
  },
];

export const SideBarSistema = ({
  showMenu,
  ocultarSideBar,
  setOcultarSideBar,
}: {
  showMenu: boolean;
  setShowMenu: Dispatch<SetStateAction<boolean>>;
  ocultarSideBar: boolean;
  setOcultarSideBar: Dispatch<SetStateAction<boolean>>;
}) => {
  const { authUser, cerrarSesion } = useAuth();
  const [rutas, setRutas] = useState<MenuCategory[]>([]);
  useEffect(() => {
    if (!authUser?.rol_id) return;

    if (authUser.rol_id === 1) {
      setRutas(menuItems);
    } else if (authUser.rol_id === 2) {
      setRutas(menuItemsAnunciante);
    } else if (authUser.rol_id === 3) {
      setRutas(menuItemsCliente);
    }
  }, [authUser?.rol_id]);
  return (
    <header
      className={`py-8 lg:py-12 fixed z-[1201] top-[90px] lg:top-0 ${
        showMenu ? "left-0" : "-left-full lg:left-0"
      }  lg:relative lg:block ${
        ocultarSideBar
          ? "w-full lg:min-w-20 lg:w-20"
          : "w-full lg:min-w-56 lg:w-56"
      }   bg-secondary-main h-auto min-h-dvh  transition-all duration-500 ease-out`}
    >
      <button
        type="button"
        onClick={() => {
          setOcultarSideBar(!ocultarSideBar);
        }}
        className={`hidden lg:flex bg-gradient-to-br z-[1200] outline-none  from-secondary-800 to-secondary-main absolute top-6 -right-4  w-8 h-8  items-center justify-center text-white-main text-2xl rounded-full transition-all duration-500 ease-out ${
          ocultarSideBar ? "rotate-180" : "rotate-0"
        }`}
      >
        <IoChevronBackOutline />
      </button>
      <div className="flex flex-col justify-between h-auto">
        <div className="w-full ">
          <Link href={"/"} className="w-full  px-4">
            <img
              src="/images/logo/logo_white.png"
              alt=""
              className="hidden mx-auto w-36 lg:block"
            />
          </Link>
          <nav className="h-auto lg:py-10 ">
            <DropdownMenu menuItems={rutas} ocultarSideBar={ocultarSideBar} />
          </nav>
        </div>
        <button
          type="button"
          onClick={() => {
            cerrarSesion();
          }}
          className={`px-5 outline-none text-white-main py-3 flex ${
            ocultarSideBar ? "justify-center" : "justify-start"
          } items-center gap-2 transition-all duration-500 group hover:bg-secondary-main rounded-main`}
        >
          <span className="text-xl transition-all text-primary-main group-hover:text-primary-main">
            <CgLogOut />
          </span>
          <p className={`${ocultarSideBar ? "hidden" : "block"} delay-75`}>
            Cerrar sesión
          </p>
        </button>
      </div>
    </header>
  );
};
