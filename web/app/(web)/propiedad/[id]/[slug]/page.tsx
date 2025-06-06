/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import axios from "axios";
import { BannerInternas } from "../../../../_components/estructura/BannerInternas";
import DescripcionInmueble from "../../../../_components/inmuebles/_components/DescripcionInmueble";
import { GaleriaInmuebles } from "../../../../_components/inmuebles/_components/GaleriaInmuebles";
import { ContentMain } from "../../../../_components/estructura/ContentMain";
import { VideoInmueble } from "../../../../_components/inmuebles/_components/VideoInmueble";
import { UbicacionInmueble } from "../../../../_components/inmuebles/_components/UbicacionInmueble";
import { FormContactoInmueble } from "../../../../_components/inmuebles/_components/FormContactoInmueble";
import { OtrosInmueblesUsuario } from "../../../../_components/inmuebles/_components/OtrosInmueblesUsuario";
import { ContenteInmuebles } from "../../_components/ContenteInmuebles";

async function getPropiedad(id: string): Promise<any> {
  const response = await axios.get(`${config.API_URL}/propiedades/find/${id}`);
  return response.data.data;
}

export default async function page({
  params,
}: {
  params: Promise<{ id: string; slug: string }>;
}) {
  const id = (await params).id;

  const data = await getPropiedad(id);

  const propiedad = data.propiedad;

  console.log("Propiedad: ", data);
  return (
    <>
      <BannerInternas
        image="/images/fondos/fondo_vista.webp"
        title={propiedad.titulo}
      />
      <GaleriaInmuebles
        imagenes={propiedad.imagenes}
        descripcionCorta={propiedad.descripcionCorta ?? ""}
        direccion={propiedad.direccion}
        precio={String(propiedad.precio)}
        disponibilidad={propiedad.disponibilidad}
      />
      <section>
        <ContentMain className="w-full flex flex-col lg:flex-row gap-8 pb-10">
          <div className="w-full lg:w-2/3 space-y-6">
            <DescripcionInmueble descripcion={propiedad.descripcionLarga} />
            <VideoInmueble url={propiedad.video ?? ""} />
            <UbicacionInmueble
              coordenadas={propiedad.coordenadas ?? ""}
              direccion={propiedad.direccion}
            />
          </div>
          <div className="w-full lg:w-1/3 space-y-12 ">
            <FormContactoInmueble />
            <OtrosInmueblesUsuario
              ultimasPropiedades={data.ultimasPropiedades}
            />
          </div>
        </ContentMain>
        <ContentMain className="pb-20">
          <p className="text-xl font-TypographBold text-secondary-main mb-6">
            Inmuebles relacionados
          </p>
          <ContenteInmuebles />
        </ContentMain>
      </section>
    </>
  );
}
