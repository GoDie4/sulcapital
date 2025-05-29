import { sampleProperties } from "@/assets/data/DataGeneral";
import { BannerInternas } from "../_components/estructura/BannerInternas";
import { ContentMain } from "../_components/estructura/ContentMain";
import DescripcionInmueble from "../_components/inmuebles/_components/DescripcionInmueble";
import { FormContactoInmueble } from "../_components/inmuebles/_components/FormContactoInmueble";
import { GaleriaInmuebles } from "../_components/inmuebles/_components/GaleriaInmuebles";
import { OtrosInmueblesUsuario } from "../_components/inmuebles/_components/OtrosInmueblesUsuario";
import { UbicacionInmueble } from "../_components/inmuebles/_components/UbicacionInmueble";
import { VideoInmueble } from "../_components/inmuebles/_components/VideoInmueble";
import { SwiperInmuebles } from "../_components/inmuebles/SwiperInmuebles";

export default function page() {
  return (
    <>
      <BannerInternas
        image="/images/fondos/fondo_vista.webp"
        title="Desde S/ 400 casa en Satipo"
      />
      <GaleriaInmuebles />
      <section>
        <ContentMain className="w-full flex flex-col lg:flex-row gap-8 pb-10">
          <div className="w-full lg:w-2/3 space-y-6">
            <DescripcionInmueble />
            <VideoInmueble />
            <UbicacionInmueble />
          </div>
          <div className="w-full lg:w-1/3 space-y-12 ">
            <FormContactoInmueble />
            <OtrosInmueblesUsuario />
          </div>
        </ContentMain>
        <ContentMain className="pb-20">
          <p className="text-xl font-TypographBold text-secondary-main mb-6">
            Inmuebles relacionados
          </p>
          <SwiperInmuebles inmuebles={sampleProperties} />
        </ContentMain>
      </section>
    </>
  );
}
