/* eslint-disable @typescript-eslint/no-explicit-any */
import { config } from "@/assets/config/config";
import { BannerInternas } from "../../_components/estructura/BannerInternas";
import { ContentMain } from "../../_components/estructura/ContentMain";
import { ContenedorBusqueda } from "./_components/ContenedorBusqueda";
import { FiltrosBusqueda } from "./_components/FiltrosBusqueda";
import { Suspense } from "react";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: any;
}) {
  const { tipo_propiedad, ciudad, disponibilidad } = searchParams;

  const capitalizar = (texto: string) =>
    texto
      .split(" ")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join(" ");

  const disponibilidadMap: Record<string, string> = {
    EN_VENTA: "en venta",
    EN_ALQUILER: "en alquiler",
    EN_COMPRA: "en compra",
  };

  let title = "Buscar propiedades | Sulcapital Sac";
  let description =
    "Explora nuestro catálogo de propiedades en la selva central del Perú.";
  let robots = "noindex, follow";

  const disponibilidadValida =
    disponibilidad && disponibilidadMap[disponibilidad];
  const tipoValido = tipo_propiedad && tipo_propiedad.length > 1;
  const ciudadValida = ciudad && ciudad.length > 1;

  if (disponibilidadValida && tipoValido && ciudadValida) {
    const tipo = capitalizar(tipo_propiedad!);
    const ciudadCapitalizada = capitalizar(ciudad!);
    const disp = disponibilidadMap[disponibilidad!];

    title = `${tipo} ${disp} en ${ciudadCapitalizada} | Sulcapital Sac`;
    description = `Encuentra ${tipo.toLowerCase()}s ${disp} en ${ciudadCapitalizada}. Consulta precios, ubicación y más.`;
    robots = "index, follow";
  }

  return {
    title,
    description,
    generator: "Next.js",
    authors: [{ name: "Logos Perú" }],
    robots,
    icons: {
      icon: "/assets/images/logo/ico.png",
    },
    alternates: {
      canonical: `https://sulcapital.pe/buscar?tipo_propiedad=${tipo_propiedad}&ciudad=${ciudad}&disponibilidad=${disponibilidad}`,
    },
  };
}

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
    {
      next: { revalidate: 3600 },
    }
  );

  const { data, pagination } = await res.json();

  return (
    <>
      <BannerInternas
        image="/images/fondos/fondo_vista.webp"
        title="Búsqueda"
      />
      <section className="">
        <ContentMain className="py-4 md:py-8 lg:py-16">
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
              <Suspense
                fallback={<div>Cargando resultados de búsqueda...</div>}
              >
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
              </Suspense>
            </div>
          </div>
        </ContentMain>
      </section>
    </>
  );
}
