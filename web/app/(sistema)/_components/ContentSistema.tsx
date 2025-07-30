"use client";

import { useEffect, useState } from "react";
import { SistemaProvider } from "@/assets/context/SistemaContext";
import { SideBarSistema } from "./SideBarSistema";
import { HeaderSistema } from "./HeaderSistema";
import Link from "next/link";
import { useAuth } from "@/assets/context/AuthContext";

export function ContentSistema({ children }: { children: React.ReactNode }) {
  const { setShowMenu, showMenu } = useAuth();
  const [ocultarSideBar, setOcultarSideBar] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <SistemaProvider>
      <Link
        href={"/"}
        className="bg-primary-main fixed bottom-6 left-2 rounded-full py-2 px-4 text-sm text-white-main text-center"
      >
        Regresar a la web
      </Link>
      <div className="flex">
        <SideBarSistema
          showMenu={showMenu}
          ocultarSideBar={ocultarSideBar}
          setOcultarSideBar={setOcultarSideBar}
          setShowMenu={setShowMenu}
        />
        <div
          className={`${
            ocultarSideBar
              ? "w-full lg:w-[calc(100%-80px)]"
              : "w-full lg:w-[calc(100%-252px)]"
          } bg-white-100  transition-all duration-500 ease-out`}
        >
          <HeaderSistema
            scrolled={scrolled}
            setShowMenu={setShowMenu}
            showMenu={showMenu}
          />
          <div
            className={`w-full p-2 sm:p-4 md:p-6 md:pt-0 h-[calc(100dvh-90px)] overflow-y-auto ${
              scrolled ? "mt-20" : ""
            } scroll_layout`}
          >
            <div className="w-full p-1 bg-white-main sm:p-2 md:p-4 rounded-main">
              {children}
            </div>
          </div>
        </div>
      </div>
    </SistemaProvider>
  );
}
