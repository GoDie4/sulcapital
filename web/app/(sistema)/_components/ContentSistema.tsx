"use client";

import { useEffect, useState } from "react";
import { SistemaProvider } from "@/assets/context/SistemaContext";
import { SideBarSistema } from "./SideBarSistema";
import { HeaderSistema } from "./HeaderSistema";

export function ContentSistema({ children }: { children: React.ReactNode }) {
  const [ocultarSideBar, setOcultarSideBar] = useState<boolean>(false);
  const [menuShow, setMenuShow] = useState<boolean>(false);
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
      <div className="flex">
        <SideBarSistema
          showMenu={menuShow}
          ocultarSideBar={ocultarSideBar}
          setOcultarSideBar={setOcultarSideBar}
          setShowMenu={setMenuShow}
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
            setShowMenu={setMenuShow}
            showMenu={menuShow}
          />
          <div
            className={`w-full p-4 md:p-6 md:pt-0 h-[calc(100dvh-90px)] overflow-y-auto ${
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
