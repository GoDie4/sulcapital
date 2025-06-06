import React from "react";
import CardInmueble from "./CardInmueble";
import { Propiedad } from "../../(sistema)/sistema/propiedades/_components/table/ColumnasPropiedades";

export const GridPropiedades = ({
  propiedades,
}: {
  propiedades: Propiedad[];
  reverse?: boolean;
}) => {
  return (
    <div className=" grid lg:hidden grid-cols-2 md:grid-cols-3 gap-5">
      {propiedades.map((item, index) => (
        <CardInmueble data={item} type="grid" key={`${item.id}${index}`} />
      ))}
    </div>
  );
};
