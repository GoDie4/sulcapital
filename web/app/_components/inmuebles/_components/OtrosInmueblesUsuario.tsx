import React from "react";
import CardInmueble from "../CardInmueble";

export const OtrosInmueblesUsuario = () => {
  const inmueble1 = {
    id: "Imueble_1",
    images: [
      "/images/propiedades/propiedad1.webp",
      "/images/propiedades/propiedad2.webp",
      "/images/propiedades/propiedad2.webp",
    ],
    price: "S/ 450,000",
    ubicacion: "Madrid",
    propertyType: "Apartamento",
    address: "Calle Gran Vía, 28, 28013 Madrid, España",
    isExclusive: true,
  };

  const inmueble2 = {
    id: "Imueble_2",
    images: [
      "/images/propiedades/propiedad7.webp",
      "/images/propiedades/propiedad6.webp",
      "/images/propiedades/propiedad9.webp",
    ],
    price: "S/ 320,000",
    ubicacion: "Barcelona",
    propertyType: "Piso",
    address: "Passeig de Gràcia, 15, 08007 Barcelona, España",
    isExclusive: false,
  };

  return (
    <div className="max-h-[800px] overflow-y-auto pb-4 px-2">
      <p className="text-secondary-main text-lg font-TypographBold mb-5">
        Otros inmuebles del usuario
      </p>
      <div className="flex flex-col gap-5">
        <CardInmueble data={inmueble1} />
        <CardInmueble data={inmueble2} />
      </div>
    </div>
  );
};
