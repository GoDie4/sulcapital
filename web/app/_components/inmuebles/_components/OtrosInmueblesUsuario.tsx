import React from "react";
import CardInmueble from "../CardInmueble";
import { Propiedad } from "../../../(sistema)/sistema/propiedades/_components/table/ColumnasPropiedades";

export const OtrosInmueblesUsuario = ({
  ultimasPropiedades,
}: {
  ultimasPropiedades: Propiedad[];
}) => {
  //   const inmueble1: Propiedad = {
  //     id: "Imueble_1",
  //     imagenes: [
  //       { id: 1, url: "/images/propiedades/propiedad1.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad2.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad2.webp" },
  //     ],
  //     precio: 450000,
  //     ciudad: { nombre: "Madrid" },
  //     tipoPropiedad: { nombre: "Apartamento" },
  //     direccion: "Calle Gran Vía, 28, 28013 Madrid, España",
  //     exclusivo: true,
  //     descripcionLarga: "",
  //     disponibilidad: "",
  //     estado: "",
  //     fondoPortada: [
  //       { id: 1, url: "/images/propiedades/propiedad1.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad2.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad2.webp" },
  //     ],
  //     titulo: "",
  //     createdAt: "",
  //     updatedAt: "",
  //   };

  //   const inmueble2: Propiedad = {
  //     id: "Imueble_2",
  //     imagenes: [
  //       { id: 1, url: "/images/propiedades/propiedad7.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad6.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad9.webp" },
  //     ],
  //     precio: 320000,
  //     ciudad: { nombre: "Barcelona" },
  //     tipoPropiedad: { nombre: "Piso" },
  //     direccion: "Passeig de Gràcia, 15, 08007 Barcelona, España",
  //     exclusivo: false,
  //     descripcionLarga: "",
  //     disponibilidad: "",
  //     estado: "",
  //     fondoPortada: [
  //       { id: 1, url: "/images/propiedades/propiedad1.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad2.webp" },
  //       { id: 1, url: "/images/propiedades/propiedad2.webp" },
  //     ],
  //     titulo: "",
  //     createdAt: "",
  //     updatedAt: "",
  //   };

  return (
    <div className="max-h-[800px] overflow-y-auto pb-4 px-2">
      <p className="text-secondary-main text-lg font-TypographBold mb-5">
        Otros inmuebles del usuario
      </p>
      <div className="flex flex-col gap-5">
        {ultimasPropiedades.map((propiedad: Propiedad, index: number) => (
          <CardInmueble data={propiedad} key={`${propiedad.id}${index}`} />
        ))}
      </div>
    </div>
  );
};
