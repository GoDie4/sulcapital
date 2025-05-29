import { BannerInternas } from "../../_components/estructura/BannerInternas";
import { ContentMain } from "../../_components/estructura/ContentMain";
import { ContenedorBusqueda } from "./_components/ContenedorBusqueda";
import { FiltrosBusqueda } from "./_components/FiltrosBusqueda";

export default function page() {
  return (
    <>
      <BannerInternas
        image="/images/fondos/fondo_vista.webp"
        title="Búsqueda"
      />
      <section className="">
        <ContentMain className="py-16">
          <div className="w-full flex flex-col xl:flex-row gap-8">
            <div className="w-full xl:w-1/5">
              <FiltrosBusqueda />
            </div>
            <div className="w-full xl:w-4/5">
              <ContenedorBusqueda />
            </div>
          </div>
        </ContentMain>
      </section>
    </>
  );
}
