/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import { BannerInternas } from "../../_components/estructura/BannerInternas";
import { ContentMain } from "../../_components/estructura/ContentMain";
import { ContenedorBusqueda } from "./_components/ContenedorBusqueda";
import { FiltrosBusqueda } from "./_components/FiltrosBusqueda";

export default async function page({ searchParams }: { searchParams: any }) {
  const limitParam = searchParams?.limit;
  const rawLimit = Array.isArray(limitParam)
    ? limitParam[0]
    : limitParam ?? "10";
  const limit = parseInt(rawLimit);
  const pageParam = searchParams?.page;
  const rawPage = Array.isArray(pageParam) ? pageParam[0] : pageParam ?? "1";
  const page = parseInt(rawPage);
  const safePage = isNaN(page) || page < 1 ? 1 : page;

  const tipo_propiedad = searchParams?.tipo_propiedad ?? "";
  const ciudad = searchParams?.ciudad ?? "";
  const disponibilidad = searchParams?.disponibilidad ?? "";
  const search = searchParams?.search ?? "";

  // Aquí harías la petición a tu API de búsqueda con los filtros y paginación
  // Ejemplo de cómo podrías estructurar la URL:
  const query = new URLSearchParams({
    page: safePage.toString(),
    limit: limit.toString(),
    tipo_propiedad,
    ciudad,
    disponibilidad,
    search,
  });

  const res = await fetch(
    `${config.API_URL}/propiedades/buscar?${query.toString()}`,
  );

  const { data, pagination } = await res.json();

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
              <FiltrosBusqueda
                dataFiltrosInitial={{
                  ciudad: ciudad,
                  disponibilidad: disponibilidad,
                  search: search,
                  tipo_propiedad: tipo_propiedad,
                }}
              />
            </div>
            <div className="w-full xl:w-4/5">
              <ContenedorBusqueda
                data={data}
                pagination={pagination}
                dataFiltrosActivos={{
                  ciudad: ciudad,
                  disponibilidad: disponibilidad,
                  search: search,
                  tipo_propiedad: tipo_propiedad,
                }}
              />
            </div>
          </div>
        </ContentMain>
      </section>
    </>
  );
}
