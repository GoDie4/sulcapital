"use client";
import { useState } from "react";

const DescripcionInmueble = ({ descripcion }: { descripcion: string }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="font-sans">
      <h2 className="text-lg font-semibold mb-2 text-secondary-main font-TypographBold">
        Descripción
      </h2>
      <div
        className={`relative overflow-hidden space-y-5 transition-all text-black-900 duration-300 ${
          showMore ? "max-h-[1000px]" : "max-h-[320px]"
        }`}
      >
        <div
          dangerouslySetInnerHTML={{
            __html: descripcion.replace(/^"+|"+$/g, "").trim(),
          }}
        ></div>

        {/* <p>
          Ubicada en un terreno de más de 8,000 pies cuadrados, con una
          impresionante vista panorámica de 360 grados a la exuberante selva
          central y las montañas que rodean Satipo, esta propiedad es una
          oportunidad única para disfrutar de la belleza natural de la región.
        </p>
        <p>
          La residencia cuenta con 5 dormitorios, 2 baños principales, 4 baños
          completos para visitas, 2 medios baños, 2 espacios de oficina, 2
          vestidores, una sala de entretenimiento, una cocina gourmet amplia con
          área de comedor integrada, y una espaciosa sala principal de 1,100
          pies cuadrados idealmente situada en la esquina suroeste, perfecta
          para recibir visitas o simplemente relajarse al final del día.
        </p>
        <p>
          La casa está diseñada para integrarse con el paisaje tropical: la sala
          principal, de 1,100 pies cuadrados, se abre a una gran terraza con
          vista a la selva, perfecta para ver el atardecer o recibir invitados.
          Una amplia sala de entretenimiento con acabados en madera nativa y una
          cocina gourmet con isla central completan los espacios interiores,
          mientras que un comedor al aire libre invita a disfrutar de las noches
          cálidas de Satipo.
        </p>
        <p>
          La propiedad cuenta con un jardín lleno de árboles frutales y plantas
          nativas, un área de fogata para reuniones nocturnas y un huerto que
          permite cultivar productos frescos. Además, la casa tiene un sistema
          de captación de agua de lluvia y paneles solares para un estilo de
          vida más sostenible.
        </p> */}
        {!showMore && (
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-white-main to-transparent"></div>
        )}
      </div>
      <button
        className="text-secondary-600 font-medium mt-2 focus:outline-none"
        onClick={() => setShowMore(!showMore)}
      >
        {showMore ? "Ver menos" : "Ver más"}
      </button>
    </div>
  );
};

export default DescripcionInmueble;
