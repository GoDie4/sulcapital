import React from "react";
import { ContentMain } from "./ContentMain";
import { MdWhatsapp } from "react-icons/md";
import { NavItem } from "./NavItem";
export const Header = () => {
  const menuItems = [
    {
      title: "Vender",
      propertyTypes: [
        "Casas",
        "Departamentos",
        "Oficinas",
        "Locales Comerciales",
        "Terrenos",
      ],
      locations: ["Centro", "Norte", "Sur", "Este", "Oeste"],
    },
    {
      title: "Alquilar",
      propertyTypes: [
        "Casas",
        "Departamentos",
        "Estudios",
        "Oficinas",
        "Locales",
      ],
      locations: ["Miraflores", "San Isidro", "Barranco", "Surco", "La Molina"],
    },
    {
      title: "Comprar",
      propertyTypes: [
        "Casas",
        "Departamentos",
        "Condominios",
        "Penthouses",
        "Terrenos",
      ],
      locations: [
        "Lima Centro",
        "Lima Norte",
        "Lima Sur",
        "Lima Este",
        "Callao",
      ],
    },
  ];
  return (
    <header className="fixed top-0 left-0 w-full  z-[1300]">
      <ContentMain className="py-3">
        <nav className="flex justify-between items-center">
          <picture className="block">
            <img
              src="/images/logo/logo_white.png"
              alt=""
              className="w-[200px]"
            />
          </picture>
          <ul className="hidden lg:flex items-center space-x-2">
            {menuItems.map((item, index) => (
              <NavItem
                key={index}
                title={item.title}
                propertyTypes={item.propertyTypes}
                locations={item.locations}
              />
            ))}
          </ul>
          <div className="w-fit">
            <a
              href=""
              className="w-fit px-6 py-2 rounded-full flex gap-2  items-center justify-center bg-secondary-main text-white-main transition-all duration-200 hover:bg-green-600"
            >
              <MdWhatsapp size={30} /> 987 654 321
            </a>
          </div>
        </nav>
      </ContentMain>
    </header>
  );
};
